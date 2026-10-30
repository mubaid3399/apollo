import React from 'react'
import SEO from '../components/common/SEO'
import { Link } from 'react-router-dom'

const PrivicyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      <SEO
        title="Privacy Policy | Apollo Group TV"
        description="Read Apollo Group TV's comprehensive Privacy Policy. Learn about our zero-logs policy, data encryption standards, and GDPR compliance."
        canonical="/privacy-policy"
      />

      <div className="w-[88%] lg:w-[80%] max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Legal & Compliance
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: October 30, 2026 • Effective Worldwide
          </p>
        </div>

        {/* Content Box */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#0c1015] border border-white/10 space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              1. Commitment to Customer Privacy & Zero Logs
            </h2>
            <p>
              At Apollo Group TV ("Apollo", "we", "our", or "us"), protecting your personal privacy is a founding principle. We operate under a strict <strong className="text-white">Zero-Logs Architecture</strong>. We do not inspect, log, store, or monitor what channels, movies, sports, or on-demand content you stream. Your entertainment consumption belongs strictly to you.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              2. Information We Collect
            </h2>
            <p>
              We collect only the minimal data strictly required to provision, authenticate, and support your subscription:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-300">
              <li><strong className="text-white">Account Details:</strong> Name, username, and valid email address used to dispatch your M3U / Xtream Codes API activation credentials.</li>
              <li><strong className="text-white">Payment Verification:</strong> Transaction reference IDs for subscription validation. We never collect or store full credit card numbers or banking passwords on our servers.</li>
              <li><strong className="text-white">Technical Support Logs:</strong> Temporary error logs generated during customer support troubleshooting sessions, deleted immediately upon ticket resolution.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              3. 256-Bit SSL/TLS Encryption
            </h2>
            <p>
              All interactions between your web browser or streaming device and Apollo Group TV are protected via military-grade 256-bit SSL/TLS cryptographic encryption. This prevents ISP throttling, third-party packet sniffing, and unauthorized middleman inspection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              4. Cookies & Web Tracking
            </h2>
            <p>
              We use strictly necessary session cookies and local storage tokens to remember your login session and device preferences. We do not sell, rent, or trade your personal information to third-party data brokers or marketing networks.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              5. Your GDPR & CCPA Rights
            </h2>
            <p>
              Regardless of your geographical location, you have the right to request a full copy of your account data, request immediate deletion (right to be forgotten), or update your preferences at any time by contacting our 24/7 support desk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              6. Contact Support
            </h2>
            <p>
              For inquiries regarding this Privacy Policy or data security, please contact our privacy compliance team via our 24/7 Live Chat or email support.
            </p>
          </section>

          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-400">
            <span>Official Apollo Group TV Security Document</span>
            <Link to="/terms-conditions" className="text-[#0099ff] hover:underline font-semibold">
              View Terms & Conditions →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivicyPolicy
