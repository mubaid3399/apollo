import React from 'react'
import { Link } from 'react-router-dom'

const plans = [
  {
    id: 'starter',
    name: 'Starter',
    price: '$24.99',
    subPrice: null,
    saveBadge: null,
    isElite: false,
    period: '30 Days',
    description:
      'Dive into a world of convenience and discovery with our Starter Subscription Package, 30 days to explore',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '$51.99',
    subPrice: null,
    saveBadge: 'Save 29%',
    isElite: false,
    period: '90 Days',
    description:
      "Unlock your potential with our Growth Subscription Package designed for those eager to explore without breaking the bank. Whether you're a seasoned enthusiast or just beginning your journey 90 days for fun",
  },
  {
    id: 'elite',
    name: 'Elite',
    price: '$89.99',
    subPrice: null,
    saveBadge: 'Save 39%',
    isElite: true,
    period: '180 Days',
    description:
      'Experience excellence with our Elite Subscription Package elevate your experience to unprecedented levels of luxury, exclusivity and sophistication with our Elite Subscription Package',
  },
  {
    id: 'professional',
    name: 'Professional',
    price: '$159.99',
    subPrice: 'Paid annually',
    saveBadge: 'Save 49% per month',
    isElite: false,
    period: '365 Days',
    description:
      'Elevate your viewing experience with our Professional TV Package, this premium offering redefines what it means to indulge in top-tier quality',
  },
]

const PricingSection = () => {
  return (
    <section className="relative z-10 w-full py-16 lg:py-24 text-white overflow-hidden border-t border-white/5 bg-[#000304]">
      {/* 80% Container width matching Navbar & Hero */}
      <div className="w-[90%] xl:w-[84%] 2xl:w-[80%] mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 lg:mb-18 space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] xl:text-[42px] font-bold text-white tracking-tight leading-[1.18]">
            Pricing and Packages
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Ready to subscribe or renew your services? Please select from one of our packages
          </p>
        </div>

        {/* 4 Pricing Cards Grid - Exactly matching reference image */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-2xl p-7 lg:p-8 flex flex-col text-left transition-all duration-300 ${
                plan.isElite
                  ? 'bg-[#0c1015] border-2 border-[#0099ff] shadow-[0_0_35px_rgba(0,153,255,0.25)]'
                  : 'bg-[#0c1015] border border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Card Title (Starter, Growth, Elite, Professional) */}
              <h3 className="text-xl lg:text-2xl font-bold text-white tracking-tight">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-2 mb-6">
                <div className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {plan.price}
                </div>
                {plan.subPrice && (
                  <span className="block text-xs text-zinc-400 font-normal mt-1">
                    {plan.subPrice}
                  </span>
                )}
              </div>

              {/* Button with Speech Bubble Green Save Badge */}
              <div className="relative w-full mb-2">
                <Link
                  to="/get-trail"
                  className={`w-full py-3 px-4 rounded-lg text-sm font-semibold text-center block transition-all cursor-pointer ${
                    plan.isElite
                      ? 'bg-[#0099ff] hover:bg-[#0088ee] text-white shadow-md shadow-[#0099ff]/30'
                      : 'border border-[#0099ff] text-[#0099ff] hover:bg-[#0099ff]/10 bg-transparent'
                  }`}
                >
                  Subscribe Now
                </Link>

                {/* Green Speech Bubble Badge */}
                {plan.saveBadge && (
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
                    <span className="w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-[#00c853]" />
                    <span className="bg-[#00c853] text-white text-[11px] font-semibold px-3 py-0.5 rounded-full shadow-sm whitespace-nowrap">
                      {plan.saveBadge}
                    </span>
                  </div>
                )}
              </div>

              {/* Dashed Line Divider */}
              <div className="w-full border-b border-dashed border-zinc-800/90 my-7" />

              {/* Period / Days Heading */}
              <h4 className="text-lg lg:text-xl font-bold text-white tracking-tight mb-2.5">
                {plan.period}
              </h4>

              {/* Description Text */}
              <p className="text-xs sm:text-[13px] text-zinc-400 leading-relaxed font-normal">
                {plan.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default PricingSection
