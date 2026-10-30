import React from 'react'
import SEO from '../components/common/SEO'
import Hero from '../components/home/Hero'
import Welcome from '../components/home/Welcome'
import Features from '../components/home/Features'
import PricingSection from '../components/home/PricingSection'
import NoNonsensePricing from '../components/home/NoNonsensePricing'
import ReviewsSection from '../components/home/ReviewsSection'
import FaqsSection from '../components/home/FaqsSection'
import ArticlesSection from '../components/home/ArticlesSection'

const Home = () => {
  return (
    <div>
      <SEO
        title="Official IPTV Subscription & 10 Days Free Trial"
        description="Stream 20,000+ live HD/4K channels, 100,000+ VOD movies, and PPV sports on Apollo Group TV. Zero buffering with 99.9% anti-freeze servers. Claim your 10-day free trial today!"
        canonical="/"
      />
      <Hero />
      <Welcome />
      <PricingSection />
      <NoNonsensePricing />
      <Features />
      <ReviewsSection />
      <FaqsSection />
      <ArticlesSection />
    </div>
  )
}

export default Home
