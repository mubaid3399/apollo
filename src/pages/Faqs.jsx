import React from 'react'
import SEO from '../components/common/SEO'
import FaqsSection from '../components/home/FaqsSection'

const faqsPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is Apollo Group TV and how does it work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Apollo Group TV is a next-generation IPTV streaming service that delivers over 20,000 live television channels, PPV events, sports broadcasts, and an on-demand library of 100,000+ movies and series directly over your internet connection without requiring any satellite dish or traditional cable setup.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which devices and operating systems are supported?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Apollo Group TV is fully compatible with Amazon Firestick & Fire TV, Android TV boxes, Smart TVs (Samsung, LG, Sony), Apple TV, iOS (iPhone and iPad), Android phones/tablets, Windows PC, macOS, and popular IPTV player apps like Tivimate and IPTV Smarters.',
      },
    },
    {
      '@type': 'Question',
      name: 'How fast does my internet connection need to be for 4K streaming?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For smooth Full HD (1080p) streaming, a stable download speed of 15 Mbps is recommended. For Ultra HD 4K streaming and high-frame-rate live sports events without buffering, we recommend 30 Mbps or faster.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get a free trial before making a payment?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! We provide risk-free trials so you can evaluate the channel selection, server response times, and 4K video quality before purchasing. Visit our Get Trial page to claim your 10-day trial credentials.',
      },
    },
  ],
}

const Faqs = () => {
  return (
    <div className="pt-6 sm:pt-10">
      <SEO
        title="Frequently Asked Questions (FAQs) | Apollo Group TV Support"
        description="Find answers to all questions about Apollo Group TV setup, device compatibility (Firestick, Apple TV, Android), channel lists, 4K streaming, and subscriptions."
        canonical="/faqs"
        schema={faqsPageSchema}
      />
      <FaqsSection />
    </div>
  )
}

export default Faqs
