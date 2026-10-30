import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCountryGeo } from '../hooks/useCountryGeo'
import CountryPhoneField from '../components/common/CountryPhoneField'

const deviceOptions = [
  'Amazon Firestick / Fire TV',
  'Android TV / Nvidia Shield / Xiaomi',
  'Apple TV / iPhone / iPad',
  'Smart TV (Samsung Tizen / LG webOS)',
  'Windows PC / macOS',
  'MAG / Formuler / BuzzTV',
  'Other / Generic IPTV Box',
]

const appOptions = [
  'TiviMate IPTV Player (Recommended)',
  'Apollo Group TV Dedicated App',
  'IPTV Smarters Pro',
  'XCIPTV Player',
  'GSE Smart IPTV',
  'M3U Playlist URL',
]

const trialFaqs = [
  {
    question: 'Is a credit card required to activate the 10-day trial?',
    answer:
      'No. You will never be asked for credit card details, billing info, or automatic renewal permissions to start your 10-day free trial. It is 100% risk-free.',
  },
  {
    question: 'How quickly will I receive my trial credentials?',
    answer:
      'Immediately! Our automated provisioning system dispatches your Xtream Codes API username, password, portal URL, and M3U link to your email and WhatsApp in under 60 seconds.',
  },
  {
    question: 'Does the free trial include live sports and PPV events?',
    answer:
      'Yes. Your 10-day trial grants full, unrestricted access to all 20,000+ live television channels, all scheduled Pay-Per-View sporting events (UFC, Boxing, Football), and the entire 100,000+ VOD movie vault.',
  },
  {
    question: 'What happens when my 10-day trial expires?',
    answer:
      'Your trial will simply pause. There are no surprise charges, auto-renewals, or cancellation fees. If you enjoy the experience, you can select one of our affordable packages to keep streaming.',
  },
]

