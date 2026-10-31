import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import { isSubdomainHost, getMainSiteUrl } from '../../services/googleSheetService'

const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'Pricing & Packages', to: '/pricing' },
  { label: 'About Us', to: '/about' },
  { label: 'Blog & Guides', to: '/blog' },
  { label: 'FAQs', to: '/faqs' },
]

const planLinks = [
  { label: 'Starter Plan (30 Days)', to: '/pricing' },
  { label: 'Growth Plan (90 Days)', to: '/pricing' },
  { label: 'Elite Plan (180 Days)', to: '/pricing' },
  { label: 'Professional Plan (365 Days)', to: '/pricing' },
  { label: 'Get Free Trial', to: '/get-trail' },
]

const legalLinks = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms-conditions' },
  { label: 'Cookie Policy', to: '/cookies' },
]

const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-[#000304] border-t border-white/10 text-white overflow-hidden">
      {/* Subtle Ambient Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] bg-[#0099ff]/5 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Main Footer Container matching Navbar 80% width */}
      <div className="w-[88%] lg:w-[80%] mx-auto pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">

          {/* Brand & Overview Column */}
          <div className="lg:col-span-5 space-y-5 text-left">
            {isSubdomainHost() ? (
              <a href={getMainSiteUrl('/')} className="inline-flex items-center gap-3 group">
                <img
                  src={logo}
                  alt="Apollo Logo"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#0099ff] transition-colors">
                  Apollo<span className="text-[#0099ff]">Group</span>TV
                </span>
              </a>
            ) : (
              <Link to="/" className="inline-flex items-center gap-3 group">
                <img
                  src={logo}
                  alt="Apollo Logo"
                  className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-[#0099ff] transition-colors">
                  Apollo<span className="text-[#0099ff]">Group</span>TV
                </span>
              </Link>
            )}

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm font-normal">
              Premium digital IPTV streaming engineered for smooth, buffer-free playback. Access 20,000+ live HD channels, live global sports, and 500,000+ on-demand movies on any screen, anywhere.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  {isSubdomainHost() ? (
                    <a
                      href={getMainSiteUrl(link.to)}
                      className="text-slate-400 hover:text-[#0099ff] transition-colors font-normal inline-block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-slate-400 hover:text-[#0099ff] transition-colors font-normal inline-block"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Subscriptions & Plans */}
          <div className="lg:col-span-3 space-y-4 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Subscriptions
            </h4>
            <ul className="space-y-2.5 text-sm">
              {planLinks.map((link) => (
                <li key={link.label}>
                  {isSubdomainHost() ? (
                    <a
                      href={getMainSiteUrl(link.to)}
                      className="text-slate-400 hover:text-[#0099ff] transition-colors font-normal inline-block"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.to}
                      className="text-slate-400 hover:text-[#0099ff] transition-colors font-normal inline-block"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* 24/7 Support & Security Column */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <h4 className="text-sm font-bold uppercase tracking-wider text-white">
              Help & Support
            </h4>
            <div className="space-y-3 text-sm text-slate-400 font-normal">
              <p className="text-xs text-slate-400 leading-relaxed">
                Need immediate assistance? Our support agents are active 24/7 via WhatsApp chat.
              </p>

            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legal Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} Apollo Group TV. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {legalLinks.map((link) => (
              isSubdomainHost() ? (
                <a
                  key={link.label}
                  href={getMainSiteUrl(link.to)}
                  className="hover:text-slate-300 transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className="hover:text-slate-300 transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-[11px] text-slate-600 text-center sm:text-left pt-4 leading-relaxed">
          Disclaimer: Apollo Group TV is an independent IPTV entertainment service. All brand names, trademarks, and logos are the property of their respective holders.
        </p>
      </div>
    </footer>
  )
}

export default Footer
