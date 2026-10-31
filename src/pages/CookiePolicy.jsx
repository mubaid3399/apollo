import React from 'react'
import SEO from '../components/common/SEO'
import { Link } from 'react-router-dom'

const CookiePolicy = () => {
  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white py-14 sm:py-20">
      <SEO
        title="Cookie Policy | Apollo Group TV"
        description="Learn how Apollo Group TV uses strictly necessary cookies and local storage to deliver secure, seamless streaming without invasive third-party tracking."
        canonical="/cookies"
      />

      <div className="w-[90%] sm:w-[85%] max-w-3xl mx-auto">
        {/* Simple Header */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <p className="text-xs font-semibold tracking-wider text-[#0099ff] uppercase mb-2">
            Legal & Compliance
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Cookie Policy
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: October 30, 2026 • Effective worldwide
          </p>
        </header>

        {/* Clean, Simple Content */}
        <article className="space-y-10 text-slate-300 text-base leading-relaxed">

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              1. What Are Cookies?
            </h2>
            <p>
              Cookies are small data files placed on your computer, smartphone, or streaming device when you visit a website. Cookies are widely used by online service providers to enable website functionality, enhance security, remember user preferences, and provide analytical insights.
            </p>
            <p>
              Similar technologies include <strong className="text-white">Local Storage</strong>, <strong className="text-white">Session Storage</strong>, and web beacons, which store key-value data directly in your browser without transmitting sensitive identity files across servers.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              2. Our Privacy-First Cookie Philosophy
            </h2>
            <p>
              Apollo Group TV operates under a strict privacy-first architecture. We do <strong className="text-white">NOT</strong> use intrusive third-party advertising cookies, cross-site trackers, or data-broker surveillance pixels.
            </p>
            <p>
              Cookies on Apollo Group TV are used almost exclusively for <strong className="text-white">Strictly Necessary</strong> and functional purposes to ensure that your customer dashboard, active subscription status, and secure authentication operate reliably.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              3. Categories of Cookies We Use
            </h2>
            <div className="space-y-6 pt-2">

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  A. Strictly Necessary & Authentication Cookies
                </h3>
                <p>
                  These cookies are vital for you to navigate our website and use essential features. Without these cookies, services like customer login, authentication tokens, and billing checkout cannot function.
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-300 text-sm">
                  <li><strong className="text-white">Session Tokens:</strong> Secure cryptographic hashes that verify you are signed into your Apollo customer account.</li>
                  <li><strong className="text-white">Security & Anti-Fraud:</strong> Tokens designed to prevent Cross-Site Request Forgery (CSRF) and brute-force login attempts.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  B. Functional & Preference Cookies
                </h3>
                <p>
                  These cookies allow our website to remember choices you make (such as your chosen device platform, theme preferences, or language) to provide a personalized experience:
                </p>
                <ul className="list-disc pl-6 space-y-1.5 text-slate-300 text-sm">
                  <li><strong className="text-white">Device Selections:</strong> Remembering whether you stream on Amazon Firestick, Apple TV, Smart TV, or Android.</li>
                  <li><strong className="text-white">Display Preferences:</strong> Preserving layout states and collapsed sidebars.</li>
                </ul>
              </div>

              <div className="space-y-2">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  C. Performance & Reliability Diagnostics
                </h3>
                <p>
                  We utilize lightweight, anonymous telemetry cookies to monitor server health, connection latency, and CDN load distribution. These cookies collect strictly aggregated, anonymized metrics and never track individual viewing behavior or search histories.
                </p>
              </div>

            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              4. Cookies We Do NOT Use
            </h2>
            <p>
              To maintain absolute transparency with our community, here is what we never deploy:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>We do <strong className="text-white">NOT</strong> track your stream consumption, channel browsing, or movie watchlist via cookies.</li>
              <li>We do <strong className="text-white">NOT</strong> use behavioral advertising tracking cookies (e.g., Meta Pixel, ad retargeting networks).</li>
              <li>We do <strong className="text-white">NOT</strong> sell, trade, or share cookie identifiers with any advertising exchange or third-party marketing agency.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              5. Third-Party Services
            </h2>
            <p>
              Some essential integrations on our website may set cookies managed by verified partners:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li><strong className="text-white">Cloudflare / CDN Security:</strong> Used to protect our streaming network from automated DDoS attacks and bot traffic.</li>
              <li><strong className="text-white">Cryptocurrency Payment Processors:</strong> Temporary session cookies to confirm blockchain payment receipts and generate dynamic QR codes.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              6. How Can You Control & Delete Cookies?
            </h2>
            <p>
              You possess complete control over whether to accept or decline cookies. Most web browsers automatically accept cookies by default, but you can modify your browser settings to decline or clear them at any time:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li><strong className="text-white">Google Chrome:</strong> Settings → Privacy and security → Third-party cookies.</li>
              <li><strong className="text-white">Mozilla Firefox:</strong> Settings → Privacy & Security → Enhanced Tracking Protection.</li>
              <li><strong className="text-white">Apple Safari:</strong> Preferences → Privacy → Manage Website Data.</li>
              <li><strong className="text-white">Microsoft Edge:</strong> Settings → Cookies and site permissions → Manage and delete cookies.</li>
            </ul>
            <p className="text-sm text-slate-400">
              Please note that disabling strictly necessary session cookies may prevent you from logging into your customer dashboard or accessing player download credentials.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              7. Updates to This Cookie Policy
            </h2>
            <p>
              We may revise this Cookie Policy periodically to reflect technological advancements, operational improvements, or regulatory updates. Any changes will become effective immediately upon posting to this URL.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              8. Contact Us
            </h2>
            <p>
              If you have any questions or feedback regarding our cookie management and privacy protocols, please contact our support team through our 24/7 Live Support or customer portal.
            </p>
          </section>

          {/* Simple Bottom Navigation */}
          <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-400">
            <span>© 2026 Apollo Group TV. All rights reserved.</span>
            <div className="flex items-center gap-4">
              <Link
                to="/privacy-policy"
                className="text-[#0099ff] hover:text-[#38bdf8] transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              <span className="text-slate-600">•</span>
              <Link
                to="/terms-conditions"
                className="text-[#0099ff] hover:text-[#38bdf8] transition-colors font-medium"
              >
                Terms & Conditions
              </Link>
            </div>
          </footer>

        </article>
      </div>
    </div>
  )
}

export default CookiePolicy

