import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { logoutUser } from '../../services/googleSheetService'
import { showNotification } from './GsapNotification'

const UserProfileDropdown = ({ currentUser }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const menuRef = useRef(null)
  const chevronRef = useRef(null)
  const navigate = useNavigate()

  const displayName = currentUser?.firstName
    ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim()
    : currentUser?.username || 'Customer'

  const initials = (
    (currentUser?.firstName?.[0] || '') +
    (currentUser?.lastName?.[0] || currentUser?.username?.[0] || 'U')
  ).toUpperCase() || 'U'

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown()
      }
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeDropdown()
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

  // GSAP animation for dropdown menu opening / closing
  useEffect(() => {
    if (!menuRef.current) return

    if (isOpen) {
      gsap.fromTo(
        menuRef.current,
        {
          opacity: 0,
          y: -10,
          scale: 0.95,
          pointerEvents: 'none',
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.25,
          ease: 'power2.out',
          pointerEvents: 'auto',
        }
      )
      if (chevronRef.current) {
        gsap.to(chevronRef.current, { rotation: 180, duration: 0.25, ease: 'power2.out' })
      }
    } else {
      gsap.to(menuRef.current, {
        opacity: 0,
        y: -8,
        scale: 0.96,
        duration: 0.2,
        ease: 'power2.in',
        pointerEvents: 'none',
      })
      if (chevronRef.current) {
        gsap.to(chevronRef.current, { rotation: 0, duration: 0.2, ease: 'power2.out' })
      }
    }
  }, [isOpen])

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  const handleLogout = () => {
    closeDropdown()
    logoutUser()
    showNotification('You have successfully signed out.', 'info')
    navigate('/')
  }

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Avatar Trigger Button */}
      <button
        type="button"
        onClick={toggleDropdown}
        className="flex items-center gap-2.5 p-1.5 pr-3 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#0099ff]/50 transition-all focus:outline-none group active:scale-[0.98]"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {/* Rounded Profile Avatar */}
        <div className="relative">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-[#0066cc] via-[#0099ff] to-[#38bdf8] text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-md shadow-[#0099ff]/30 ring-2 ring-white/10 group-hover:ring-[#0099ff]/60 transition-all select-none">
            {initials}
          </div>
          {/* Active Status Pulse Dot */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#000304] shadow-sm"></span>
        </div>

        {/* User Info (Desktop only) */}
        <div className="hidden lg:flex flex-col text-left">
          <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-[#0099ff] transition-colors leading-tight max-w-[120px] truncate">
            {displayName}
          </span>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-medium">
            Active Member
          </span>
        </div>

        {/* Chevron Icon */}
        <svg
          ref={chevronRef}
          className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors ml-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div
        ref={menuRef}
        style={{ opacity: 0, pointerEvents: 'none' }}
        className="absolute right-0 top-full mt-2.5 w-72 sm:w-80 rounded-2xl bg-[#0c1015]/95 backdrop-blur-2xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-2.5 z-50 select-none overflow-hidden"
      >
        {/* Header: User Overview Card */}
        <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center gap-3.5 mb-2">
          {/* Larger Circular Avatar */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0066cc] via-[#0099ff] to-[#38bdf8] text-white flex items-center justify-center font-bold text-base shadow-lg shadow-[#0099ff]/30 shrink-0">
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-bold text-white truncate leading-snug">
              {displayName}
            </h4>
            <p className="text-xs text-slate-400 truncate mb-1">
              {currentUser?.email || 'customer@apollogroup.tv'}
            </p>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff] animate-pulse"></span>
              Apollo VIP Account
            </span>
          </div>
        </div>

        {/* Menu Navigation Links */}
        <div className="space-y-1">
          <Link
            to="/services"
            onClick={closeDropdown}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all group"
          >
            <div className="w-7 h-7 rounded-md bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-[#0099ff] group-hover:bg-[#0099ff]/15 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-xs sm:text-sm text-white group-hover:text-[#0099ff] transition-colors">
                Supported Devices & Apps
              </p>
              <p className="text-[11px] text-slate-400">Firestick, Apple TV, Android</p>
            </div>
          </Link>

          <Link
            to="/pricing"
            onClick={closeDropdown}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all group"
          >
            <div className="w-7 h-7 rounded-md bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-[#0099ff] group-hover:bg-[#0099ff]/15 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-xs sm:text-sm text-white group-hover:text-[#0099ff] transition-colors">
                Subscription Packages
              </p>
              <p className="text-[11px] text-slate-400">Renew or upgrade subscription</p>
            </div>
          </Link>

          <Link
            to="/faqs"
            onClick={closeDropdown}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all group"
          >
            <div className="w-7 h-7 rounded-md bg-white/[0.04] flex items-center justify-center text-slate-400 group-hover:text-[#0099ff] group-hover:bg-[#0099ff]/15 transition-all">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="font-medium text-xs sm:text-sm text-white group-hover:text-[#0099ff] transition-colors">
                Help & Support Center
              </p>
              <p className="text-[11px] text-slate-400">24/7 Setup & troubleshooting</p>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/10 my-2"></div>

        {/* Sign Out Button */}
        <button
          type="button"
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-rose-400 hover:bg-rose-500/10 transition-all group text-left"
        >
          <div className="w-7 h-7 rounded-md bg-white/[0.04] group-hover:bg-rose-500/15 flex items-center justify-center text-slate-400 group-hover:text-rose-400 transition-all">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </div>
          <span className="font-semibold text-xs sm:text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default UserProfileDropdown
