import React, { useState } from 'react'

const reviewsData = [
  {
    id: 1,
    name: 'Marcus Vance',
    role: 'verified subscriber • 🇺🇸 United States',
    plan: 'Elite 180 Days Member',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    shortComment:
      'Best IPTV service by far. Watched the entire UFC PPV card in 4K 60FPS without a single glitch or stutter. The anti-freeze servers are legit and streaming quality is incredible.',
    fullComment:
      'Best IPTV service by far. I have tried at least 4 different streaming providers over the years and Apollo Group TV blows them all out of the water. Watched the entire UFC PPV card in 4K 60FPS without a single glitch or stutter. The anti-freeze servers are legit, channel switching is instantaneous, and customer support via WhatsApp replied within 2 minutes. Best decision I made for live sports!',
    rating: 5,
    date: '3 days ago',
  },
  {
    id: 2,
    name: 'Liam Davies',
    role: 'verified subscriber • 🇬🇧 United Kingdom',
    plan: 'Professional 365 Days',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    shortComment:
      'Saved over £1,100 this year. Completely cancelled Sky and Virgin Media. Apollo has every single 3 PM Saturday kickoff, Champions League, and F1 race in true HD.',
    fullComment:
      'Saved over £1,100 this year. Completely cancelled Sky and Virgin Media. Apollo has every single 3 PM Saturday kickoff, Champions League, and F1 race in true HD. Super easy to configure on my Amazon Firestick 4K Max with Tivimate. EPG guide is always up to date and playback is silky smooth.',
    rating: 5,
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'David Tremblay',
    role: 'verified subscriber • 🇨🇦 Canada',
    plan: 'Growth 90 Days',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&auto=format&fit=crop&q=80',
    shortComment:
      'WhatsApp customer support replied in under 2 minutes! Had a quick question setting up Tivimate on my Android TV box and had my playlist active right away.',
    fullComment:
      'WhatsApp customer support replied in under 2 minutes! Had a quick question setting up Tivimate on my Android TV box. Reached out to their WhatsApp support and had my playlist active and customized within minutes. Incredible customer service that actually cares about solving your problem.',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    role: 'verified subscriber • 🇦🇺 Australia',
    plan: 'Elite 180 Days Member',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    shortComment:
      'The on-demand movies section gets updated literally every week with the newest 4K releases. My entire family uses it daily across our Smart TV and iPad seamlessly.',
    fullComment:
      'The on-demand movies section gets updated literally every week with the newest 4K releases. My entire family uses it daily across our Smart TV and iPad without needing separate accounts. Outstanding audio and video quality on every stream.',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 5,
    name: 'Michael Schmidt',
    role: 'verified subscriber • 🇩🇪 Germany',
    plan: 'Professional 365 Days',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&auto=format&fit=crop&q=80',
    shortComment:
      'Reliable high-bandwidth servers. Crystal clear quality with EPG TV guide that actually works. Fast channel switching takes less than a second.',
    fullComment:
      'Reliable high-bandwidth servers. Never going back to cable. Crystal clear quality with EPG TV guide that actually works. The interface is responsive and fast channel switching takes less than a second. 10/10 recommendation for sports and entertainment fans alike.',
    rating: 5,
    date: '3 weeks ago',
  },
  {
    id: 6,
    name: 'Hamza Rehman',
    role: 'verified subscriber • 🇵🇰 Pakistan',
    plan: '1 Year Subscriber',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80',
    shortComment:
      'Got my login credentials within 60 seconds after signing up. Cricket matches, European football, and global news channels load immediately with zero lag.',
    fullComment:
      'Got my login credentials within 60 seconds after signing up. Cricket matches, European football, and global news channels load immediately with zero lag. Outstanding value for money with high-definition servers and zero buffering.',
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

const ReviewsSection = () => {
  const [expandedIds, setExpandedIds] = useState({})

  const toggleExpand = (id) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

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

        {/* Reviews Grid Inspired Exactly by Image 2 (Horizontal White Cards with Circular Avatar & Read More Button) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {reviewsData.map((rev) => {
            const isExpanded = !!expandedIds[rev.id]

            return (
              <div
                key={rev.id}
                className="bg-white rounded-[28px] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(0,153,255,0.08)] flex flex-col sm:flex-row items-center sm:items-start gap-5 sm:gap-6 text-left transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.65),0_0_35px_rgba(0,153,255,0.18)]"
              >
                {/* Circular Avatar on Left (Matching Image 2) */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden shrink-0 shadow-md ring-4 ring-slate-100 bg-slate-100">
                  <img
                    src={rev.avatar}
                    alt={rev.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Right Content Column (Name, Role, Text, Stars, Read More Button) */}
                <div className="flex-1 min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left">
                  {/* Name in Accent Blue (from Image 2) */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#0099ff] tracking-tight">
                    {rev.name}
                  </h3>

                  {/* Subtitle / Role (from Image 2) */}
                  <div className="text-xs sm:text-[13px] text-slate-500 font-medium italic mt-0.5 mb-2">
                    {rev.role}
                  </div>

                  {/* 5 Golden Stars */}
                  <div className="mb-3">
                    <StarRating count={rev.rating} />
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                    {isExpanded ? rev.fullComment : rev.shortComment}
                  </p>

                  {/* "read more" Pill Button (Matching Image 2) */}
                  <button
                    type="button"
                    onClick={() => toggleExpand(rev.id)}
                    className="px-6 py-2 rounded-full bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] text-white text-xs sm:text-sm font-semibold shadow-md shadow-[#0099ff]/25 hover:shadow-lg hover:shadow-[#0099ff]/35 transition-all cursor-pointer"
                  >
                    {isExpanded ? 'read less' : 'read more'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
