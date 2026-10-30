import React from 'react'
import SEO from '../components/common/SEO'
import { Link } from 'react-router-dom'

const TermsConditon = () => {
  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white py-14 sm:py-20">
      <SEO
        title="Terms & Conditions | Apollo Group TV"
        description="Review the official Terms of Service, subscription rules, multi-screen streaming allowance, and refund policy for Apollo Group TV."
        canonical="/terms-conditions"
      />

      <div className="w-[90%] sm:w-[85%] max-w-3xl mx-auto">
        {/* Simple Header */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <p className="text-xs font-semibold tracking-wider text-[#0099ff] uppercase mb-2">
            Agreement of Service
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Terms & Conditions
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: October 30, 2026 • Effective worldwide
          </p>
        </header>

        {/* Clean, Simple Content */}
        <article className="space-y-10 text-slate-300 text-base leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, registering an account, or purchasing any subscription from Apollo Group TV ("Service," "we," "us"), you agree to be legally bound by these Terms and Conditions and our Privacy Policy. If you do not accept all provisions set forth herein, you must discontinue your use of our website and services immediately.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              2. License Grant & Permitted Use
            </h2>
            <p>
              Apollo Group TV grants you a personal, non-exclusive, non-transferable, revocable license to access our streaming catalog solely for private, domestic, non-commercial entertainment.
            </p>
            <p>
              You agree not to broadcast, rebroadcast, publicly perform, commercially redistribute, resell, or share access credentials outside your household. Any unauthorized restreaming or redistribution of our service streams is strictly prohibited and results in immediate account suspension without refund.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              3. Multi-Device Connections
            </h2>
            <p>
              Each subscription allows simultaneous connections according to the package tier purchased (supporting up to 5 concurrent screens). While you may install and configure Apollo Group TV on multiple compatible devices (e.g., Firestick, Apple TV, Smart TV, Android phone, tablet, and PC), you must not exceed your purchased concurrent stream limit at any one time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              4. 100% Contract-Free Subscriptions
            </h2>
            <p>
              All subscription tiers on Apollo Group TV are 100% contract-free:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>There are no hidden activation fees, cancellation penalties, or multi-year lock-ins.</li>
              <li>You have full authority to renew, extend, or let your subscription lapse whenever you choose directly inside your customer portal.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              5. 7-Day Money-Back Guarantee & Refund Policy
            </h2>
            <p>
              We are committed to delivering premium streaming quality with 99.9% uptime. If you experience technical connectivity or provisioning issues that our 24/7 technical support team cannot resolve within 7 calendar days of your initial purchase, you are eligible for a 100% full refund upon written request.
            </p>
            <p>
              Refund requests submitted after the 7-day period or stemming from local customer-side broadband problems, third-party hardware incompatibility, or ISP throttling are considered on a case-by-case basis.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              6. Network & Bandwidth Requirements
            </h2>
            <p>
              To experience seamless high-definition and 4K UHD streaming without buffering:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>A stable internet speed of at least <strong className="text-white">15 Mbps</strong> is recommended for standard Full HD feeds.</li>
              <li>A stable internet speed of at least <strong className="text-white">30–50 Mbps</strong> is recommended for native 4K UHD and 60 FPS sports broadcasts.</li>
              <li>For optimum stability, connecting devices via Ethernet cable or 5GHz Wi-Fi is recommended over crowded 2.4GHz Wi-Fi bands.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              7. Payment Methods & Verification
            </h2>
            <p>
              We accept verified payment channels, including cryptocurrency (USDT TRC20, Bitcoin) and major debit/credit card options. You represent and warrant that you are authorized to use the designated payment method. All cryptocurrency payments must be made to the exact wallet address and network specified on your invoice to ensure automated activation.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              8. Channel Lineup & Catalog Availability
            </h2>
            <p>
              Apollo Group TV regularly enhances server clusters, refreshes VOD movie libraries, and updates live channel lineups. While we strive to maintain complete channel availability, specific channels or third-party broadcast feeds may be updated, replaced, or undergo brief maintenance to ensure server stability.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              9. Prohibited Conduct
            </h2>
            <p>
              You agree not to engage in any of the following activities:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Reverse engineering, decompiling, or attempting to extract source code from our player apps or API endpoints.</li>
              <li>Launching automated scraping scripts, DDoS attacks, or overloading our load balancers.</li>
              <li>Sharing or publishing login credentials, M3U URLs, or Xtream Codes on public forums or social media.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              10. Limitation of Liability
            </h2>
            <p>
              In no event shall Apollo Group TV, its operators, affiliates, or partners be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use of, or inability to use, our service, including network downtime or equipment failure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              11. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time. Continued use of the service following posted changes constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              12. Contact Information
            </h2>
            <p>
              For legal questions, inquiries regarding subscription agreements, or refund assistance, please connect with our 24/7 Live Support or submit a ticket through your customer dashboard.
            </p>
          </section>

          {/* Simple Bottom Navigation */}
          <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-400">
            <span>© 2026 Apollo Group TV. All rights reserved.</span>
            <Link
              to="/privacy-policy"
              className="text-[#0099ff] hover:text-[#38bdf8] transition-colors font-medium"
            >
              Read Privacy Policy →
            </Link>
          </footer>

        </article>
      </div>
    </div>
  )
}

export default TermsConditon
