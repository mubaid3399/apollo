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

const API_URL = import.meta.env.VITE_GOOGLE_SHEET_API_URL || ''

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

  // --- DEMO / LOCAL FALLBACK MODE ---
  // If the user hasn't connected Google Sheets yet, we allow seamless testing via localStorage
  console.warn('[GoogleSheetService] VITE_GOOGLE_SHEET_API_URL is not set. Using local mock database.')
  await new Promise((r) => setTimeout(r, 800))

  const existingUsers = JSON.parse(localStorage.getItem('apollo_mock_users') || '[]')
  const emailExists = existingUsers.some(
    (u) => u.email.toLowerCase() === (userData.email || '').toLowerCase()
  )
  const usernameExists = existingUsers.some(
    (u) => u.username.toLowerCase() === (userData.username || '').toLowerCase()
  )

  if (emailExists) {
    return { success: false, message: 'An account with this email address already exists.' }
  }
  if (usernameExists) {
    return { success: false, message: 'This username is already taken. Please choose another.' }
  }

  const newUser = {
    id: 'USR-' + Date.now().toString(36).toUpperCase(),
    created_at: new Date().toISOString(),
    firstName: userData.firstName || '',
    lastName: userData.lastName || '',
    username: userData.username || '',
    email: userData.email || '',
    country: userData.country || '',
    state: userData.state || '',
    phoneNumber: userData.phoneNumber || '',
    password: userData.password || '',
  }

  existingUsers.push(newUser)
  localStorage.setItem('apollo_mock_users', JSON.stringify(existingUsers))

  return {
    success: true,
    message: 'Account registered successfully in local preview! Connect your Google Sheet for live sync.',
    user: newUser,
  }
}

/**
 * Log in an existing user
 * @param {Object} credentials - { identifier, password }
 */
export const loginUser = async ({ identifier, password }) => {
  // If Google Sheet API URL is configured, call the live Google Apps Script Web App
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

  // --- DEMO / LOCAL FALLBACK MODE ---
  console.warn('[GoogleSheetService] VITE_GOOGLE_SHEET_API_URL is not set. Using local mock database.')
  await new Promise((r) => setTimeout(r, 800))

  const existingUsers = JSON.parse(localStorage.getItem('apollo_mock_users') || '[]')
  const cleanId = (identifier || '').trim().toLowerCase()

  const user = existingUsers.find(
    (u) =>
      u.email.toLowerCase() === cleanId ||
      u.username.toLowerCase() === cleanId
  )

  if (!user) {
    return {
      success: false,
      message: 'No account found with this username or email. Please sign up first.',
    }
  }

  if (user.password !== password) {
    return {
      success: false,
      message: 'Incorrect password. Please try again.',
    }
  }

  // Store user session (omit password for security)
  const sessionUser = { ...user }
  delete sessionUser.password
  setCurrentUser(sessionUser)

  return {
    success: true,
    message: 'Welcome back, ' + (sessionUser.firstName || sessionUser.username) + '!',
    user: sessionUser,
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

