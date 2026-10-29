import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const faqsData = [
  {
    question: 'What is Apollo Group TV and how does it work?',
    answer:
      'Apollo Group TV is a next-generation IPTV streaming service that delivers over 20,000 live television channels, PPV events, sports broadcasts, and an on-demand library of 500,000+ movies and series directly over your internet connection without requiring any satellite dish or traditional cable setup.',
  },
  {
    question: 'Which devices and operating systems are supported?',
    answer:
      'Apollo Group TV is fully compatible with Amazon Firestick & Fire TV, Android TV boxes, Smart TVs (Samsung, LG, Sony), Apple TV, iOS (iPhone and iPad), Android phones/tablets, Windows PC, macOS, and popular IPTV player apps like Tivimate and IPTV Smarters.',
  },
  {
    question: 'How fast does my internet connection need to be for 4K streaming?',
    answer:
      'For smooth Full HD (1080p) streaming, a stable download speed of 15 Mbps is recommended. For Ultra HD 4K streaming and high-frame-rate live sports events without buffering or freezes, we recommend 30 Mbps or faster broadband.',
  },
  {
    question: 'How many screens or devices can stream simultaneously?',
    answer:
      'Depending on your selected subscription plan, you can stream on up to 2 concurrent devices at the same time. You can also sign in to your Apollo Group TV account across all your personal devices and switch seamlessly between them.',
  },
  {
    question: 'Do I need to sign a contract or commit to automatic renewals?',
    answer:
      'No. All Apollo Group TV packages are 100% contract-free with transparent, no-nonsense pricing. You pay only for the term you select (1 Year, 2 Years, 5 Years, or Lifetime) with zero automatic renewals or hidden fees.',
  },
  {
    question: 'How quickly will I receive my account login details after ordering?',
    answer:
      'Activation is instantaneous. Immediately upon order completion, your account details (username, password, and portal/M3U playlist link) are dispatched to your email and via 24/7 WhatsApp support so you can start watching right away.',
  },
  {
    question: 'Can I get a free trial before making a payment?',
    answer:
      'Yes! We provide risk-free trials so you can evaluate the channel selection, server response times, and 4K video quality before purchasing. Visit our Get Trial page to request your trial credentials.',
  },
  {
    question: 'What sports channels and Pay-Per-View (PPV) events are included?',
    answer:
      'You get full access to international live sports networks including Premier League, Champions League, NFL Sunday Ticket, NBA League Pass, NHL Center Ice, MLB, Formula 1, and all major UFC / Boxing PPV fights at no extra charge.',
  },
  {
    question: 'Can I use Apollo Group TV while traveling abroad or with a VPN?',
    answer:
      'Yes. Apollo Group TV operates worldwide anywhere you have internet access. If you travel internationally or prefer using a VPN for personal privacy, our servers are fully VPN-friendly with no geo-restrictions.',
  },
  {
    question: 'How do I contact customer support if I need assistance?',
    answer:
      'Our dedicated customer service team is on standby 24/7 via WhatsApp chat, Telegram, and email. Whether you need step-by-step installation instructions or account updates, we are here to help.',
  },
]

const FaqItem = ({ faq, isOpen, onToggle, index }) => {
  const contentRef = useRef(null)
  const iconRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const content = contentRef.current
    const icon = iconRef.current

    if (isFirstRender.current) {
      isFirstRender.current = false
      if (isOpen) {
        gsap.set(content, { height: 'auto', opacity: 1 })
        gsap.set(icon, { rotate: 45 })
      } else {
        gsap.set(content, { height: 0, opacity: 0 })
        gsap.set(icon, { rotate: 0 })
      }
      return
    }

    if (isOpen) {
      // Animate Open with GSAP
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      )
      // Rotate Plus into Cross (✕)
      gsap.to(icon, {
        rotate: 45,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    } else {
      // Animate Close with GSAP
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
      })
      // Rotate Cross back to Plus (+)
      gsap.to(icon, {
        rotate: 0,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
      })
    }

    return () => {
      gsap.killTweensOf([content, icon])
    }
  }, [isOpen])

  return (
    <div
      className={`rounded-xl transition-all duration-300 border ${
        isOpen
          ? 'bg-white/[0.05] border-[#0099ff]/50 shadow-[0_4px_20px_rgba(0,153,255,0.08)]'
          : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
      >
        <span
          className={`text-base sm:text-lg font-semibold tracking-tight transition-colors ${
            isOpen ? 'text-[#0099ff]' : 'text-white group-hover:text-slate-200'
          }`}
        >
          {faq.question}
        </span>

        {/* Plus / Cross Animated SVG Icon */}
        <div
          ref={iconRef}
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
            isOpen
              ? 'bg-[#0099ff]/15 border-[#0099ff] text-[#0099ff]'
              : 'bg-white/[0.05] border-white/10 text-slate-300 group-hover:text-white group-hover:border-white/25'
          }`}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Horizontal Line */}
            <line x1="5" y1="12" x2="19" y2="12" />
            {/* Vertical Line */}
            <line x1="12" y1="5" x2="12" y2="19" />
          </svg>
        </div>
      </button>

      {/* Accordion Content animated by GSAP */}
      <div ref={contentRef} className="overflow-hidden">
        <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed font-normal border-t border-white/5">
          {faq.answer}
        </div>
      </div>
    </div>
  )
}

const FaqsSection = () => {
  const [openIndex, setOpenIndex] = useState(0) // Default first FAQ open

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5 bg-[#000304]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0099ff]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Centered Container matching site width */}
      <div className="w-[88%] lg:w-[80%] max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Frequently Asked Questions
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold text-white tracking-tight leading-tight">
            Got Questions? We Have Answers
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Find everything you need to know about setting up, streaming, and managing your Apollo Group TV subscription.
          </p>
        </div>

        {/* 10 FAQs Accordion List */}
        <div className="space-y-4">
          {faqsData.map((faq, index) => (
            <FaqItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FaqsSection

