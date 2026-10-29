import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

// Import video clips from assets/video-clips
import ufcClip from '../../assets/video-clips/328_chimaev_vs_strickland_ufc_10_05_26.mp4'
import apexClip from '../../assets/video-clips/apex.mp4'
import f1Clip from '../../assets/video-clips/miami_grand_prix_race_nz_formula_04_05_26_v2.mp4'
import nhlClip from '../../assets/video-clips/montreal_canadiends_vs_buffalo_sabres_nhl_10_05_26.mp4'
import mkClip from '../../assets/video-clips/mortal_kombat_2.mp4'
import scifiClip from '../../assets/video-clips/project_hail_mary.mp4'
import nbaClip from '../../assets/video-clips/san_antonio_spurs_vs_oklahoma_city_thunder_nba_25_05_26.mp4'
import movieClip from '../../assets/video-clips/the_devil_wears_prada_2.mp4'
import marioClip from '../../assets/video-clips/the_super_mario_galaxy_movie.mp4'

const videoList = [
  { src: f1Clip, title: 'Formula 1: Miami Grand Prix', category: 'Live Motorsport' },
  { src: ufcClip, title: 'UFC: Chimaev vs Strickland', category: 'Live PPV Event' },
  { src: nbaClip, title: 'NBA: Spurs vs Thunder', category: 'Live Basketball' },
  { src: nhlClip, title: 'NHL: Canadiens vs Sabres', category: 'Live Hockey' },
  { src: mkClip, title: 'Mortal Kombat II', category: 'Cinema Premiere' },
  { src: apexClip, title: 'APEX Racing', category: 'Live Stream' },
  { src: scifiClip, title: 'Project Hail Mary', category: 'Blockbuster Sci-Fi' },
  { src: marioClip, title: 'The Super Mario Galaxy Movie', category: 'Animation & Kids' },
  { src: movieClip, title: 'The Devil Wears Prada 2', category: 'Hollywood Cinema' },
]

// Pre-populated fallback for instantaneous zero-latency render
const DEFAULT_COUNTRIES = [
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

const getFlagEmoji = (countryCode) => {
  if (!countryCode || countryCode.length !== 2) return '🌐'
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt(0))
  return String.fromCodePoint(...codePoints)
}

