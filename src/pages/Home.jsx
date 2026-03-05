import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

const Home = () => {
  const featuredProducts = products.filter(p => p.featured === true)

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80')`
          }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-drip-black/70" />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

          {/* Eyebrow text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-gold font-inter text-sm tracking-[0.3em] uppercase mb-6"
          >
            New Collection 2025
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-bebas text-[clamp(5rem,15vw,12rem)] leading-none text-drip-white tracking-wider mb-6"
          >
            DRESS LIKE
            <span className="text-gold"> ROYALTY</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-inter text-drip-white/70 text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Premium streetwear for those who refuse to blend in.
            Every piece crafted for the ones who lead.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/shop"
              className="bg-gold text-drip-black font-inter font-bold text-sm tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-all duration-300 w-full sm:w-auto text-center"
            >
              Shop Now
            </Link>
            <Link
              to="/shop"
              className="border border-drip-white/40 text-drip-white font-inter font-medium text-sm tracking-widest uppercase px-10 py-4 hover:border-gold hover:text-gold transition-all duration-300 w-full sm:w-auto text-center"
            >
              Explore Collection
            </Link>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-drip-white/40 text-xs tracking-widest uppercase font-inter">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-10 bg-gradient-to-b from-gold to-transparent"
          />
        </motion.div>

      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-14 gap-4"
        >
          <div>
            <p className="text-gold font-inter text-xs tracking-[0.3em] uppercase mb-3">
              Hand Picked
            </p>
            <h2 className="font-bebas text-5xl md:text-6xl text-drip-white tracking-wide">
              Featured Pieces
            </h2>
          </div>
          <Link
            to="/shop"
            className="font-inter text-sm text-drip-white/60 tracking-widest uppercase hover:text-gold transition-colors border-b border-drip-white/20 hover:border-gold pb-0.5"
          >
            View All
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

      </section>

      {/* Brand Story Section */}
      <section className="relative py-32 overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=80')`
          }}
        />
        <div className="absolute inset-0 bg-drip-black/80" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gold font-inter text-xs tracking-[0.3em] uppercase mb-6"
            >
              Our Story
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-bebas text-5xl md:text-7xl text-drip-white tracking-wide leading-none mb-8"
            >
              BUILT FOR THE
              <span className="text-gold"> BOLD</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-inter text-drip-white/60 text-base leading-relaxed mb-10"
            >
              DRIP. was born from a simple belief — that what you wear tells the world who you are before you speak. We create premium streetwear for men who move with intention. Every stitch, every fabric, every detail is deliberate.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                to="/shop"
                className="inline-block border border-gold text-gold font-inter font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold hover:text-drip-black transition-all duration-300"
              >
                Shop the Collection
              </Link>
            </motion.div>
          </div>
        </div>

      </section>


      {/* Stats Section */}
      <section className="border-t border-b border-drip-white/10 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'Premium Pieces' },
              { number: '12K+', label: 'Happy Customers' },
              { number: '4.9', label: 'Average Rating' },
              { number: 'Free', label: 'Worldwide Shipping' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center gap-2"
              >
                <span className="font-bebas text-5xl text-gold tracking-wide">
                  {stat.number}
                </span>
                <span className="font-inter text-xs text-drip-white/40 tracking-widest uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}

export default Home