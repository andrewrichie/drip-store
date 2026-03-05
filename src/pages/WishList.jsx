import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useCart } from '../context/CartContext'
import ProductCard from '../components/ProductCard'

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen pt-28 pb-24 flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <Heart size={48} className="text-drip-white/10" />
          <p className="font-bebas text-5xl text-drip-white/20 tracking-wide">
            Your Wishlist is Empty
          </p>
          <p className="font-inter text-drip-white/40 text-sm">
            Save pieces you love for later
          </p>
          <Link
            to="/shop"
            className="mt-4 bg-gold text-drip-black font-inter font-bold text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold/90 transition-all duration-200"
          >
            Explore Collection
          </Link>
        </motion.div>
      </main>
    )
  }

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-gold font-inter text-xs tracking-[0.3em] uppercase mb-3">
            Saved Pieces
          </p>
          <h1 className="font-bebas text-6xl md:text-7xl text-drip-white tracking-wide">
            My Wishlist
          </h1>
          <p className="font-inter text-drip-white/40 text-sm mt-3">
            {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
          </p>
        </motion.div>

        {/* Wishlist Grid */}
        <AnimatePresence>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {wishlist.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </AnimatePresence>

      </div>
    </main>
  )
}

export default Wishlist