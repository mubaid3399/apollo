import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Pricing from './pages/Pricing'
import Blog from './pages/Blog'
import Faqs from './pages/Faqs'
import GetTrail from './pages/GetTrail'
import Login from './pages/Login'
import Register from './pages/Register'
import PrivicyPolicy from './pages/PrivicyPolicy'
import TermsConditon from './pages/TermsConditon'

const App = () => {
  return (
    <div className="min-h-screen bg-[#000304] text-white font-sans antialiased">
      <Navbar />
      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faqs" element={<Faqs />} />
          <Route path="/get-trail" element={<GetTrail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/privacy-policy" element={<PrivicyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditon />} />
        </Routes>
      </main>
    </div>
  )
}

export default App