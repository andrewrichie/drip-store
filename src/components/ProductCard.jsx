import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'

const ProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const wishlisted = isInWishlist(product.id)

  const handleWishlist = (e) => {
    e.preventDefault()
    wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden bg-white/5 aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-drip-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className={`absolute top-4 right-4 w-9 h-9 flex items-center justify-center transition-all duration-300 ${
            wishlisted
              ? 'bg-gold opacity-100'
              : 'bg-drip-black/60 opacity-0 group-hover:opacity-100 hover:bg-gold'
          }`}
        >
          <Heart
            size={16}
            className={wishlisted ? 'text-drip-black fill-drip-black' : 'text-drip-white'}
          />
        </button>

        {/* Quick View Button */}
        <Link
          to={`/product/${product.id}`}
          className="absolute bottom-0 left-0 right-0 bg-gold text-drip-black font-inter font-bold text-xs tracking-widest uppercase py-3 text-center translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Quick View
        </Link>
      </div>

      {/* Product Info */}
      <div className="pt-4 space-y-1">
        <div className="flex items-start justify-between gap-2">
          <Link to={`/product/${product.id}`}>
            <h3 className="font-inter font-medium text-drip-white text-sm tracking-wide hover:text-gold transition-colors leading-snug">
              {product.name}
            </h3>
          </Link>
          <span className="font-inter font-semibold text-gold text-sm whitespace-nowrap">
            ${product.price}
          </span>
        </div>
        <p className="font-inter text-drip-white/40 text-xs tracking-widest uppercase">
          {product.category}
        </p>
      </div>
    </motion.div>
  )
}

export default ProductCard