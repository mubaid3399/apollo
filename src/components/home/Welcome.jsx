import React from 'react'
import { Link } from 'react-router-dom'
import whatIsApolloImg from '../../assets/what is appolo.avif'

const Welcome = () => {
  const highlights = [
    {
      icon: 'ph-television-bold',
      title: '20,000+ Live Channels',
      description: 'Comprehensive sports coverage, global news, entertainment, and localized language channels.',
    },
    {
      icon: 'ph-film-strip-bold',
      title: '100,000+ Movies & Series',
      description: 'Massive on-demand entertainment library with weekly updates, series, and sports replays.',
    },
    {
      icon: 'ph-lightning-bold',
      title: 'Ultra HD & Anti-Freeze Quality',
      description: 'Smooth 4K and FHD streaming powered by dedicated high-bandwidth content delivery servers.',
    },
    {
      icon: 'ph-screencast-bold',
      title: 'Multi-Device Compatibility',
      description: 'Compatible with Amazon Firestick, Android TV, Smart TVs, iOS, Windows, and macOS devices.',
    },
  ]

  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#0099ff]/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Matching 80% container width */}
      <div className="w-[80%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden  shadow-2xl bg-black/40 group">
              {/* Subtle ambient halo */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-[#0099ff]/25 to-transparent rounded-sm blur-lg pointer-events-none -z-10" />

              <img
                src={whatIsApolloImg}
                alt="What is Apollo Group TV"
                className="w-full h-auto object-cover rounded-sm"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Text & Features */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Eyebrow Label */}
            <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
              What is Apollo Group TV
            </div>

            {/* Main Heading - Clean, modest size, not extrabold */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight leading-snug">
              Next-Generation Digital Television Streaming
            </h2>

            {/* Description */}
            <p className="text-base text-slate-300 leading-relaxed font-normal">
              Apollo Group TV is a premium IPTV streaming solution engineered to replace traditional cable and satellite services. Delivered over high-speed broadband, it brings thousands of live television channels, global sporting events, and an extensive video-on-demand catalog straight to your favorite screens.
            </p>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="p-4 rounded-sm bg-white/[0.03] border border-white/10 hover:border-[#0099ff]/40 transition-all hover:bg-white/[0.05]"
                >
                  <div className="flex items-start gap-3.5">

                    <i className={`${item.icon} text-lg leading-none`}></i>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/pricing"
                className="px-7 py-3.5 text-base rounded-sm font-semibold text-white bg-[#0099ff] hover:bg-[#0088ee] active:bg-[#0077dd] shadow-md shadow-[#0099ff]/25 hover:shadow-lg hover:shadow-[#0099ff]/35 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer inline-flex items-center justify-center"
              >
                View Packages
              </Link>
              <Link
                to="/get-trail"
                className="px-6 py-3.5 text-base rounded-sm font-medium text-white hover:text-[#0099ff] bg-white/[0.06] hover:bg-white/[0.12] transition-all border border-white/10 cursor-pointer inline-flex items-center justify-center"
              >
                Get Free Trial
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default Welcome
