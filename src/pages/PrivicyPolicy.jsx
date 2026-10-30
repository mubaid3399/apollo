import React from 'react'
import SEO from '../components/common/SEO'
import { Link } from 'react-router-dom'

const PrivicyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white py-14 sm:py-20">
      <SEO
        title="Privacy Policy | Apollo Group TV"
        description="Read Apollo Group TV's comprehensive Privacy Policy. Learn about our strict zero-logs architecture, data encryption standards, and GDPR compliance."
        canonical="/privacy-policy"
      />

      <div className="w-[90%] sm:w-[85%] max-w-3xl mx-auto">
        {/* Simple Header */}
        <header className="mb-12 border-b border-white/10 pb-8">
          <p className="text-xs font-semibold tracking-wider text-[#0099ff] uppercase mb-2">
            Legal & Compliance
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-400">
            Last updated: October 30, 2026 • Effective worldwide
          </p>
        </header>

        {/* Clean, Simple Content */}
        <article className="space-y-10 text-slate-300 text-base leading-relaxed">
          
          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              1. Introduction & Overview
            </h2>
            <p>
              Apollo Group TV ("we," "our," or "us") is dedicated to safeguarding the privacy and digital autonomy of every user who accesses our website, applications, and streaming services. This Privacy Policy details our data practices, how we collect and process information, and our commitment to absolute data transparency.
            </p>
            <p>
              By accessing or using Apollo Group TV services, you acknowledge that you have read, understood, and agreed to the practices described in this document.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              2. Strict Zero-Logs Architecture
            </h2>
            <p>
              Our infrastructure is engineered around a foundational <strong className="text-white">Zero-Logs Architecture</strong>. We firmly believe that your entertainment consumption is strictly private:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>We do <strong className="text-white">NOT</strong> record, monitor, or store what TV channels, sports events, video-on-demand movies, or series you stream.</li>
              <li>We do <strong className="text-white">NOT</strong> inspect or log your streaming connection timestamps, session lengths, or viewing habits.</li>
              <li>We do <strong className="text-white">NOT</strong> log your DNS queries or destination IP addresses.</li>
              <li>We never sell, rent, monetize, or disclose customer viewing activity to third-party data brokers, marketers, or advertisers.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              3. Information We Collect
            </h2>
            <p>
              We only collect the absolute minimum information required to create your account, activate service, and deliver reliable technical support:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong className="text-white">Account Identification:</strong> When registering, we collect your name, username, and email address. This is used exclusively to dispatch activation credentials, M3U playlists, Xtream Codes API parameters, and critical billing notifications.
              </li>
              <li>
                <strong className="text-white">Transaction Metadata:</strong> We store payment transaction identifiers (such as blockchain hash, invoice number, or order reference ID) for verification and subscription provisioning. We never store credit card numbers or banking passwords on our servers.
              </li>
              <li>
                <strong className="text-white">Customer Support Correspondence:</strong> If you reach out through our 24/7 ticket system or live chat, we retain the messages exchanged to assist you in troubleshooting setup issues.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              4. 256-Bit SSL/TLS Encryption Standards
            </h2>
            <p>
              All communication between your device (Smart TV, Firestick, mobile phone, computer) and our servers is encrypted using industry-standard 256-bit SSL/TLS cryptographic protocols. This end-to-end encryption ensures that your credentials, playlists, and communication streams remain entirely protected from unauthorized interception, ISP bandwidth throttling, or packet inspection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              5. Cookies & Local Storage
            </h2>
            <p>
              Our website uses strictly necessary cookies and browser local storage only to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>Keep you securely logged into your customer portal across sessions.</li>
              <li>Remember display preferences, language options, and shopping cart states.</li>
            </ul>
            <p>
              We do not use invasive third-party cross-site tracking cookies. You may disable cookies through your browser settings at any time, although doing so may require you to re-enter your credentials on each visit.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              6. Third-Party Processors & External Links
            </h2>
            <p>
              We partner with trusted payment gateways and cryptocurrency networks (USDT TRC20, Bitcoin) to safely process transactions. These independent processors adhere to stringent global security standards. Our site may also provide links to setup guides and media players (such as Downloader, Golden Smart, Z Player); we recommend reviewing their independent privacy terms upon downloading.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              7. Your GDPR & CCPA Rights
            </h2>
            <p>
              Regardless of your country of residence, we extend comprehensive privacy controls to all customers:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li><strong className="text-white">Right of Access:</strong> Request a complete summary of personal account data we hold for you.</li>
              <li><strong className="text-white">Right to Rectification:</strong> Request corrections or updates to inaccurate details.</li>
              <li><strong className="text-white">Right to Erasure ("Right to Be Forgotten"):</strong> Request immediate and permanent deletion of your account and related records from our databases.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              8. Children's Privacy
            </h2>
            <p>
              Our services are intended strictly for individuals aged 18 and older. We do not knowingly collect or solicit personal information from children under the age of 13. If you believe a minor has registered an account, contact us immediately so we can promptly delete the account.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              9. Policy Revisions
            </h2>
            <p>
              We may occasionally update this Privacy Policy to reflect technical improvements, legal obligations, or new features. When changes are made, the "Last Updated" date at the top of this document will be updated accordingly.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              10. Contact Us
            </h2>
            <p>
              If you have any questions, comments, or data erasure requests concerning this Privacy Policy, please reach out to our privacy compliance desk through our 24/7 Live Support or customer portal.
            </p>
          </section>

          {/* Simple Bottom Navigation */}
          <footer className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-400">
            <span>© 2026 Apollo Group TV. All rights reserved.</span>
            <Link
              to="/terms-conditions"
              className="text-[#0099ff] hover:text-[#38bdf8] transition-colors font-medium"
            >
              Read Terms & Conditions →
            </Link>
          </footer>

        </article>
      </div>
    </div>
  )
}

export default PrivicyPolicy
