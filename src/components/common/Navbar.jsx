import React, { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom'
import gsap from 'gsap'
import logo from '../../assets/logo.png'
import { getCurrentUser, logoutUser } from '../../services/googleSheetService'
import UserProfileDropdown from './UserProfileDropdown'

const navLinks = [
    { id: 'home', label: 'Home', mobileLabel: 'Home page', to: '/', end: true },
    { id: 'services', label: 'Services', to: '/services' },
    { id: 'pricing', label: 'Pricing & Packages', to: '/pricing' },
    { id: 'blog', label: 'Blog', to: '/blog' },
    { id: 'about', label: 'About', to: '/about' },
    { id: 'faqs', label: 'FAQs', to: '/faqs' },
]

const ACCENT = '#0099ff'

/* ------------------------------------------------------------------ */
/* Desktop nav item with GSAP hover animation (fade only, no scaling)  */
/* ------------------------------------------------------------------ */
const DesktopNavItem = ({ label, to, end }) => {
    const resolved = useResolvedPath(to)
    const isActive = !!useMatch({ path: resolved.pathname, end: !!end })

    const textRef = useRef(null)
    const lineRef = useRef(null)
    const isActiveRef = useRef(isActive)

    // Initial state + react to active-route changes
    useEffect(() => {
        isActiveRef.current = isActive
        gsap.to(lineRef.current, {
            opacity: isActive ? 1 : 0,
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
        })
        gsap.to(textRef.current, {
            color: isActive ? ACCENT : '#cbd5e1',
            duration: 0.3,
            overwrite: 'auto',
        })
    }, [isActive])

    // Kill any running tweens on unmount
    useEffect(() => {
        const line = lineRef.current
        const text = textRef.current
        return () => gsap.killTweensOf([line, text])
    }, [])

    const handleEnter = () => {
        gsap.to(textRef.current, {
            color: '#ffffff',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
        })
        if (!isActiveRef.current) {
            gsap.to(lineRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
            })
        }
    }

    const handleLeave = () => {
        gsap.to(textRef.current, {
            color: isActiveRef.current ? ACCENT : '#cbd5e1',
            duration: 0.3,
            ease: 'power2.out',
            overwrite: 'auto',
        })
        if (!isActiveRef.current) {
            gsap.to(lineRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.out',
                overwrite: 'auto',
            })
        }
    }

    return (
        <NavLink
            to={to}
            end={end}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            onFocus={handleEnter}
            onBlur={handleLeave}
            className="relative inline-flex items-center px-4 py-2.5 text-base font-medium outline-none"
        >
            {/* Label */}
            <span ref={textRef} className="relative text-slate-300">
                {label}
            </span>

            {/* Underline (fade only) */}
            <span
                ref={lineRef}
                className="absolute left-4 right-4 bottom-1 h-[2px] rounded-full"
                style={{ backgroundColor: ACCENT, opacity: 0 }}
            />
        </NavLink>
    )
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */
const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [currentUser, setCurrentUser] = useState(getCurrentUser())
    const location = useLocation()

    // Listen to login/logout events across tabs and within app
    useEffect(() => {
        const handleAuthChange = () => {
            setCurrentUser(getCurrentUser())
        }
        window.addEventListener('apollo_auth_change', handleAuthChange)
        window.addEventListener('storage', handleAuthChange)
        return () => {
            window.removeEventListener('apollo_auth_change', handleAuthChange)
            window.removeEventListener('storage', handleAuthChange)
        }
    }, [])

    const handleLogout = () => {
        logoutUser()
    }

    // Close mobile drawer on route change
    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [location.pathname])

    // Lock body scroll when sidebar drawer is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isMobileMenuOpen])

    return (
        <header className="sticky top-4 z-50 w-full px-2 sm:px-4">
            <nav className="w-[95%] xl:w-[92%] max-w-[1400px] mx-auto bg-[#000304]/85 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 rounded-2xl px-4 sm:px-6 py-3.5 transition-all duration-300">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo & Brand (no border, no box) */}
                    <Link to="/" className="flex items-center gap-3 group shrink-0">
                        <img
                            src={logo}
                            alt="Apollo Logo"
                            className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#0099ff] transition-colors">
                            Apollo<span className="text-[#0099ff]">Group</span>TV
                        </span>
                    </Link>

                    {/* Desktop NavLinks */}
                    <div className="hidden xl:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <DesktopNavItem key={link.to} {...link} />
                        ))}
                    </div>

                    {/* Desktop Action Buttons (Visible only on xl desktop alongside nav links) */}
                    <div className="hidden xl:flex items-center gap-3 shrink-0">
                        {currentUser ? (
                            <UserProfileDropdown currentUser={currentUser} />
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-6 py-3 text-base font-medium rounded-sm text-slate-200 hover:text-white hover:bg-white/[0.08] transition-all"
                                >
                                    Log In
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-6 py-3 text-base rounded-sm font-medium text-white hover:text-[#0099ff] bg-white/[0.06] hover:bg-white/[0.12] transition-all border border-white/10"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}

                        <Link
                            to="/get-trail"
                            className="px-7 py-3.5 text-base rounded-sm font-semibold text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-md shadow-[#0099ff]/25 hover:shadow-lg hover:shadow-[#0099ff]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2"
                        >
                            <span>Free Trial</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    </div>

                    {/* Mobile / Tablet Hamburger (Custom 3 thin bars animating to a cross) */}
                    <div className="flex xl:hidden items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-3 text-slate-200 hover:text-white hover:bg-white/[0.08] transition-colors focus:outline-none flex items-center justify-center group"
                            aria-label="Toggle navigation menu"
                            aria-expanded={isMobileMenuOpen}
                        >
                            <div className="w-6 h-4 flex flex-col justify-between items-end relative">
                                {/* Line 1: Full width -> Rotates +45deg to form cross */}
                                <span
                                    className={`h-[1.5px] rounded-full transition-all duration-300 ease-in-out origin-center ${isMobileMenuOpen
                                        ? 'w-6 rotate-45 translate-y-[7.25px] bg-[#0099ff]'
                                        : 'w-6 bg-slate-200 group-hover:bg-white'
                                        }`}
                                />
                                {/* Line 2: Shorter width -> Fades out & translates when clicked */}
                                <span
                                    className={`h-[1.5px] rounded-full transition-all duration-300 ease-in-out ${isMobileMenuOpen
                                        ? 'w-0 opacity-0 -translate-x-2'
                                        : 'w-3.5 bg-slate-200 group-hover:bg-white'
                                        }`}
                                />
                                {/* Line 3: Full width (same as Line 1) -> Rotates -45deg to form cross */}
                                <span
                                    className={`h-[1.5px] rounded-full transition-all duration-300 ease-in-out origin-center ${isMobileMenuOpen
                                        ? 'w-6 -rotate-45 -translate-y-[7.25px] bg-[#0099ff]'
                                        : 'w-6 bg-slate-200 group-hover:bg-white'
                                        }`}
                                />
                            </div>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Full-Screen Sidebar / Menu (Inspired by Reference Image) */}
            <div
                className={`fixed inset-0 bg-[#000304] z-[100] xl:hidden flex flex-col justify-between p-6 sm:p-8 overflow-y-auto transition-all duration-300 ease-in-out ${isMobileMenuOpen
                    ? 'opacity-100 translate-x-0 pointer-events-auto'
                    : 'opacity-0 translate-x-full pointer-events-none'
                    }`}
                aria-label="Mobile navigation menu"
            >
                {/* Top Bar: Apollo Group TV Logo + Close 'X' */}
                <div className="flex items-center justify-between w-full">
                    <Link
                        to="/"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex flex-col items-start group"
                    >
                        <img
                            src={logo}
                            alt="Apollo Group TV"
                            className="h-10 w-auto object-contain"
                        />
                        <span className="text-[11px] font-semibold text-[#0099ff] tracking-tight mt-1">
                            Apollo Group TV
                        </span>
                    </Link>

                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-2 text-white hover:text-slate-300 transition-colors focus:outline-none"
                        aria-label="Close menu"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Center Section: Centered Navigation Links (Mapped dynamically from navLinks array) */}
                <div className="flex-1 flex flex-col items-center justify-center space-y-6 sm:space-y-7 my-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.id}
                            to={link.to}
                            end={link.end}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={({ isActive }) =>
                                `text-2xl sm:text-3xl font-bold tracking-tight transition-colors ${isActive
                                    ? 'text-[#0099ff]'
                                    : 'text-white hover:text-[#0099ff]'
                                }`
                            }
                        >
                            {link.mobileLabel || link.label}
                        </NavLink>
                    ))}
                </div>

                {/* Bottom Buttons: Stacked */}
                <div className="w-full max-w-sm mx-auto space-y-3 pt-4">
                    {currentUser ? (
                        <>
                            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center gap-3.5 text-left">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#0066cc] via-[#0099ff] to-[#38bdf8] text-white flex items-center justify-center font-bold text-base shadow-md shadow-[#0099ff]/30 shrink-0">
                                    {(
                                        (currentUser.firstName?.[0] || '') +
                                        (currentUser.lastName?.[0] || currentUser.username?.[0] || 'U')
                                    ).toUpperCase()}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-white truncate">
                                        {currentUser.firstName
                                            ? `${currentUser.firstName} ${currentUser.lastName || ''}`.trim()
                                            : currentUser.username}
                                    </p>
                                    <p className="text-xs text-slate-400 truncate mb-1">
                                        {currentUser.email}
                                    </p>
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff] animate-pulse"></span>
                                        Active Customer
                                    </span>
                                </div>
                            </div>
                            <Link
                                to="/dashboard"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-3.5 rounded-xl bg-[#0099ff] hover:bg-[#0088ee] text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99]"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span>Go to Dashboard</span>
                            </Link>
                            <button
                                onClick={() => {
                                    handleLogout()
                                    setIsMobileMenuOpen(false)
                                }}
                                className="w-full py-3.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.99] border border-rose-500/20"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                                <span>Sign Out</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-3.5 rounded-xl bg-white text-[#0099ff] font-bold text-base flex items-center justify-center hover:bg-slate-100 transition-all shadow-md active:scale-[0.99]"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full py-3.5 rounded-xl bg-[#0099ff] text-white font-bold text-base flex items-center justify-center hover:bg-[#0088ee] transition-all shadow-md active:scale-[0.99]"
                            >
                                Create Account
                            </Link>
                        </>
                    )}

                    <Link
                        to="/get-trail"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="w-full py-3.5 rounded-xl bg-white text-[#0099ff] font-bold text-base flex items-center justify-center hover:bg-slate-100 transition-all shadow-md active:scale-[0.99]"
                    >
                        10 Days Free Trial
                    </Link>
                </div>
            </div>
        </header>
    )
}

export default Navbar