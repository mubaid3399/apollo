import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import movieDetailImg from '../assets/apollo-movie-detail.webp'
import whatIsApolloImg from '../assets/what is appolo.avif'
import aboutMainImg from '../assets/about-main.webp'

const serviceCategories = [
  { id: 'all', label: 'All Services' },
  { id: 'live', label: 'Live TV & Sports' },
  { id: 'vod', label: 'VOD & Cinema' },
  { id: 'tech', label: 'Network & Servers' },
  { id: 'features', label: 'Smart Features' },
]

const servicesList = [
  {
    id: 1,
    category: 'live',
    icon: 'ph-television-bold',
    tag: '20,000+ Channels',
    title: 'Global Live Television',
    description:
      'Access thousands of live satellite and digital channels from the USA, UK, Canada, Europe, Middle East, and worldwide. Enjoy news, entertainment, music, kids, and documentary broadcasts in FHD & 4K.',
    features: ['USA, UK, CA, EU & Global', 'Local & Regional Networks', 'Zero Censorship / Uncut Feeds', 'Fast <1s Channel Switching'],
  },
  {
    id: 2,
    category: 'live',
    icon: 'ph-lightning-bold',
    tag: '4K / 60 FPS',
    title: 'Ultra HD Sports & PPV Events',
    description:
      'Never miss a game. Catch every Premier League match, Champions League, NFL RedZone, NBA League Pass, NHL Center Ice, Formula 1, and all major UFC & Boxing PPVs without paying pay-per-view fees.',
    features: ['Every UFC & Boxing PPV included', 'Premier League, NFL, NBA, F1', 'Smooth 60FPS High Bitrate', 'Alternative backup server streams'],
  },
  {
    id: 3,
    category: 'vod',
    icon: 'ph-film-strip-bold',
    tag: '100,000+ Titles',
    title: 'Cinema On-Demand (VOD)',
    description:
      'Stream the newest theatrical blockbuster releases, Hollywood classics, binge-worthy television series, anime, and foreign cinema. Updated daily with multi-language audio and subtitle tracks.',
    features: ['Daily automated movie updates', 'Full multi-season series boxsets', 'Multi-language subtitle tracks', '4K HDR & Dolby Atmos audio'],
  },
  {
    id: 4,
    category: 'features',
    icon: 'ph-clock-counter-clockwise-bold',
    tag: '7-Day Replay',
    title: 'Cloud Catch-Up & Electronic TV Guide',
    description:
      'Complete, real-time Electronic Program Guide (EPG) with intuitive scheduling. Missed yesterday’s match or show? Rewind and stream any channel up to 7 days in the past directly from the cloud.',
    features: ['Accurate real-time EPG timetable', '7-day cloud DVR replay', 'Show reminders & bookmarks', 'Clean timeline navigation'],
  },
  {
    id: 5,
    category: 'tech',
    icon: 'ph-gauge-bold',
    tag: '99.99% Uptime',
    title: 'Anti-Freeze High-Bandwidth CDN',
    description:
      'Our proprietary server clustering dynamically distributes traffic across Tier-1 load-balanced content delivery networks worldwide. Say goodbye to buffer loops during high-traffic championship finals.',
    features: ['10Gbps dedicated server pipes', 'Load-balanced geo-clusters', 'Anti-ISP throttling routing', 'Built-in VPN compatibility'],
  },
  {
    id: 6,
    category: 'features',
    icon: 'ph-users-three-bold',
    tag: 'Multi-Screen',
    title: 'Simultaneous Multi-Screen Streaming',
    description:
      'Keep the whole household happy. Watch live sports in the living room, a movie in the bedroom, and cartoons on the tablet simultaneously under one single flexible subscription account.',
    features: ['Up to 5 simultaneous streams', 'Independent user playlists', 'No device lock-in', 'Cloud favorites synchronization'],
  },
  {
    id: 7,
    category: 'tech',
    icon: 'ph-lock-simple-bold',
    tag: 'Zero-Logs',
    title: 'Encrypted Streaming Privacy',
    description:
      'Your streaming activity is protected with end-to-end 256-bit SSL encryption. We practice a strict zero-logs policy, shielding your viewing habits from ISP surveillance and bandwidth throttling.',
    features: ['256-bit SSL encrypted protocol', 'Zero activity logging', 'ISP throttling bypass', 'OpenVPN & WireGuard friendly'],
  },
  {
    id: 8,
    category: 'features',
    icon: 'ph-headset-bold',
    tag: '24/7 Priority',
    title: 'White-Glove Setup & WhatsApp Support',
    description:
      'Instant automated credential delivery upon checkout. Need help configuring Tivimate, IPTV Smarters, or your Firestick? Our live support team is available 24/7 via WhatsApp and live chat.',
    features: ['Instant <60s automated activation', 'Step-by-step setup guides', 'WhatsApp chat response in <2 mins', 'Free troubleshooting support'],
  },
]

const supportedDevices = [
  { name: 'Amazon Fire TV', desc: 'Firestick 4K, Cube & TVs', icon: 'ph-television-bold' },
  { name: 'Android TV / Box', desc: 'Nvidia Shield, Xiaomi, Sony', icon: 'ph-robot-bold' },
  { name: 'Apple iOS & TV', desc: 'iPhone, iPad, Apple TV 4K', icon: 'ph-apple-logo-bold' },
  { name: 'Smart TVs', desc: 'Samsung Tizen, LG webOS', icon: 'ph-screencast-bold' },
  { name: 'PC & Mac', desc: 'Windows, macOS, Linux browser', icon: 'ph-desktop-bold' },
  { name: 'MAG & Formuler', desc: 'Dedicated IPTV set-top boxes', icon: 'ph-hard-drive-bold' },
]

const comparisonData = [
  {
    feature: 'Live Global Channels',
    apollo: '20,000+ in 4K & FHD',
    cable: '150 - 200 (mostly 720p)',
    others: 'Unstable / Broken links',
  },
  {
    feature: 'VOD Movies & Box Sets',
    apollo: '100,000+ updated daily',
    cable: 'Pay $5.99+ per movie',
    others: 'Outdated & low resolution',
  },
  {
    feature: 'All PPV & Sports Included',
    apollo: 'Yes — UFC, Boxing, F1, NFL',
    cable: '$80+ extra per event',
    others: 'Buffering during big games',
  },
  {
    feature: 'Multi-Device Freedom',
    apollo: 'Firestick, Android, iOS, TV, PC',
    cable: 'Clunky rented cable boxes',
    others: 'Strict single MAC lock',
  },
  {
    feature: 'Anti-Freeze Server Network',
    apollo: '10Gbps load-balanced CDN',
    cable: 'Traditional coaxial cable',
    others: 'Shared cheap VPS hosts',
  },
  {
    feature: 'Monthly Investment',
    apollo: 'From $13 - $17 / month',
    cable: '$120 - $220 / month + fees',
    others: 'Hit-or-miss hidden traps',
  },
]

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredServices =
    activeCategory === 'all'
      ? servicesList
      : servicesList.filter((s) => s.category === activeCategory)

  return (
    <div className="w-full bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white">
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO BANNER SECTION                                        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-white/5">
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0099ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#0099ff]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="w-[88%] lg:w-[80%] mx-auto text-center space-y-6">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0099ff]/10 border border-[#0099ff]/30 text-[#0099ff] text-xs font-semibold uppercase tracking-wider shadow-sm shadow-[#0099ff]/15">
            <i className="ph-sparkle-bold text-sm"></i>
            <span>Premium IPTV & Cloud Streaming Services</span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18] max-w-4xl mx-auto">
            Next-Gen Entertainment Services Engineered for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0099ff] via-[#4db8ff] to-[#80ccff]">
              Zero Compromise
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            Break free from overpriced cable contracts. Experience 20,000+ live HD/4K channels, 100,000+ VOD movies, dedicated sports servers, and seamless multi-device streaming anywhere in the world.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2">
            <Link
              to="/pricing"
              className="px-7 py-3.5 rounded-sm font-bold text-sm sm:text-base text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-lg shadow-[#0099ff]/30 hover:shadow-[#0099ff]/45 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore All Packages</span>
              <i className="ph-arrow-right-bold text-base"></i>
            </Link>

            <Link
              to="/get-trail"
              className="px-6 py-3.5 rounded-sm font-semibold text-sm sm:text-base text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 hover:border-white/20 transition-all hover:-translate-y-0.5 active:translate-y-0 inline-flex items-center gap-2"
            >
              <i className="ph-play-circle-bold text-lg text-[#0099ff]"></i>
              <span>Get 10 Days Free Trial</span>
            </Link>
          </div>

          {/* Key Stat Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 sm:pt-14 max-w-4xl mx-auto">
            <div className="p-4 sm:p-5 rounded-sm bg-white/[0.02] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">20,000+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Live Global Channels</div>
            </div>
            <div className="p-4 sm:p-5 rounded-sm bg-white/[0.02] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">100,000+</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">VOD Movies & Series</div>
            </div>
            <div className="p-4 sm:p-5 rounded-sm bg-white/[0.02] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">4K / 60FPS</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Ultra HD Bitrate Quality</div>
            </div>
            <div className="p-4 sm:p-5 rounded-sm bg-white/[0.02] border border-white/10 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-[#0099ff] tracking-tight">99.99%</div>
              <div className="text-xs text-slate-400 mt-1 font-medium">Anti-Freeze Uptime SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. INTERACTIVE SERVICES SHOWCASE WITH CATEGORY TABS           */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Our Core Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Built for Sports Fans, Cinephiles & Cord-Cutters
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              Filter through our suite of specialized streaming technologies and discover why thousands choose Apollo Group TV daily.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
            {serviceCategories.map((cat) => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-sm text-xs sm:text-sm font-semibold transition-all cursor-pointer ${isActive
                      ? 'bg-[#0099ff] text-white shadow-md shadow-[#0099ff]/30'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08] hover:text-white border border-white/5'
                    }`}
                >
                  {cat.label}
                </button>
              )
            })}
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="group relative p-6 sm:p-7 rounded-sm bg-[#0c1015]/80 border border-white/10 hover:border-[#0099ff]/50 hover:bg-white/[0.04] transition-all duration-300 flex flex-col justify-between text-left"
              >
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-[#0099ff]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div>
                  {/* Top Bar: Icon + Tag */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-sm bg-[#0099ff]/10 border border-[#0099ff]/25 flex items-center justify-center text-[#0099ff] group-hover:scale-105 group-hover:bg-[#0099ff]/20 transition-all">
                      <i className={`${service.icon} text-2xl`}></i>
                    </div>

                    <span className="px-2.5 py-1 rounded-sm text-[11px] font-semibold text-[#0099ff] bg-[#0099ff]/10 border border-[#0099ff]/20">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2 group-hover:text-[#0099ff] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal mb-5">
                    {service.description}
                  </p>
                </div>

                {/* Feature Checklist */}
                <div className="pt-4 border-t border-white/5 space-y-2">
                  {service.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <i className="ph-check-bold text-[#0099ff] shrink-0 text-xs"></i>
                      <span className="truncate">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 3. DEEP DIVE FEATURE 1: LIVE SPORTS & PPV ADVANTAGE           */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 overflow-hidden">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Visual Media with subtle glow */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-[#090d12] group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#0099ff]/30 to-transparent blur-xl pointer-events-none -z-10" />
                <img
                  src={whatIsApolloImg}
                  alt="Live Sports & Entertainment"
                  className="w-full h-auto object-cover rounded-sm group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />

                {/* Overlay Floating Badge */}
                <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:left-4 p-3 sm:p-4 rounded-sm bg-black/85 backdrop-blur-md border border-white/15 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0">
                    <i className="ph-broadcast-bold text-xl"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white tracking-wide">ZERO BUFFER ANTI-FREEZE</div>
                    <div className="text-[11px] text-slate-400">Dedicated 10Gbps load-balanced pipes</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Explanatory Copy */}
            <div className="lg:col-span-6 space-y-6 text-left">
              <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
                Zero Missed Moments
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Every Big Match, Every PPV Event In Native 4K & 60 FPS
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
                Traditional broadcasters charge up to $89.99 for a single UFC fight or lock football matches behind fragmented subscription apps. Apollo Group TV consolidates all major sports networks into one high-performance interface.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10">
                  <div className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <i className="ph-trophy-bold text-[#0099ff]"></i>
                    <span>All Major Leagues</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    EPL, UEFA Champions League, La Liga, NFL, NBA, MLB, NHL, MLS, and international cricket.
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-white/[0.02] border border-white/10">
                  <div className="text-sm font-bold text-white mb-1 flex items-center gap-2">
                    <i className="ph-fire-bold text-[#0099ff]"></i>
                    <span>Free PPV Events</span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Full live access to every UFC, Top Rank Boxing, WWE, and Formula 1 Grand Prix weekend.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/pricing"
                  className="px-6 py-3 rounded-sm font-bold text-sm text-white bg-[#0099ff] hover:bg-[#0088ee] transition-all inline-flex items-center gap-2"
                >
                  <span>Start Streaming Sports</span>
                  <i className="ph-arrow-right-bold text-sm"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 4. DEEP DIVE FEATURE 2: 100,000+ VOD CINEMA LIBRARY          */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 overflow-hidden">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Text */}
            <div className="lg:col-span-6 space-y-6 text-left order-2 lg:order-1">
              <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
                Cinema at Your Fingertips
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight leading-tight">
                Massive On-Demand Archive With Daily Hollywood Releases
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
                Why pay for Netflix, Disney+, Max, and Paramount+ separately? Apollo Group TV brings over 100,000 commercial-free movies and complete TV series seasons into a single slick library with IMDb metadata, trailers, and subtitles.
              </p>

              <div className="space-y-3 pt-1">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-check-bold text-xs"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Weekly Movie Additions</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      New theatrical releases added automatically every Tuesday and Friday in crystal clear 4K HDR.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-check-bold text-xs"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Multi-Language Audio & Subtitles</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Switch between English, Spanish, French, Arabic, German, and Portuguese subtitles on the fly.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#0099ff]/20 text-[#0099ff] flex items-center justify-center shrink-0 mt-0.5">
                    <i className="ph-check-bold text-xs"></i>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Smart Watchlist & Resume</h4>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Pick up exactly where you left off on any room or device with cloud bookmarking.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/get-trail"
                  className="px-6 py-3 rounded-sm font-bold text-sm text-white bg-[#0099ff] hover:bg-[#0088ee] transition-all inline-flex items-center gap-2"
                >
                  <span>Test Drive VOD Library</span>
                  <i className="ph-arrow-right-bold text-sm"></i>
                </Link>
              </div>
            </div>

            {/* Right Column: VOD Movie UI Image */}
            <div className="lg:col-span-6 relative order-1 lg:order-2">
              <div className="relative rounded-sm overflow-hidden border border-white/10 shadow-2xl bg-[#090d12] group">
                <div className="absolute -inset-1 bg-gradient-to-tr from-[#0099ff]/30 to-transparent blur-xl pointer-events-none -z-10" />
                <img
                  src={movieDetailImg}
                  alt="Apollo Group TV On-Demand Movie Interface"
                  className="w-full h-auto object-cover rounded-sm group-hover:scale-[1.02] transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-sm bg-black/80 backdrop-blur-md border border-white/15 text-[11px] font-bold text-[#0099ff] flex items-center gap-1.5">
                  <i className="ph-star-fill text-amber-400"></i>
                  <span>4K DOLBY AUDIO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 5. MULTI-DEVICE COMPATIBILITY GRID                            */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5">
        <div className="w-[88%] lg:w-[80%] mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Universal Ecosystem
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              One Subscription, Seamless on All Your Devices
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              Our service works with industry-leading IPTV apps (TiviMate, IPTV Smarters, XCIPTV, GSE Smart IPTV) and direct M3U / Xtream Codes API.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {supportedDevices.map((dev) => (
              <div
                key={dev.name}
                className="p-5 rounded-sm bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/40 hover:bg-white/[0.04] transition-all flex flex-col items-center justify-center text-center group"
              >
                <div className="w-12 h-12 rounded-sm bg-white/[0.03] border border-white/5 group-hover:bg-[#0099ff]/15 group-hover:border-[#0099ff]/30 flex items-center justify-center text-slate-300 group-hover:text-[#0099ff] transition-all mb-3 text-2xl">
                  <i className={dev.icon}></i>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight mb-1">
                  {dev.name}
                </h3>
                <p className="text-[11px] text-slate-400 leading-tight">
                  {dev.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Setup Note */}
          <div className="mt-8 p-4 rounded-sm bg-white/[0.02] border border-white/5 max-w-2xl mx-auto flex items-center justify-center gap-3 text-xs text-slate-400">
            <i className="ph-info-bold text-[#0099ff] text-base shrink-0"></i>
            <span>
              Receive detailed, step-by-step setup guides for your specific device in your activation email.
            </span>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 6. COMPARISON MATRIX (APOLLO VS CABLE VS GENERIC IPTV)        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Transparent Comparison
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              How Apollo Group TV Compares
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              See why cord-cutters are saving an average of $1,200 annually while getting ten times more content.
            </p>
          </div>

          {/* Responsive Table Container */}
          <div className="overflow-x-auto rounded-sm border border-white/10 bg-[#0c1015]/90 shadow-2xl">
            <table className="w-full text-left border-collapse min-w-[620px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="py-4 px-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Service Feature
                  </th>
                  <th className="py-4 px-5 text-xs font-extrabold text-[#0099ff] uppercase tracking-wider bg-[#0099ff]/10 border-x border-[#0099ff]/30">
                    Apollo Group TV ⭐
                  </th>
                  <th className="py-4 px-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Traditional Cable / Satellite
                  </th>
                  <th className="py-4 px-5 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Generic Cheap IPTV
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                {comparisonData.map((row, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-5 font-semibold text-white">
                      {row.feature}
                    </td>
                    <td className="py-4 px-5 font-bold text-emerald-400 bg-[#0099ff]/5 border-x border-[#0099ff]/20">
                      <div className="flex items-center gap-1.5">
                        <i className="ph-check-circle-bold text-emerald-400 text-base shrink-0"></i>
                        <span>{row.apollo}</span>
                      </div>
                    </td>
                    <td className="py-4 px-5 text-slate-400">
                      {row.cable}
                    </td>
                    <td className="py-4 px-5 text-slate-400">
                      {row.others}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 7. THREE-STEP ACTIVATION WORKFLOW                             */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5">
        <div className="w-[88%] lg:w-[80%] mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-12 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Effortless Setup
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Up and Running in Less Than 2 Minutes
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              No technicians, no hardware installation, and no complex configuration needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="p-6 rounded-sm bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/40 transition-all relative">
              <div className="w-9 h-9 rounded-full bg-[#0099ff] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-md shadow-[#0099ff]/30">
                1
              </div>
              <h3 className="text-base font-bold text-white mb-2">Select Your Subscription</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Choose the plan that suits you: 1, 3, 6, or 12 months. All plans include 100% of live channels and VOD.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/40 transition-all relative">
              <div className="w-9 h-9 rounded-full bg-[#0099ff] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-md shadow-[#0099ff]/30">
                2
              </div>
              <h3 className="text-base font-bold text-white mb-2">Instant Automated Delivery</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Your Xtream Codes credentials, M3U URL, and device tutorials arrive in your email inbox in under 60 seconds.
              </p>
            </div>

            <div className="p-6 rounded-sm bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/40 transition-all relative">
              <div className="w-9 h-9 rounded-full bg-[#0099ff] text-white font-extrabold text-sm flex items-center justify-center mb-4 shadow-md shadow-[#0099ff]/30">
                3
              </div>
              <h3 className="text-base font-bold text-white mb-2">Start Streaming</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                Input your credentials into TiviMate, Apollo app, or your favorite IPTV player and begin watching immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 8. FINAL HIGH-CONVERTING CTA BANNER                           */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-20 bg-gradient-to-b from-[#000304] to-[#040c14] overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#0099ff]/15 rounded-full blur-[140px] pointer-events-none -z-10" />

        <div className="w-[88%] lg:w-[80%] mx-auto text-center space-y-6">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Guaranteed Satisfaction
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-2xl mx-auto">
            Ready to Upgrade Your Television Experience?
          </h2>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Join over 150,000 satisfied households streaming worldwide with Apollo Group TV. Instant setup, 7-day money-back guarantee, and no contracts.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 pt-2">
            <Link
              to="/pricing"
              className="px-8 py-3.5 rounded-sm font-bold text-sm sm:text-base text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-lg shadow-[#0099ff]/35 hover:shadow-[#0099ff]/50 transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <span>Get Started Now</span>
              <i className="ph-arrow-right-bold text-base"></i>
            </Link>

            <Link
              to="/get-trail"
              className="px-7 py-3.5 rounded-sm font-semibold text-sm sm:text-base text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all inline-flex items-center gap-2"
            >
              <i className="ph-play-circle-bold text-lg text-[#0099ff]"></i>
              <span>Claim Free Trial</span>
            </Link>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <i className="ph-shield-check-bold text-[#0099ff]"></i>
              7-Day Money-Back Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <i className="ph-lightning-bold text-[#0099ff]"></i>
              Instant Automated Activation
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

export default Services
