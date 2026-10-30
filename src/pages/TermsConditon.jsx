import React from 'react'
import SEO from '../components/common/SEO'
import { Link } from 'react-router-dom'

const TermsConditon = () => {
  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white pt-10 pb-20 lg:pt-14 lg:pb-28">
      <SEO
        title="Terms & Conditions | Apollo Group TV Service Agreement"
        description="Review the official Terms of Service and user agreement for Apollo Group TV subscriptions, multi-screen usage, and 7-day money-back guarantee."
        canonical="/terms-conditions"
      />

      <div className="w-[88%] lg:w-[80%] max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Agreement of Service
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Last Updated: October 30, 2026 • Effective Worldwide
          </p>
        </div>

        {/* Content Box */}
        <div className="p-6 sm:p-10 rounded-2xl bg-[#0c1015] border border-white/10 space-y-8 text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, registering an account, or subscribing to any package on Apollo Group TV ("Service"), you agree to be bound by these Terms and Conditions. If you do not agree to all terms, please refrain from using the Service.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              2. Subscription & Multi-Device Usage
            </h2>
            <p>
              Apollo Group TV subscriptions grant personal, non-commercial streaming rights. Subscriptions allow simultaneous streaming up to the screen allowance specified in your selected package (up to 5 concurrent streams). Sharing credentials publicly or redistributing feeds is strictly prohibited and subject to immediate account termination.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              3. 100% Contract-Free Guarantee
            </h2>
            <p>
              All Apollo Group TV subscriptions are entirely contract-free. There are no hidden setup fees, cancellation penalties, or automatic long-term lock-ins. You retain total control to renew or upgrade your plan whenever you choose.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              4. 7-Day Money-Back Guarantee
            </h2>
            <p>
              We stand behind our 99.9% server uptime and high-bitrate streaming quality. If our technical support team cannot resolve technical delivery issues within 7 calendar days of your initial purchase, you are entitled to a full refund upon request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              5. Service Availability & Bandwidth Recommendations
            </h2>
            <p>
              While our CDN network maintains 99.9% uptime with automated load balancing, optimal streaming performance requires a minimum stable broadband connection of 15 Mbps for Full HD and 30 Mbps for native 4K UHD. We are not liable for disruptions resulting from local ISP throttling or network outages.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              6. Modifications to Service
            </h2>
            <p>
              Apollo Group TV continuously improves its catalog, adding new channels, sports feeds, and daily VOD releases. We reserve the right to optimize channel lineups and server clusters to deliver the highest performance standards.
            </p>
          </section>

          <div className="pt-4 border-t border-white/10 flex flex-wrap gap-4 items-center justify-between text-xs text-slate-400">
            <span>Official Apollo Group TV Terms of Service</span>
            <Link to="/privacy-policy" className="text-[#0099ff] hover:underline font-semibold">
              Read Privacy Policy →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TermsConditon
