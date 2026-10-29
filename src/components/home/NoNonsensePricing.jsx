import React from 'react'
import pricingImg from '../../assets/pricing.png'

const NoNonsensePricing = () => {
  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5 bg-[#000304]">
      {/* Background Ambient Glows */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#0099ff]/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* 80% Container width matching Navbar & Hero */}
      <div className="w-[88%] lg:w-[80%] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-20 items-center">

          {/* Left Column: Heading & Editorial Description */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-white tracking-tight leading-[1.2]">
              Apollo Group IPTV offers you no-nonsense pricing
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              Sick of being locked into long-term contracts with cable and satellite companies that keep asking for more and offering less? Apollo Group IPTV offers you no-nonsense pricing. Our clear pricing structure means you never need to add expensive sports or premium channel packages. And our customer service is dedicated to helping you watch the TV you love, not selling you more than you need.
            </p>
          </div>

          {/* Right Column: Pricing Graphic with Surprised Emoji */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[420px] sm:max-w-[480px]">
              {/* Subtle Backlight Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#0099ff]/25 via-pink-500/10 to-transparent rounded-3xl blur-2xl pointer-events-none -z-10" />

              {/* pricing.png Image from assets */}
              <img
                src={pricingImg}
                alt="Apollo Group IPTV no-nonsense pricing"
                className="w-full h-auto object-contain drop-shadow-[0_25px_50px_rgba(0,0,0,0.85)]"
                loading="lazy"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default NoNonsensePricing
