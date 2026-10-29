import React from 'react'

const features = [
  {
    icon: 'ph-desktop-bold',
    title: 'One account, every screen',
    description: 'Sign in with the same Apollo Group TV account across your supported devices.',
  },
  {
    icon: 'ph-gauge-bold',
    title: 'Built for smooth performance',
    description: 'Streaming technology tuned for stable playback — actual results depend on your device and connection.',
  },
  {
    icon: 'ph-users-three-bold',
    title: 'Flexible device tiers',
    description: 'Choose whether you need one screen or two streaming at once.',
  },
  {
    icon: 'ph-sliders-horizontal-bold',
    title: 'Flexible plan lengths',
    description: 'Pick a 1, 3, 6, or 12-month term — whatever fits your household.',
  },
  {
    icon: 'ph-headset-bold',
    title: 'Responsive customer support',
    description: 'Reach a support team that can help with setup, account, and device questions.',
  },
  {
    icon: 'ph-arrows-clockwise-bold',
    title: 'Ongoing platform updates',
    description: 'The Apollo Group TV app is maintained and improved over time.',
  },
  {
    icon: 'ph-lock-simple-bold',
    title: 'Secure account management',
    description: 'Manage your subscription through a secure, straightforward account system.',
  },
  {
    icon: 'ph-shield-check-bold',
    title: 'Transparent plan terms',
    description: 'Clear terms with no hidden steps — know exactly what a plan includes before you choose it.',
  },
]

const Features = () => {
  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5 bg-[#000304]">
      {/* Subtle ambient glow behind grid */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#0099ff]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* 80% Container width matching Navbar & Hero */}
      <div className="w-[88%] lg:w-[80%] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16 space-y-3 sm:space-y-4">
          <div className="inline-block text-xs font-semibold tracking-wider text-[#0099ff] uppercase">
            Why Apollo Group TV
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] font-bold text-white tracking-tight leading-tight">
            Everything You Need From a<br className="hidden sm:inline" /> Streaming Subscription
          </h2>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Apollo Group TV focuses on the technology experience: flexible plans, broad device support, and an account system that stays out of your way.
          </p>
        </div>

        {/* 8 Features Grid (4 columns on desktop, 2 on tablet, 1 on mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div
              key={item.title}
              className="p-6 sm:p-7 rounded-sm bg-white/[0.03] border border-white/10 hover:border-[#0099ff]/45 hover:bg-white/[0.05] transition-colors duration-300 flex flex-col justify-start text-left group"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 rounded-sm   flex items-center justify-center text-[#0099ff] mb-5 shrink-0 group-hover:bg-[#0099ff]/15 group-hover:border-[#0099ff]/40 transition-colors duration-300">
                <i className={`${item.icon} text-2xl leading-none`}></i>
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features

