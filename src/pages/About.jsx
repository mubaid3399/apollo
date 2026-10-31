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
      'We never downscale or overly compress feeds. Our high-bitrate 60FPS streams deliver cinema-grade clarity and razor-sharp sports motion directly to your living room.',
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

const teamMembers = [
  {
    name: 'Jeoy Smith',
    role: 'Chief Streaming Architect',
    organization: 'Apollo Group TV',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: (
      <>
        Pioneered our single-sign-on <strong className="text-white font-semibold">Apollo Group TV login</strong> architecture, automated credential dispatch, and ultra-low latency Xtream Codes routing.
      </>
    ),
  },
  {
    name: 'Samantha Riley',
    role: 'VP of Network Infrastructure',
    organization: 'Apollo Group',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: (
      <>
        Manages dedicated 10Gbps server clusters, guaranteeing 99.99% uptime across the entire{' '}
        <strong className="text-white font-semibold">Apollo TV channel list</strong> during peak 4K sports events.
      </>
    ),
  },
  {
    name: 'Alfred Gilbert',
    role: 'Head of Customer Operations',
    organization: 'Apollo Group TV',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    bio: (
      <>
        Oversees 24/7 human <strong className="text-white font-semibold">Apollo Group TV support</strong>, fast{' '}
        <strong className="text-white font-semibold">Apollo Group TV APK</strong> sideloading guides on Firestick, and trial provisioning.
      </>
    ),
  },
]

const ecosystemCards = [
  {
    icon: 'ph-sign-in-bold',
    tag: 'Authentication & Access',
    title: 'Apollo Group TV Login',
    desc: (
      <>
        Experience frictionless, single-click access with the official{' '}
        <strong className="text-[#0099ff] font-bold">Apollo Group TV login</strong> portal. Your
        verified subscription credentials grant instant connectivity across web browsers, mobile
        devices, and television player apps with zero complicated setup steps.
      </>
    ),
  },
  {
    icon: 'ph-browser-bold',
    tag: 'Web Player & Playlists',
    title: 'Apollo Group TV Portal',
    desc: (
      <>
        Manage active devices, inspect playlists, and stream right inside your browser with the{' '}
        <strong className="text-[#0099ff] font-bold">Apollo Group TV portal</strong>. Fully
        compatible with standard M3U playlists, EPG television guides, and Xtream Codes API
        parameters.
      </>
    ),
  },
  {
    icon: 'ph-download-simple-bold',
    tag: 'Firestick & Android',
    title: 'Apollo Group TV APK',
    desc: (
      <>
        Sideload and install in under two minutes using the official{' '}
        <strong className="text-[#0099ff] font-bold">Apollo Group TV APK</strong> and Downloader
        app codes. Optimized for Amazon Firestick 4K, Android TV, Google TV, and NVIDIA Shield with
        native remote control navigation.
      </>
    ),
  },
  {
    icon: 'ph-lifebuoy-bold',
    tag: '24/7 Expert Help Desk',
    title: 'Apollo Group TV Support',
    desc: (
      <>
        Get direct human assistance through dedicated{' '}
        <strong className="text-[#0099ff] font-bold">Apollo Group TV support</strong> channels.
        Instant step-by-step guidance for password resets, playlist syncing, and resolving common{' '}
        <strong className="text-[#0099ff] font-bold">status code 400</strong> connection errors.
      </>
    ),
  },
]

