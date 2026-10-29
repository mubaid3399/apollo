import React from 'react'

const reviews = [
  {
    id: 1,
    name: 'Marcus Vance',
    location: 'United States',
    flag: '🇺🇸',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    plan: 'Elite 180 Days Member',
    headline: 'Best IPTV service by far. Zero buffering on live UFC fights!',
    comment:
      'I have tried at least 4 different streaming providers over the years and Apollo Group TV blows them all out of the water. Watched the entire UFC PPV card in 4K 60FPS without a single glitch or stutter. The anti-freeze servers are legit.',
    rating: 5,
    date: '3 days ago',
  },
  {
    id: 2,
    name: 'Liam Davies',
    location: 'United Kingdom',
    flag: '🇬🇧',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    plan: 'Professional 365 Days',
    headline: 'Saved over £1,100 this year. Premier League streams are flawless.',
    comment:
      'Completely cancelled Sky and Virgin Media. Apollo has every single 3 PM Saturday kickoff, Champions League, and F1 race in true HD. Super easy to configure on my Amazon Firestick 4K Max.',
    rating: 5,
    date: '1 week ago',
  },
  {
    id: 3,
    name: 'David Tremblay',
    location: 'Canada',
    flag: '🇨🇦',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    plan: 'Growth 90 Days',
    headline: 'WhatsApp customer support replied in under 2 minutes!',
    comment:
      'Had a quick question setting up Tivimate on my Android TV box. Reached out to their WhatsApp support and had my playlist active and customized within minutes. Incredible customer service.',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 4,
    name: 'Sarah Jenkins',
    location: 'Australia',
    flag: '🇦🇺',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    plan: 'Elite 180 Days Member',
    headline: 'Massive VOD catalog with cinema releases and TV series.',
    comment:
      'The on-demand movies section gets updated literally every week with the newest 4K releases. My entire family uses it daily across our Smart TV and iPad without needing separate accounts.',
    rating: 5,
    date: '2 weeks ago',
  },
  {
    id: 5,
    name: 'Michael Schmidt',
    location: 'Germany',
    flag: '🇩🇪',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    plan: 'Professional 365 Days',
    headline: 'Reliable high-bandwidth servers. Never going back to cable.',
    comment:
      'Crystal clear quality with EPG TV guide that actually works. The interface is responsive and fast channel switching takes less than a second. 10/10 recommendation for sports fans.',
    rating: 5,
    date: '3 weeks ago',
  },
  {
    id: 6,
    name: 'Hamza Rehman',
    location: 'Pakistan',
    flag: '🇵🇰',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    plan: '1 Year Subscriber',
    headline: 'Instant activation and every sports channel in crisp quality.',
    comment:
      'Got my login credentials within 60 seconds after signing up. Cricket matches, European football, and global news channels load immediately with zero lag. Outstanding value for the money.',
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
  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5 bg-[#000304]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-1/4 w-[650px] h-[350px] bg-[#0099ff]/5 rounded-full blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-400/5 rounded-full blur-[130px] pointer-events-none -z-10" />

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
            <span className="text-sm font-bold text-white">
              4.9 out of 5.0
            </span>
            <span className="text-xs sm:text-sm text-slate-400">
              based on 2,500+ verified customer reviews
            </span>
          </div>
        </div>

        {/* 6 Reviews Grid (3 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="rounded-2xl p-6 sm:p-7 bg-[#0c1015] border border-white/10 hover:border-[#0099ff]/45 transition-colors duration-300 flex flex-col justify-between text-left group"
            >
              <div>
                {/* 5 Proper Golden Stars & Verified Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <StarRating count={rev.rating} />

                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <svg className="w-3 h-3" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Verified Subscriber
                  </span>
                </div>

                {/* Review Headline */}
                <h3 className="text-base font-bold text-white tracking-tight mb-2 group-hover:text-[#0099ff] transition-colors leading-snug">
                  "{rev.headline}"
                </h3>

                {/* Review Comment */}
                <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal mb-5">
                  {rev.comment}
                </p>
              </div>

              {/* Reviewer Details Footer with Real User Photo */}
              <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Real User Photo Avatar */}
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#0099ff]/30 shrink-0 bg-zinc-800">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5">
                      <span>{rev.name}</span>
                      <span title={rev.location} className="text-xs">{rev.flag}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-medium">
                      {rev.plan}
                    </div>
                  </div>
                </div>

                <span className="text-[11px] text-slate-500 shrink-0">
                  {rev.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewsSection
