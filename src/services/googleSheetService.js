/**
 * Google Sheet API Integration Service for Apollo Group TV
 * 
 * Interacts with Google Apps Script Web App acting as a serverless backend.
 * Features:
 * - User Registration (Action: 'signup')
 * - User Login (Action: 'login')
 * - Free Trial Request (Action: 'freetrial')
 * - Local fallback storage when VITE_GOOGLE_SHEET_API_URL is not yet configured.
 */

const API_URL =
  import.meta.env.VITE_GOOGLE_SHEET_API_URL ||
  'https://script.google.com/macros/s/AKfycbzCG-IC3AhMwL7XyCrRa1t78LMV_gcZ0xFFX_ea5XFFnU8DCh3m8V57voJT3apaNzW6SQ/exec'

// Clean up any stale local mock users so authentication is strictly live with Google Sheets
if (typeof window !== 'undefined') {
  try {
    localStorage.removeItem('apollo_mock_users')
  } catch {}
}

// Helper to check if Google Sheet URL is configured
export const isGoogleSheetConfigured = () => {
  return typeof API_URL === 'string' && API_URL.trim().startsWith('https://script.google.com/macros/s/')
}

// Subdomain & Domain Navigation Helpers
export const isProdDomain = () =>
  typeof window !== 'undefined' && window.location.hostname.includes('apollogroup.click')

export const isSubdomainHost = () => {
  if (typeof window === 'undefined') return false
  const h = window.location.hostname.toLowerCase()
  return h.startsWith('portal.') || h.startsWith('dashboard.')
}

export const getPortalLoginUrl = () =>
  isProdDomain() ? 'https://portal.apollogroup.click/login' : '/login'

export const getPortalRegisterUrl = () =>
  isProdDomain() ? 'https://portal.apollogroup.click/register' : '/register'

export const getDashboardUrl = () =>
  isProdDomain() ? 'https://dashboard.apollogroup.click/dashboard' : '/dashboard'

export const getMainHomeUrl = () =>
  isProdDomain() ? 'https://apollogroup.click/' : '/'

export const getMainSiteUrl = (path = '/') => {
  if (typeof window === 'undefined') return path
  if (isProdDomain()) {
    const cleanPath = path.startsWith('/') ? path : '/' + path
    return `https://apollogroup.click${cleanPath}`
  }
  return path
}

