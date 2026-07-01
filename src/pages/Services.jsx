import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiChevronRight, HiHome } from 'react-icons/hi'
import SEO from '@components/seo/SEO'
import { staggerContainer, fadeUp, fadeIn } from '@utils/animations'

import ServicesGrid from '@components/sections/ServicesGrid'
import WorkflowTimeline from '@components/sections/WorkflowTimeline'
import MachineryShowcase from '@components/sections/MachineryShowcase'
import WhyChooseUsSection from '@components/sections/WhyChooseUsSection'
import CTASection from '@components/sections/CTASection'

import heroBg from '@assets/services_hero_bg.png'

export default function Services() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-hidden">
      <SEO 
        title="Our Services | Shri Vinayak Engineering Solutions"
        description="Explore our precision engineering services: Laser Welding, Laser Engraving, VMC Wirecut Job Work, and Custom Manufacturing."
      />

      {/* ── Services Hero Section ────────────────────────────────────────── */}
      <section className="relative w-full h-[40vh] min-h-[350px] flex items-center justify-center overflow-hidden">
        
        {/* Background Image & Overlay */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="absolute inset-0 z-0"
        >
          <img
            src={heroBg}
            alt="Advanced Industrial Manufacturing Facility"
            fetchpriority="high"
            className="w-full h-full object-cover object-center"
            style={{ filter: 'brightness(0.35) saturate(1.2)' }}
          />
          {/* Bottom gradient fade for smooth transition to next section */}
          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-gray-950 to-transparent" />
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
                Engineering Services
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p 
              variants={fadeUp}
              className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed drop-shadow-lg"
            >
              Precision Welding, Engraving, Wirecut &amp; Manufacturing Solutions tailored to meet the highest industrial standards.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── 2. Services Overview Grid ─────────────────────────────────────── */}
      <ServicesGrid />

      {/* ── 4. Process Workflow ───────────────────────────────────────────── */}
      <WorkflowTimeline />

      {/* ── 5. Machinery Showcase ─────────────────────────────────────────── */}
      <MachineryShowcase />

      {/* ── 6. Why Choose Us (Stats) ──────────────────────────────────────── */}
      <WhyChooseUsSection />

      {/* ── 7. Call To Action ─────────────────────────────────────────────── */}
      <CTASection />
      
    </div>
  )
}
