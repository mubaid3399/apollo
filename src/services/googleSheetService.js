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

// Current logged in user helpers
export const getCurrentUser = () => {
  try {
    const raw = localStorage.getItem('apollo_user')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export const setCurrentUser = (user) => {
  if (user) {
    localStorage.setItem('apollo_user', JSON.stringify(user))
  } else {
    localStorage.removeItem('apollo_user')
  }
  // Dispatch custom event so Navbar and other components update reactively
  window.dispatchEvent(new Event('apollo_auth_change'))
}

export const logoutUser = () => {
  setCurrentUser(null)
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
