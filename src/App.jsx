import React, { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScrollToTop from './components/common/ScrollToTop'
import GsapNotification from './components/common/GsapNotification'
import Navbar from './components/common/Navbar'
import { verifySession } from './services/googleSheetService'
import Footer from './components/common/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import BlogDetails from './pages/BlogDetails'
import Faqs from './pages/Faqs'
import GetTrail from './pages/GetTrail'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivicyPolicy from './pages/PrivicyPolicy'
import TermsConditon from './pages/TermsConditon'
import Dashboard from './pages/Dashboard'

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
      <GsapNotification />
      <Navbar />
      <main className="w-full flex-1">
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