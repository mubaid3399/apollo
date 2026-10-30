import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const pricingFaqsData = [
  {
    question: 'Are there any hidden fees, equipment rentals, or activation costs?',
    answer:
      'Absolutely not. All Apollo Group TV packages are 100% transparent and all-inclusive. You will never be charged for equipment rentals, broadcast surcharges, or hidden activation fees. What you see is exactly what you pay.',
  },
  {
    question: 'What payment methods do you accept for subscriptions?',
    answer:
      'We accept all major Credit and Debit Cards (Visa, MasterCard, American Express, Discover), PayPal, and popular Cryptocurrencies (Bitcoin, USDT, Ethereum) for fast, secure, and private checkout.',
  },
  {
    question: 'Will my subscription automatically renew or bill my card?',
    answer:
      'No. All Apollo Group TV plans operate on a strictly manual renewal model. We never store recurring billing authorizations or charge your payment method automatically without your explicit instruction. We will send a reminder before your term ends.',
  },
  {
    question: 'Is there a refund policy or money-back guarantee?',
    answer:
      'Yes! We provide a 7-day money-back guarantee on all subscription plans. If our technical team cannot resolve an issue to your satisfaction, you are entitled to a hassle-free full refund.',
  },
  {
    question: 'Can I upgrade my plan to a longer term or add more screens later?',
    answer:
      'Yes. You can upgrade from Starter (30 Days) to Growth (90 Days), Elite (180 Days), or Professional (365 Days) at any point. Your remaining balance will be applied directly as credit toward your new package.',
  },
  {
    question: 'How does the 49% discount on the Professional (365 Days) package work?',
    answer:
      'Our 1-Year Professional package is billed at $159.99 upfront, which brings your effective monthly cost down to just $13.33/month—saving you over 49% compared to purchasing single 30-day plans month over month.',
  },
  {
    question: 'Do I need to pay extra for UFC, Boxing, or Sports PPV events?',
    answer:
      'No, every single Pay-Per-View sporting event—including UFC numbered fight cards, major boxing title fights, WWE, AEW, and Formula 1 races—is 100% included in all packages at zero additional cost.',
  },
  {
    question: 'How quickly will I receive my streaming credentials after payment?',
    answer:
      'Account delivery is instant and fully automated. Within 60 seconds of checkout, your Xtream Codes API details, M3U playlist link, and setup instructions will be sent to your email and WhatsApp support.',
  },
  {
    question: 'Can I test the service with a free trial before paying?',
    answer:
      'Yes, we encourage you to try our risk-free 10-day trial to experience our 4K video quality, server response speed, and live channel stability before selecting a plan. Visit our Get Trial page to get started.',
  },
  {
    question: 'What happens when my subscription period ends?',
    answer:
      'When your term expires, your service will simply pause. There are no cancellation fees, late fees, or penalties. You can reactivate your account whenever you are ready to stream again.',
  },
]

const PricingFaqItem = ({ faq, isOpen, onToggle }) => {
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
      gsap.to(icon, {
        rotate: 45,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: 0.25,
        ease: 'power2.in',
        overwrite: 'auto',
      })
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
        className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left cursor-pointer select-none group"
      >
        <span
          className={`text-sm sm:text-base font-semibold tracking-tight transition-colors ${
            isOpen ? 'text-[#0099ff]' : 'text-white group-hover:text-slate-200'
          }`}
        >
          {faq.question}
        </span>

        {/* Plus / Cross Animated SVG Icon */}
        <div
          ref={iconRef}
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 border transition-colors ${
            isOpen
              ? 'bg-[#0099ff]/15 border-[#0099ff] text-[#0099ff]'
              : 'bg-white/[0.05] border-white/10 text-slate-300 group-hover:text-white group-hover:border-white/25'
          }`}
        >
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12" />
            <line x1="12" y1="5" x2="12" y2="19" />
          </svg>
        </div>
      </button>

      {/* Accordion Content animated by GSAP */}
      <div ref={contentRef} className="overflow-hidden">
        <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal border-t border-white/5">
          {faq.answer}
        </div>
      </div>
    </div>
  )
}

const PricingFaqs = () => {
  const [openIndex, setOpenIndex] = useState(0) // Default first FAQ open

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index)
  }

  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5 bg-[#000304]">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0099ff]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Container */}
      <div className="w-[88%] lg:w-[80%] max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Pricing & Billing Questions
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
            Frequently Asked Questions About Our Pricing
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Clear, upfront information about payment methods, subscriptions, guarantees, and activation.
          </p>
        </div>

        {/* 10 Pricing FAQs Accordion List */}
        <div className="space-y-3.5">
          {pricingFaqsData.map((faq, index) => (
            <PricingFaqItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingFaqs

