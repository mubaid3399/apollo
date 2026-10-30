import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import aboutMainImg from '../assets/about-main.webp'
import aboutVideoImg from '../assets/about-video.webp'

const values = [
  {
    icon: 'ph-lightning-bold',
    title: 'Uncompromised 4K Quality',
    description:
      'We never downscale or overly compress video feeds. Our high-bitrate 60FPS streams deliver cinema-grade clarity and razor-sharp sports motion directly to your living room.',
  },
  {
    icon: 'ph-globe-hemisphere-west-bold',
    title: 'True Streaming Freedom',
    description:
      'No proprietary cable boxes, no geo-restrictions, and no single-IP locks. Stream seamlessly on Firestick, Apple TV, Android, Smart TVs, or your smartphone anywhere on Earth.',
  },
  {
    icon: 'ph-shield-check-bold',
    title: 'Zero Logs & Total Privacy',
    description:
      'Your streaming activity is protected with end-to-end 256-bit encryption. We maintain a strict zero-logs policy, shielding your entertainment from ISP throttling and surveillance.',
  },
  {
    icon: 'ph-headset-bold',
    title: '24/7 Human-First Support',
    description:
      'We don’t hide behind automated robot scripts. Our technical support specialists are active 24/7 on WhatsApp, Telegram, and live chat to assist with device setup and troubleshooting.',
  },
]

const milestones = [
  {
    year: '2018',
    title: 'The Foundation',
    desc: 'Founded by senior telecommunication engineers tired of bloated $160/mo cable bills and fragmented streaming apps.',
  },
  {
    year: '2020',
    title: 'Anti-Freeze™ CDN Launch',
    desc: 'Deployed proprietary load-balanced server clusters across Frankfurt, London, and New York to eliminate buffering during live sports finals.',
  },
  {
    year: '2023',
    title: '100,000 Active Households',
    desc: 'Crossed the milestone of 100,000 active subscribers worldwide, expanding our on-demand cinema archive to over 100,000 titles.',
  },
  {
    year: '2026',
    title: 'Next-Gen 4K/60FPS Network',
    desc: 'Upgraded infrastructure to 10Gbps dedicated fiber backbones supporting 20,000+ live global channels and instant automated activation.',
  },
]

const aboutFaqs = [
  {
    question: 'What is the vision behind Apollo Group TV?',
    answer:
      'Apollo Group TV was built on a simple vision: to eliminate the monopoly of overpriced cable providers and fragmented subscription apps. We believe viewers deserve universal access to live global sports, news, and cinema under one transparent, contract-free subscription.',
  },
  {
    question: 'How does Apollo Group TV maintain 99.99% server uptime during big events?',
    answer:
      'Unlike budget IPTV resellers using cheap shared servers, Apollo Group TV owns and operates dedicated 10Gbps CDN clusters in North America, Europe, and Asia. When millions tune into high-stakes sports finals like the Super Bowl or UFC, our automated traffic director balances the load to prevent lag and buffer loops.',
  },
  {
    question: 'Is Apollo Group TV friendly for international travelers and expats?',
    answer:
      'Yes! Apollo Group TV works worldwide anywhere you have internet connection. We enforce no IP locks or geo-blocks, and our network is 100% compatible with major VPN providers like ExpressVPN, Surfshark, and NordVPN.',
  },
  {
    question: 'What is your refund and customer satisfaction policy?',
    answer:
      'We offer an unconditional 7-day money-back guarantee on all subscription plans. If you experience technical problems our 24/7 technical team cannot resolve, you are entitled to a full refund.',
  },
]