// Helper to set cookie accessible across main domain and all subdomains (*.apollogroup.click)
export const setSubdomainCookie = (name, value, days = 30) => {
  if (typeof document === 'undefined') return
  const isProd = isProdDomain()
  const domainPart = isProd ? '; domain=.apollogroup.click' : ''
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  const securePart = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; expires=${expires}${domainPart}; SameSite=Lax${securePart}`
}

export const getSubdomainCookie = (name) => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? decodeURIComponent(match[2]) : null
}

export const clearSubdomainCookie = (name) => {
  if (typeof document === 'undefined') return
  const isProd = isProdDomain()
  const domainPart = isProd ? '; domain=.apollogroup.click' : ''
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${domainPart}`
  document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`
}

// Current logged in user helpers with cross-subdomain synchronization
export const getCurrentUser = () => {
  try {
    // 1. Try reading from cookie first (works across portal & dashboard subdomains)
    const cookieRaw = getSubdomainCookie('apollo_user')
    if (cookieRaw) {
      const parsed = JSON.parse(cookieRaw)
      try {
        localStorage.setItem('apollo_user', cookieRaw)
      } catch {}
      return parsed
    }
    // 2. Fallback to localStorage
    const localRaw = localStorage.getItem('apollo_user')
    if (localRaw) {
      const parsed = JSON.parse(localRaw)
      setSubdomainCookie('apollo_user', localRaw)
      return parsed
    }
    return null
  } catch {
    return null
  }
}

export const setCurrentUser = (user) => {
  if (user) {
    const json = JSON.stringify(user)
    try {
      localStorage.setItem('apollo_user', json)
    } catch {}
    setSubdomainCookie('apollo_user', json, 30)
  } else {
    try {
      localStorage.removeItem('apollo_user')
    } catch {}
    clearSubdomainCookie('apollo_user')
  }
  // Dispatch custom event so Navbar and other components update reactively
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('apollo_auth_change'))
  }
}

export const logoutUser = () => {
  setCurrentUser(null)
}

/**
 * Verifies if the currently logged in session still exists in the database.
 * If user was deleted from Google Sheets, automatically logs them out and clears localStorage.
 */
export const verifySession = async () => {
  const user = getCurrentUser()
  if (!user) return null

  if (isGoogleSheetConfigured()) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'verify_user',
          id: user.id || '',
          email: user.email || '',
          username: user.username || '',
        }),
      })

      const result = await response.json()
      if (result && result.userNotFound) {
        console.warn('[GoogleSheetService] User was removed from Google Sheet. Ending session.')
        logoutUser()
        return null
      }
    } catch (err) {
      console.warn('[GoogleSheetService] Session verification network error:', err)
    }
    return user
  }

  // Local fallback check
  const existingUsers = JSON.parse(localStorage.getItem('apollo_mock_users') || '[]')
  const stillExists = existingUsers.some(
    (u) =>
      u.email.toLowerCase() === (user.email || '').toLowerCase() ||
      u.username.toLowerCase() === (user.username || '').toLowerCase()
  )
  if (!stillExists) {
    logoutUser()
    return null
  }
  return user
}

/**
 * Register a new user
 * @param {Object} userData 
 */
export const registerUser = async (userData) => {
  // If Google Sheet API URL is configured, call the live Google Apps Script Web App
  if (isGoogleSheetConfigured()) {
    try {
      const payload = {
        action: 'signup',
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        username: userData.username || '',
        birthday: userData.birthday || '',
        promoCode: userData.promoCode || '',
        email: userData.email || '',
        country: userData.country || '',
        state: userData.state || '',
        phoneNumber: userData.phoneNumber || '',
        password: userData.password || '',
      }

      // We use text/plain to avoid preflight CORS restrictions with Google Apps Script
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      return result
    } catch (err) {
      console.error('[GoogleSheetService] Register error:', err)
      return {
        success: false,
        message: 'Failed to communicate with Google Sheets. Please verify deployment permissions.',
      }
    }
  }

  return {
    success: false,
    message: 'Google Sheets API is currently unavailable. Please try again in a few moments.',
  }
}

/**
 * Log in an existing user
 * @param {Object} credentials - { identifier, password }
 */
export const loginUser = async ({ identifier, password }) => {
  // Call the live Google Apps Script Web App
  if (isGoogleSheetConfigured()) {
    try {
      const payload = {
        action: 'login',
        identifier: (identifier || '').trim(),
        password: password || '',
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      if (result.success && result.user) {
        setCurrentUser(result.user)
      }
      return result
    } catch (err) {
      console.error('[GoogleSheetService] Login error:', err)
      return {
        success: false,
        message: 'Could not connect to Google Sheets. Please check your internet or Apps Script URL.',
      }
    }
  }

  return {
    success: false,
    message: 'Authentication service is currently unavailable. Please try again later.',
  }
}

/**
 * Submit Free Trial request to Google Sheets
 * @param {Object} trialData 
 */
export const submitFreeTrial = async (trialData) => {
  if (isGoogleSheetConfigured()) {
    try {
      const payload = {
        action: 'freetrial',
        fullName: trialData.fullName || '',
        email: trialData.email || '',
        phone: trialData.phone || '',
        country: trialData.country || '',
        device: trialData.device || '',
        app: trialData.app || '',
        notes: trialData.notes || '',
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      })

      return await response.json()
    } catch (err) {
      console.error('[GoogleSheetService] Free trial error:', err)
      return {
        success: false,
        message: 'Failed to record trial in Google Sheets.',
      }
    }
  }

  // Local fallback
  await new Promise((r) => setTimeout(r, 800))
  const existingTrials = JSON.parse(localStorage.getItem('apollo_mock_trials') || '[]')
  existingTrials.push({
    id: 'TRL-' + Date.now().toString(36).toUpperCase(),
    created_at: new Date().toISOString(),
    ...trialData,
  })
  localStorage.setItem('apollo_mock_trials', JSON.stringify(existingTrials))

  return {
    success: true,
    message: 'Free trial request submitted successfully!',
  }
}

