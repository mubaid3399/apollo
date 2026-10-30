import React, { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { blogsData } from '../assets/data/blogsData'

const BlogDetails = () => {
  const { slug } = useParams()
  const navigate = useNavigate()

  const article = blogsData.find((b) => b.slug === slug || String(b.id) === slug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [slug])

  if (!article) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20 text-white">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18] mb-4">
          Article Not Found
        </h1>
        <p className="text-sm text-slate-400 mb-8 max-w-md">
          The article you are looking for might have been moved or is currently unavailable.
        </p>
        <Link
          to="/blog"
          className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#0099ff] hover:bg-[#0088ee] transition-all"
        >
          Back to Blog
        </Link>
      </div>
    )
  }

  // Related articles (excluding current)
  const relatedArticles = blogsData
    .filter((b) => b.id !== article.id)
    .slice(0, 3)

  return (
    <div className="w-full min-h-screen bg-[#000304] text-white selection:bg-[#0099ff]/30 selection:text-white pt-6 pb-20 lg:pt-10 lg:pb-28">
      {/* Container */}
      <div className="w-[88%] lg:w-[80%] mx-auto">
        {/* Navigation Breadcrumb */}
        <div className="mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-[#0099ff] transition-colors"
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
            <span>Back to All Articles</span>
          </Link>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto space-y-4 mb-8 sm:mb-10 text-left">
          {/* Category Badge */}
          <div className="inline-block px-3.5 py-1 rounded-full text-xs font-semibold bg-[#0099ff]/15 text-[#0099ff] border border-[#0099ff]/30">
            {article.category}
          </div>

          {/* Unified H1 Typography matching Hero */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            {article.title}
          </h1>

          {/* Author & Publish Metadata Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 pb-6 border-b border-white/10 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#0099ff]/20 border border-[#0099ff]/40 text-[#0099ff] font-bold flex items-center justify-center shrink-0">
                {article.author?.name ? article.author.name.charAt(0) : 'A'}
              </div>
              <div>
                <div className="font-semibold text-white">{article.author?.name || 'Apollo Editorial Team'}</div>
                <div className="text-[11px] text-zinc-400">{article.author?.role || 'Streaming Contributor'}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <span>{article.date}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        </div>

        {/* Featured Hero Image */}
        <div className="max-w-4xl mx-auto mb-10 sm:mb-14">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#0c1015] aspect-[16/9] shadow-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Main Content Layout with Content & Sticky Sidebar */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main Article Body (8 cols) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {article.content &&
              article.content.map((block, idx) => {
                if (block.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="text-xl sm:text-2xl font-bold text-white tracking-tight pt-4 mb-2 text-[#0099ff]"
                    >
                      {block.text}
                    </h2>
                  )
                }

                if (block.type === 'quote') {
                  return (
                    <blockquote
                      key={idx}
                      className="my-6 p-4 sm:p-5 rounded-r-xl border-l-4 border-[#0099ff] bg-[#0099ff]/10 text-sm sm:text-base italic text-slate-200 leading-relaxed"
                    >
                      "{block.text}"
                    </blockquote>
                  )
                }

                if (block.type === 'list') {
                  return (
                    <ul key={idx} className="space-y-2.5 my-4">
                      {block.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <i className="ph-check-circle-bold text-[#0099ff] text-base shrink-0 mt-0.5"></i>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  )
                }

                return (
                  <p key={idx} className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed font-normal">
                    {block.text}
                  </p>
                )
              })}

            {/* Tags */}
            {article.tags && (
              <div className="pt-8 border-t border-white/10">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                  Related Topics:
                </div>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-3 py-1 rounded-lg text-xs bg-white/[0.04] border border-white/10 text-slate-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sticky Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* CTA Card */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0c1015] to-[#040c14] border border-[#0099ff]/30 text-left relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#0099ff]/15 rounded-full blur-2xl pointer-events-none" />
              <div className="text-xs font-bold text-[#0099ff] uppercase tracking-wider mb-2">
                Apollo Group TV
              </div>
              <h3 className="text-lg font-bold text-white mb-2 leading-snug">
                Stream 20,000+ Channels with Zero Buffering
              </h3>
              <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                Enjoy 4K sports, all PPV events included, and 100,000+ movies on any device.
              </p>
              <Link
                to="/get-trail"
                className="w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#0099ff] hover:bg-[#0088ee] transition-all text-center block shadow-lg shadow-[#0099ff]/30"
              >
                Claim 10 Days Free Trial
              </Link>
            </div>

            {/* Quick Share Widget */}
            <div className="p-5 rounded-2xl bg-[#0c1015] border border-white/10 text-left">
              <div className="text-xs font-semibold text-white mb-3">
                Share this Article
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(window.location.href)
                    alert('Article link copied to clipboard!')
                  }}
                  className="flex-1 py-2 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-xs text-slate-300 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <i className="ph-link-bold text-sm"></i>
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Section */}
        {relatedArticles.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 border-t border-white/10 text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-8 tracking-tight">
              More from Our Blog
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  to={`/blog/${rel.slug}`}
                  className="group rounded-2xl overflow-hidden border border-white/10 bg-[#0c1015] hover:border-[#0099ff]/50 transition-all flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden relative">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-black/70 text-white backdrop-blur-md border border-white/20">
                      {rel.category}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-[#0099ff] transition-colors line-clamp-2 mb-2">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">
                        {rel.excerpt}
                      </p>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      {rel.date} • {rel.readTime}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BlogDetails
