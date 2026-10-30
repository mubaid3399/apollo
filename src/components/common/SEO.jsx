import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const BASE_URL = 'https://apollogroup-tv.xyz'
const DEFAULT_TITLE = 'Apollo Group TV™ | Official IPTV Subscription & 10 Days Free Trial'
const DEFAULT_DESCRIPTION =
  'Stream 20,000+ live HD/4K channels, 100,000+ VOD movies, and PPV sports on Apollo Group TV. Zero buffering with 99.9% anti-freeze servers. Claim your 10-day free trial today!'
const DEFAULT_IMAGE = `${BASE_URL}/favicon.png`

/**
 * Reusable SEO component for React SPA to update document head tags,
 * canonical links, social graphs, and structured JSON-LD data dynamically.
 */
const SEO = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  schema,
}) => {
  const location = useLocation()
  const pageUrl = canonical ? `${BASE_URL}${canonical}` : `${BASE_URL}${location.pathname}`
  const fullTitle = title
    ? `${title} | Apollo Group TV™`
    : DEFAULT_TITLE
  const fullDescription = description || DEFAULT_DESCRIPTION

  useEffect(() => {
    // 1. Update Title
    document.title = fullTitle

    // 2. Helper to set or create meta tag
    const setMetaTag = (attribute, attrValue, content) => {
      let tag = document.querySelector(`meta[${attribute}="${attrValue}"]`)
      if (!tag) {
        tag = document.createElement('meta')
        tag.setAttribute(attribute, attrValue)
        document.head.appendChild(tag)
      }
      tag.setAttribute('content', content)
    }

    // 3. Helper to set link tag
    const setLinkTag = (rel, href) => {
      let tag = document.querySelector(`link[rel="${rel}"]`)
      if (!tag) {
        tag = document.createElement('link')
        tag.setAttribute('rel', rel)
        document.head.appendChild(tag)
      }
      tag.setAttribute('href', href)
    }

    // Set Standard Meta Tags
    setMetaTag('name', 'description', fullDescription)
    setMetaTag('name', 'title', fullTitle)
    setLinkTag('canonical', pageUrl)

    // Set Open Graph Tags
    setMetaTag('property', 'og:title', fullTitle)
    setMetaTag('property', 'og:description', fullDescription)
    setMetaTag('property', 'og:url', pageUrl)
    setMetaTag('property', 'og:type', ogType)
    setMetaTag('property', 'og:image', ogImage)

    // Set Twitter Tags
    setMetaTag('name', 'twitter:title', fullTitle)
    setMetaTag('name', 'twitter:description', fullDescription)
    setMetaTag('name', 'twitter:image', ogImage)

    // 4. Page Specific Schema (JSON-LD)
    const schemaScriptId = 'page-schema-jsonld'
    let existingScript = document.getElementById(schemaScriptId)

    if (schema) {
      if (!existingScript) {
        existingScript = document.createElement('script')
        existingScript.id = schemaScriptId
        existingScript.type = 'application/ld+json'
        document.head.appendChild(existingScript)
      }
      existingScript.textContent = JSON.stringify(schema)
    } else if (existingScript) {
      existingScript.remove()
    }

    return () => {
      // Clean up script on unmount
      const s = document.getElementById(schemaScriptId)
      if (s) s.remove()
    }
  }, [fullTitle, fullDescription, pageUrl, ogType, ogImage, schema])

  return null
}

export default SEO