const Hero = () => {
  const [currentIdx, setCurrentIdx] = useState(0)
  const [nextIdx, setNextIdx] = useState(1)
  const [activePlayer, setActivePlayer] = useState(1) // 1 or 2 for seamless crossfade
  const [isMuted, setIsMuted] = useState(true)

  // Countries & Phone API State
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
    return DEFAULT_COUNTRIES[0] // Default Pakistan
  })
  const [countryName, setCountryName] = useState(() => {
    try {
      const cached = sessionStorage.getItem('apollo_user_geo')
      if (cached) {
        const parsed = JSON.parse(cached)
        if (parsed?.name) return parsed.name
      }
    } catch {
      // ignore
    }
    return 'Pakistan'
  })
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
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
          setCountryName(parsed.name)
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
          setCountryName(detected.name)
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
          setCountryName(detected.name)
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
          // Prioritize selected/detected country at top, then sort the rest alphabetically
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
        setIsCountryDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const videoRef1 = useRef(null)
  const videoRef2 = useRef(null)

  // Switch to next video smoothly without pause
  const handleNextVideo = () => {
    const next = (currentIdx + 1) % videoList.length
    const nextNext = (next + 1) % videoList.length

    if (activePlayer === 1) {
      // Start video 2, then fade to player 2
      if (videoRef2.current) {
        videoRef2.current.currentTime = 0
        videoRef2.current.play().catch(() => { })
      }
      setActivePlayer(2)
      setCurrentIdx(next)
      setNextIdx(nextNext)
    } else {
      // Start video 1, then fade to player 1
      if (videoRef1.current) {
        videoRef1.current.currentTime = 0
        videoRef1.current.play().catch(() => { })
      }
      setActivePlayer(1)
      setCurrentIdx(next)
      setNextIdx(nextNext)
    }
  }

  // Initial autoplay
  useEffect(() => {
    if (videoRef1.current) {
      videoRef1.current.play().catch(() => { })
    }
  }, [])

  const currentVideo = videoList[currentIdx]

  return (
    <section className="relative z-20 w-full pt-6 pb-16 lg:py-20 text-white">
      {/* SVG ClipPath Definition matching Image 2 random organic bean/pebble shape */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <clipPath id="heroOrganicClip" clipPathUnits="objectBoundingBox">
            <path
              d="M 0.22 0.92 
                 C 0.12 0.92, 0.05 0.82, 0.04 0.68 
                 C 0.03 0.52, 0.08 0.42, 0.16 0.38 
                 C 0.26 0.34, 0.38 0.30, 0.50 0.20 
                 C 0.62 0.09, 0.76 0.04, 0.88 0.06 
                 C 0.97 0.08, 1.00 0.18, 0.99 0.32 
                 C 0.98 0.48, 0.88 0.60, 0.74 0.68 
                 C 0.58 0.78, 0.40 0.84, 0.26 0.91 
                 Z"
            />
          </clipPath>
        </defs>
      </svg>

      {/* Background Ambient Glows (Isolated in overflow-hidden container to avoid page scrolling) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 right-10 w-[550px] h-[550px] bg-[#0099ff]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-sky-600/10 rounded-full blur-[110px] pointer-events-none" />
      </div>

      {/* 80% Width Container to match Navbar */}
      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* Left Column: Form & Content */}
          <div className="relative z-20 w-full max-w-xl lg:max-w-2xl xl:max-w-[640px] space-y-6 lg:space-y-7 text-left">
            {/* Overline Tagline */}
            <div className="text-lg sm:text-xl font-semibold text-white tracking-normal">
              Anytime - Anywhere - Any Screen
            </div>

            {/* Main Title - Matches exact 2-line layout from reference image */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
              Apollo Group TV – <span className="inline-block">{countryName}</span> Leading<br className="hidden sm:inline" /> Streaming Provider
            </h1>

            {/* Subtitle / Pricing - Single line layout matching reference image */}
            <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
              Access to your favorite HD content as low as $13.35 per month.*
            </p>

            {/* Lead Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                window.location.href = '/get-trail'
              }}
              className="space-y-4 max-w-lg pt-1"
            >
              {/* Full Name Field */}
              <div>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full bg-[#000304]/90 border border-white/20 rounded-sm px-5 py-3.5 sm:py-4 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                />
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full bg-[#000304]/90 border border-white/20 rounded-sm px-5 py-3.5 sm:py-4 text-base text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                />
              </div>

              {/* Phone Input with Dynamic Country Code & Flag API */}
              <div className={`relative w-full ${isCountryDropdownOpen ? 'z-50' : 'z-20'}`} ref={dropdownRef}>
                <div className="flex items-center w-full bg-[#000304]/90 border border-white/20 rounded-sm overflow-hidden focus-within:border-[#0099ff] focus-within:ring-1 focus-within:ring-[#0099ff] transition-all">
                  {/* Flag + Dropdown trigger */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsCountryDropdownOpen(!isCountryDropdownOpen)
                      setSearchQuery('')
                    }}
                    className="flex items-center gap-2 px-3 sm:px-4 py-3.5 sm:py-4 border-r border-white/15 bg-white/[0.03] hover:bg-white/[0.07] shrink-0 select-none cursor-pointer transition-colors"
                    aria-label="Select country code"
                    aria-expanded={isCountryDropdownOpen}
                  >
                    {/* Country Flag Image with Emoji fallback */}
                    <div className="w-6 h-4 rounded-xs overflow-hidden shrink-0 shadow-xs ring-1 ring-white/15 bg-black/40 flex items-center justify-center">
                      <img
                        src={`https://flagcdn.com/w40/${selectedCountry.code.toLowerCase()}.png`}
                        alt={selectedCountry.name}
                        onError={(e) => {
                          e.target.style.display = 'none'
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline-block'
                        }}
                        className="w-full h-full object-cover"
                      />
                      <span className="hidden text-sm leading-none">
                        {getFlagEmoji(selectedCountry.code)}
                      </span>
                    </div>

                    <span className="text-xs sm:text-sm font-semibold text-slate-200">
                      {selectedCountry.dial_code}
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`w-3.5 h-3.5 text-zinc-400 transition-transform duration-250 ease-out ${
                        isCountryDropdownOpen ? 'rotate-180 text-[#0099ff]' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder={selectedCountry.dial_code === '+92' ? '300 1234567' : '123 456 7890'}
                    className="w-full bg-transparent px-4 py-3.5 sm:py-4 text-base text-white placeholder-zinc-500 focus:outline-none"
                  />
                  {/* Hidden field for full phone number with country code */}
                  <input
                    type="hidden"
                    name="full_phone"
                    value={`${selectedCountry.dial_code} ${phoneNumber}`.trim()}
                  />
                </div>

                {/* Searchable Country Dropdown Modal */}
                {isCountryDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full sm:w-[350px] max-w-[calc(100vw-2rem)] bg-[#090d12] border border-white/15 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_30px_rgba(0,153,255,0.15)] z-[60] overflow-hidden backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-150">
                    {/* Search Header */}
                    <div className="p-3 border-b border-white/10 bg-white/[0.02]">
                      <div className="relative flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 absolute left-3.5 text-[#0099ff] pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search country or dial code..."
                          autoFocus
                          className="w-full bg-white/[0.04] border border-white/10 rounded-sm pl-10 pr-9 py-2.5 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff]/50 transition-all"
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-3 p-1 text-zinc-400 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Clear search"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Scrollable Countries List with Hidden Scrollbar */}
                    <div className="max-h-[270px] overflow-y-auto no-scrollbar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden p-1.5 space-y-0.5">
                      {countries
                        .filter((c) => {
                          const q = searchQuery.toLowerCase().trim()
                          if (!q) return true
                          return (
                            c.name.toLowerCase().includes(q) ||
                            c.dial_code.toLowerCase().includes(q) ||
                            c.code.toLowerCase().includes(q)
                          )
                        })
                        .map((c) => {
                          const isSelected = selectedCountry.code === c.code
                          return (
                            <button
                              key={`${c.code}-${c.dial_code}`}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(c)
                                setCountryName(c.name)
                                setIsCountryDropdownOpen(false)
                                try {
                                  sessionStorage.setItem('apollo_user_geo', JSON.stringify(c))
                                } catch {
                                  // ignore
                                }
                              }}
                              className={`w-full flex items-center justify-between px-3 py-2 rounded-sm text-left text-sm transition-all group cursor-pointer ${
                                isSelected
                                  ? 'bg-[#0099ff]/15 text-white border border-[#0099ff]/35 shadow-sm'
                                  : 'text-slate-200 hover:bg-white/[0.07] border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3 truncate pr-2">
                                <div className="w-6 h-4 rounded-xs overflow-hidden shrink-0 shadow-xs ring-1 ring-white/15 bg-black/40 flex items-center justify-center">
                                  <img
                                    src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                                    alt={c.name}
                                    onError={(e) => {
                                      e.target.style.display = 'none'
                                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'inline-block'
                                    }}
                                    className="w-full h-full object-cover"
                                  />
                                  <span className="hidden text-sm leading-none">
                                    {getFlagEmoji(c.code)}
                                  </span>
                                </div>
                                <span className={`truncate text-sm font-medium ${isSelected ? 'text-[#0099ff]' : 'text-slate-200 group-hover:text-white'}`}>
                                  {c.name}
                                </span>
                              </div>

                              <div className="flex items-center gap-2 shrink-0">
                                <span
                                  className={`px-2 py-0.5 rounded-sm text-xs font-mono font-medium transition-colors ${
                                    isSelected
                                      ? 'bg-[#0099ff]/25 text-[#0099ff] border border-[#0099ff]/40'
                                      : 'bg-white/[0.05] border border-white/5 text-zinc-400 group-hover:text-[#0099ff] group-hover:border-[#0099ff]/30 group-hover:bg-[#0099ff]/10'
                                  }`}
                                >
                                  {c.dial_code}
                                </span>
                                {isSelected && (
                                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#0099ff]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </div>
                            </button>
                          )
                        })}
                    </div>
                  </div>
                )}
              </div>

              {/* Start Now Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="px-7 py-3.5 text-base rounded-sm font-semibold text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-md shadow-[#0099ff]/25 hover:shadow-lg hover:shadow-[#0099ff]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                >
                  Start Now
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Organic Shape Video Player with Generous Separation */}
          <div className="w-full flex justify-center lg:justify-end relative z-10">
            <div className="relative w-full max-w-[500px] xl:max-w-[560px] h-[360px] sm:h-[440px] lg:h-[480px] xl:h-[530px] flex items-center justify-center">

              {/* Trustpilot Review Floating Badge */}
              <a
                href="#"
                onClick={(e) => {
                  // Ready for when the user provides the real Trustpilot link
                  if (e.currentTarget.getAttribute('href') === '#') {
                    e.preventDefault()
                  }
                }}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute -left-3 sm:-left-6 lg:-left-8 top-1/2 lg:top-[68%] xl:top-[72%] -translate-y-1/2 z-30 flex items-center gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 bg-white rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.5)] border border-[#005128]/40 hover:border-[#00b67a] hover:scale-105 active:scale-95 transition-all select-none cursor-pointer"
                title="Review us on Trustpilot"
              >
                <span className="text-xs sm:text-[13px] font-medium text-slate-800">
                  Review us on
                </span>
                <svg
                  className="w-4 h-4 sm:w-[18px] sm:h-[18px] shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0.5L15.3 8.3L23.8 9.1L17.4 14.8L19.3 23.2L12 18.8L4.7 23.2L6.6 14.8L0.2 9.1L8.7 8.3L12 0.5Z"
                    fill="#00B67A"
                  />
                  <path
                    d="M12 18.8L7.1 21.7L8.3 16.1L12 18.8Z"
                    fill="#005128"
                  />
                </svg>
                <span className="text-xs sm:text-[13px] font-bold text-slate-900 tracking-tight">
                  Trustpilot
                </span>
              </a>

              {/* Organic Glowing Halo / Light Blue Shade - rotated at a slight angle */}
              <div
                className="absolute inset-0 w-full h-full scale-[1.08] rotate-[5deg] origin-center pointer-events-none transition-transform duration-700"
                style={{
                  clipPath: 'url(#heroOrganicClip)',
                  background: 'linear-gradient(135deg, rgba(0,153,255,0.9), rgba(0,153,255,0.35))',
                  filter: 'blur(22px)',
                  opacity: 0.95,
                }}
              />

              {/* Glowing SVG Border Outline - with increased width */}
              <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute inset-0 w-full h-full pointer-events-none z-20"
              >
                <path
                  d="M 22 92 C 12 92, 5 82, 4 68 C 3 52, 8 42, 16 38 C 26 34, 38 30, 50 20 C 62 9, 76 4, 88 6 C 97 8, 100 18, 99 32 C 98 48, 88 60, 74 68 C 58 78, 40 84, 26 91 Z"
                  fill="none"
                  stroke="#0099ff"
                  strokeWidth="2.8"
                  strokeOpacity="0.95"
                  className="drop-shadow-[0_0_12px_#0099ff] drop-shadow-[0_0_24px_#0099ff]"
                />
              </svg>

              {/* The Clipped Video Container */}
              <div
                className="relative w-full h-full overflow-hidden bg-slate-950 shadow-2xl transition-transform duration-500 hover:scale-[1.01]"
                style={{
                  clipPath: 'url(#heroOrganicClip)',
                  WebkitClipPath: 'url(#heroOrganicClip)',
                }}
              >
                {/* Seamless Video Player 1 */}
                <video
                  ref={videoRef1}
                  src={activePlayer === 1 ? videoList[currentIdx].src : videoList[nextIdx].src}
                  muted={isMuted}
                  playsInline
                  autoPlay
                  onEnded={handleNextVideo}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activePlayer === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />

                {/* Seamless Video Player 2 (Crossfade Buffer) */}
                <video
                  ref={videoRef2}
                  src={activePlayer === 2 ? videoList[currentIdx].src : videoList[nextIdx].src}
                  muted={isMuted}
                  playsInline
                  autoPlay
                  onEnded={handleNextVideo}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${activePlayer === 2 ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />

                {/* Live Pill Badge on Top Right */}
                <div className="absolute top-6 right-8 z-20 flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                  <span className="text-[11px] font-bold tracking-wider uppercase text-white">LIVE HD</span>
                </div>

                {/* Bottom Video Info Overlay */}
                <div className="absolute bottom-6 left-8 right-8 z-20 flex items-center justify-between gap-3 pointer-events-auto">
                  <div className="max-w-[70%]">
                    <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-[#0099ff] block">
                      {currentVideo.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-white truncate drop-shadow-md">
                      {currentVideo.title}
                    </h3>
                  </div>

                  {/* Controls: Mute/Unmute & Skip to Next Clip */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-2 rounded-lg bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/15 text-white transition-all"
                      aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleNextVideo}
                      className="p-2 rounded-lg bg-black/60 hover:bg-[#0099ff] backdrop-blur-md border border-white/15 text-white transition-all"
                      aria-label="Next clip"
                      title="Next clip"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
