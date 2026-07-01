import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { HiArrowRight } from 'react-icons/hi'
import {
  HiStar,
  HiWrenchScrewdriver,
  HiBoltSlash,
  HiCog6Tooth,
  HiShieldCheck,
  HiCube,
  HiArrowPath,
} from 'react-icons/hi2'

/* ─── Animation variants ─────────────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
}

/* ─── Service data ───────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: HiStar,
    title: 'Laser Welding',
    desc: 'High-precision laser beam welding for die, mould, and industrial components with micron-level accuracy and minimal heat-affected zones.',
    gradient: 'from-green-400 to-emerald-600',
    glowColor: 'rgba(34,197,94,0.15)',
    borderColor: 'rgba(34,197,94,0.25)',
  },
  {
    icon: HiCog6Tooth,
    title: 'Laser Engraving',
    desc: 'Permanent high-resolution laser marking and engraving on metals, plastics, and industrial parts with extreme detail and durability.',
    gradient: 'from-blue-400 to-cyan-500',
    glowColor: 'rgba(59,130,246,0.15)',
    borderColor: 'rgba(59,130,246,0.25)',
  },
  {
    icon: HiBoltSlash,
    title: 'VMC Wirecut Job Work',
    desc: 'Advanced CNC Vertical Machining Centre and Wire EDM cutting for complex geometries, tight tolerances, and hardened materials.',
    gradient: 'from-emerald-400 to-teal-500',
    glowColor: 'rgba(52,211,153,0.15)',
    borderColor: 'rgba(52,211,153,0.25)',
  },
  {
    icon: HiShieldCheck,
    title: 'Die & Mould Welding',
    desc: 'Expert repair and restoration welding of precision dies and moulds — extending tool life, reducing downtime, and cutting replacement costs.',
    gradient: 'from-purple-400 to-violet-600',
    glowColor: 'rgba(167,139,250,0.15)',
    borderColor: 'rgba(167,139,250,0.25)',
  },
  {
    icon: HiCube,
    title: 'Manufacturing',
    desc: 'End-to-end custom manufacturing of precision-engineered components, jigs, fixtures, and assemblies with rigorous quality control.',
    gradient: 'from-rose-400 to-pink-600',
    glowColor: 'rgba(251,113,133,0.15)',
    borderColor: 'rgba(251,113,133,0.25)',
  },
  {
    icon: HiArrowPath,
    title: 'Repairing',
    desc: 'Comprehensive industrial machinery and component repair services — restoring performance, precision, and longevity to critical equipment.',
    gradient: 'from-green-300 to-yellow-500',
    glowColor: 'rgba(252,211,77,0.15)',
    borderColor: 'rgba(252,211,77,0.25)',
  },
]

/* ─── Service Card ───────────────────────────────────────────────────────── */
function ServiceCard({ icon: Icon, title, desc, gradient, glowColor, borderColor, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      className="group relative"
    >
      {/* Gradient border wrapper */}
      <div
        className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${borderColor}, transparent 60%)`,
        }}
      />

      {/* Card body */}
      <div
        className="relative h-full rounded-2xl p-6 transition-all duration-500
                   group-hover:-translate-y-1 
                   bg-white dark:bg-gray-900/85 
                   border border-black/5 dark:border-white/[0.06] 
                   shadow-[0_8px_30px_-4px_rgba(0,0,0,0.04)] dark:shadow-none
                   hover:shadow-[0_12px_40px_-4px_rgba(0,0,0,0.08)] dark:hover:shadow-none
                   backdrop-blur-md"
      >
        {/* Glow on hover */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full
                     opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: glowColor,
            filter: 'blur(60px)',
          }}
        />

        <div className="relative z-10">
          {/* Icon */}
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-5
                       transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${glowColor}, rgba(255,255,255,0.03))`,
              border: `1px solid ${borderColor}`,
            }}
          >
            <Icon
              size={26}
              className="transition-transform duration-500 group-hover:rotate-6"
              style={{
                color: borderColor.replace('0.25', '1'),
              }}
            />
          </div>

          {/* Title */}
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
            {title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
            {desc}
          </p>

          {/* Link */}
          <Link
            to="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold
                       transition-all duration-300 group-hover:gap-3"
            style={{
              color: borderColor.replace('0.25', '0.9'),
            }}
          >
            Learn More
            <HiArrowRight
              size={14}
              className="-translate-x-1 group-hover:translate-x-0 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Services Section ───────────────────────────────────────────────────── */
export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="services"
      ref={ref}
      className="relative pt-12 lg:pt-16 pb-12 lg:pb-16 bg-gray-50 dark:bg-gray-950 overflow-hidden"
    >
      {/* ── Subtle background ──────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 70% 20%, rgba(34,197,94,0.04) 0%, transparent 65%), radial-gradient(ellipse 40% 50% at 20% 80%, rgba(59,130,246,0.04) 0%, transparent 60%)',
        }}
      />

      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">

        {/* ── Section header ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-16"
        >
          {/* Label */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-green-400">
              Our Services
            </span>
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
          </div>

          {/* Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            What We{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Specialize In
            </span>
          </h2>

          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            From precision laser welding to end-to-end manufacturing, we deliver
            industrial solutions built on decades of expertise and cutting-edge technology.
          </p>
        </motion.div>

        {/* ── Cards grid ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* ── Bottom CTA ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
          className="text-center mt-16"
        >
          <Link
            to="/contact"
            id="services-cta"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl
                       font-bold text-sm tracking-wide text-gray-950
                       shadow-xl shadow-emerald-600/30
                       hover:shadow-emerald-500/50 hover:scale-[1.04] active:scale-[0.97]
                       transition-all duration-200"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #4ade80 0%, #10b981 55%, #ea580c 100%)',
            }}
          >
            <HiStar size={16} />
            Get a Free Quote for Your Project
            <HiArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