const About = () => {
  const [openFaq, setOpenFaq] = useState(0)

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    mainEntity: {
      '@type': 'Organization',
      name: 'Apollo Group TV',
      url: 'https://apollogroup-tv.xyz',
      description:
        'Apollo Group TV is a premier global entertainment network delivering 20,000+ live HD/4K channels, 100,000+ VOD movies, and PPV sports to over 150,000 active subscribers worldwide.',
    },
  }

  return (
    <div className="w-full bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white">
      <SEO
        title="About Apollo Group TV | Vision, Mission & Global IPTV Network"
        description="Learn about Apollo Group TV, our 10Gbps dedicated server backbone, zero-logs privacy architecture, and mission to deliver contract-free 4K streaming worldwide."
        canonical="/about"
        schema={aboutSchema}
      />
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO HEADER WITH EXACT HERO H1 TYPOGRAPHY                  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-white/5">
        {/* Ambient Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0099ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="w-[88%] lg:w-[80%] mx-auto text-center space-y-6">


          {/* Exact Hero H1 Typography */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18] max-w-4xl mx-auto">
            Redefining How the World Experiences Television &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] via-[#4db8ff] to-[#80ccff]">
              Live Entertainment
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Founded on the belief that premium television should be borderless, contract-free, and affordable. Apollo Group TV empowers over 150,000 households across 90+ countries with uncompromised 4K streaming.
          </p>

          {/* Key Stat Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 sm:pt-14 max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 rounded-sm bg-white/[0.02] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">150,000+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Active Subscribers</div>
            </div>
            <div className="p-4 sm:p-5 rounded-sm bg-white/[0.02] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">99.99%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Anti-Freeze Uptime SLA</div>
            </div>
            <div className="p-4 sm:p-5 rounded-sm bg-white/[0.02] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">20,000+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Live HD & 4K Channels</div>
            </div>
            <div className="p-4 sm:p-5 rounded-sm bg-white/[0.02] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">90+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Countries Reached</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. OUR STORY & MISSION (SPLIT MEDIA + EDITORIAL)             */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 overflow-hidden">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Column: Visual Media with ambient glow */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#090d12] group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#0099ff]/30 to-transparent blur-xl pointer-events-none -z-10" />
                <img
                  src={aboutMainImg}
                  alt="Apollo Group TV Mission"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />

                {/* Overlay Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-4 p-3.5 sm:p-4 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#0099ff]/20 border border-[#0099ff]/40 text-[#0099ff] flex items-center justify-center shrink-0">
                    <i className="ph-broadcast-bold text-xl"></i>
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white tracking-wide">10GBPS FIBER CDN</div>
                    <div className="text-[11px] text-slate-400">Zero buffering during live sports</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Editorial Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
                Our Story & Purpose
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Breaking Free From the Monopoly of Traditional Cable
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                For decades, television was dominated by legacy cable conglomerates that trapped customers into 2-year lock-in agreements, rented out overpriced hardware boxes, and nickel-and-dimed subscribers for sports channels and PPV events.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                In 2018, our team of seasoned networking architects and passionate sports enthusiasts set out with a clear purpose: build a high-performance, cloud-native television platform that puts viewers first. By cutting out middlemen and optimizing high-bandwidth CDNs, we bring the entire global television ecosystem to your screen at a fraction of the cost.
              </p>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                <i className="ph-check-circle-bold text-emerald-400 text-2xl shrink-0"></i>
                <span className="text-xs sm:text-sm text-slate-200 font-medium">
                  100% Contract-Free with zero hidden activation fees or equipment rentals.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. CORE VALUES & PILLARS                                      */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#000304]">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              What Sets Us Apart
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Built on Unyielding Technical Standards
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              Every server node, playback protocol, and playlist stream is engineered for maximum reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/50 hover:bg-white/[0.04] transition-all flex flex-col justify-start text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0099ff]/10 border border-[#0099ff]/30 text-[#0099ff] flex items-center justify-center text-2xl mb-5 group-hover:scale-105 group-hover:bg-[#0099ff]/20 transition-all shrink-0">
                  <i className={val.icon}></i>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 tracking-tight group-hover:text-[#0099ff] transition-colors">
                  {val.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {val.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. COMPANY TIMELINE / MILESTONES                               */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Our Journey
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              A Track Record of Continuous Innovation
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              From our first server in Frankfurt to delivering 4K streams to 150,000+ households today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 relative hover:border-[#0099ff]/40 transition-all"
              >
                <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight mb-2">
                  {m.year}
                </div>
                <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                  {m.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. VERIFIED TRUSTPILOT REVIEW BANNER                          */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-12 lg:py-16 border-b border-white/5 bg-[#0c1015]">
        <div className="w-[88%] lg:w-[80%] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1.5">
            <div className="flex items-center justify-center md:justify-start gap-1 text-emerald-400">
              <i className="ph-star-fill text-lg"></i>
              <i className="ph-star-fill text-lg"></i>
              <i className="ph-star-fill text-lg"></i>
              <i className="ph-star-fill text-lg"></i>
              <i className="ph-star-fill text-lg"></i>
              <span className="text-white font-bold text-sm ml-2">4.8 / 5 Rating</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Rated Excellent by Thousands of Streamers
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Read transparent, authentic verified subscriber reviews on Trustpilot.
            </p>
          </div>

          <a
            href="https://www.trustpilot.com/review/apollogroup.click?utm_medium=trustbox&utm_source=TrustBoxReviewCollector"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-lg flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <svg
              className="w-4 h-4 text-[#00b67a]"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0.5L15.3 8.3L23.8 9.1L17.4 14.8L19.3 23.2L12 18.8L4.7 23.2L6.6 14.8L0.2 9.1L8.7 8.3L12 0.5Z" />
            </svg>
            <span>Read Trustpilot Reviews</span>
          </a>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. ABOUT FAQS                                                 */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#000304]">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Everything You Need to Know About Us
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              Transparent answers regarding our infrastructure, privacy standards, and guarantees.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-3.5 text-left">
            {aboutFaqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${isOpen
                      ? 'bg-[#0c1015] border-[#0099ff]/50 shadow-lg shadow-[#0099ff]/5'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-4 sm:py-5 px-5 sm:px-6 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-[#0099ff]' : 'text-white'
                        }`}
                    >
                      {faq.question}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 border transition-all duration-200 ${isOpen
                          ? 'bg-[#0099ff] border-[#0099ff] text-white rotate-45'
                          : 'bg-white/[0.05] border-white/10 text-slate-300'
                        }`}
                    >
                      <i className="ph-plus-bold text-xs"></i>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. FINAL HIGH-CONVERTING CALL TO ACTION                        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-20 bg-gradient-to-b from-[#000304] to-[#040c14] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#0099ff]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="w-[88%] lg:w-[80%] mx-auto text-center space-y-6">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Experience The Difference
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Cut the Cord for Good?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join over 150,000 households enjoying 20,000+ live channels, 4K sports, and 100,000+ movies on Apollo Group TV today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2">
            <Link
              to="/get-trail"
              className="px-8 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-lg shadow-[#0099ff]/35 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Claim 10 Days Free Trial</span>
              <i className="ph-arrow-right-bold text-base"></i>
            </Link>

            <Link
              to="/pricing"
              className="px-7 py-3.5 rounded-xl font-semibold text-sm sm:text-base text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all flex items-center gap-2"
            >
              <span>Explore All Packages</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <i className="ph-shield-check-bold text-[#0099ff]"></i>
              7-Day Money-Back Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ph-lightning-bold text-[#0099ff]"></i>
              Instant Under 60s Automated Setup
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ph-headset-bold text-[#0099ff]"></i>
              24/7 Human WhatsApp Support
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
