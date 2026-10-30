import React from 'react'
import SEO from '../components/common/SEO'
import PricingSection from '../components/home/PricingSection'
import NoNonsensePricing from '../components/home/NoNonsensePricing'
import PricingFaqs from '../components/pricing/PricingFaqs'

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'Apollo Group TV Subscription Packages',
  description:
    'Flexible, contract-free IPTV subscription plans offering 20,000+ live HD/4K channels, 100,000+ VOD movies, and PPV sports on up to 5 simultaneous devices.',
  brand: {
    '@type': 'Brand',
    name: 'Apollo Group TV',
  },
  offers: {
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: '13.33',
    highPrice: '159.99',
    offerCount: '4',
    offers: [
      {
        '@type': 'Offer',
        name: '1 Month Subscription',
        price: '24.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://apollogroup-tv.xyz/pricing',
      },
      {
        '@type': 'Offer',
        name: '3 Months Subscription',
        price: '51.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://apollogroup-tv.xyz/pricing',
      },
      {
        '@type': 'Offer',
        name: '6 Months Subscription',
        price: '89.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://apollogroup-tv.xyz/pricing',
      },
      {
        '@type': 'Offer',
        name: '12 Months VIP Package',
        price: '159.99',
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
        url: 'https://apollogroup-tv.xyz/pricing',
      },
    ],
  },
}

const Pricing = () => {
  return (
    <div className="pt-6 sm:pt-10">
      <SEO
        title="Pricing & Packages | Official Apollo Group TV Subscriptions"
        description="Choose your Apollo Group TV plan: 1, 3, 6, or 12-month packages from $13.33/mo. Instant activation, 20,000+ live channels, 4K sports PPV, and zero contracts."
        canonical="/pricing"
        schema={pricingSchema}
      />
      <PricingSection />
      <NoNonsensePricing />
      <PricingFaqs />
    </div>
  )
}

export default Pricing
