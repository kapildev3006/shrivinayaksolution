import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiChevronRight, HiHome } from 'react-icons/hi'
import { staggerContainer, fadeUp, fadeIn } from '@utils/animations'

import heroBg from '@assets/about_workshop.png' // Using the large industrial workshop image

export default function GalleryHero() {
  return (
    <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image & Overlay */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="absolute inset-0 z-0"
      >
        <div 
          className="w-full h-full bg-cover bg-center bg-fixed"
          style={{ 
            backgroundImage: `url(${heroBg})`,
            filter: 'brightness(0.3) saturate(1.2)' 
          }}
        />
        {/* Bottom gradient fade for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black/80 to-transparent" />
      </motion.div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 text-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >


          {/* Heading */}
          <motion.h1 
            variants={fadeUp}
            className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight text-white mb-6"
          >
            Our{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Work Gallery
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p 
            variants={fadeUp}
            className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-md"
          >
            Showcasing Precision Engineering, Welding &amp; Machining Excellence across our diverse industrial portfolio.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