const GetTrail = () => {
  const geo = useCountryGeo()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    device: deviceOptions[0],
    preferredApp: appOptions[0],
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [openFaq, setOpenFaq] = useState(0)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!formData.email) {
      const msg = 'Please provide a valid email address to receive your trial credentials.'
      setErrorMessage(msg)
      toast.error(msg)
      return
    }

    setIsSubmitting(true)

    // Simulate instant trial provisioning
    setTimeout(() => {
      setIsSubmitting(false)
      const successText = `Success! Your 10-day free trial credentials have been dispatched to ${formData.email}. Please check your inbox and WhatsApp.`
      setSuccessMessage(successText)
      toast.success('🎉 10-Day Free Trial credentials dispatched to your email & WhatsApp!', {
        autoClose: 5000,
      })
    }, 1200)
  }

  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      {/* 80% Container width matching Navbar & Hero */}
      <div className="w-[88%] lg:w-[80%] mx-auto">

        {/* Top Header & Breadcrumb */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          {/* Exact Hero H1 Typography */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            Claim Your 10 Days Free Trial on{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] via-[#4db8ff] to-[#80ccff]">
              Apollo Group TV
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Test drive over 20,000 live HD & 4K channels, all live sports PPVs, and 100,000+ VOD movies on your favorite device for 10 full days.
          </p>
        </div>

        {/* 2-Column Split: Value Proposition on Left + Form on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16 sm:mb-24">

          {/* Left Column: Trial Inclusions & Trust Metrics */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0c1015] border border-white/10 space-y-5">
              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                Everything Included in Your Trial:
              </h2>

              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-check-bold text-xs"></i>
                  </div>
                  <div>
                    <strong className="text-white">20,000+ Live Channels: </strong>
                    USA, UK, Canada, Europe, Middle East & global networks in 4K & FHD.
                  </div>
                </li>

                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-check-bold text-xs"></i>
                  </div>
                  <div>
                    <strong className="text-white">All Live Sports & PPVs: </strong>
                    Premier League, NFL RedZone, Champions League, UFC, and Boxing included.
                  </div>
                </li>

                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-check-bold text-xs"></i>
                  </div>
                  <div>
                    <strong className="text-white">100,000+ VOD Cinema Vault: </strong>
                    Latest theater releases, TV series box sets, and multi-language subtitles.
                  </div>
                </li>

                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-check-bold text-xs"></i>
                  </div>
                  <div>
                    <strong className="text-white">Anti-Freeze 10Gbps CDN: </strong>
                    Zero buffering loops during peak live game hours.
                  </div>
                </li>

                <li className="flex items-start gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-check-bold text-xs"></i>
                  </div>
                  <div>
                    <strong className="text-white">Instant Automated Delivery: </strong>
                    Credentials arrive in under 60 seconds with simple setup tutorials.
                  </div>
                </li>
              </ul>
            </div>

            {/* Trustpilot Banner Card */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/10 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-emerald-400">
                  <i className="ph-star-fill text-sm"></i>
                  <i className="ph-star-fill text-sm"></i>
                  <i className="ph-star-fill text-sm"></i>
                  <i className="ph-star-fill text-sm"></i>
                  <i className="ph-star-fill text-sm"></i>
                  <span className="text-white font-bold text-xs ml-1">4.8 / 5 Rating</span>
                </div>
                <div className="text-xs text-slate-400">Over 150,000 satisfied streamers</div>
              </div>

              <a
                href="https://www.trustpilot.com/review/apollogroup.click?utm_medium=trustbox&utm_source=TrustBoxReviewCollector"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shrink-0"
              >
                <span>Trustpilot</span>
                <i className="ph-arrow-up-right-bold text-xs"></i>
              </a>
            </div>
          </div>

          {/* Right Column: Free Trial Request Form */}
          <div className="lg:col-span-7 text-left">
            <div className="p-6 sm:p-8 lg:p-10 rounded-2xl bg-[#0c1015] border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0099ff]/10 rounded-full blur-3xl pointer-events-none" />

              <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
                Request Your 10 Days Free Access
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 font-normal">
                Fill out the details below. Your custom Xtream Codes & M3U credentials will be generated instantly.
              </p>

              {/* Feedback Messages */}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs sm:text-sm flex items-center gap-2">
                  <i className="ph-warning-circle-bold text-base shrink-0"></i>
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-400">
                    <i className="ph-check-circle-bold text-lg shrink-0"></i>
                    <span>Trial Provisioned Successfully!</span>
                  </div>
                  <p className="leading-relaxed">{successMessage}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name (2 Columns) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="e.g. John"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="e.g. Doe"
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Email Address (Credentials will be sent here)
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all"
                  />
                </div>

                {/* Phone Number with Auto-IP Flag & Dial Code Tracking */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-slate-300">
                      Phone Number (WhatsApp Delivery & Support)
                    </label>
                    <span className="text-[11px] text-zinc-400">Recommended for instant delivery</span>
                  </div>
                  <CountryPhoneField
                    geo={geo}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    name="phoneNumber"
                    placeholder={geo.selectedCountry.dial_code === '+92' ? '300 1234567' : '123 456 7890'}
                  />
                </div>

                {/* Streaming Device Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Primary Streaming Device
                  </label>
                  <select
                    name="device"
                    value={formData.device}
                    onChange={handleChange}
                    className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all cursor-pointer"
                  >
                    {deviceOptions.map((dev) => (
                      <option key={dev} value={dev} className="bg-[#0c1015] text-white">
                        {dev}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Preferred App Dropdown */}
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Preferred Player App
                  </label>
                  <select
                    name="preferredApp"
                    value={formData.preferredApp}
                    onChange={handleChange}
                    className="w-full bg-[#0c1015] border border-white/10 rounded-xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-[#0099ff] focus:ring-1 focus:ring-[#0099ff] transition-all cursor-pointer"
                  >
                    {appOptions.map((app) => (
                      <option key={app} value={app} className="bg-[#0c1015] text-white">
                        {app}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 rounded-xl font-bold text-sm sm:text-base text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-lg shadow-[#0099ff]/35 hover:shadow-[#0099ff]/50 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="w-5 h-5 animate-spin text-white" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                        </svg>
                        <span>Generating Free Trial...</span>
                      </>
                    ) : (
                      <>
                        <span>Get Instant 10-Day Access</span>
                        <i className="ph-arrow-right-bold text-base"></i>
                      </>
                    )}
                  </button>
                </div>

                <div className="pt-2 text-center text-[11px] text-slate-400">
                  By clicking above, you agree to receive trial activation instructions. We respect your privacy.
                </div>
              </form>
            </div>
          </div>

        </div>

        {/* 3-Step Setup Guide */}
        <div className="pt-12 sm:pt-16 pb-16 border-t border-white/10 text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mb-10 max-w-xl mx-auto">
            You are less than 2 minutes away from streaming on your favorite device.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#0c1015] border border-white/10">
              <div className="w-9 h-9 rounded-full bg-[#0099ff] text-white font-extrabold text-sm flex items-center justify-center mb-4">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Submit the Form</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Provide your name and email so our system can provision your dedicated streaming line.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1015] border border-white/10">
              <div className="w-9 h-9 rounded-full bg-[#0099ff] text-white font-extrabold text-sm flex items-center justify-center mb-4">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Receive Login Details</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Check your email inbox or WhatsApp for your username, password, portal URL, and M3U playlist.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0c1015] border border-white/10">
              <div className="w-9 h-9 rounded-full bg-[#0099ff] text-white font-extrabold text-sm flex items-center justify-center mb-4">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-1.5">Plug & Play</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Enter your credentials into TiviMate, Apollo app, or your Smart TV and begin watching immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Free Trial FAQs */}
        <div className="pt-10 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Free Trial Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Common questions regarding our 10-day risk-free trial evaluation.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3 text-left">
            {trialFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                      ? 'bg-[#0c1015] border-[#0099ff]/50 shadow-md'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full py-4 px-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-[#0099ff]' : 'text-white'
                        }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 border transition-all ${isOpen
                          ? 'bg-[#0099ff] border-[#0099ff] text-white rotate-45'
                          : 'bg-white/[0.05] border-white/10 text-slate-300'
                        }`}
                    >
                      <i className="ph-plus-bold text-xs"></i>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-150">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}

export default GetTrail
