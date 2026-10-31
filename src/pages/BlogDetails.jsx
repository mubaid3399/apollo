import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/common/SEO'
import { blogsData } from '../assets/data/blogsData'

const BlogDetails = () => {
  const { slug } = useParams()
  const [openFaq, setOpenFaq] = useState(0)
  const [activeSection, setActiveSection] = useState('')

  const article = blogsData.find(
    (b) => b.slug === slug || String(b.id) === slug
  )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (!article && slug) {
      // Forward to server-rendered guide template for dynamically dropped-in guides
      window.location.replace(`/guides/${slug}`)
    }
  }, [slug, article])

  // Track active section for Table of Contents
  useEffect(() => {
    const handleScroll = () => {
      if (!article?.toc) return
      const scrollY = window.scrollY + 120

      for (let i = article.toc.length - 1; i >= 0; i--) {
        const item = article.toc[i]
        const element = document.getElementById(item.id)
        if (element && element.offsetTop <= scrollY) {
          setActiveSection(item.id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [article?.toc])

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const topOffset = 90
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - topOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      })
      setActiveSection(id)
    }
  }

  if (!article) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18] mb-4">
          Article Not Found
        </h1>
        <Link
          to="/blog"
          className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0099ff] hover:bg-[#0088ee] transition-all"
        >
          Back to Blog
        </Link>
      </div>
    )
  }

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    datePublished: '2026-07-28T08:00:00+00:00',
    dateModified: '2026-10-30T12:00:00+00:00',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://apollogroup.click/blog/${article.slug}`,
    },
    author: {
      '@type': 'Person',
      name: article.author?.name || 'Marcus Vance',
      jobTitle: article.author?.role || 'Entertainment Editor',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Apollo Group TV',
      logo: {
        '@type': 'ImageObject',
        url: 'https://apollogroup.click/favicon.png',
      },
    },
  }

  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white">
      <SEO
        title={article.metaTitle || article.title}
        description={article.excerpt}
        canonical={`/blog/${article.slug}`}
        ogType="article"
        schema={articleSchema}
      />
      {/* ------------------------------------------------------------- */}
      {/* 1. FULL-SCREEN HERO BANNER WITH BACKGROUND IMAGE & META TITLE  */}
      {/* ------------------------------------------------------------- */}
      <section className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex flex-col justify-end overflow-hidden border-b border-white/10">
        {/* Full-Bleed Background Image */}
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 w-full h-full object-cover object-center scale-105"
        />

        {/* Ambient Dark Gradient Overlays (Matches Screenshot) */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#000304] via-[#000304]/80 via-55% to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#000304]/80 via-transparent to-[#000304]/50 pointer-events-none" />


        {/* Hero Content Container (Overlaid on Bottom Left) */}
        <div className="relative z-10 w-[88%] lg:w-[80%] mx-auto pb-12 sm:pb-16 text-left">
          {/* Breadcrumb Back Link */}
          <div className="mb-4">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-300 hover:text-[#0099ff] transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to all articles</span>
            </Link>
          </div>

          {/* Date Label */}
          <div className="text-xs sm:text-sm font-medium text-slate-300 mb-2">
            {article.date}
          </div>

          {/* Meta Title with Hero H1 Typography */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18] max-w-4xl">
            {article.metaTitle || article.title}
          </h1>
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* 2. MAIN BODY: STICKY TABLE OF CONTENTS + ARTICLE CONTENT      */}
      {/* ------------------------------------------------------------- */}
      <section className="relative z-10 w-full py-12 lg:py-20">
        <div className="w-[88%] lg:w-[80%] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">

            {/* Left Column: Simple Clean Table of Contents (Matches Screenshots) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-24 text-left">
              <div className="pr-2 lg:pr-6">
                <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 tracking-tight">
                  Table of Contents
                </h2>

                <nav className="space-y-1.5" aria-label="Table of contents">
                  {article.toc &&
                    article.toc.map((item) => {
                      const isActive = activeSection === item.id
                      const isSubItem = item.level === 2

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => scrollToSection(item.id)}
                          className={`w-full text-left transition-colors cursor-pointer block leading-snug ${isSubItem
                            ? 'pl-4 text-xs sm:text-sm py-1'
                            : 'text-sm sm:text-base font-medium py-1.5'
                            } ${isActive
                              ? 'text-[#0099ff] font-semibold'
                              : isSubItem
                                ? 'text-slate-400 hover:text-[#0099ff]'
                                : 'text-slate-200 hover:text-[#0099ff]'
                            }`}
                        >
                          {item.title}
                        </button>
                      )
                    })}
                </nav>

                {/* Free Trial Mini Widget under TOC */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="text-xs text-slate-400 mb-2">Ready to stream?</div>
                  <Link
                    to="/get-trail"
                    className="inline-block px-4 py-2.5 rounded-sm font-bold text-xs text-white bg-[#0099ff] hover:bg-[#0088ee] transition-all"
                  >
                    Get 10 Days Free Trial →
                  </Link>
                </div>
              </div>
            </aside>

            {/* Right Column: Complete Article Content */}
            <main className="lg:col-span-8 space-y-10 text-left">
              {/* Introduction Section */}
              <div id="intro" className="space-y-4">
                {article.introParagraphs &&
                  article.introParagraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal"
                    >
                      {para}
                    </p>
                  ))}
              </div>

              {/* Section: IMDb Top Movies at a Glance */}
              {article.glanceTable && (
                <div id="imdb-glance" className="space-y-4 pt-4">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    IMDb Top Movies at a Glance
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Here is a quick overview of the most celebrated titles available to stream on demand:
                  </p>

                  {/* Clean Styled Table */}
                  <div className="overflow-x-auto rounded-sm border border-white/10 bg-[#0c1015]/90 shadow-xl">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.03]">
                          {article.glanceTable.headers.map((h, i) => (
                            <th
                              key={i}
                              className="py-3.5 px-4 text-xs font-bold text-slate-300 uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                        {article.glanceTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {row[0]}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {row[1]}
                            </td>
                            <td className="py-3.5 px-4 text-slate-300">
                              {row[2]}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-[#0099ff]">
                              {row[3]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Section: Why These Movies Continue to Dominate IMDb Rankings */}
              <div id="why-dominate" className="space-y-4 pt-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Why These Movies Continue to Dominate IMDb Rankings?
                </h2>
                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  {article.whyDominateText}
                </p>
              </div>

              {/* Numbered Movie Details Breakdown (Shawshank, Godfather, Seven, etc.) */}
              {article.movieDetails &&
                article.movieDetails.map((movie) => (
                  <div
                    key={movie.id}
                    id={movie.id}
                    className="p-6 sm:p-7 rounded-sm bg-[#0c1015] border border-white/10 space-y-4 pt-6"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-[#0099ff] text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                        {movie.number}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {movie.title}
                      </h3>
                    </div>

                    {/* Metadata Grid */}
                    <div
                      id={`${movie.id}-details`}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm bg-white/[0.02] p-4 rounded-sm border border-white/5"
                    >
                      <div>
                        <span className="text-slate-400 font-medium">Release Date: </span>
                        <span className="text-white font-semibold">{movie.releaseDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Genre: </span>
                        <span className="text-white font-semibold">{movie.genre}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">IMDb Rating: </span>
                        <span className="text-[#0099ff] font-bold">{movie.imdbRating}</span>
                      </div>
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 font-medium">Main Cast: </span>
                        <span className="text-slate-200">{movie.mainCast}</span>
                      </div>
                    </div>

                    {/* Storyline */}
                    <div>
                      <h4 className="text-sm font-bold text-white mb-1">Storyline</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {movie.storyline}
                      </p>
                    </div>

                    {/* Plot Breakdown */}
                    <div id={`${movie.id}-plot`}>
                      <h4 className="text-sm font-bold text-white mb-1">Plot Breakdown</h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {movie.plot}
                      </p>
                    </div>

                    {/* Who Will Enjoy It */}
                    <div
                      id={`${movie.id}-audience`}
                      className="p-3.5 bg-[#0099ff]/10 border-l-2 border-[#0099ff] text-xs sm:text-sm text-slate-300"
                    >
                      <strong className="text-white">Who Will Enjoy It? </strong>
                      {movie.whoWillEnjoy}
                    </div>
                  </div>
                ))}

              {/* Section: Feature Comparison Table */}
              {article.comparisonTable && (
                <div id="comparison-table" className="space-y-4 pt-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Feature Comparison Table
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    How Apollo Group TV delivers superior value compared to traditional cable and standalone streaming platforms:
                  </p>

                  <div className="overflow-x-auto rounded-sm border border-white/10 bg-[#0c1015]/90 shadow-xl">
                    <table className="w-full text-left border-collapse min-w-[500px]">
                      <thead>
                        <tr className="border-b border-white/10 bg-white/[0.03]">
                          {article.comparisonTable.headers.map((h, i) => (
                            <th
                              key={i}
                              className="py-3.5 px-4 text-xs font-bold text-slate-300 uppercase tracking-wider"
                            >
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 text-xs sm:text-sm">
                        {article.comparisonTable.rows.map((row, rIdx) => (
                          <tr
                            key={rIdx}
                            className="hover:bg-white/[0.02] transition-colors"
                          >
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {row[0]}
                            </td>
                            <td className="py-3.5 px-4 font-bold text-emerald-400 bg-[#0099ff]/5">
                              {row[1]}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">
                              {row[2]}
                            </td>
                            <td className="py-3.5 px-4 text-slate-400">
                              {row[3]}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Section: Article-Specific FAQs */}
              {article.faqs && article.faqs.length > 0 && (
                <div id="faqs" className="space-y-4 pt-6">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Frequently Asked Questions (FAQs)
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-400">
                    Common questions regarding streaming classic movies, live sports, and VOD on Apollo Group TV:
                  </p>

                  <div className="space-y-3">
                    {article.faqs.map((faq, fIdx) => {
                      const isOpen = openFaq === fIdx
                      return (
                        <div
                          key={fIdx}
                          className={`rounded-sm border transition-all duration-200 overflow-hidden ${isOpen
                            ? 'bg-[#0c1015] border-[#0099ff]/50'
                            : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                            }`}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenFaq(isOpen ? null : fIdx)}
                            className="w-full py-4 px-5 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                            aria-expanded={isOpen}
                          >
                            <span
                              className={`text-sm sm:text-base font-bold transition-colors ${isOpen ? 'text-[#0099ff]' : 'text-white'
                                }`}
                            >
                              {faq.question}
                            </span>
                            <div
                              className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 border transition-all ${isOpen
                                ? 'bg-[#0099ff] border-[#0099ff] text-white rotate-45'
                                : 'bg-white/[0.05] border-white/10 text-slate-300'
                                }`}
                            >
                              <i className="ph-plus-bold text-xs"></i>
                            </div>
                          </button>

                          {isOpen && (
                            <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in duration-150">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Section: Conclusion & CTA */}
              <div id="conclusion" className="p-8 rounded-sm bg-gradient-to-br from-[#0c1015] to-[#040c14] border border-[#0099ff]/30 text-left space-y-4 pt-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  Conclusion
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
                  Watching IMDb top-rated movies, live TV channels, and PPV sports events does not have to mean paying five separate monthly subscriptions or dealing with regional blackouts. Apollo Group TV provides a reliable, all-in-one entertainment hub tuned for 4K picture quality, zero buffering, and multi-device freedom.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/get-trail"
                    className="px-6 py-3 rounded-sm font-bold text-sm text-white bg-[#0099ff] hover:bg-[#0088ee] transition-all shadow-md shadow-[#0099ff]/30"
                  >
                    Start 10 Days Free Trial
                  </Link>
                  <Link
                    to="/pricing"
                    className="px-6 py-3 rounded-sm font-semibold text-sm text-slate-200 bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 transition-all"
                  >
                    View All Packages
                  </Link>
                </div>
              </div>
            </main>

          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogDetails
