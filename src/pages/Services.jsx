import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
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
  {
    name: 'Amazon Fire TV',
    desc: 'Firestick 4K, Cube & TVs',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.13zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.912-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.78-.65-1.44-.65h-.182c-.48.046-.896.196-1.246.46-.35.27-.575.63-.675 1.096-.06.3-.206.465-.435.51l-2.52-.315c-.248-.06-.372-.18-.372-.39 0-.046.007-.09.022-.15.247-1.29.855-2.25 1.82-2.88.976-.616 2.1-.975 3.39-1.05h.54c1.65 0 2.957.434 3.888 1.29.135.15.27.3.405.48.12.165.224.314.283.45.075.134.15.33.195.57.06.254.105.42.135.51.03.104.062.3.076.615.01.313.02.493.02.553v5.28c0 .376.06.72.165 1.036.105.313.21.54.315.674l.51.674c.09.136.136.256.136.36 0 .12-.06.226-.18.314-1.2 1.05-1.86 1.62-1.963 1.71-.165.135-.375.15-.63.045a6.062 6.062 0 01-.526-.496l-.31-.347a9.391 9.391 0 01-.317-.42l-.3-.435c-.81.886-1.603 1.44-2.4 1.665-.494.15-1.093.227-1.83.227-1.11 0-2.04-.343-2.76-1.034-.72-.69-1.08-1.665-1.08-2.94l-.05-.076zm3.753-.438c0 .566.14 1.02.425 1.364.285.34.675.512 1.155.512.045 0 .106-.007.195-.02.09-.016.134-.023.166-.023.614-.16 1.08-.553 1.424-1.178.165-.28.285-.58.36-.91.09-.32.12-.59.135-.8.015-.195.015-.54.015-1.005v-.54c-.84 0-1.484.06-1.92.18-1.275.36-1.92 1.17-1.92 2.43l-.035-.02zm9.162 7.027c.03-.06.075-.11.132-.17.362-.243.714-.41 1.05-.5a8.094 8.094 0 011.612-.24c.14-.012.28 0 .41.03.65.06 1.05.168 1.172.33.063.09.099.228.099.39v.15c0 .51-.149 1.11-.424 1.8-.278.69-.664 1.248-1.156 1.68-.073.06-.14.09-.197.09-.03 0-.06 0-.09-.012-.09-.044-.107-.12-.064-.24.54-1.26.806-2.143.806-2.64 0-.15-.03-.27-.087-.344-.145-.166-.55-.257-1.224-.257-.243 0-.533.016-.87.046-.363.045-.7.09-1 .135-.09 0-.148-.014-.18-.044-.03-.03-.036-.047-.02-.077 0-.017.006-.03.02-.063v-.06z" />
      </svg>
    ),
  },
  {
    name: 'Android TV / Box',
    desc: 'Nvidia Shield, Xiaomi, Sony',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
      </svg>
    ),
  },
  {
    name: 'Apple iOS & TV',
    desc: 'iPhone, iPad, Apple TV 4K',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
      </svg>
    ),
  },
  {
    name: 'Smart TVs',
    desc: 'Samsung Tizen, LG webOS',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <rect x="2" y="3.5" width="20" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.5 20.5h7M12 16.5v4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5.5 13a2 2 0 0 1 2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M5.5 10a5 5 0 0 1 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="5.5" cy="13" r="0.8" fill="currentColor" />
        <path d="M14.5 7.5h4M16.5 10h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
      </svg>
    ),
  },
  {
    name: 'PC & Mac',
    desc: 'Windows, macOS, Linux browser',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M0 0h11.377v11.372H0zm12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zm12.623 0H24V24H12.623" />
      </svg>
    ),
  },
  {
    name: 'MAG & Formuler',
    desc: 'Dedicated IPTV set-top boxes',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path d="M6 8V3M18 8V3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="6" cy="3" r="1.1" fill="currentColor" />
        <circle cx="18" cy="3" r="1.1" fill="currentColor" />
        <rect x="2" y="8" width="20" height="11" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <rect x="5" y="11" width="8" height="5" rx="1" stroke="currentColor" strokeWidth="1.2" opacity="0.85" />
        <path d="M7 13.5h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="15.8" cy="13.5" r="0.85" fill="currentColor" />
        <circle cx="18.2" cy="13.5" r="0.85" fill="currentColor" />
        <path d="M5 19v1.5M19 19v1.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
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

const servicesFaqs = [
  {
    question: 'What services does apollogrouptv provide to subscribers?',
    answer:
      'apollogrouptv provides a comprehensive premium IPTV streaming service featuring over 20,000 live international HD and 4K TV channels, 100,000+ on-demand movies and television series, 24/7 sports coverage with all PPV events included, an interactive 7-day electronic program guide (EPG), and multi-screen cloud connectivity across Firestick, Smart TVs, Android, iOS, and PC.',
  },
  {
    question: 'How does apollogrouptv prevent lag and buffering during live sports?',
    answer:
      'apollogrouptv is engineered with dedicated 10Gbps load-balanced server clusters across North America, Europe, and Asia. Powered by proprietary Anti-Freeze™ technology and automated network routing, apollogrouptv redistributes server load dynamically during high-traffic UFC, Champions League, and NFL finals to ensure buttery-smooth 60FPS playback with zero freezing.',
  },
  {
    question: 'Are all major sports PPV events included in apollogrouptv services?',
    answer:
      'Yes. Every subscription to apollogrouptv includes 100% unrestricted access to all major Pay-Per-View sporting events at no extra cost. Subscribers can watch UFC PPV fight nights, championship boxing, WWE, AEW, and high-octane Formula 1 race weekends without paying expensive one-off pay-per-view fees.',
  },
  {
    question: 'What live TV channels are included with apollogrouptv?',
    answer:
      'apollogrouptv delivers an extensive lineup of 20,000+ channels from the United States, United Kingdom, Canada, Australia, Europe, Latin America, and the Middle East. It spans premium live sports, breaking news, 24/7 reality TV, documentaries, movie networks, kids entertainment, and regional local affiliate stations.',
  },
  {
    question: 'Does apollogrouptv offer an Electronic Program Guide (EPG) and Catch-Up TV?',
    answer:
      'Yes, apollogrouptv includes an accurate, real-time Electronic Program Guide (EPG) with intuitive scheduling across all channels. Additionally, apollogrouptv features a 7-day cloud DVR Catch-Up TV service on top channels, allowing you to rewind, replay, or watch any broadcast you missed over the past week.',
  },
  {
    question: 'How often does apollogrouptv update its on-demand (VOD) cinema catalog?',
    answer:
      'The apollogrouptv Video On Demand (VOD) library is updated daily with the newest Hollywood theatrical releases, box-office movies, and complete multi-season series. Content is available in crystal-clear 4K HDR and Full HD with multi-language subtitle tracks and Dolby audio options.',
  },
  {
    question: 'How many screens can stream apollogrouptv at the same time?',
    answer:
      'Depending on your chosen subscription package, apollogrouptv supports up to 5 concurrent streams. This enables your family to stream live sports in the living room, watch a cinema release in the bedroom, and catch up on shows on tablets or phones simultaneously from one single apollogrouptv account.',
  },
  {
    question: 'Is apollogrouptv compatible with TiviMate and IPTV Smarters on Firestick?',
    answer:
      'Yes! apollogrouptv provides standard M3U playlists and Xtream Codes API login credentials, guaranteeing plug-and-play compatibility with popular IPTV apps like TiviMate, IPTV Smarters Pro, XCIPTV, and the dedicated Apollo Group TV app on Amazon Firestick 4K, Android TV boxes, Smart TVs, and mobile devices.',
  },
  {
    question: 'Do I need a VPN to stream apollogrouptv services?',
    answer:
      'A VPN is not mandatory because all apollogrouptv streaming links operate over 256-bit encrypted SSL connections that bypass standard ISP bandwidth throttling. However, apollogrouptv is completely VPN-friendly with no IP location restrictions, so you can freely stream with Surfshark, ExpressVPN, NordVPN, or any provider of your choice.',
  },
  {
    question: 'What internet speed is recommended for apollogrouptv 4K streaming?',
    answer:
      'For smooth Full HD (1080p) streaming on apollogrouptv, an internet speed of 15 Mbps is recommended. For Ultra HD 4K and 60FPS sports streaming without buffering, a broadband speed of 25–30 Mbps or higher delivers the best possible experience.',
  },
  {
    question: 'How fast is service activation after ordering apollogrouptv?',
    answer:
      'Activation of your apollogrouptv service is instant and automated. Immediately following checkout, your Xtream Codes credentials, M3U playlist URL, and step-by-step device setup tutorials are delivered to your email inbox and WhatsApp support within 60 seconds.',
  },
  {
    question: 'Can I test apollogrouptv services with a free trial before purchasing?',
    answer:
      'Yes, apollogrouptv offers a risk-free 10-day trial option so you can test our 4K video quality, server responsiveness, channel variety, and EPG functionality on your own devices before choosing a subscription package.',
  },
  {
    question: 'What customer support services does apollogrouptv provide?',
    answer:
      'apollogrouptv offers 24/7 dedicated customer assistance via live WhatsApp chat, Telegram, and ticket support. Whether you need assistance configuring TiviMate on your Firestick, setting up your Smart TV, or updating your account, our specialists respond within minutes.',
  },
]

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all')
  const [openFaq, setOpenFaq] = useState(0)

  const filteredServices =
    activeCategory === 'all'
      ? servicesList
      : servicesList.filter((s) => s.category === activeCategory)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: servicesFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }

  return (
    <div className="w-full bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white">
      <SEO
        title="Apollo Group TV Services | 20,000+ Live Channels, Movies & Sports"
        description="Explore Apollo Group TV services: 20,000+ live global channels, 100,000+ VOD movies, 4K sports PPVs, and anti-freeze servers on Firestick, Smart TVs, and mobile."
        canonical="/services"
        schema={faqSchema}
      />
      {/* ------------------------------------------------------------- */}
      {/* 1. HERO BANNER SECTION                                        */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-white/5">
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0099ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="absolute top-1/3 -left-32 w-80 h-80 bg-[#0099ff]/5 rounded-full blur-[120px] pointer-events-none -z-10" />

        <div className="w-[88%] lg:w-[80%] mx-auto text-center space-y-6">
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
                  {dev.renderIcon ? dev.renderIcon() : <i className={dev.icon}></i>}
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
      {/* 8. SERVICES FAQS TARGETING APOLOGROUPTV                       */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-16 lg:py-24 border-b border-white/5 bg-[#000304]">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              Got Questions? We Have Answers
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Frequently Asked Questions About apollogrouptv Services
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-xl mx-auto">
              Everything you need to know about apollogrouptv streaming services, device setup, 4K sports channels, and account activation.
            </p>
          </div>

          {/* FAQ Accordion List */}
          <div className="max-w-4xl mx-auto space-y-3.5">
            {servicesFaqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div
                  key={index}
                  className={`rounded-sm border transition-all duration-200 overflow-hidden ${isOpen
                      ? 'bg-[#0c1015] border-[#0099ff]/50 shadow-lg shadow-[#0099ff]/5'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
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
      {/* 9. FINAL HIGH-CONVERTING CTA BANNER                           */}
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
