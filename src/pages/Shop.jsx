import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { products, categories } from '../data/products'
import ProductCard from '../components/ProductCard'

const Shop = () => {
  const [activeCategory, setActiveCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
      return matchesCategory && matchesSearch
    })
  }, [activeCategory, searchQuery])

  return (
    <main className="min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-gold font-inter text-xs tracking-[0.3em] uppercase mb-3">
            The Collection
          </p>
          <h1 className="font-bebas text-6xl md:text-7xl text-drip-white tracking-wide">
            All Products
          </h1>
        </motion.div>

        {/* Search + Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-14"
        >
          {/* Category Filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-inter text-xs tracking-widest uppercase px-5 py-2.5 border transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gold text-drip-black border-gold font-bold'
                    : 'border-drip-white/20 text-drip-white/60 hover:border-gold hover:text-gold'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-drip-white/40" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-drip-white/10 text-drip-white font-inter text-sm pl-10 pr-10 py-2.5 focus:outline-none focus:border-gold transition-colors placeholder:text-drip-white/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-drip-white/40 hover:text-gold transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <p className="font-inter text-drip-white/40 text-xs tracking-widest uppercase mb-10">
          {filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : 'Products'}
        </p>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          {filteredProducts.length > 0 ? (
            <motion.div
              key={activeCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12"
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-4"
            >
              <p className="font-bebas text-4xl text-drip-white/20 tracking-wide">
                No Products Found
              </p>
              <p className="font-inter text-drip-white/40 text-sm">
                Try a different search or category
              </p>
              <button
                onClick={() => { setActiveCategory('All'); setSearchQuery('') }}
                className="mt-4 font-inter text-xs tracking-widest uppercase text-gold border border-gold px-6 py-2.5 hover:bg-gold hover:text-drip-black transition-all duration-200"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  )
}

export default Shop