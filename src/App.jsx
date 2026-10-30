import React, { useEffect, lazy, Suspense } from 'react'
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
const Dashboard = lazy(() => import('./pages/Dashboard'))

const App = () => {
  const location = useLocation()
  const isAuthPage = ['/login', '/register', '/signup'].includes(location.pathname)

  // Verify session on page load/refresh against Google Sheets
  useEffect(() => {
    verifySession()
  }, [])

  return (
    <div className="min-h-screen bg-[#000304] text-white font-sans antialiased flex flex-col justify-between">
      <ScrollToTop />
      <PageLoader />
      <GsapNotification />
      <Navbar />
      <main className="w-full flex-1">
        <Suspense fallback={<PageFallbackLoader />}>
          <Routes>
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