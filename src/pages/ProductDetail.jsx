import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ShoppingBag, Heart } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === parseInt(id))

  const [selectedSize, setSelectedSize] = useState(null)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '')
  const [sizeError, setSizeError] = useState(false)
  const [added, setAdded] = useState(false)

  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const wishlisted = product ? isInWishlist(product.id) : false

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6">
        <p className="font-bebas text-5xl text-drip-white/20 tracking-wide">
          Product Not Found
        </p>
        <Link
          to="/shop"
          className="font-inter text-xs tracking-widest uppercase text-gold border border-gold px-6 py-2.5 hover:bg-gold hover:text-drip-black transition-all duration-200"
        >
          Back to Shop
        </Link>
      </div>
    )
  }

    const handleAddToCart = () => {
    if (!selectedSize) {
        setSizeError(true)
        setTimeout(() => setSizeError(false), 3000)
        return
    }
    addToCart(product, selectedSize, selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
    }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-drip-white/40 hover:text-gold transition-colors font-inter text-sm tracking-widest uppercase mb-12"
        >
          <ArrowLeft size={16} />
          Back
        </motion.button>

        {/* Product Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">

          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden bg-white/5 aspect-[3/4]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-center gap-8"
          >

            {/* Category + Name */}
            <div>
              <p className="text-gold font-inter text-xs tracking-[0.3em] uppercase mb-3">
                {product.category}
              </p>
              <h1 className="font-bebas text-5xl md:text-6xl text-drip-white tracking-wide leading-none mb-4">
                {product.name}
              </h1>
              <p className="font-inter font-semibold text-3xl text-gold">
                ${product.price}
              </p>
            </div>

            {/* Description */}
            <p className="font-inter text-drip-white/60 text-sm leading-relaxed">
              {product.description}
            </p>

            {/* Color Selector */}
            <div>
              <p className="font-inter text-xs tracking-widest uppercase text-drip-white/40 mb-3">
                Color — <span className="text-drip-white">{selectedColor}</span>
              </p>
              <div className="flex items-center gap-3">
                {product.colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`font-inter text-xs tracking-widest uppercase px-4 py-2 border transition-all duration-200 ${
                      selectedColor === color
                        ? 'border-gold text-gold'
                        : 'border-drip-white/20 text-drip-white/40 hover:border-drip-white/60'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div>
              <p className={`font-inter text-xs tracking-widest uppercase mb-3 transition-colors ${
                sizeError ? 'text-red-400' : 'text-drip-white/40'
              }`}>
                {sizeError ? '⚠ Please select a size' : 'Select Size'}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => { setSelectedSize(size); setSizeError(false) }}
                    className={`w-12 h-12 font-inter text-sm border transition-all duration-200 ${
                      selectedSize === size
                        ? 'bg-gold text-drip-black border-gold font-bold'
                        : 'border-drip-white/20 text-drip-white/40 hover:border-gold hover:text-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-3 font-inter font-bold text-sm tracking-widest uppercase py-4 transition-all duration-300 ${
                  added
                    ? 'bg-drip-white/10 text-gold border border-gold'
                    : 'bg-gold text-drip-black hover:bg-gold/90'
                }`}
              >
                <ShoppingBag size={18} />
                {added ? 'Added to Cart ✓' : 'Add to Cart'}
              </button>
              <button
                onClick={() => wishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                className={`sm:w-14 h-14 border flex items-center justify-center transition-all duration-200 ${
                    wishlisted
                    ? 'border-gold bg-gold text-drip-black'
                    : 'border-drip-white/20 text-drip-white/40 hover:border-gold hover:text-gold'
                }`}
                >
                <Heart size={18} className={wishlisted ? 'fill-drip-black' : ''} />
              </button>
            </div>

          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-10"
            >
              <p className="text-gold font-inter text-xs tracking-[0.3em] uppercase mb-3">
                You May Also Like
              </p>
              <h2 className="font-bebas text-4xl md:text-5xl text-drip-white tracking-wide">
                Related Pieces
              </h2>
            </motion.div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  )
}

export default ProductDetail