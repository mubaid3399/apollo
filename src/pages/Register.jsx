import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import bannerImg from '../assets/login_signup.jfif'
import { useCountryGeo } from '../hooks/useCountryGeo'
import CountryPhoneField from '../components/common/CountryPhoneField'

const Register = () => {
  const navigate = useNavigate()
  const geo = useCountryGeo()
  const { countries, selectedCountry, setSelectedCountry } = geo

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    birthday: '',
    promoCode: '',
    email: '',
    country: selectedCountry.name,
    state: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  // Sync country name whenever selectedCountry changes (via IP detection or manual selection)
  useEffect(() => {
    if (selectedCountry?.name) {
      setFormData((prev) => ({
        ...prev,
        country: selectedCountry.name,
      }))
    }
  }, [selectedCountry?.name])

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'country') {
      const matched = countries.find((c) => c.name === value)
      if (matched) {
        setSelectedCountry(matched)
      }
      setFormData((prev) => ({ ...prev, country: value }))
      return
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (formData.password && formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!')
      return
    }

    if (!formData.agreeTerms) {
      setErrorMessage('Please accept the Terms of Service & Privacy Policy.')
      return
    }

    setIsSubmitting(true)

    // Simulate registration
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessMessage('Registration successful! Redirecting to login...')
      setTimeout(() => {
        navigate('/login')
      }, 1500)
    }, 1000)
  }

  return (
    <div className="w-full min-h-screen bg-[#000304] text-white flex flex-col lg:flex-row">
      {/* Left Column: 50% Full-Bleed Clean Banner Image (No border, No text overwrite) */}
      <div className="w-full lg:w-1/2 min-h-[360px] sm:min-h-[480px] lg:min-h-screen relative overflow-hidden bg-black shrink-0">
        <img
          src={bannerImg}
          alt="Apollo Group TV Experience"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
      </div>

      {/* Right Column: 50% Registration Form (No outer border, seamless dark theme) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
        <div className="w-full max-w-xl mx-auto py-6">
          {/* Header */}
          <div className="mb-8 text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Registration
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-normal">
              Create your Apollo Group TV account to start streaming your favorite channels.
            </p>
          </div>

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="mb-6 p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-6 p-3.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm flex items-center gap-2">
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {/* Section 1: Personal Information */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-3.5">
                Personal Information
              </h2>

              <div className="space-y-3.5">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <input
                    type="text"
                    name="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                  />
                </div>

                {/* Birthday (Optional) */}
                <div className="relative">
                  <input
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleChange}
                    placeholder="Your birthday (optional)"
                    className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all [color-scheme:dark]"
                  />
                </div>

                {/* Referral Code OR Promo Code (Optional) */}
                <div>
                  <input
                    type="text"
                    name="promoCode"
                    value={formData.promoCode}
                    onChange={handleChange}
                    placeholder="Referral Code OR Promo Code (optional)"
                    className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Contact Information */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-3.5">
                Contact Information
              </h2>

              <div className="space-y-3.5">
                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                  />
                </div>

                {/* Country & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Select Country (Synced with IP Geolocation) */}
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all cursor-pointer appearance-none"
                    >
                      {countries.map((c) => (
                        <option
                          key={`${c.code}-${c.dial_code}`}
                          value={c.name}
                          className="bg-[#0c1015] text-white"
                        >
                          {c.name} ({c.dial_code})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  {/* State */}
                  <div>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="State / Province"
                      className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                    />
                  </div>
                </div>

                {/* Phone Number Option (With Auto IP Flag & Dial Code Selector) */}
                <div>
                  <CountryPhoneField
                    geo={geo}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Password & Security */}
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-white tracking-tight mb-3.5">
                Security
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create password"
                    className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>

                <div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-1">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 rounded-sm border-white/20 bg-[#0c1015] text-[#0099ff] focus:ring-[#0099ff] cursor-pointer"
              />
              <label htmlFor="agreeTerms" className="text-xs text-slate-400 cursor-pointer select-none leading-relaxed">
                I agree to the{' '}
                <Link to="/terms-conditions" className="text-[#0099ff] hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-[#0099ff] hover:underline">
                  Privacy Policy
                </Link>
                .
              </label>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-lg shadow-[#0099ff]/30 hover:shadow-[#0099ff]/45 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <svg className="w-4 h-4 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Create Account</span>
                )}
              </button>
            </div>

            {/* Log In Redirect */}
            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm text-slate-400 font-normal">
                Already have an account?{' '}
                <Link to="/login" className="text-[#0099ff] font-semibold hover:underline">
                  Log In
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