const aboutFaqs = [
  {
    question: 'What is Apollo Group TV and how does it work?',
    answer: (
      <>
        <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong> is a next-generation
        digital IPTV streaming platform delivering over 20,000 live international HD and 4K
        television channels, sports Pay-Per-View (PPV) broadcasts, and an on-demand library of
        100,000+ movies and series directly over your broadband connection without satellite dishes
        or cable hardware.
      </>
    ),
  },
  {
    question: 'How do I perform an Apollo Group TV login on Firestick or web?',
    answer: (
      <>
        Performing an <strong className="text-[#0099ff] font-bold">Apollo Group TV login</strong> is
        quick and automated. Simply enter your credentials into our web player or input your M3U
        playlist / Xtream Codes into apps like Golden Smart, Z Player, or TiviMate. Once signed in,
        your channel lineup and bookmarks sync immediately.
      </>
    ),
  },
  {
    question: 'How much does an Apollo Group TV subscription cost?',
    answer: (
      <>
        Our <strong className="text-[#0099ff] font-bold">Apollo Group TV pricing</strong> is
        completely transparent and 100% contract-free, starting from as low as $13.33/month on
        annual plans. Every <strong className="text-[#0099ff] font-bold">Apollo Group TV subscription</strong>{' '}
        includes full 4K channels, multi-screen streaming on up to 5 simultaneous devices, and zero
        cancellation penalties.
      </>
    ),
  },
  {
    question: 'Can I test the service with an Apollo Group TV free trial?',
    answer: (
      <>
        Yes! We invite every prospective viewer to test our high-bitrate servers with an official{' '}
        <strong className="text-[#0099ff] font-bold">Apollo Group TV free trial</strong>. Experience
        our buffer-free playback, live sports channels, and VOD library risk-free for 10 full days
        with zero credit card required.
      </>
    ),
  },
  {
    question: 'How do I install Apollo Group TV on Amazon Firestick & Android?',
    answer: (
      <>
        Installing on Firestick takes under 2 minutes: open the Downloader app, enter our official
        Downloader codes (such as <strong className="text-[#0099ff] font-bold">1036442</strong> for
        Golden Smart or <strong className="text-[#0099ff] font-bold">8045867</strong> for Z Player),
        install the <strong className="text-[#0099ff] font-bold">Apollo Group TV APK</strong>, and
        sign in with your streaming details.
      </>
    ),
  },
  {
    question: 'How do I fix Apollo Group TV status code 400 or playlist errors?',
    answer: (
      <>
        A <strong className="text-[#0099ff] font-bold">status code 400</strong> typically signifies
        a minor typo in your portal URL or an expired session token. Simply verify your login details
        in the <strong className="text-[#0099ff] font-bold">Apollo Group TV portal</strong>, refresh
        your M3U playlist link, or contact our 24/7 support agents on WhatsApp for immediate
        resolution.
      </>
    ),
  },
  {
    question: 'How do I renew my Apollo Group TV subscription?',
    answer: (
      <>
        When your plan approaches expiration, an{' '}
        <strong className="text-[#0099ff] font-bold">Apollo Group TV renew</strong> prompt appears in
        your dashboard. You can seamlessly renew your subscription using verified payment channels or
        cryptocurrency (USDT TRC20, Bitcoin) with automated instant re-activation.
      </>
    ),
  },
  {
    question: 'Is Apollo Group TV affiliated with other Apollo Group companies?',
    answer: (
      <>
        No. <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong> is an independent
        global digital streaming network and is completely separate from unrelated entities such as
        Apollo Medical Group, Apollo Crewing, or Apollo Management.
      </>
    ),
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
      url: 'https://apollogroup.click',
      description:
        'Apollo Group TV is a premier global entertainment network delivering 20,000+ live HD/4K channels, 100,000+ VOD movies, and PPV sports to over 150,000 active subscribers worldwide.',
    },
  }

  return (
    <div className="w-full bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white">
      <SEO
        title="About Apollo Group TV | Login, Subscription, Pricing & IPTV Network"
        description="Learn about Apollo Group TV: our 10Gbps dedicated anti-freeze servers, Apollo Group TV login portal, APK installation on Firestick, 20,000+ live channels, and 10-day free trial."
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
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Official Apollo Group TV Infrastructure
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18] max-w-4xl mx-auto">
            About <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong> — Redefining
            How the World Experiences Television &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] via-[#4db8ff] to-[#80ccff]">
              Live Entertainment
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            Welcome to the home of <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong>,
            where high-definition streaming meets complete digital freedom. Empowering over{' '}
            <strong className="text-[#0099ff] font-bold">150,000+ active households</strong> across 90+
            countries, an <strong className="text-[#0099ff] font-bold">Apollo Group TV subscription</strong>{' '}
            delivers 20,000+ live television feeds, Pay-Per-View sports, and 100,000+ on-demand movies
            directly to your screens with zero cable lock-in contracts.
          </p>

          {/* Key Stat Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 sm:pt-12 max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center hover:border-[#0099ff]/30 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">150,000+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Active Subscribers</div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center hover:border-[#0099ff]/30 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">99.99%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Anti-Freeze Uptime SLA</div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center hover:border-[#0099ff]/30 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">20,000+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Live HD & 4K Channels</div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-white/[0.02] border border-white/10 text-center hover:border-[#0099ff]/30 transition-all">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">5 Screens</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Simultaneous Streaming</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. THE COMPLETE APOLLO GROUP TV ECOSYSTEM                     */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#000304]">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              The Complete Streaming Architecture
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              One Unified Platform: <strong className="text-[#0099ff] font-bold">Apollo Group TV Login</strong>,{' '}
              <strong className="text-[#0099ff] font-bold">Portal</strong> & Dedicated Apps
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
              Engineered from the ground up for instantaneous response times, cross-device playlist
              synchronization, and round-the-clock stability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecosystemCards.map((card, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-2xl bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/50 hover:bg-white/[0.04] transition-all flex flex-col justify-start text-left group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0099ff]/10 border border-[#0099ff]/30 text-[#0099ff] flex items-center justify-center text-2xl mb-5 group-hover:scale-105 group-hover:bg-[#0099ff]/20 transition-all shrink-0">
                  <i className={card.icon}></i>
                </div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400 mb-1">
                  {card.tag}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2.5 tracking-tight group-hover:text-[#0099ff] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. OUR STORY & ANTI-FREEZE INFRASTRUCTURE                     */}
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
                Why Viewers Choose <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong> Over Traditional Cable
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                For decades, television was controlled by cable monopolies that locked viewers into expensive
                two-year contracts, charged hefty equipment rental fees, and forced consumers into paying
                $80+ extra every month just to catch local football games and Pay-Per-View fights.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                In 2018, the architects at <strong className="text-[#0099ff] font-bold">Apollo Group</strong> set
                out with an unwavering mission: construct a high-capacity, fiber-optic distribution network that
                delivers the entire world of live television directly to any smart device. Today, our{' '}
                <strong className="text-[#0099ff] font-bold">Apollo Group TV subscription</strong> combines 20,000+
                channels, regional sports networks, and daily on-demand cinema releases into one easy subscription.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                  <i className="ph-check-circle-bold text-[#0099ff] text-xl shrink-0"></i>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium">
                    100% Contract-Free Freedom
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                  <i className="ph-check-circle-bold text-[#0099ff] text-xl shrink-0"></i>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium">
                    Fast 60s Automated Activation
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                  <i className="ph-check-circle-bold text-[#0099ff] text-xl shrink-0"></i>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium">
                    Zero IP Locks / VPN Friendly
                  </span>
                </div>
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 flex items-center gap-3">
                  <i className="ph-check-circle-bold text-[#0099ff] text-xl shrink-0"></i>
                  <span className="text-xs sm:text-sm text-slate-200 font-medium">
                    Up to 5 Simultaneous Screens
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. CHANNELS, SPORTS & CINEMA LINEUP                           */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#0c1015]">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Left Column: Editorial Information */}
            <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
              <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
                Content & Programming
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Explore the Extensive <strong className="text-[#0099ff] font-bold">Apollo TV Channel List</strong> & Sports Vault
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Never ask "what channel is the game on today" again. With the comprehensive{' '}
                <strong className="text-[#0099ff] font-bold">Apollo TV channel list</strong>, you gain direct
                access to regional local affiliates (CBS, FOX, NBC, ABC) from all 50 states, dedicated sports
                broadcasters (ESPN, NFL Sunday Ticket, NBA League Pass, NHL Center Ice, Formula 1), and every major
                UFC & Boxing PPV fight in crystal-clear 4K at 60 FPS.
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Movie lovers enjoy over 100,000+ Video On Demand (VOD) titles, featuring new theater releases,
                beloved Hollywood classics, and complete television box sets updated daily with multi-language
                subtitles.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  to="/services"
                  className="px-6 py-3 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0099ff] hover:bg-[#0088ee] transition-all flex items-center gap-2 shadow-md shadow-[#0099ff]/25"
                >
                  <span>Explore Channel Lineup</span>
                  <i className="ph-arrow-right-bold"></i>
                </Link>
                <Link
                  to="/get-trail"
                  className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center gap-2"
                >
                  <span>Test Channel Feeds</span>
                </Link>
              </div>
            </div>

            {/* Right Column: Visual Video Display */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#090d12] group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#0099ff]/30 to-transparent blur-xl pointer-events-none -z-10" />
                <img
                  src={aboutVideoImg}
                  alt="Apollo TV Channel List & Sports"
                  className="w-full h-auto object-cover rounded-2xl group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6 text-left">
                  <div className="text-xs font-bold text-[#0099ff] uppercase tracking-wider mb-1">
                    Universal Broadcast Network
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white">
                    20,000+ Live Channels with 7-Day Catch-Up EPG
                  </h4>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. FEATURED SERVICES SHOWCASE (MATCHING REFERENCE LAYOUT)     */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#000304] overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#0099ff]/10 rounded-full blur-[150px] pointer-events-none -z-10" />

        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-center">
            
            {/* Left Column: Staggered Double Media Cards (Matching Reference Image) */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 items-start">
                
                {/* Card 1: Live Music & Events with Bottom Wave + Floating Play Button */}
                <div className="relative rounded-[28px] overflow-hidden bg-[#080d12] border border-white/10 shadow-2xl flex flex-col justify-between group hover:border-[#0099ff]/50 transition-all duration-300">
                  {/* Photo Container */}
                  <div className="relative h-64 sm:h-72 lg:h-80 w-full overflow-hidden bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=800&q=80"
                      alt="Apollo Group TV Live Entertainment and Concerts"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Organic Wave Transition into bottom accent */}
                    <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                      <svg
                        className="relative block w-full h-10 sm:h-12 fill-[#0099ff]"
                        viewBox="0 0 500 150"
                        preserveAspectRatio="none"
                      >
                        <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" />
                      </svg>
                    </div>
                  </div>

                  {/* Solid Colored Bottom Block with Floating Orange Play Button */}
                  <div className="bg-[#0099ff] px-5 pb-5 pt-1 text-left relative z-20">
                    {/* Floating Orange Play Button (Exact match to reference) */}
                    <div className="w-11 h-11 rounded-full bg-[#ff7a00] text-white flex items-center justify-center shadow-lg -mt-6 mb-2 hover:scale-110 transition-transform cursor-pointer">
                      <i className="ph-play-fill text-lg ml-0.5"></i>
                    </div>

                    <h4 className="text-base sm:text-lg font-black text-white tracking-tight leading-tight">
                      Live Concerts & Events
                    </h4>
                    <p className="text-xs text-white/90 font-medium mt-0.5">
                      Raffle Draw & Worldwide PPVs
                    </p>
                  </div>
                </div>

                {/* Card 2: Mobile / Smart TV Streaming with Circular Price Pill (Staggered Offset) */}
                <div className="relative rounded-[28px] overflow-hidden bg-[#080d12] border border-white/10 shadow-2xl flex flex-col justify-between group hover:border-[#0099ff]/50 transition-all duration-300 sm:translate-y-8 lg:translate-y-10">
                  {/* Top Wave Accent Overlay */}
                  <div className="absolute top-0 left-0 w-24 h-24 overflow-hidden z-20 pointer-events-none">
                    <div className="w-24 h-24 rounded-br-[40px] bg-[#0099ff]/30 -translate-x-6 -translate-y-6 blur-[1px]"></div>
                  </div>

                  {/* Circular Price Pill (Matching "$20 monthly" in Reference) */}
                  <div className="absolute top-4 left-4 z-30 w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-black/85 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-center shadow-xl">
                    <span className="text-sm sm:text-base font-extrabold text-white leading-none">$13.33</span>
                    <span className="text-[10px] text-[#0099ff] font-bold tracking-tight mt-0.5">monthly</span>
                  </div>

                  {/* Photo Container */}
                  <div className="relative h-80 sm:h-96 lg:h-[390px] w-full overflow-hidden bg-slate-900">
                    <img
                      src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?auto=format&fit=crop&w=800&q=80"
                      alt="Apollo Group TV Mobile and Smart TV Streaming"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                    {/* Bottom Status Pill */}
                    <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-black/75 backdrop-blur-md border border-white/10 flex items-center gap-2.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0"></span>
                      <span className="text-xs font-semibold text-white tracking-wide">
                        100% Anti-Freeze Buffer Defense
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Editorial Copy, Features & Video Preview (Matching Reference) */}
            <div className="lg:col-span-6 space-y-6 text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0099ff]/10 border border-[#0099ff]/30 text-xs font-bold text-[#0099ff] tracking-wider uppercase">
                <i className="ph-hand-pointing-bold text-sm"></i>
                <span>OUR BEST SERVICES</span>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-bold text-white tracking-tight leading-[1.2]">
                Best IPTV Streaming & Entertainment Platform Powered by{' '}
                <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong>
              </h2>

              {/* Intro Narrative */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                Since 2018, <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong> has pioneered specialist streaming infrastructure, sourcing knowledgeable network routing to deliver 20,000+ live television feeds, Pay-Per-View sports, and 100,000+ on-demand movies directly to your screens with zero cable lock-in contracts.
              </p>

              {/* Features & Video Widget Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 pt-2">
                {/* 2 StStacked Features */}
                <div className="sm:col-span-7 space-y-5">
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0099ff]/10 border border-[#0099ff]/30 text-[#0099ff] flex items-center justify-center shrink-0 text-xl">
                      <i className="ph-television-simple-bold"></i>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">4K Award Winning</h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-0.5">
                        We deliver 20,000+ live HD & 4K channels with crisp 60FPS sports motion and zero latency.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-xl bg-[#0099ff]/10 border border-[#0099ff]/30 text-[#0099ff] flex items-center justify-center shrink-0 text-xl">
                      <i className="ph-headset-bold"></i>
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-tight">Best Support</h4>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mt-0.5">
                        Get dedicated human <strong className="text-[#0099ff] font-bold">Apollo Group TV support</strong> 365 days a year with instant setup help.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Feature Card: Video Preview Thumbnail & Checklist */}
                <div className="sm:col-span-5 flex flex-col justify-between space-y-3.5 p-4 rounded-2xl bg-white/[0.02] border border-white/10">
                  {/* Video Thumbnail Pill with Orange Play Button */}
                  <div className="relative rounded-xl overflow-hidden h-20 w-full bg-gradient-to-r from-slate-900 to-[#0099ff]/20 flex items-center justify-center border border-white/10 group cursor-pointer">
                    <img
                      src="https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=400&q=80"
                      alt="Apollo Group TV 4K Stream Sample"
                      className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-75 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600/30 to-black/50" />
                    <div className="relative z-10 w-9 h-9 rounded-full bg-[#ff7a00] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <i className="ph-play-fill text-sm ml-0.5"></i>
                    </div>
                  </div>

                  {/* Checklist bullets matching reference */}
                  <div className="space-y-1.5 text-left text-xs font-medium text-slate-300">
                    <div className="flex items-center gap-2">
                      <i className="ph-check-circle-fill text-[#0099ff] text-sm shrink-0"></i>
                      <span>100 Mbps Anti-Freeze streaming</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ph-check-circle-fill text-[#0099ff] text-sm shrink-0"></i>
                      <span>Connect up to 5 devices</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ph-check-circle-fill text-[#0099ff] text-sm shrink-0"></i>
                      <span>WiFi Router & VPN Protection</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom CTA Row: Primary Button + Phone/WhatsApp support */}
              <div className="flex flex-wrap items-center gap-5 sm:gap-6 pt-4">
                <Link
                  to="/get-trail"
                  className="px-7 py-3.5 rounded-xl font-extrabold text-sm text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] transition-all shadow-lg shadow-[#0099ff]/30 flex items-center gap-3 group"
                >
                  <span>GET STARTED</span>
                  <span className="w-6 h-6 rounded-full bg-white text-[#0099ff] flex items-center justify-center text-xs group-hover:translate-x-0.5 transition-transform">
                    <i className="ph-arrow-right-bold"></i>
                  </span>
                </Link>

                <a
                  href="https://wa.me/message/YOUR_WHATSAPP_ID"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full bg-white text-slate-950 flex items-center justify-center text-xl shadow-md group-hover:scale-105 group-hover:text-[#0099ff] transition-all">
                    <i className="ph-phone-call-bold"></i>
                  </div>
                  <div className="text-left">
                    <span className="block text-[11px] text-slate-400 font-medium">Give us a call / 24/7 Chat</span>
                    <span className="block text-sm sm:text-base font-bold text-white group-hover:text-[#0099ff] transition-colors">
                      +1 (800) 276-5568
                    </span>
                  </div>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. PRICING, RENEWALS & FREE TRIAL PROMISE                     */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#000304]">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Value & Flexibility
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Fair <strong className="text-[#0099ff] font-bold">Apollo Group TV Pricing</strong>, Easy{' '}
              <strong className="text-[#0099ff] font-bold">Renewals</strong> & Risk-Free Trials
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
              No contracts, no surprise price hikes, and no hidden cancellation hurdles. You have 100% control
              over your streaming plan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-7 rounded-2xl bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0099ff]/10 text-[#0099ff] flex items-center justify-center text-xl">
                  <i className="ph-tag-bold"></i>
                </div>
                <h3 className="text-lg font-bold text-white">Transparent Subscription Pricing</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Our <strong className="text-[#0099ff] font-bold">Apollo Group TV pricing</strong> starts at just
                  $13.33/month on annual subscriptions. Includes 5 simultaneous connections, all 4K channels,
                  sports PPVs, and round-the-clock server maintenance.
                </p>
              </div>
              <Link to="/pricing" className="text-xs sm:text-sm font-semibold text-[#0099ff] hover:underline inline-flex items-center gap-1.5">
                <span>View All Pricing Plans</span>
                <i className="ph-arrow-right-bold"></i>
              </Link>
            </div>

            <div className="p-7 rounded-2xl bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0099ff]/10 text-[#0099ff] flex items-center justify-center text-xl">
                  <i className="ph-sparkle-bold"></i>
                </div>
                <h3 className="text-lg font-bold text-white">10-Day Free Trial Test Drive</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Evaluate server response times and channel switching with an official{' '}
                  <strong className="text-[#0099ff] font-bold">Apollo Group TV free trial</strong>. Zero credit card
                  required, zero auto-billing risk, and instant credential dispatch.
                </p>
              </div>
              <Link to="/get-trail" className="text-xs sm:text-sm font-semibold text-[#0099ff] hover:underline inline-flex items-center gap-1.5">
                <span>Claim 10-Day Trial</span>
                <i className="ph-arrow-right-bold"></i>
              </Link>
            </div>

            <div className="p-7 rounded-2xl bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/40 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#0099ff]/10 text-[#0099ff] flex items-center justify-center text-xl">
                  <i className="ph-arrows-clockwise-bold"></i>
                </div>
                <h3 className="text-lg font-bold text-white">1-Click Fast Account Renewal</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                  Enjoy hassle-free continuity. The{' '}
                  <strong className="text-[#0099ff] font-bold">Apollo Group TV renew</strong> system allows you to
                  extend or upgrade your plan in seconds using credit cards or crypto (USDT TRC20, Bitcoin) with no service interruption.
                </p>
              </div>
              <Link to="/pricing" className="text-xs sm:text-sm font-semibold text-[#0099ff] hover:underline inline-flex items-center gap-1.5">
                <span>Renew Your Subscription</span>
                <i className="ph-arrow-right-bold"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. TECHNICAL EXCELLENCE & PILLARS                             */}
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
      {/* 7. COMPANY TIMELINE / MILESTONES                              */}
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
      {/* 8. OUR EXPERT TEAM (MATCHING REFERENCE CURVED CARDS)          */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#000304]">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          {/* Header (Matching Reference Typography) */}
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              OUR EXPERT TEAM
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold text-white tracking-tight leading-tight">
              We Always Work With An Energetic Team
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Meet the specialists behind <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong>.
              From maintaining high-speed <strong className="text-[#0099ff] font-bold">anti-freeze servers</strong> to
              delivering 24/7 dedicated <strong className="text-[#0099ff] font-bold">Apollo Group TV support</strong>,
              our team ensures your streaming remains buffer-free 365 days a year.
            </p>
          </div>

          {/* 3-Column Team Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10 max-w-6xl mx-auto">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="relative rounded-3xl overflow-hidden bg-[#080d12] border border-white/10 hover:border-[#0099ff]/50 transition-all duration-300 group shadow-2xl flex flex-col justify-between"
              >
                {/* Member Photo Container */}
                <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-slate-900">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Organic Wave Transition (Exact Visual match to Reference Image) */}
                  <div className="absolute -bottom-1 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
                    <svg
                      className="relative block w-full h-12 sm:h-14 fill-[#0099ff]"
                      viewBox="0 0 500 150"
                      preserveAspectRatio="none"
                    >
                      <path d="M0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 L500.00,150.00 L0.00,150.00 Z" />
                    </svg>
                  </div>
                </div>

                {/* Solid Colored Bottom Section with floating button */}
                <div className="bg-[#0099ff] px-6 pb-6 pt-2 text-left relative z-20">
                  <div className="flex items-center justify-between gap-4">
                    <div className="space-y-0.5">
                      <h4 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                        {member.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-white/90 font-medium">
                        {member.role}, {member.organization}
                      </p>
                    </div>

                    {/* Circular Floating Action Button (Matching Reference) */}
                    <button
                      type="button"
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-slate-900 hover:text-[#0099ff] hover:scale-110 shadow-lg flex items-center justify-center transition-all shrink-0 cursor-pointer focus:outline-none"
                      aria-label={`Connect with ${member.name}`}
                    >
                      <i className="ph-share-network-bold text-lg sm:text-xl"></i>
                    </button>
                  </div>

                  {/* Keyword-Rich Member Bio */}
                  <p className="text-xs text-white/85 mt-3 pt-3 border-t border-white/20 leading-relaxed font-normal">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 9. VERIFIED TRUSTPILOT REVIEW BANNER                         */}
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
      {/* 9. ABOUT FAQS (MATCHING GOOGLE PAA SEARCH QUERIES)            */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#000304]">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Everything You Need to Know About <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong>
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              Clear, transparent answers regarding login access, subscriptions, device setup, and error resolutions.
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
      {/* 10. FINAL HIGH-CONVERTING CALL TO ACTION                      */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-20 bg-gradient-to-b from-[#000304] to-[#040c14] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#0099ff]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="w-[88%] lg:w-[80%] mx-auto text-center space-y-6">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Experience The Difference
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Stream with <strong className="text-[#0099ff] font-bold">Apollo Group TV</strong>?
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
