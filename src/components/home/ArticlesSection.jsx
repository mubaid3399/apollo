import React from 'react'
import { Link } from 'react-router-dom'
import apolloMovieDetailImg from '../../assets/apollo-movie-detail.webp'
import aboutMainImg from '../../assets/about-main.webp'
import aboutVideoImg from '../../assets/about-video.webp'

const articles = [
  {
    id: 1,
    title: 'Best Way to Stream IMDb Top Movies Using Apollo Group TV',
    category: 'Movies',
    excerpt:
      'Certainly, there are some movies that go beyond popularity. Decades after being released, the people keep talking about them, remembering quotes, and watching them because they can always have a good movie evening by doing so. It is precisely why the IMDb top movies list is considered to be one of the most credible sources to consult for film fans all around the globe.',
    date: 'July 28, 2026',
    image: apolloMovieDetailImg,
  },
  {
    id: 2,
    title: 'Apollo Group TV Guide to What to Watch This Week: and More!',
    category: 'Movies',
    excerpt:
      'Often, one of the most difficult tasks related to streaming does not involve looking for something interesting to watch. Instead, it requires choosing what is worth your precious time.',
    date: 'July 22, 2026',
    image: aboutMainImg,
  },
  {
    id: 3,
    title: "What Channel Is the Vikings Game On Today Apollo's Smarter Way to Find Local Sports",
    category: 'TV Shows',
    excerpt:
      'Never miss a kickoff or game-winning play. Learn how to quickly locate and stream your favorite local sports broadcasts with zero buffering.',
    date: 'July 15, 2026',
    image: aboutVideoImg,
  },
]

const ArticlesSection = () => {
  const featuredArticle = articles[0]
  const sideArticles = articles.slice(1)

  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5 bg-[#000304]">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#0099ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-600/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* 80% Container width matching Navbar & Hero */}
      <div className="w-[88%] lg:w-[80%] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-3">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            News & Streaming Guides
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-white tracking-tight leading-tight">
            Latest Articles & Updates
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Stay up to date with the latest streaming tricks, movie recommendations, sports schedules, and platform guides.
          </p>
        </div>

        {/* Asymmetric Full-Bleed Article Grid (Exact Layout from Reference Image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* Left Column: Large Full-Bleed Featured Card */}
          <div className="lg:col-span-7 flex">
            <Link
              to="/blog"
              className="group relative flex flex-col justify-end w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] rounded-sm overflow-hidden border border-white/10 hover:border-[#0099ff]/50 transition-colors duration-300 p-6 sm:p-8 lg:p-10 text-left"
            >
              {/* Full-Bleed Background Image */}
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Gradient Overlay for Maximum Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-60% to-black/30 pointer-events-none" />

              {/* Text Content Overlayed on Image */}
              <div className="relative z-10">
                <span className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 mb-3.5">
                  {featuredArticle.category}
                </span>

                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-[#0099ff] transition-colors mb-3">
                  {featuredArticle.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl mb-4 line-clamp-4">
                  {featuredArticle.excerpt}
                </p>

                <div className="text-xs font-medium text-slate-400">
                  {featuredArticle.date}
                </div>
              </div>
            </Link>
          </div>

          {/* Right Column: Two Stacked Full-Bleed Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {sideArticles.map((article) => (
              <Link
                key={article.id}
                to="/blog"
                className="group relative flex flex-col justify-end flex-1 min-h-[280px] sm:min-h-[300px] rounded-sm overflow-hidden border border-white/10 hover:border-[#0099ff]/50 transition-colors duration-300 p-6 sm:p-7 text-left"
              >
                {/* Full-Bleed Background Image */}
                <img
                  src={article.image}
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-55% to-black/35 pointer-events-none" />

                {/* Text Content Overlayed on Image */}
                <div className="relative z-10">
                  <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 mb-2.5">
                    {article.category}
                  </span>

                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#0099ff] transition-colors mb-2">
                    {article.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-3 mb-3">
                    {article.excerpt}
                  </p>

                  <div className="text-xs font-medium text-slate-400">
                    {article.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>

        </div>

        {/* Read More Button Redirecting to Blogs Page */}
        <div className="mt-12 lg:mt-16 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-sm font-semibold text-sm sm:text-base text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-lg shadow-[#0099ff]/25 hover:shadow-[#0099ff]/35 transition-all cursor-pointer"
          >
            <span>Read More</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}

export default ArticlesSection
