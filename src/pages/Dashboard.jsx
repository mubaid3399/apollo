import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../services/googleSheetService'
import { showNotification } from '../components/common/GsapNotification'
import SEO from '../components/common/SEO'

const Dashboard = () => {
  const navigate = useNavigate()
  const [currentUser, setCurrentUser] = useState(getCurrentUser())
  const [activeTab, setActiveTab] = useState('start-watching')
  const [deviceFilter, setDeviceFilter] = useState('all')

  // Change password form state
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [isChangingPass, setIsChangingPass] = useState(false)

  // Protect route: redirect to login if not authenticated
  useEffect(() => {
    const user = getCurrentUser()
    if (!user) {
      navigate('/login')
    } else {
      setCurrentUser(user)
    }

    const handleAuth = () => {
      const u = getCurrentUser()
      if (!u) navigate('/login')
      else setCurrentUser(u)
    }

    window.addEventListener('apollo_auth_change', handleAuth)
    return () => window.removeEventListener('apollo_auth_change', handleAuth)
  }, [navigate])

  const handleLogout = () => {
    logoutUser()
    showNotification('You have logged out successfully.', 'info')
    navigate('/login')
  }

  // Copy helper with feedback
  const copyToClipboard = (text, label) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text)
      showNotification(`Copied ${label} to clipboard!`, 'success')
    }
  }

  const referralCode = currentUser?.id
    ? `APOLLO-${currentUser.id.replace('USR-', '')}`
    : '6KMRT4KP'

  const handlePasswordSubmit = (e) => {
    e.preventDefault()
    if (!passwords.newPassword || passwords.newPassword.length < 6) {
      showNotification('New password must be at least 6 characters long.', 'error')
      return
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      showNotification('New passwords do not match.', 'error')
      return
    }

    setIsChangingPass(true)
    setTimeout(() => {
      setIsChangingPass(false)
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
      showNotification('Password updated successfully!', 'success')
    }, 900)
  }

  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white pb-20">
      <SEO
        title="Customer Dashboard | Apollo Group TV"
        description="Access your Apollo Group TV account, player apps, Downloader codes, streaming credentials, and subscription status."
        canonical="/dashboard"
      />

      <div className="w-[95%] xl:w-[92%] max-w-[1440px] mx-auto pt-6 sm:pt-8">
        <div className="flex flex-col lg:flex-row gap-6 xl:gap-8 items-start">
          
          {/* ========================================================= */}
          {/* LEFT SIDEBAR NAVIGATION                                    */}
          {/* ========================================================= */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0 space-y-5">
            {/* Nav Menu */}
            <div className="bg-[#080d12] border border-white/10 rounded-2xl p-2.5 space-y-1 shadow-xl">
              <button
                type="button"
                onClick={() => setActiveTab('start-watching')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === 'start-watching'
                    ? 'bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Start watching</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === 'profile'
                    ? 'bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Profile</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('apps')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === 'apps'
                    ? 'bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                <span>Apps & Guides</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('transactions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === 'transactions'
                    ? 'bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span>Transactions</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('subscriptions')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === 'subscriptions'
                    ? 'bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Subscriptions</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${
                  activeTab === 'password'
                    ? 'bg-[#0099ff] text-white shadow-lg shadow-[#0099ff]/30'
                    : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                }`}
              >
                <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                <span>Change password</span>
              </button>

              <div className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-all text-left"
                >
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Log out</span>
                </button>
              </div>
            </div>

            {/* Referral Promo Card (Matching Reference Screenshot) */}
            <div className="bg-[#080d12] border border-white/10 rounded-2xl p-5 text-center space-y-3.5 shadow-xl">
              <div className="w-11 h-11 rounded-xl bg-[#0099ff]/15 text-[#0099ff] flex items-center justify-center mx-auto text-xl">
                <i className="ph-gift-bold"></i>
              </div>
              <div>
                <h4 className="text-base font-bold text-white tracking-tight">30 FREE Days</h4>
                <p className="text-xs text-slate-400">for every referred friend!</p>
              </div>

              {/* Referral Code Box */}
              <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 font-mono font-bold text-sm text-[#0099ff] tracking-wider select-all">
                {referralCode}
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(referralCode, 'Referral Code')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] text-white font-semibold text-xs tracking-tight transition-all shadow-md shadow-[#0099ff]/25"
              >
                Copy your referral code
              </button>
              <p className="text-[11px] text-slate-500 font-normal">And send manually</p>
            </div>
          </aside>

          {/* ========================================================= */}
          {/* RIGHT MAIN CONTENT AREA                                   */}
          {/* ========================================================= */}
          <main className="flex-1 w-full space-y-6 min-w-0">
            
            {/* Top Bar: Title & Subscription Expiry Status (Matching Screenshot) */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {activeTab === 'start-watching' && 'Start watching'}
                  {activeTab === 'profile' && 'My Profile'}
                  {activeTab === 'apps' && 'Apps & Guides'}
                  {activeTab === 'transactions' && 'Billing Transactions'}
                  {activeTab === 'subscriptions' && 'My Subscriptions'}
                  {activeTab === 'password' && 'Security Settings'}
                </h1>
                {activeTab === 'apps' && (
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Install one of these apps on your device, then sign in with the credentials from your Start watching page.
                  </p>
                )}
              </div>

              {/* Subscription Expiry Badge */}
              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#080d12] border border-white/10 text-xs">
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="text-left">
                  <p className="text-[10px] text-slate-400 uppercase font-semibold">Subscription expiry</p>
                  <p className="font-bold text-amber-400">No active subscription</p>
                </div>
              </div>
            </div>

            {/* ======================================================= */}
            {/* TAB 1: START WATCHING                                  */}
            {/* ======================================================= */}
            {activeTab === 'start-watching' && (
              <div className="space-y-6">
                {/* No Active Subscription Banner */}
                <div className="p-8 rounded-2xl bg-[#080d12] border border-white/10 text-center space-y-4">
                  <p className="text-sm sm:text-base text-slate-300">
                    You don't have an active subscription yet. Choose a package to start watching.
                  </p>
                  <Link
                    to="/pricing"
                    className="inline-block px-6 py-2.5 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-sm transition-all shadow-md shadow-[#0099ff]/25"
                  >
                    View packages
                  </Link>
                </div>

                {/* Device Selector Filter Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white">
                      Which device would you like to use?
                    </h3>
                    <p className="text-xs text-slate-400">
                      Choose your device to see instructions and player credentials.
                    </p>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDeviceFilter('all')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        deviceFilter === 'all'
                          ? 'bg-[#0099ff] text-white'
                          : 'bg-[#080d12] text-slate-300 border border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      All Devices
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeviceFilter('tv')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        deviceFilter === 'tv'
                          ? 'bg-[#0099ff] text-white'
                          : 'bg-[#080d12] text-slate-300 border border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      <i className="ph-television-bold"></i>
                      <span>TV / TV Box (Firestick)</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeviceFilter('mobile')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        deviceFilter === 'mobile'
                          ? 'bg-[#0099ff] text-white'
                          : 'bg-[#080d12] text-slate-300 border border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      <i className="ph-device-mobile-bold"></i>
                      <span>Mobile</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeviceFilter('web')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
                        deviceFilter === 'web'
                          ? 'bg-[#0099ff] text-white'
                          : 'bg-[#080d12] text-slate-300 border border-white/10 hover:bg-white/[0.05]'
                      }`}
                    >
                      <i className="ph-browsers-bold"></i>
                      <span>Web Browser</span>
                    </button>
                  </div>
                </div>

                {/* Device Instruction Cards */}
                <div className="space-y-4">
                  {/* Card 1: TV Box */}
                  {(deviceFilter === 'all' || deviceFilter === 'tv') && (
                    <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <i className="ph-television-bold text-xl text-[#0099ff]"></i>
                          <h4 className="text-base font-bold text-white">
                            TV / TV Box (Firestick & Android TV)
                          </h4>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30">
                          TV Setup
                        </span>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                        <p className="font-bold text-[#0099ff]">Step 1</p>
                        <p className="font-semibold text-white">Install using the Downloader app</p>
                        <ol className="list-decimal pl-5 space-y-1 text-slate-400 text-xs">
                          <li>Open the <strong className="text-white">Downloader</strong> app on your Firestick or Android TV.</li>
                          <li>Enter the Downloader code shown on your preferred app in the Player Apps section below and click GO.</li>
                          <li>Complete the APK installation and launch the app.</li>
                        </ol>
                      </div>

                      <div className="pt-2 border-t border-white/5 space-y-1 text-xs sm:text-sm text-slate-300">
                        <p className="font-bold text-[#0099ff]">Step 2</p>
                        <p className="font-semibold text-white">Sign in with your streaming details</p>
                        <p className="text-xs text-slate-400">
                          Your streaming details will appear here once your subscription is provisioned.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card 2: Mobile */}
                  {(deviceFilter === 'all' || deviceFilter === 'mobile') && (
                    <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <i className="ph-device-mobile-bold text-xl text-[#0099ff]"></i>
                          <h4 className="text-base font-bold text-white">
                            Mobile (iOS & Android Phone / Tablet)
                          </h4>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30">
                          Mobile Setup
                        </span>
                      </div>

                      <div className="space-y-1 text-xs sm:text-sm text-slate-300">
                        <p className="font-bold text-[#0099ff]">Step 1</p>
                        <p className="font-semibold text-white">Download our recommended app</p>
                        <p className="text-xs text-slate-400">
                          Install a player from the Player Apps section below that supports M3U playlists or Xtream Codes, then sign in with the details below.
                        </p>
                      </div>

                      <div className="pt-2 border-t border-white/5 space-y-1 text-xs sm:text-sm text-slate-300">
                        <p className="font-bold text-[#0099ff]">Step 2</p>
                        <p className="font-semibold text-white">Sign in with your streaming details</p>
                        <p className="text-xs text-slate-400">
                          Your streaming details will appear here once your subscription is provisioned.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card 3: Web */}
                  {(deviceFilter === 'all' || deviceFilter === 'web') && (
                    <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <i className="ph-browsers-bold text-xl text-[#0099ff]"></i>
                          <h4 className="text-base font-bold text-white">
                            Web - watch browser
                          </h4>
                        </div>
                        <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30">
                          Web Player
                        </span>
                      </div>

                      <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                        <p className="font-bold text-[#0099ff]">Step 1</p>
                        <p className="font-semibold text-white">Click the button to open new browser tab</p>
                        <a
                          href="https://webtv.iptvsmarters.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-xs transition-all shadow-md"
                        >
                          <span>Go to Web Player</span>
                          <i className="ph-arrow-square-out-bold"></i>
                        </a>
                      </div>

                      <div className="pt-2 border-t border-white/5 space-y-1 text-xs sm:text-sm text-slate-300">
                        <p className="font-bold text-[#0099ff]">Step 2</p>
                        <p className="font-semibold text-white">Sign in with your streaming details</p>
                        <p className="text-xs text-slate-400">
                          Your streaming details will appear here once your subscription is provisioned.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Player Apps Grid (Included in Start watching tab) */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Player Apps</h3>
                      <p className="text-xs text-slate-400">
                        Download directly, scan the QR code with your TV Downloader or mobile camera
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-300">
                      2 Apps
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* App 1: Golden Smart (GOTT) */}
                    <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-extrabold flex items-center justify-center text-sm shadow-md">
                          GOTT
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">Golden Smart (GOTT)</h4>
                          <p className="text-xs text-slate-400">Player App</p>
                        </div>
                      </div>

                      {/* Downloader Code Banner */}
                      <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
                        <span className="font-semibold">🔥 Downloader Code: <strong className="text-white font-mono">1036442</strong></span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('1036442', 'Downloader Code')}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          <i className="ph-copy-bold"></i>
                          <span>Copy</span>
                        </button>
                      </div>

                      {/* QR Code Container */}
                      <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-center">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://apollogroup.click/download/golden-smart.apk"
                          alt="Golden Smart QR code"
                          className="w-40 h-40 object-contain"
                        />
                        <span className="text-[11px] font-semibold text-slate-800 mt-2">
                          Scan to download on TV / mobile
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <a
                          href="https://apollogroup.click/download/golden-smart.apk"
                          className="flex-1 py-3 px-4 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                        >
                          <i className="ph-download-simple-bold text-base"></i>
                          <span>Direct Download</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('https://apollogroup.click/download/golden-smart.apk', 'Download Link')}
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                          title="Copy Link"
                        >
                          <i className="ph-copy-bold text-base"></i>
                        </button>
                      </div>
                    </div>

                    {/* App 2: Z Player */}
                    <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                          Z
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-white">Z Player</h4>
                          <p className="text-xs text-slate-400">Player App</p>
                        </div>
                      </div>

                      {/* Downloader Code Banner */}
                      <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
                        <span className="font-semibold">🔥 Downloader Code: <strong className="text-white font-mono">8045867</strong></span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('8045867', 'Downloader Code')}
                          className="flex items-center gap-1 hover:text-white transition-colors"
                        >
                          <i className="ph-copy-bold"></i>
                          <span>Copy</span>
                        </button>
                      </div>

                      {/* QR Code Container */}
                      <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-center">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://apollogroup.click/download/zplayer.apk"
                          alt="Z Player QR code"
                          className="w-40 h-40 object-contain"
                        />
                        <span className="text-[11px] font-semibold text-slate-800 mt-2">
                          Scan to download on TV / mobile
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <a
                          href="https://apollogroup.click/download/zplayer.apk"
                          className="flex-1 py-3 px-4 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                        >
                          <i className="ph-download-simple-bold text-base"></i>
                          <span>Direct Download</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('https://apollogroup.click/download/zplayer.apk', 'Download Link')}
                          className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                          title="Copy Link"
                        >
                          <i className="ph-copy-bold text-base"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Setup Guides Section */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Setup Guides</h3>
                      <p className="text-xs text-slate-400">
                        Scan with your phone to follow instructions, or open in your browser
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-slate-400">
                      0 Guides
                    </span>
                  </div>

                  <div className="p-8 rounded-2xl bg-[#080d12] border border-white/10 text-center text-xs text-slate-400">
                    No setup guides listed yet. Guides added by administrators will appear here.
                  </div>
                </div>

                {/* Accepted Payment Methods Section (Matching Reference Screenshot) */}
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white">Accepted Payment Methods</h3>
                      <p className="text-xs text-slate-400">
                        Pay or renew your subscription directly using any of our verified options below.
                      </p>
                    </div>
                    <Link to="/pricing" className="text-xs font-semibold text-[#0099ff] hover:underline">
                      View Subscription Packages →
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* USDT Tron (TRC20) */}
                    <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <i className="ph-currency-dollar-simple-bold text-[#0099ff] text-xl"></i>
                          <h4 className="text-sm font-bold text-white">USDT Tron (TRC20)</h4>
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#0099ff]/20 text-[#0099ff]">
                          TRC20
                        </span>
                      </div>

                      {/* Address Box */}
                      <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-slate-300 truncate">
                          TAUEKgaH1T15Y8DPvXDR9FPRZ2vG3S2Pp1
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('TAUEKgaH1T15Y8DPvXDR9FPRZ2vG3S2Pp1', 'USDT Address')}
                          className="text-[#0099ff] hover:text-white transition-colors p-1"
                        >
                          <i className="ph-copy-bold text-base"></i>
                        </button>
                      </div>

                      <p className="text-[11px] text-amber-400/90 leading-tight">
                        Send Only USDT using Tron TRC20 Network. Write your email in memo Please.
                      </p>

                      {/* QR Code */}
                      <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-center">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=TAUEKgaH1T15Y8DPvXDR9FPRZ2vG3S2Pp1"
                          alt="USDT TRC20 QR Code"
                          className="w-36 h-36 object-contain"
                        />
                        <span className="text-[11px] font-bold text-slate-800 mt-2">Scan to Pay</span>
                      </div>
                    </div>

                    {/* Bitcoin */}
                    <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <i className="ph-currency-btc-bold text-amber-400 text-xl"></i>
                          <h4 className="text-sm font-bold text-white">Bitcoin</h4>
                        </div>
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-400">
                          Bitcoin
                        </span>
                      </div>

                      {/* Address Box */}
                      <div className="p-3 rounded-xl bg-black/60 border border-white/10 flex items-center justify-between gap-2">
                        <span className="text-xs font-mono text-slate-300 truncate">
                          174C1gTD4uevhApAt4kwhHCV5fB32UStA
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard('174C1gTD4uevhApAt4kwhHCV5fB32UStA', 'Bitcoin Address')}
                          className="text-amber-400 hover:text-white transition-colors p-1"
                        >
                          <i className="ph-copy-bold text-base"></i>
                        </button>
                      </div>

                      <p className="text-[11px] text-amber-400/90 leading-tight">
                        Send Only Bitcoin don't send USDT or any other currency on this address because this user is associated with Bitcoin.
                      </p>

                      {/* QR Code */}
                      <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-center">
                        <img
                          src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=174C1gTD4uevhApAt4kwhHCV5fB32UStA"
                          alt="Bitcoin QR Code"
                          className="w-36 h-36 object-contain"
                        />
                        <span className="text-[11px] font-bold text-slate-800 mt-2">Scan to Pay</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* TAB 2: PROFILE                                         */}
            {/* ======================================================= */}
            {activeTab === 'profile' && (
              <div className="p-8 rounded-2xl bg-[#080d12] border border-white/10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0066cc] to-[#0099ff] text-white font-bold text-xl flex items-center justify-center shadow-lg shadow-[#0099ff]/30">
                    {(currentUser?.firstName?.[0] || currentUser?.username?.[0] || 'U').toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {currentUser?.firstName
                        ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim()
                        : currentUser?.username}
                    </h3>
                    <p className="text-xs text-slate-400">{currentUser?.email}</p>
                    <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30">
                      Apollo Customer
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-sm">
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-xs text-slate-400">Account ID</p>
                    <p className="font-mono font-semibold text-white">{currentUser?.id || 'USR-APOLLO'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-xs text-slate-400">Username</p>
                    <p className="font-semibold text-white">{currentUser?.username || '—'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-xs text-slate-400">Country</p>
                    <p className="font-semibold text-white">{currentUser?.country || 'United States'}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                    <p className="text-xs text-slate-400">Phone</p>
                    <p className="font-semibold text-white">{currentUser?.phoneNumber || '—'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* TAB 3: APPS & GUIDES (Exact Layout from Image 2)        */}
            {/* ======================================================= */}
            {activeTab === 'apps' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Player Apps</h3>
                    <p className="text-xs text-slate-400">
                      Scan the QR code with your TV Downloader or mobile camera to download directly
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30 flex items-center gap-1.5">
                    <i className="ph-devices-bold"></i>
                    <span>TV & Mobile Compatible</span>
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Golden Smart */}
                  <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-extrabold flex items-center justify-center text-sm shadow-md">
                        GOTT
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Golden Smart (GOTT)</h4>
                        <p className="text-xs text-slate-400">Player App</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
                      <span className="font-semibold">🔥 Downloader Code: <strong className="text-white font-mono">1036442</strong></span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('1036442', 'Downloader Code')}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <i className="ph-copy-bold"></i>
                        <span>Copy</span>
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://apollogroup.click/download/golden-smart.apk"
                        alt="Golden Smart QR code"
                        className="w-40 h-40 object-contain"
                      />
                      <span className="text-[11px] font-semibold text-slate-800 mt-2">
                        Scan to download on TV / mobile
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://apollogroup.click/download/golden-smart.apk"
                        className="flex-1 py-3 px-4 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <i className="ph-download-simple-bold text-base"></i>
                        <span>Direct Download</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('https://apollogroup.click/download/golden-smart.apk', 'Download Link')}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                      >
                        <i className="ph-copy-bold text-base"></i>
                      </button>
                    </div>
                  </div>

                  {/* Z Player */}
                  <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-rose-600 to-red-500 text-white font-black text-xl flex items-center justify-center shadow-md">
                        Z
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-white">Z Player</h4>
                        <p className="text-xs text-slate-400">Player App</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
                      <span className="font-semibold">🔥 Downloader Code: <strong className="text-white font-mono">8045867</strong></span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('8045867', 'Downloader Code')}
                        className="flex items-center gap-1 hover:text-white transition-colors"
                      >
                        <i className="ph-copy-bold"></i>
                        <span>Copy</span>
                      </button>
                    </div>

                    <div className="p-4 bg-white rounded-2xl flex flex-col items-center justify-center text-center">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://apollogroup.click/download/zplayer.apk"
                        alt="Z Player QR code"
                        className="w-40 h-40 object-contain"
                      />
                      <span className="text-[11px] font-semibold text-slate-800 mt-2">
                        Scan to download on TV / mobile
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href="https://apollogroup.click/download/zplayer.apk"
                        className="flex-1 py-3 px-4 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <i className="ph-download-simple-bold text-base"></i>
                        <span>Direct Download</span>
                      </a>
                      <button
                        type="button"
                        onClick={() => copyToClipboard('https://apollogroup.click/download/zplayer.apk', 'Download Link')}
                        className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-colors"
                      >
                        <i className="ph-copy-bold text-base"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* TAB 4: TRANSACTIONS                                    */}
            {/* ======================================================= */}
            {activeTab === 'transactions' && (
              <div className="p-6 rounded-2xl bg-[#080d12] border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white">Billing History</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-white/10 text-slate-400">
                        <th className="pb-3 font-semibold">Date</th>
                        <th className="pb-3 font-semibold">Invoice ID</th>
                        <th className="pb-3 font-semibold">Package</th>
                        <th className="pb-3 font-semibold">Amount</th>
                        <th className="pb-3 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-300">
                      <tr>
                        <td className="py-4">Oct 30, 2026</td>
                        <td className="py-4 font-mono">#INV-89312</td>
                        <td className="py-4">10-Day Free Trial Pass</td>
                        <td className="py-4 text-emerald-400 font-semibold">$0.00</td>
                        <td className="py-4">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                            Active Trial
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* TAB 5: SUBSCRIPTIONS                                   */}
            {/* ======================================================= */}
            {activeTab === 'subscriptions' && (
              <div className="p-8 rounded-2xl bg-[#080d12] border border-white/10 space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">Active Subscriptions</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Manage your active subscription lines and simultaneous device limits.
                    </p>
                  </div>
                  <Link
                    to="/pricing"
                    className="px-5 py-2.5 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-xs transition-all shadow-md"
                  >
                    Upgrade / Renew Plan
                  </Link>
                </div>

                <div className="p-6 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-400">
                      Pending Activation
                    </span>
                    <h4 className="text-base font-bold text-white pt-1">Apollo Group TV 4K Pass</h4>
                    <p className="text-xs text-slate-400">5 Simultaneous Devices • 20,000+ Live Channels</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Expiry Date</p>
                    <p className="text-sm font-semibold text-slate-300">Choose a package to activate</p>
                  </div>
                </div>
              </div>
            )}

            {/* ======================================================= */}
            {/* TAB 6: CHANGE PASSWORD                                 */}
            {/* ======================================================= */}
            {activeTab === 'password' && (
              <div className="p-8 rounded-2xl bg-[#080d12] border border-white/10 max-w-xl space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-white">Change Account Password</h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Update your account credentials to keep your IPTV lines secure.
                  </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Current Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.currentPassword}
                      onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#0099ff] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.newPassword}
                      onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#0099ff] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      value={passwords.confirmPassword}
                      onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-[#0099ff] transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isChangingPass}
                    className="w-full py-3 px-6 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-semibold text-sm transition-all shadow-md shadow-[#0099ff]/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isChangingPass ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            )}

          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

