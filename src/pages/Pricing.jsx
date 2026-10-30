import React from 'react'
import PricingSection from '../components/home/PricingSection'
import NoNonsensePricing from '../components/home/NoNonsensePricing'
import PricingFaqs from '../components/pricing/PricingFaqs'

const Pricing = () => {
  return (
    <div className="pt-6 sm:pt-10">
      <PricingSection />
      <NoNonsensePricing />
      <PricingFaqs />
    </div>
  )
}

export default Pricing
