import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SEO from '../components/common/SEO'
import bannerImg from '../assets/login_signup.jfif'
import { loginUser, getCurrentUser, isProdDomain } from '../services/googleSheetService'
import { showNotification } from '../components/common/GsapNotification'

const Login = () => {
  const navigate = useNavigate()

  // If user is already authenticated, forward straight to dashboard
  useEffect(() => {
    const user = getCurrentUser()
    if (user) {
      if (isProdDomain()) {
        window.location.href = 'https://dashboard.apollogroup.click/dashboard'
      } else {
        navigate('/dashboard')
      }
    }
  }, [navigate])

  const [formData, setFormData] = useState({
    identifier: '', // username or email
    password: '',
    rememberMe: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.identifier) {
      const err = 'Please enter your username or email address.'
      setErrorMessage(err)
      showNotification(err, 'error')
      return
    }

    if (!formData.password) {
      const err = 'Please enter your password.'
      setErrorMessage(err)
      showNotification(err, 'error')
      return
    }

    setIsSubmitting(true)

    try {
      const res = await loginUser({
        identifier: formData.identifier,
        password: formData.password,
      })

      setIsSubmitting(false)

      if (res.success) {
        const welcome = res.message || 'Login successful! Redirecting to dashboard...'
        setSuccessMessage(welcome)
        showNotification(welcome, 'success')
        setTimeout(() => {
          if (isProdDomain()) {
            window.location.href = 'https://dashboard.apollogroup.click/dashboard'
          } else {
            navigate('/dashboard')
          }
        }, 1000)
      } else {
        const err = res.message || 'Invalid username/email or password.'
        setErrorMessage(err)
        showNotification(err, 'error')
      }
    } catch (err) {
      setIsSubmitting(false)
      const errText = 'An unexpected error occurred during login. Please try again.'
      setErrorMessage(errText)
      showNotification(errText, 'error')
    }
  }

  return (
    <div className="w-full min-h-screen bg-[#000304] text-white flex flex-col lg:flex-row">
      <SEO
        title="Sign In | Customer Portal"
        description="Sign in to your Apollo Group TV account to manage active devices, playlists, and subscription renewals."
        canonical="/login"
      />
      {/* Left Column: 50% Full-Bleed Clean Banner Image (Sticky on desktop so it stays pinned as user reads guide) */}
      <div className="w-full lg:w-1/2 min-h-[360px] sm:min-h-[480px] lg:h-screen lg:sticky lg:top-0 relative overflow-hidden bg-black shrink-0">
        <img
          src={bannerImg}
          alt="Apollo Group TV Experience"
          className="w-full h-full object-cover object-center absolute inset-0"
        />
      </div>

      {/* Right Column: 50% Login Form + SEO Guide Article */}
      <div className="w-full lg:w-1/2 flex items-start justify-center p-6 sm:p-10 lg:p-12 xl:p-16">
        <div className="w-full max-w-xl mx-auto py-6">
          {/* Header */}
          <div className="mb-8 text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
              Sign In
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-normal">
              Sign in to manage your Apollo Group TV subscription, active devices, and playlists.
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

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-left">
            {/* Input 1: Username or Email */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1.5">
                Username or Email
              </label>
              <input
                type="text"
                name="identifier"
                required
                value={formData.identifier}
                onChange={handleChange}
                placeholder="Enter your username or email"
                className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
              />
            </div>

            {/* Input 2: Password with Show/Hide toggle */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs sm:text-sm font-medium text-slate-300">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded-sm border-white/20 bg-[#0c1015] text-[#0099ff] focus:ring-[#0099ff] cursor-pointer"
                />
                <span className="text-xs sm:text-sm text-slate-400">Remember me</span>
              </label>

              <Link
                to="/faqs"
                className="text-xs sm:text-sm text-[#0099ff] hover:underline"
              >
                Forgot password?
              </Link>
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
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </div>

            {/* Sign Up Redirect */}
            <div className="text-center pt-2">
              <p className="text-xs sm:text-sm text-slate-400 font-normal">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#0099ff] font-semibold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </form>

          {/* ------------------------------------------------------------- */}
          {/* SEO GUIDE ARTICLE: APOLLO GROUP TV LOGIN & PORTAL ACCESS      */}
          {/* ------------------------------------------------------------- */}
          <div className="mt-10 pt-8 border-t border-white/10 text-left space-y-5">
            {/* Tag / Badge */}
            {/* Main Article Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
              Complete Guide to Your <strong className="text-[#0099ff] font-bold">Apollo Group TV Login</strong> & Account Portal
            </h2>

            {/* Intro Paragraph */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              Logging into your <strong className="text-[#0099ff] font-bold">Apollo Group TV login</strong> account grants you immediate access to over 20,000+ live HD and 4K channels, 100,000+ Video On Demand (VOD) cinema releases, and Pay-Per-View sporting events. Whether accessing your customer dashboard through a desktop web browser, smartphone, Amazon Firestick, or Android TV, understanding how to navigate the <strong className="text-[#0099ff] font-bold">Apollo Group TV portal</strong> ensures an uninterrupted, buffer-free viewing experience across all your screens.
            </p>

            {/* Section 1 */}
            <div className="space-y-2 pt-1">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]"></span>
                <span>1. How to Sign In to the Official Apollo Group TV Portal</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                To sign in, enter the username or primary email address linked to your active <strong className="text-[#0099ff] font-bold">Apollo Group TV subscription</strong> along with your account password in the form above. Once authenticated, your customer dashboard allows you to monitor active subscription cycles, view transaction receipts, download custom M3U playlist URLs, and manage simultaneous streaming connections. If you are currently evaluating our service with an official <strong className="text-[#0099ff] font-bold">Apollo Group TV free trial</strong>, input the automated trial credentials dispatched to your email inbox immediately upon trial request.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-2 pt-1">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]"></span>
                <span>2. Logging In on Firestick, Smart TVs & the Apollo Group TV APK</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                While you can manage account billing and subscription renewals directly through the <strong className="text-[#0099ff] font-bold">Apollo Group TV web player</strong> on desktop and mobile browsers, live TV streaming is optimized through our dedicated applications. To log in on Amazon Fire TV Stick, Nvidia Shield, or Android boxes:
              </p>
              <ul className="space-y-1.5 pl-3 border-l-2 border-[#0099ff]/30 text-xs sm:text-sm text-slate-300">
                <li>
                  <strong className="text-white font-medium">Download the App:</strong> Sideload the official <strong className="text-[#0099ff] font-bold">Apollo Group TV APK</strong> using verified Downloader codes (<strong className="text-[#0099ff] font-bold">1036442</strong> for Golden Smart or <strong className="text-[#0099ff] font-bold">8045867</strong> for Z Player).
                </li>
                <li>
                  <strong className="text-white font-medium">Select Login Method:</strong> Open the player and choose your preferred authentication protocol—either Xtream Codes API or M3U playlist link.
                </li>
                <li>
                  <strong className="text-white font-medium">Enter Credentials:</strong> Input your <strong className="text-[#0099ff] font-bold">Apollo TV login credentials</strong> (Username, Password, and Server Portal URL).
                </li>
                <li>
                  <strong className="text-white font-medium">Sync Channels:</strong> Save your details to sync electronic program guides (EPG) and stream 4K feeds simultaneously across up to 5 household devices.
                </li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="space-y-2 pt-1">
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff]"></span>
                <span>3. Troubleshooting Login Errors & Status Code 400</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                If you encounter difficulty signing in or receive an <strong className="text-[#0099ff] font-bold">Apollo Group TV status code 400</strong>, this typically indicates an incorrect server URL, trailing blank spaces in your username, or an expired session token. Follow these quick troubleshooting tips:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <i className="ph-shield-warning-bold text-[#0099ff]"></i>
                    <span>Verify Portal URL</span>
                  </div>
                  <p className="text-slate-400">Ensure the server address contains no trailing slashes or inadvertent typos before submitting.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <i className="ph-arrows-clockwise-bold text-[#0099ff]"></i>
                    <span>Clear App Cache</span>
                  </div>
                  <p className="text-slate-400">Force stop the player app in device settings and clear cache to remove outdated playlist tokens.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <i className="ph-globe-bold text-[#0099ff]"></i>
                    <span>Zero IP Locks</span>
                  </div>
                  <p className="text-slate-400">Our platform is 100% VPN friendly. Toggle VPN server location if your ISP throttles high-bandwidth feeds.</p>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/10 text-xs text-slate-300 space-y-1">
                  <div className="font-semibold text-white flex items-center gap-1.5">
                    <i className="ph-key-bold text-[#0099ff]"></i>
                    <span>Password Reset</span>
                  </div>
                  <p className="text-slate-400">Click the <strong className="text-[#0099ff] font-bold">Apollo Group TV password reset</strong> link or reach 24/7 support for immediate credential retrieval.</p>
                </div>
              </div>
            </div>

            {/* Support Callout Pill */}
            <div className="p-3.5 rounded-xl bg-[#0099ff]/10 border border-[#0099ff]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-200">
                Need immediate help with your account? Our human <strong className="text-[#0099ff] font-bold">Apollo Group TV support</strong> team is available 24/7.
              </span>
              <a
                href="https://wa.me/message/YOUR_WHATSAPP_ID"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#0099ff] text-white font-bold shrink-0 hover:bg-[#0088ee] transition-all cursor-pointer"
              >
                Get Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
