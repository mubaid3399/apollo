import React, { useState, useRef } from 'react'
import apolloMovieDetailImg from '../assets/apollo-movie-detail.webp'
import aboutMainImg from '../assets/about-main.webp'
import aboutVideoImg from '../assets/about-video.webp'
import whatIsApolloImg from '../assets/what is appolo.avif'

const categories = ['All', 'Featured', 'Live TV', 'Movies', 'Sports', 'TV Shows']

const allArticles = [
  {
    id: 1,
    title: 'Best Way to Stream IMDb Top Movies Using Apollo Group TV',
    category: 'Movies',
    excerpt:
      'Certainly, there are some movies that go beyond popularity. Decades after being released, the people keep talking about them, remembering quotes, and watching them because they can always have a good movie evening by doing so. It is precisely why the IMDb top movies list is considered to be one of the most credible sources to consult for film fans all around the globe.',
    date: 'October 28, 2026',
    readTime: '5 min read',
    image: apolloMovieDetailImg,
  },
  {
    id: 2,
    title: 'Apollo Group TV Guide to What to Watch This Week: and More!',
    category: 'Featured',
    excerpt:
      'Often, one of the most difficult tasks related to streaming does not involve looking for something interesting to watch. Instead, it requires choosing what is worth your precious time. Discover our handpicked recommendations for movies, sports, and series.',
    date: 'October 22, 2026',
    readTime: '4 min read',
    image: aboutMainImg,
  },
  {
    id: 3,
    title: "What Channel Is the Vikings Game On Today? Apollo's Smarter Way to Find Local Sports",
    category: 'Sports',
    excerpt:
      'Never miss a kickoff or game-winning play. Learn how to quickly locate and stream your favorite local sports broadcasts with zero buffering, dedicated anti-freeze servers, and crystal-clear 60FPS feeds.',
    date: 'October 15, 2026',
    readTime: '6 min read',
    image: aboutVideoImg,
  },
  {
    id: 4,
    title: 'How to Watch Every UFC Fight Night & Boxing PPV Without Cable',
    category: 'Live TV',
    excerpt:
      'Tired of spending $89.99 for a single pay-per-view card? Learn how Apollo Group TV includes all numbered UFC fight cards, championship boxing, and WWE events directly in your subscription at zero extra cost.',
    date: 'October 10, 2026',
    readTime: '5 min read',
    image: whatIsApolloImg,
  },
  {
    id: 5,
    title: 'Top 10 Binge-Worthy TV Series Streaming in 4K This Fall',
    category: 'TV Shows',
    excerpt:
      'From mind-bending sci-fi thrillers to gripping historical dramas, here are ten critically acclaimed series with full multi-season box sets available on Apollo Group TV in Ultra HD with Dolby Atmos audio.',
    date: 'October 05, 2026',
    readTime: '7 min read',
    image: apolloMovieDetailImg,
  },
  {
    id: 6,
    title: 'The Complete Firestick Setup Guide for Apollo Group TV',
    category: 'Featured',
    excerpt:
      'Step-by-step walkthrough for configuring your Amazon Firestick 4K Max or Fire TV Cube with Apollo Group TV and TiviMate in under 2 minutes for zero-latency streaming.',
    date: 'September 29, 2026',
    readTime: '3 min read',
    image: aboutMainImg,
  },
  {
    id: 7,
    title: 'Cord-Cutting 101: How to Save Over $1,200 Annually on TV Bills',
    category: 'Featured',
    excerpt:
      'Traditional cable packages continue to increase prices while delivering less value. Discover how thousands of households eliminated hidden fees, broadcast surcharges, and equipment rentals with Apollo Group TV.',
    date: 'September 20, 2026',
    readTime: '6 min read',
    image: aboutVideoImg,
  },
  {
    id: 8,
    title: 'Premier League & Champions League Football: Live Streaming Calendar',
    category: 'Sports',
    excerpt:
      'Your complete guide to catching every 3 PM Saturday kickoff, European midweek matches, and domestic cup ties in true Full HD and 4K without regional geo-blocking or ISP throttling.',
    date: 'September 14, 2026',
    readTime: '5 min read',
    image: whatIsApolloImg,
  },
  {
    id: 9,
    title: 'Customizing Your EPG and Electronic TV Guide for Maximum Efficiency',
    category: 'Live TV',
    excerpt:
      'Unlock the full potential of Apollo Group TV real-time Electronic Program Guide (EPG). Learn how to set up channel favorites, reminders, and utilize 7-day cloud DVR catch-up TV.',
    date: 'September 08, 2026',
    readTime: '4 min read',
    image: apolloMovieDetailImg,
  },
]

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const blogListRef = useRef(null)

  const itemsPerPage = 3

  // Filter articles based on active category
  const filteredArticles =
    activeCategory === 'All'
      ? allArticles
      : allArticles.filter(
          (article) =>
            article.category.toLowerCase() === activeCategory.toLowerCase()
        )

  // Calculate pagination
  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage) || 1
  const startIndex = (currentPage - 1) * itemsPerPage
  const currentArticles = filteredArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    if (blogListRef.current) {
      blogListRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const featuredArticle = currentArticles[0]
  const sideArticles = currentArticles.slice(1)

  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white pt-8 pb-20 lg:pt-14 lg:pb-28">
      {/* 80% Container width matching Navbar & Hero */}
      <div className="w-[88%] lg:w-[80%] mx-auto" ref={blogListRef}>
        {/* Page Header (Matching Reference Screenshot & Hero H1 Typography) */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            Our Blog
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Latest updates, guides, and streaming insights from Apollo Group TV
          </p>
        </div>

        {/* Category Filter Pills (Exact Styling from Reference Screenshot) */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {categories.map((cat) => {
            const isActive = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0099ff] text-white shadow-md shadow-[#0099ff]/30'
                    : 'bg-[#0c1015] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/10'
                }`}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* Blog Cards Layout (3 Blogs per page) */}
        {filteredArticles.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            No articles found in the "{activeCategory}" category.
          </div>
        ) : (
          <div>
            {currentArticles.length === 3 ? (
              /* Asymmetric 7/5 Grid Matching the Screenshot */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                {/* Left Column: Large Full-Bleed Featured Card */}
                {featuredArticle && (
                  <div className="lg:col-span-7 flex">
                    <div className="group relative flex flex-col justify-end w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#0099ff]/50 transition-colors duration-300 p-6 sm:p-8 lg:p-10 text-left bg-[#0c1015]">
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

                        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-tight group-hover:text-[#0099ff] transition-colors mb-3">
                          {featuredArticle.title}
                        </h2>

                        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-2xl mb-4 line-clamp-3">
                          {featuredArticle.excerpt}
                        </p>

                        <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                          <span>{featuredArticle.date}</span>
                          <span>•</span>
                          <span>{featuredArticle.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Right Column: Two Stacked Full-Bleed Cards */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {sideArticles.map((article) => (
                    <div
                      key={article.id}
                      className="group relative flex flex-col justify-end flex-1 min-h-[260px] sm:min-h-[275px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#0099ff]/50 transition-colors duration-300 p-6 sm:p-7 text-left bg-[#0c1015]"
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

                        <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#0099ff] transition-colors mb-2">
                          {article.title}
                        </h2>

                        <p className="text-xs text-slate-300 leading-relaxed font-normal line-clamp-2 mb-3">
                          {article.excerpt}
                        </p>

                        <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                          <span>{article.date}</span>
                          <span>•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Flexible Grid When 1 or 2 Articles are in Filter */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {currentArticles.map((article) => (
                  <div
                    key={article.id}
                    className="group relative flex flex-col justify-end min-h-[380px] sm:min-h-[440px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#0099ff]/50 transition-colors duration-300 p-6 sm:p-8 text-left bg-[#0c1015]"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 via-55% to-black/35 pointer-events-none" />
                    <div className="relative z-10">
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold bg-black/60 text-white backdrop-blur-md border border-white/20 mb-2.5">
                        {article.category}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug group-hover:text-[#0099ff] transition-colors mb-2">
                        {article.title}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal line-clamp-3 mb-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs font-medium text-slate-400">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Future-Ready Pagination (No Read More Button) */}
        {totalPages > 1 && (
          <div className="mt-14 sm:mt-18 flex items-center justify-center gap-2 sm:gap-3">
            {/* Previous Button */}
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed bg-[#0c1015] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.06] hover:border-white/20"
              aria-label="Previous Page"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page Number Buttons */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                const isActive = currentPage === pageNum
                return (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center justify-center ${
                      isActive
                        ? 'bg-[#0099ff] text-white shadow-md shadow-[#0099ff]/30'
                        : 'bg-[#0c1015] text-slate-300 hover:text-white hover:bg-white/[0.06] border border-white/10'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            {/* Next Button */}
            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed bg-[#0c1015] border border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.06] hover:border-white/20"
              aria-label="Next Page"
            >
              <span className="hidden sm:inline">Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog
