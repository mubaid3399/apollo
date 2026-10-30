import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import gsap from 'gsap'
import logo from '../../assets/logo.png'

const PageLoader = () => {
  const location = useLocation()
  const [visible, setVisible] = useState(true)
  const containerRef = useRef(null)
  const progressBarRef = useRef(null)
  const contentRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    // Show loader on route change or initial load
    setVisible(true)

    const ctx = gsap.context(() => {
      // Progress bar animation across the top
      gsap.killTweensOf(progressBarRef.current)
      gsap.fromTo(
        progressBarRef.current,
        { width: '0%', opacity: 1 },
        {
          width: '75%',
          duration: 0.35,
          ease: 'power2.out',
        }
      )

      // Content fade in
      if (contentRef.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, scale: 0.95 },
          { opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
        )
      }

      // Smooth finish & fade out after 450ms
      const timer = setTimeout(() => {
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            width: '100%',
            duration: 0.2,
            ease: 'power1.inOut',
            onComplete: () => {
              if (containerRef.current) {
                gsap.to(containerRef.current, {
                  opacity: 0,
                  duration: 0.25,
                  ease: 'power2.out',
                  onComplete: () => {
                    setVisible(false)
                  },
                })
              } else {
                setVisible(false)
              }
            },
          })
        } else {
          setVisible(false)
        }
      }, isFirstRender.current ? 600 : 420)

      isFirstRender.current = false

      return () => clearTimeout(timer)
    }, containerRef)

    return () => {
      ctx.revert()
    }
  }, [location.pathname, location.search])

  if (!visible) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000304]/90 backdrop-blur-md transition-opacity select-none pointer-events-auto"
      style={{ opacity: 1 }}
      aria-label="Loading page..."
    >
      {/* Top glowing progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/[0.05] z-[10000] overflow-hidden">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-[#0066cc] via-[#0099ff] to-[#38bdf8] shadow-[0_0_12px_#0099ff]"
          style={{ width: '0%' }}
        />
      </div>

      {/* Center glowing logo & spinner */}
      <div ref={contentRef} className="flex flex-col items-center gap-5">
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsing Glow */}
          <div className="absolute -inset-4 rounded-full bg-[#0099ff]/20 blur-xl animate-pulse" />

          {/* Sleek Spinning Ring */}
          <div className="w-20 h-20 rounded-full border-2 border-white/10 border-t-[#0099ff] border-r-[#0099ff]/60 animate-spin" />

          {/* Apollo Logo Inside Ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Apollo Loading"
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,153,255,0.6)] animate-pulse"
            />
          </div>
        </div>

        {/* Text & Dots */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            <span>Loading</span>
            <span className="flex gap-1 ml-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff] animate-bounce" />
            </span>
          </div>
          <span className="text-[11px] text-slate-500 tracking-wider font-medium">
            Apollo Group TV
          </span>
        </div>
      </div>
    </div>
  )
}

export const PageFallbackLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#000304]/90 backdrop-blur-md select-none">
      <div className="fixed top-0 left-0 right-0 h-1 bg-white/[0.05] z-[10000] overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-[#0066cc] via-[#0099ff] to-[#38bdf8] shadow-[0_0_12px_#0099ff] animate-pulse" />
      </div>
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-4 rounded-full bg-[#0099ff]/20 blur-xl animate-pulse" />
          <div className="w-20 h-20 rounded-full border-2 border-white/10 border-t-[#0099ff] border-r-[#0099ff]/60 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src={logo}
              alt="Apollo Loading"
              className="w-10 h-10 object-contain drop-shadow-[0_0_10px_rgba(0,153,255,0.6)] animate-pulse"
            />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-slate-300">
            <span>Loading</span>
            <span className="flex gap-1 ml-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff] animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff] animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#0099ff] animate-bounce" />
            </span>
          </div>
          <span className="text-[11px] text-slate-500 tracking-wider font-medium">
            Apollo Group TV
          </span>
        </div>
      </div>
    </div>
  )
}

export default PageLoader
