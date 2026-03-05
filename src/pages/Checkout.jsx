import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../context/CartContext'
import { CheckCircle } from 'lucide-react'

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [errors, setErrors] = useState({})

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zip: '',
    shipping: 'standard',
  })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  const validate = () => {
    const newErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = 'Required'
    if (!form.lastName.trim()) newErrors.lastName = 'Required'
    if (!form.email.trim()) newErrors.email = 'Required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email'
    if (!form.address.trim()) newErrors.address = 'Required'
    if (!form.city.trim()) newErrors.city = 'Required'
    if (!form.zip.trim()) newErrors.zip = 'Required'
    return newErrors
  }

  const handleSubmit = () => {
    if (cart.length === 0) return
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setOrderPlaced(true)
    clearCart()
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <main className="min-h-screen pt-28 pb-24 flex flex-col items-center justify-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6"
        >
          <p className="font-bebas text-5xl text-drip-white/20 tracking-wide">
            Your Cart is Empty
          </p>
          <Link
            to="/shop"
            className="bg-gold text-drip-black font-inter font-bold text-xs tracking-widest uppercase px-8 py-3 hover:bg-gold/90 transition-all duration-200"
          >
            Back to Shop
          </Link>
        </motion.div>
      </main>
    )
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen pt-28 pb-24 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 text-center px-6 max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
          >
            <CheckCircle size={64} className="text-gold" />
          </motion.div>
          <h1 className="font-bebas text-6xl text-drip-white tracking-wide">
            Order Placed!
          </h1>
          <p className="font-inter text-drip-white/50 text-sm leading-relaxed">
            Thank you, {form.firstName}. Your order has been received and is being processed. You'll receive a confirmation shortly.
          </p>
          <div className="border border-drip-white/10 p-6 w-full mt-2">
            <p className="font-inter text-xs text-drip-white/40 tracking-widest uppercase mb-1">
              Shipping to
            </p>
            <p className="font-inter text-drip-white text-sm">
              {form.address}, {form.city} {form.zip}
            </p>
          </div>
          <Link
            to="/shop"
            className="mt-4 bg-gold text-drip-black font-inter font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-all duration-200"
          >
            Continue Shopping
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
            Final Step
          </p>
          <h1 className="font-bebas text-6xl md:text-7xl text-drip-white tracking-wide">
            Checkout
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-10"
          >

            {/* Contact */}
            <div>
              <h2 className="font-bebas text-2xl text-drip-white tracking-wide mb-6">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'First Name', name: 'firstName', type: 'text' },
                  { label: 'Last Name', name: 'lastName', type: 'text' },
                  { label: 'Email Address', name: 'email', type: 'email', full: true },
                ].map(field => (
                  <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                    <label className="font-inter text-xs tracking-widest uppercase text-drip-white/40 block mb-2">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border text-drip-white font-inter text-sm px-4 py-3 focus:outline-none transition-colors placeholder:text-drip-white/20 ${
                        errors[field.name]
                          ? 'border-red-400'
                          : 'border-drip-white/10 focus:border-gold'
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="font-inter text-xs text-red-400 mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h2 className="font-bebas text-2xl text-drip-white tracking-wide mb-6">
                Shipping Address
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { label: 'Street Address', name: 'address', full: true },
                  { label: 'City', name: 'city' },
                  { label: 'ZIP / Postal Code', name: 'zip' },
                ].map(field => (
                  <div key={field.name} className={field.full ? 'sm:col-span-2' : ''}>
                    <label className="font-inter text-xs tracking-widest uppercase text-drip-white/40 block mb-2">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      className={`w-full bg-white/5 border text-drip-white font-inter text-sm px-4 py-3 focus:outline-none transition-colors placeholder:text-drip-white/20 ${
                        errors[field.name]
                          ? 'border-red-400'
                          : 'border-drip-white/10 focus:border-gold'
                      }`}
                    />
                    {errors[field.name] && (
                      <p className="font-inter text-xs text-red-400 mt-1">{errors[field.name]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h2 className="font-bebas text-2xl text-drip-white tracking-wide mb-6">
                Shipping Method
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { value: 'standard', label: 'Standard Shipping', duration: '5-7 business days', price: 'Free' },
                  { value: 'express', label: 'Express Shipping', duration: '2-3 business days', price: '$12.00' },
                  { value: 'overnight', label: 'Overnight Shipping', duration: 'Next business day', price: '$25.00' },
                ].map(option => (
                  <label
                    key={option.value}
                    className={`flex items-center justify-between p-4 border cursor-pointer transition-all duration-200 ${
                      form.shipping === option.value
                        ? 'border-gold bg-gold/5'
                        : 'border-drip-white/10 hover:border-drip-white/30'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        form.shipping === option.value ? 'border-gold' : 'border-drip-white/20'
                      }`}>
                        {form.shipping === option.value && (
                          <div className="w-2 h-2 rounded-full bg-gold" />
                        )}
                      </div>
                      <div>
                        <p className="font-inter text-sm text-drip-white">{option.label}</p>
                        <p className="font-inter text-xs text-drip-white/40">{option.duration}</p>
                      </div>
                    </div>
                    <span className="font-inter text-sm text-gold">{option.price}</span>
                    <input
                      type="radio"
                      name="shipping"
                      value={option.value}
                      checked={form.shipping === option.value}
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <div className="border border-drip-white/10 p-8 sticky top-28">
              <h2 className="font-bebas text-3xl text-drip-white tracking-wide mb-8">
                Your Order
              </h2>

              {/* Items */}
              <div className="flex flex-col gap-4 mb-8">
                {cart.map(item => (
                  <div key={`${item.id}-${item.size}`} className="flex items-center gap-4">
                    <div className="w-14 h-16 overflow-hidden bg-white/5 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-inter text-sm text-drip-white truncate">{item.name}</p>
                      <p className="font-inter text-xs text-drip-white/40">
                        {item.size} · Qty {item.quantity}
                      </p>
                    </div>
                    <span className="font-inter text-sm text-gold shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="flex flex-col gap-3 border-t border-drip-white/10 pt-6 mb-8">
                <div className="flex justify-between">
                  <span className="font-inter text-sm text-drip-white/40">Subtotal</span>
                  <span className="font-inter text-sm text-drip-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-inter text-sm text-drip-white/40">Tax (10%)</span>
                  <span className="font-inter text-sm text-drip-white">${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between border-t border-drip-white/10 pt-3">
                  <span className="font-inter font-semibold text-drip-white">Total</span>
                  <span className="font-inter font-bold text-gold text-xl">${(cartTotal * 1.1).toFixed(2)}</span>
                </div>
              </div>

              {/* Place Order */}
              <button
                onClick={handleSubmit}
                className="w-full bg-gold text-drip-black font-inter font-bold text-sm tracking-widest uppercase py-4 hover:bg-gold/90 transition-all duration-300"
              >
                Place Order
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </main>
  )
}

export default Checkout