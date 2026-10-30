import { useState, useEffect, useRef } from 'react'

// Pre-populated fallback for instantaneous zero-latency render
export const DEFAULT_COUNTRIES = [
  { name: 'Pakistan', code: 'PK', dial_code: '+92' },
  { name: 'United States', code: 'US', dial_code: '+1' },
  { name: 'United Kingdom', code: 'GB', dial_code: '+44' },
  { name: 'United Arab Emirates', code: 'AE', dial_code: '+971' },
  { name: 'Saudi Arabia', code: 'SA', dial_code: '+966' },
  { name: 'Canada', code: 'CA', dial_code: '+1' },
  { name: 'Australia', code: 'AU', dial_code: '+61' },
  { name: 'India', code: 'IN', dial_code: '+91' },
  { name: 'Germany', code: 'DE', dial_code: '+49' },
  { name: 'Qatar', code: 'QA', dial_code: '+974' },
  { name: 'Oman', code: 'OM', dial_code: '+968' },
  { name: 'Kuwait', code: 'KW', dial_code: '+965' },
]

export const getFlagEmoji = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) return '🌐'
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

export const useCountryGeo = () => {
  const [countries, setCountries] = useState(DEFAULT_COUNTRIES)
  const [selectedCountry, setSelectedCountry] = useState(() => {
    try {
      const cached = sessionStorage.getItem('apollo_user_geo')
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed?.name && parsed?.code && parsed?.dial_code) return parsed
      }
    } catch {
      // ignore
    }
    return DEFAULT_COUNTRIES[0] // Pakistan default
  })
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const dropdownRef = useRef(null)

  // Auto-Detect Visitor Country via IP Geolocation (Zero-Latency Cached)
  useEffect(() => {
    let isMounted = true

    // Skip network request if already cached in current session
    try {
      const cached = sessionStorage.getItem('apollo_user_geo')
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed?.name && parsed?.code && parsed?.dial_code) {
          setSelectedCountry(parsed)
          return
        }
      }
    } catch {
      // continue
    }

    const detectLocation = async () => {
      // Primary: ipwho.is (fast, no api key required)
      try {
        const res = await fetch('https://ipwho.is/')
        const data = await res.json()

        if (isMounted && data && data.success) {
          const rawCallingCode = data.calling_code ? String(data.calling_code).trim() : ''
          const dialCode = rawCallingCode
            ? rawCallingCode.startsWith('+')
              ? rawCallingCode
              : `+${rawCallingCode}`
            : '+92'

          const detected = {
            name: data.country || 'Pakistan',
            code: (data.country_code || 'PK').toUpperCase(),
            dial_code: dialCode,
          }

          setSelectedCountry(detected)
          try {
            sessionStorage.setItem('apollo_user_geo', JSON.stringify(detected))
          } catch {
            // ignore
          }
          return
        }
      } catch {
        // Fallback to secondary if ipwho.is fails or blocked
      }

      // Secondary Fallback: ipapi.co
      try {
        const res2 = await fetch('https://ipapi.co/json/')
        const data2 = await res2.json()

        if (isMounted && data2 && data2.country_name) {
          const detected = {
            name: data2.country_name || 'Pakistan',
            code: (data2.country_code || 'PK').toUpperCase(),
            dial_code: data2.country_calling_code || '+92',
          }

          setSelectedCountry(detected)
          try {
            sessionStorage.setItem('apollo_user_geo', JSON.stringify(detected))
          } catch {
            // ignore
          }
        }
      } catch {
        // Safe fallback already in state
      }
    }

    detectLocation()

    return () => {
      isMounted = false
    }
  }, [])

  // Fetch full countries & dial code list from API on mount
  useEffect(() => {
    let isMounted = true
    fetch('https://countriesnow.space/api/v0.1/countries/codes')
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data && Array.isArray(data.data)) {
          const valid = data.data.filter((c) => c.name && c.code && c.dial_code)
          const currentCode = selectedCountry?.code || 'PK'
          const topCountry = valid.find((c) => c.code === currentCode)
          const rest = valid
            .filter((c) => c.code !== currentCode)
            .sort((a, b) => a.name.localeCompare(b.name))
          const merged = topCountry ? [topCountry, ...rest] : valid
          setCountries(merged)
        }
      })
      .catch(() => {
        // Fallback already in state
      })

    return () => {
      isMounted = false
    }
  }, [selectedCountry?.code])

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectCountry = (country) => {
    setSelectedCountry(country)
    setIsDropdownOpen(false)
    try {
      sessionStorage.setItem('apollo_user_geo', JSON.stringify(country))
    } catch {
      // ignore
    }
  }

  const filteredCountries = countries.filter((c) => {
    const q = searchQuery.toLowerCase().trim()
    if (!q) return true
    return (
      c.name.toLowerCase().includes(q) ||
      c.dial_code.toLowerCase().includes(q) ||
      c.code.toLowerCase().includes(q)
    )
  })

  return {
    countries,
    selectedCountry,
    setSelectedCountry: selectCountry,
    isDropdownOpen,
    setIsDropdownOpen,
    searchQuery,
    setSearchQuery,
    dropdownRef,
    filteredCountries,
  }
}

