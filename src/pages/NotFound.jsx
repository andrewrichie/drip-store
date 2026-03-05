import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 px-6 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-6"
      >
        <p className="font-inter text-xs tracking-[0.3em] uppercase text-gold">
          Error 404
        </p>
        <h1 className="font-bebas text-[clamp(6rem,20vw,14rem)] leading-none text-drip-white/10 tracking-wide">
          LOST?
        </h1>
        <p className="font-inter text-drip-white/40 text-sm max-w-sm leading-relaxed -mt-4">
          The page you're looking for doesn't exist. It may have been moved or never existed at all.
        </p>
        <Link
          to="/"
          className="mt-4 bg-gold text-drip-black font-inter font-bold text-xs tracking-widest uppercase px-10 py-4 hover:bg-gold/90 transition-all duration-200"
        >
          Back to Home
        </Link>
      </motion.div>
    </main>
  )
}

export default NotFound