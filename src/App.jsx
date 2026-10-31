import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from './components/common/ScrollToTop'
import GsapNotification from './components/common/GsapNotification'
import PageLoader, { PageFallbackLoader } from './components/common/PageLoader'
import Navbar from './components/common/Navbar'
import { verifySession } from './services/googleSheetService'
import Footer from './components/common/Footer'

// Lazy-loaded pages for optimized chunking and automatic loading state
const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Services = lazy(() => import('./pages/Services'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogDetails = lazy(() => import('./pages/BlogDetails'))
const Faqs = lazy(() => import('./pages/Faqs'))
const GetTrail = lazy(() => import('./pages/GetTrail'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const PrivicyPolicy = lazy(() => import('./pages/PrivicyPolicy'))
const TermsConditon = lazy(() => import('./pages/TermsConditon'))
const CookiePolicy = lazy(() => import('./pages/CookiePolicy'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

const App = () => {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [isPageLoading, setIsPageLoading] = useState(false)
  const isAuthPage = ['/login', '/register', '/signup'].includes(displayLocation.pathname)

  // Verify session on page load/refresh against Google Sheets
  useEffect(() => {
    verifySession()
  }, [])

  // Subdomain intelligent routing:
  // - portal.apollogroup.click:
  //    * If path is '/' -> redirect to '/login'
  //    * If path is not an auth route (/login, /register, /signup) -> redirect to https://apollogroup.click{path}
  // - dashboard.apollogroup.click:
  //    * If path is '/' -> redirect to '/dashboard'
  //    * If path is not /dashboard -> redirect to https://apollogroup.click{path}
  useEffect(() => {
    if (typeof window === 'undefined') return
    const host = window.location.hostname.toLowerCase()
    const path = window.location.pathname
    const search = window.location.search || ''

    if (host.startsWith('portal.')) {
      if (path === '/' || path === '') {
        window.location.replace('/login')
      } else if (!['/login', '/register', '/signup'].includes(path)) {
        // Any marketing or trial page (e.g. /get-trail, /services) belongs on the main domain
        window.location.replace(`https://apollogroup.click${path}${search}`)
      }
    } else if (host.startsWith('dashboard.')) {
      if (path === '/' || path === '') {
        window.location.replace('/dashboard')
      } else if (path !== '/dashboard') {
        // Any non-dashboard page accessed while on dashboard subdomain belongs to the main domain
        window.location.replace(`https://apollogroup.click${path}${search}`)
      }
    }
  }, [location.pathname])

  // Controlled deferred route transition:
  // Loader shows FIRST, covers the screen, swaps route BEHIND the loader, then reveals new page.
  useEffect(() => {
    if (location.pathname !== displayLocation.pathname || location.search !== displayLocation.search) {
      // 1. Immediately activate loader BEFORE new page is allowed to render
      setIsPageLoading(true)

      // 2. Hold loader on screen to cover previous content
      const swapTimer = setTimeout(() => {
        // 3. Swap route to the new page while loader is 100% covering screen
        setDisplayLocation(location)
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        document.documentElement.scrollTop = 0
        document.body.scrollTop = 0

        // 4. Reveal the new page cleanly
        setTimeout(() => {
          setIsPageLoading(false)
        }, 120)
      }, 320)

      return () => clearTimeout(swapTimer)
    }
  }, [location, displayLocation])

  return (
    <div className="min-h-screen bg-[#000304] text-white font-sans antialiased flex flex-col justify-between">
      <ScrollToTop />
      <PageLoader isLoading={isPageLoading} />
      <GsapNotification />
      <Navbar />
      <main className="w-full flex-1">
        <Suspense fallback={<PageFallbackLoader />}>
          <Routes location={displayLocation}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/get-trail" element={<GetTrail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/signup" element={<Register />} />
            <Route path="/privacy-policy" element={<PrivicyPolicy />} />
            <Route path="/terms-conditions" element={<TermsConditon />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </main>
      {!isAuthPage && <Footer />}
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-[#0c1015] !text-white !border !border-white/10 !shadow-2xl !rounded-xl text-xs sm:text-sm font-sans"
      />
    </div>
  )
}

export default App