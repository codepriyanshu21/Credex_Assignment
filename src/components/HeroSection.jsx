import { motion } from 'framer-motion'
import React from 'react'


const HeroSection = () => {
  return (
    <section className="bg-blue-600 text-white text-center py-20 px-4 dark:bg-gray-800">
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
      >
        Turn Unused Software Into Cash
      </motion.h1>
      <motion.p 
        className="text-xl mb-6"
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        We help you sell your unused software licenses quickly and securely.
      </motion.p>
      <motion.button 
        className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
        whileHover={{ scale: 1.05 }}
      >
        Sell My Licenses
      </motion.button>
    </section>
  )
}

export default HeroSection