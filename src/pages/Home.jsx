import React from 'react'
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
