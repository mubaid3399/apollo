import React, { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'

const reviewsData = [
  {
    id: 1,
    name: 'Marcus Vance',
    role: 'verified subscriber • 🇺🇸 United States',
    plan: 'Elite 180 Days Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    device: 'Amazon Firestick 4K Max',
    favorite: 'Live UFC PPV & ESPN+ 4K',
    shortComment:
      'Best IPTV service by far. Watched the entire UFC PPV card in 4K 60FPS without a single glitch or stutter. The anti-freeze servers are legit and streaming quality is incredible.',
    extendedComment:
      'I have tried at least 4 different streaming providers over the years and Apollo Group TV blows them all out of the water. Setting up Tivimate took less than 3 minutes using the M3U playlist link sent to my email. Channel switching is instantaneous with zero delay, audio sync is spot on, and customer support via WhatsApp answered my setup questions within 2 minutes. Best cord-cutting decision I made for live sports!',
    rating: 5,
    date: '3 days ago',
  },
  {
    id: 2,
    name: 'Liam Davies',
    role: 'verified subscriber • 🇬🇧 United Kingdom',
    plan: 'Professional 365 Days',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    device: 'Apple TV 4K & Fire TV Cube',
    favorite: 'Premier League 3PM & F1 Live',
    shortComment:
      'Saved over £1,100 this year. Completely cancelled Sky and Virgin Media. Apollo has every single 3 PM Saturday kickoff, Champions League, and F1 race in true HD.',
    extendedComment:
      'Replacing monthly cable bills with Apollo was painless. All 3 PM blackout games in the UK stream without any VPN requirement, and the frame rates on motorsport broadcasts are silky smooth 60fps. The Electronic Program Guide (EPG) updates automatically with accurate program listings. Highly recommended for every British football fan.',
    rating: 5,
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'David Tremblay',
    role: 'verified subscriber • 🇨🇦 Canada',
    plan: 'Growth 90 Days',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    device: 'Nvidia Shield TV Pro',
    favorite: 'NHL Center Ice & Cinema VOD',
    shortComment:
      'WhatsApp customer support replied in under 2 minutes! Had a quick question setting up Tivimate on my Android TV box and had my playlist active right away.',
    extendedComment:
      'Their support team provided step-by-step screenshots on WhatsApp to optimize buffer size settings on my Nvidia Shield. Every Montreal Canadiens and Toronto Maple Leafs game streams in true 1080p 60fps. The server uptime has been 100% since day one without random evening disconnects.',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    role: 'verified subscriber • 🇦🇺 Australia',
    plan: 'Elite 180 Days Member',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    device: 'Samsung 65" Smart TV & iPad Pro',
    favorite: 'Weekly 4K Movie Releases & Series',
    shortComment:
      'The on-demand movies section gets updated literally every week with the newest 4K releases. My entire family uses it daily across our Smart TV and iPad seamlessly.',
    extendedComment:
      'The video-on-demand library includes over 500,000 titles sorted cleanly by genre, release year, and IMDb ratings. Multi-language subtitles and 5.1 surround sound pass-through work flawlessly. My kids watch their animation series on the tablet while we stream live sports in the living room.',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 5,
    name: 'Michael Schmidt',
    role: 'verified subscriber • 🇩🇪 Germany',
    plan: 'Professional 365 Days',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    device: 'Sony Bravia Android TV',
    favorite: 'Bundesliga & Champions League',
    shortComment:
      'Reliable high-bandwidth servers. Crystal clear quality with EPG TV guide that actually works. Fast channel switching takes less than a second.',
    extendedComment:
      'Even during peak European Champions League matchdays when other providers lag and buffer, Apollo maintains high bandwidth with zero anti-freeze stutter. Having dedicated European CDN servers makes a massive difference in ping times and connection stability.',
    rating: 5,
    date: '3 weeks ago',
  },
  {
    id: 6,
    name: 'Hamza Rehman',
    role: 'verified subscriber • 🇵🇰 Pakistan',
    plan: '1 Year Subscriber',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    device: 'Mi TV Box S 2nd Gen',
    favorite: 'ICC Cricket, PSL & Global News',
    shortComment:
      'Got my login credentials within 60 seconds after signing up. Cricket matches, European football, and global news channels load immediately with zero lag.',
    extendedComment:
      'I was skeptical at first about speed in South Asia, but the streams load in less than 2 seconds even on a standard 20 Mbps fiber connection. All cricket live broadcasts during World Cup matches streamed in Full HD without a single drop. Incredible value compared to conventional cable providers.',
    rating: 5,
    date: '1 month ago',
  },
]

const StarRating = ({ count = 5 }) => (
  <div className="flex items-center gap-1">
    {[...Array(count)].map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.35)] shrink-0"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
)

const ReviewCard = ({ rev }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const extraContentRef = useRef(null)
  const isFirstRender = useRef(true)

  useEffect(() => {
    const el = extraContentRef.current
    if (!el) return

    if (isFirstRender.current) {
      isFirstRender.current = false
      gsap.set(el, { height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 })
      return
    }

    if (isExpanded) {
      // Smooth GSAP opening animation
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: 'auto',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      )
    } else {
      // Smooth GSAP closing animation
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        overwrite: 'auto',
      })
    }

    return () => {
      gsap.killTweensOf(el)
    }
  }, [isExpanded])

  return (
    <div className="bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/45 rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.7),0_0_25px_rgba(0,153,255,0.06)] flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-left transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.85),0_0_35px_rgba(0,153,255,0.15)]">
      {/* Circular Avatar on Left */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 shadow-lg ring-2 ring-[#0099ff]/30 ring-offset-2 ring-offset-[#0c1015] bg-zinc-900">
        <img
          src={rev.avatar}
          alt={rev.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Right Content Column */}
      <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left">
        {/* Name in Accent Blue */}
        <h3 className="text-lg sm:text-xl font-bold text-[#0099ff] tracking-tight">
          {rev.name}
        </h3>

        {/* Subtitle / Role */}
        <div className="text-xs sm:text-[13px] text-slate-400 font-medium italic mt-0.5 mb-2">
          {rev.role}
        </div>

        {/* 5 Golden Stars */}
        <div className="mb-3">
          <StarRating count={rev.rating} />
        </div>

        {/* Short Review Text */}
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-3">
          {rev.shortComment}
        </p>

        {/* GSAP Smooth Expandable Container */}
        <div ref={extraContentRef} className="overflow-hidden w-full">
          <div className="pt-3 pb-2 space-y-3.5 border-t border-white/10 mt-2">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {rev.extendedComment}
            </p>

            {/* Hardware & Streaming Badges */}
            <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
              <span className="px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-slate-300 flex items-center gap-1.5">
                <span>📺 Device:</span>
                <strong className="text-white font-medium">{rev.device}</strong>
              </span>
              <span className="px-3 py-1 rounded-md bg-[#0099ff]/10 border border-[#0099ff]/25 text-[#0099ff] flex items-center gap-1.5">
                <span>⚡ Favorite:</span>
                <strong className="text-white font-medium">{rev.favorite}</strong>
              </span>
            </div>

            {/* Plan and Date metadata */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-white/5">
              <span>{rev.plan}</span>
              <span>{rev.date}</span>
            </div>
          </div>
        </div>

        {/* "read more" / "read less" Pill Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 px-6 py-2 rounded-full bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#0099ff]/30 hover:shadow-lg hover:shadow-[#0099ff]/40 transition-all cursor-pointer flex items-center gap-1.5"
        >
          <span>{isExpanded ? 'read less' : 'read more'}</span>
          <svg
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  )
}

const ReviewsSection = () => {
  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5 bg-[#000304]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#0099ff]/10 rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-sky-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* 80% Container width matching Navbar & Hero */}
      <div className="w-[88%] lg:w-[80%] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Our Fans & Community
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[42px] font-bold text-white tracking-tight leading-tight">
            What Our Fans Are Saying
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Real feedback from thousands of active cord-cutters, sports fans, and movie lovers streaming daily with Apollo Group TV.
          </p>

          {/* Social Proof Rating Banner */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <StarRating count={5} />
            <span className="text-sm font-bold text-white">4.9 out of 5.0</span>
            <span className="text-xs sm:text-sm text-slate-400">
              based on 2,500+ verified customer reviews
            </span>
          </div>
        </div>

        {/* 2-Column Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {reviewsData.map((rev) => (
            <ReviewCard key={rev.id} rev={rev} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
