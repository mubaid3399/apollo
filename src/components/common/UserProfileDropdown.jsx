import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../services/googleSheetService'
import { showNotification } from './GsapNotification'

const UserProfileDropdown = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Extract clean first name or fallback
  const firstName = currentUser?.firstName
    ? currentUser.firstName.split(' ')[0]
    : currentUser?.username || 'Account'

  const fullName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim()
    : currentUser?.username || 'Apollo Member'

  const email = currentUser?.email || ''

  const initials = (
    (currentUser?.firstName?.[0] || '') +
    (currentUser?.lastName?.[0] || currentUser?.username?.[0] || 'U')
  ).toUpperCase() || 'U'

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false)
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleLogout = () => {
    setIsOpen(false)
    logoutUser()
    showNotification('Signed out successfully.', 'info')
    navigate('/')
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Clean, Minimal Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2.5 py-1.5 px-2 rounded-full hover:bg-white/[0.06] transition-colors focus:outline-none group"
        aria-expanded={isOpen}
      >
        {/* Rounded Profile Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0077dd] to-[#00aaff] text-white flex items-center justify-center font-semibold text-xs tracking-wide shadow-sm ring-2 ring-white/10 group-hover:ring-[#0099ff]/60 transition-all select-none">
          {initials}
        </div>

        {/* Clean First Name */}
        <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors max-w-[110px] truncate">
          {firstName}
        </span>

        {/* Subtle Chevron */}
        <svg
          className={`w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-white' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Popover Dropdown (Solid background to eliminate bleed-through) */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-[#0e131a] border border-white/10 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.9)] p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Header Info */}
          <div className="px-3 py-2.5 border-b border-white/[0.08]">
            <p className="text-sm font-semibold text-white truncate leading-snug">
              {fullName}
            </p>
            {email && (
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {email}
              </p>
            )}
          </div>

          {/* Menu Items */}
          <div className="py-1">
            <Link
              to="/services"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Supported Devices</span>
            </Link>

            <Link
              to="/pricing"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Subscription Plans</span>
            </Link>

            <Link
              to="/get-trail"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span>10-Day Free Trial</span>
            </Link>

            <Link
              to="/faqs"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-slate-300 hover:text-white hover:bg-white/[0.06] rounded-lg transition-colors"
            >
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Help & Support</span>
            </Link>
          </div>

          {/* Divider */}
          <div className="border-t border-white/[0.08] my-1"></div>

          {/* Sign Out */}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors text-left"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  )
}

export default UserProfileDropdown
