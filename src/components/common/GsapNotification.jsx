import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Global helper to trigger the GSAP Pill Notification from anywhere in the app
 * @param {string} message - Text to display
 * @param {'success' | 'error' | 'info'} type - Type of notification
 * @param {number} duration - Auto-dismiss delay in ms (default: 3500)
 */
export const showNotification = (message, type = 'success', duration = 3500) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('apollo_gsap_notification', {
        detail: {
          id: Date.now(),
          message,
          type,
          duration,
        },
      })
    )
  }
}

const GsapNotification = () => {
  const [current, setCurrent] = useState(null)
  const pillRef = useRef(null)
  const iconRef = useRef(null)
  const timerRef = useRef(null)

  // Listen to incoming notification events
  useEffect(() => {
    const handleNotify = (e) => {
      const data = e.detail
      if (!data || !data.message) return

      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      setCurrent(data)
    }

    window.addEventListener('apollo_gsap_notification', handleNotify)
    return () => {
      window.removeEventListener('apollo_gsap_notification', handleNotify)
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  // Animate Entrance when current changes
  useEffect(() => {
    if (!current || !pillRef.current) return

    const pill = pillRef.current
    const icon = iconRef.current

    // Entrance Animation (Springy drop down from top)
    const tl = gsap.timeline()

    tl.fromTo(
      pill,
      {
        y: -90,
        opacity: 0,
        scale: 0.88,
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.55,
        ease: 'back.out(1.5)',
      }
    )

    if (icon) {
      tl.fromTo(
        icon,
        {
          scale: 0,
          rotation: -45,
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.4,
          ease: 'back.out(2)',
        },
        '-=0.3'
      )
    }

    // Auto dismiss timer
    const autoCloseTime = current.duration || 3500
    timerRef.current = setTimeout(() => {
      dismissNotification()
    }, autoCloseTime)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current])

  const dismissNotification = () => {
    if (!pillRef.current) {
      setCurrent(null)
      return
    }

    // Exit Animation (Smooth slide back up)
    gsap.to(pillRef.current, {
      y: -80,
      opacity: 0,
      scale: 0.92,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(null)
      },
    })
  }

  if (!current) return null

  const isSuccess = current.type === 'success'
  const isError = current.type === 'error'

  return (
    <div
      className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-[99999] pointer-events-auto px-3 sm:px-4 w-full sm:w-auto max-w-[96vw] sm:max-w-xl flex justify-center"
      role="alert"
    >
      <div
        ref={pillRef}
        className="w-full sm:w-auto min-w-[280px] max-w-full bg-white text-slate-800 px-4 sm:px-6 py-2.5 sm:py-3.5 rounded-2xl sm:rounded-full shadow-[0_16px_50px_-5px_rgba(0,0,0,0.5)] border border-slate-200/90 flex items-center gap-3 sm:gap-3.5 backdrop-blur-md"
      >
        {/* Left Icon Badge */}
        <div
          ref={iconRef}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
            isSuccess
              ? 'bg-[#00d68f] text-white'
              : isError
              ? 'bg-rose-500 text-white'
              : 'bg-[#0099ff] text-white'
          }`}
        >
          {isSuccess ? (
            <svg
              className="w-4 h-4 sm:w-[18px] sm:h-[18px] stroke-[3] stroke-white fill-none"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          ) : isError ? (
            <svg
              className="w-4 h-4 sm:w-4 sm:h-4 stroke-[3] stroke-white fill-none"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-4 h-4 sm:w-4 sm:h-4 stroke-[2.5] stroke-white fill-none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg>
          )}
        </div>

        {/* Message Text */}
        <span className="flex-1 min-w-0 text-xs sm:text-sm md:text-[14px] font-semibold text-slate-800 tracking-tight leading-snug">
          {current.message}
        </span>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={dismissNotification}
          className="shrink-0 text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full focus:outline-none -mr-1"
          aria-label="Dismiss notification"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default GsapNotification

