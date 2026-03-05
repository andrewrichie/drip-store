import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Heart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()
  

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-drip-black shadow-lg shadow-black/50' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-bebas text-3xl text-gold tracking-widest hover:opacity-80 transition-opacity">
          DRIP.
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-inter font-medium tracking-widest uppercase transition-colors duration-200 ${
                isActive(link.path)
                  ? 'text-gold border-b border-gold pb-0.5'
                  : 'text-drip-white hover:text-gold'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/wishlist" className="relative text-drip-white hover:text-gold transition-colors duration-200">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-drip-white text-drip-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
        <Link to="/cart" className="relative text-drip-white hover:text-gold transition-colors duration-200">
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-gold text-drip-black text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-drip-white hover:text-gold transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-drip-black border-t border-white/10 px-6 py-6 flex flex-col gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-medium tracking-widest uppercase transition-colors ${
                isActive(link.path) ? 'text-gold' : 'text-drip-white hover:text-gold'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-6 pt-2 border-t border-white/10">
            <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="text-drip-white hover:text-gold transition-colors">
              <Heart size={20} />
            </Link>
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="text-drip-white hover:text-gold transition-colors">
              <ShoppingBag size={20} />
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar