import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../context/CartContext'

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart()

  if (cart.length === 0) {
    return (
      <main className="min-h-screen pt-28 pb-24 flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6"
        >
          <ShoppingBag size={48} className="text-drip-white/10" />
          <p className="font-bebas text-5xl text-drip-white/20 tracking-wide">
            Your Cart is Empty
          </p>
          <p className="font-inter text-drip-white/40 text-sm">
            Looks like you haven't added anything yet
          </p>
          <Link
            to="/shop"
            className="mt-4 bg-gold text-drip-black font-inter font-bold text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold/90 transition-all duration-200"
          >
            Start Shopping
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
          className="flex items-end justify-between mb-14"
        >
          <div>
            <p className="text-gold font-inter text-xs tracking-[0.3em] uppercase mb-3">
              Your Order
            </p>
            <h1 className="font-bebas text-6xl md:text-7xl text-drip-white tracking-wide">
              Shopping Cart
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="font-inter text-xs tracking-widest uppercase text-drip-white/30 hover:text-red-400 transition-colors pb-1 border-b border-transparent hover:border-red-400"
          >
            Clear All
          </button>
        </motion.div>

        {/* Cart Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Cart Items */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex gap-6 pb-6 border-b border-drip-white/10"
                >
                  {/* Item Image */}
                  <Link to={`/product/${item.id}`} className="shrink-0">
                    <div className="w-24 h-32 md:w-32 md:h-40 overflow-hidden bg-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>

                  {/* Item Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link to={`/product/${item.id}`}>
                          <h3 className="font-inter font-medium text-drip-white hover:text-gold transition-colors leading-snug mb-1">
                            {item.name}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="font-inter text-xs text-drip-white/40 tracking-widest uppercase">
                            Size: {item.size}
                          </span>
                          <span className="text-drip-white/20">|</span>
                          <span className="font-inter text-xs text-drip-white/40 tracking-widest uppercase">
                            {item.color}
                          </span>
                        </div>
                      </div>
                      <span className="font-inter font-semibold text-gold whitespace-nowrap">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity + Remove */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center border border-drip-white/10">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="w-9 h-9 flex items-center justify-center text-drip-white/40 hover:text-gold hover:bg-white/5 transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center font-inter text-sm text-drip-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="w-9 h-9 flex items-center justify-center text-drip-white/40 hover:text-gold hover:bg-white/5 transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="flex items-center gap-2 font-inter text-xs text-drip-white/30 hover:text-red-400 transition-colors tracking-widest uppercase"
                      >
                        <Trash2 size={14} />
                        Remove
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue Shopping */}
            <Link
              to="/shop"
              className="flex items-center gap-2 font-inter text-xs tracking-widest uppercase text-drip-white/30 hover:text-gold transition-colors mt-4 w-fit"
            >
              <ArrowLeft size={14} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="border border-drip-white/10 p-8 sticky top-28">
              <h2 className="font-bebas text-3xl text-drip-white tracking-wide mb-8">
                Order Summary
              </h2>

              {/* Summary Lines */}
              <div className="flex flex-col gap-4 mb-8">
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-drip-white/40">Subtotal</span>
                  <span className="font-inter text-sm text-drip-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-drip-white/40">Shipping</span>
                  <span className="font-inter text-sm text-gold">Free</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-inter text-sm text-drip-white/40">Tax (10%)</span>
                  <span className="font-inter text-sm text-drip-white">${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="border-t border-drip-white/10 pt-4 flex items-center justify-between">
                  <span className="font-inter font-semibold text-drip-white">Total</span>
                  <span className="font-inter font-bold text-gold text-xl">${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                to="/checkout"
                className="w-full bg-gold text-drip-black font-inter font-bold text-sm tracking-widest uppercase py-4 flex items-center justify-center hover:bg-gold/90 transition-all duration-300"
              >
                Proceed to Checkout
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-col gap-2">
                {['Free worldwide shipping', 'Secure checkout', 'Easy returns'].map(badge => (
                  <p key={badge} className="font-inter text-xs text-drip-white/30 text-center tracking-wide">
                    ✓ {badge}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  )
}

export default Cart