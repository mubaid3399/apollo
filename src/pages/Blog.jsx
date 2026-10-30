import React, { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { blogsData } from '../assets/data/blogsData'

const categories = ['All', 'Featured', 'Live TV', 'Movies', 'Sports', 'TV Shows']

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [currentPage, setCurrentPage] = useState(1)
  const blogListRef = useRef(null)

  const itemsPerPage = 3

  // Filter articles based on active category
  const filteredArticles =
    activeCategory === 'All'
      ? blogsData
      : blogsData.filter(
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
      <SEO
        title="Streaming Guides & Insights | Apollo Group TV Blog"
        description="Latest news, sports broadcasting tips, holiday movie streaming guides, and tutorials for Apollo Group TV on Firestick, Apple TV, and Android."
        canonical="/blog"
      />
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
                    <Link
                      to={`/blog/${featuredArticle.slug}`}
                      className="group relative flex flex-col justify-end w-full min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] rounded-2xl overflow-hidden border border-white/10 hover:border-[#0099ff]/50 transition-colors duration-300 p-6 sm:p-8 lg:p-10 text-left bg-[#0c1015]"
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
                    </Link>
                  </div>
                )}

                {/* Right Column: Two Stacked Full-Bleed Cards */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {sideArticles.map((article) => (
                    <Link
                      key={article.id}
                      to={`/blog/${article.slug}`}
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
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              /* Flexible Grid When 1 or 2 Articles are in Filter */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {currentArticles.map((article) => (
                  <Link
                    key={article.id}
                    to={`/blog/${article.slug}`}
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
                  </Link>
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
