import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Instagram, Twitter, Youtube } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = () => {
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) return
    setSubscribed(true)
    setEmail('')
    setTimeout(() => setSubscribed(false), 4000)
  }

  return (
    <footer className="border-t border-drip-white/10 mt-auto">

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <Link to="/" className="font-bebas text-4xl text-gold tracking-widest w-fit">
              DRIP.
            </Link>
            <p className="font-inter text-drip-white/40 text-sm leading-relaxed max-w-sm">
              Premium streetwear for those who refuse to blend in. Every piece crafted for the ones who lead. Dress like royalty.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-5 mt-2">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Twitter, label: 'Twitter' },
                { icon: Youtube, label: 'Youtube' },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-10 h-10 border border-drip-white/10 flex items-center justify-center text-drip-white/40 hover:border-gold hover:text-gold transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-inter text-xs tracking-[0.3em] uppercase text-drip-white/40">
              Navigation
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { name: 'Home', path: '/' },
                { name: 'Shop', path: '/shop' },
                { name: 'Cart', path: '/cart' },
                { name: 'Wishlist', path: '/wishlist' },
              ].map(link => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="font-inter text-sm text-drip-white/50 hover:text-gold transition-colors w-fit"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-inter text-xs tracking-[0.3em] uppercase text-drip-white/40">
              Stay in the Loop
            </h3>
            <p className="font-inter text-sm text-drip-white/40 leading-relaxed">
              New drops, exclusive offers and style updates. No spam, ever.
            </p>
            <div className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSubscribe()}
                className="w-full bg-white/5 border border-drip-white/10 text-drip-white font-inter text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors placeholder:text-drip-white/20"
              />
              <button
                onClick={handleSubscribe}
                className="w-full bg-gold text-drip-black font-inter font-bold text-xs tracking-widest uppercase py-3 hover:bg-gold/90 transition-all duration-200"
              >
                {subscribed ? 'Subscribed ✓' : 'Subscribe'}
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-drip-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-drip-white/20 tracking-wide">
            © {new Date().getFullYear()} DRIP. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Returns'].map(item => (
              <a 
                key={item}
                href="#"
                className="font-inter text-xs text-drip-white/20 hover:text-gold transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer