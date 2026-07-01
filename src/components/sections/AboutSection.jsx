import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import {
  HiArrowRight,
  HiCheckCircle,
} from 'react-icons/hi'
import {
  HiWrenchScrewdriver,
  HiStar,
  HiBoltSlash,
  HiShieldCheck,
} from 'react-icons/hi2'
import { useData } from '../../context/DataContext'
import aboutImg from '@assets/about_workshop.png'

/* ─── Animation variants ─────────────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeLeft = {
  hidden:  { opacity: 0, x: -60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

const fadeRight = {
  hidden:  { opacity: 0, x: 60 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.8, ease: EASE },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE },
  }),
}

/* ─── Data ───────────────────────────────────────────────────────────────── */
const EXPERTISE = [
  { icon: HiWrenchScrewdriver, label: 'Laser Welding & Engraving' },
  { icon: HiBoltSlash,          label: 'VMC Wirecut Job Work' },
  { icon: HiShieldCheck,        label: 'Die & Mould Welding' },
  { icon: HiStar,           label: 'Manufacturing & Repairing' },
]

const HIGHLIGHTS = [
  'ISO 9001:2015 Certified Processes',
  'State-of-the-art CNC Machinery',
  'Micron-level Precision Tolerances',
  '25+ Years of Industrial Excellence',
  'On-time Delivery Guaranteed',
  'End-to-end Project Management',
]

/* ─── About Section ──────────────────────────────────────────────────────── */
export default function AboutSection({ hideButtons = false }) {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { siteContent } = useData();
  const aboutContent = siteContent.about;
  const stats = siteContent.home.stats.slice(0, 3).map(s => ({ ...s, label: s.label.replace(' ', '\n') }));

  return (
    <section
      id="about"
      ref={ref}
      className="relative pt-12 lg:pt-16 pb-12 lg:pb-16 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* ── Subtle background glow ─────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 60%, rgba(34,197,94,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 80% 30%, rgba(59,130,246,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">

        {/* ── Section label ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-16"
        >
          <div className="h-[3px] w-12 sm:w-24 bg-green-500/50 rounded-full" />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] dark:drop-shadow-none">
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {aboutContent.heading}
            </span>
          </h2>
          <div className="h-[3px] w-12 sm:w-24 bg-green-500/50 rounded-full" />
        </motion.div>

        {/* ── Two-column grid ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">

          {/* ════ LEFT — image column ═══════════════════════════════════ */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="relative"
          >
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
              <img
                src={aboutContent.image || aboutImg}
                alt="Industrial Engineering Workshop"
                loading="lazy"
                className="w-full h-full object-cover rounded-2xl aspect-[4/5] lg:aspect-auto lg:h-[450px]"
                style={{ filter: 'brightness(0.88) saturate(1.1)' }}
              />

              {/* Amber gradient overlay — bottom */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, rgba(2,6,23,0.4) 0%, transparent 40%)',
                }}
              />

              {/* Floating stat cards inside image */}
              <div className="absolute bottom-5 left-5 right-5 flex justify-between gap-3">
                {stats.map(({ value, label }) => (
                  <div
                    key={value}
                    className="flex-1 text-center py-3 px-2 rounded-xl"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255,255,255,0.10)',
                    }}
                  >
                    <p className="text-xl font-black text-green-400 leading-none">
                      {value}
                    </p>
                    <p
                      className="text-[10px] text-white/55 font-medium uppercase tracking-wider mt-1 leading-tight whitespace-pre-line"
                    >
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative border accent */}
            <div
              className="absolute -bottom-3 -right-3 w-2/3 h-2/3 rounded-2xl -z-10"
              style={{
                background:
                  'linear-gradient(135deg, rgba(34,197,94,0.18) 0%, transparent 70%)',
                border: '1px solid rgba(34,197,94,0.15)',
              }}
            />
          </motion.div>

          {/* ════ RIGHT — text column ═══════════════════════════════════ */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="flex flex-col"
          >
            {/* Heading */}
            <motion.h2
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-3xl sm:text-4xl xl:text-[2.75rem] font-black leading-[1.12] tracking-tight text-gray-900 dark:text-white mb-5"
            >
              {aboutContent.title.includes(',') ? (
                <>
                  {aboutContent.title.split(',')[0]},
                  <span
                    style={{
                      backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    {aboutContent.title.substring(aboutContent.title.indexOf(',') + 1)}
                  </span>
                </>
              ) : (
                aboutContent.title
              )}
            </motion.h2>

            {/* Body text */}
            <motion.div
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="text-gray-600 dark:text-gray-400 text-base leading-[1.85] mb-6"
            >
              <p className="mb-4">{aboutContent.description1}</p>
              <p>{aboutContent.description2}</p>
            </motion.div>

            {/* Expertise chips */}
            <motion.div
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="grid grid-cols-2 gap-3 mb-8"
            >
              {EXPERTISE.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  <Icon className="text-green-400 flex-shrink-0" size={17} />
                  <span className="text-gray-700 dark:text-gray-300 text-xs font-medium leading-tight">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* ── Glassmorphism highlights card ──────────────────────── */}
            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="rounded-2xl p-6 mb-8"
              style={{
                background:
                  'linear-gradient(135deg,rgba(34,197,94,0.06) 0%,rgba(255,255,255,0.03) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(34,197,94,0.15)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <p className="text-xs font-bold tracking-widest uppercase text-green-400 mb-4">
                Why Choose Us
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
                {HIGHLIGHTS.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <HiCheckCircle
                      className="text-green-400 flex-shrink-0 mt-0.5"
                      size={15}
                    />
                    <span className="text-gray-700 dark:text-gray-300 text-sm leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* CTA */}
            {!hideButtons && (
              <motion.div
                custom={4}
                variants={fadeUp}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="flex flex-wrap gap-3"
              >
                <Link
                  to="/contact"
                  id="about-get-quote"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                             font-bold text-sm tracking-wide text-gray-950
                             shadow-lg shadow-emerald-600/30
                             hover:shadow-emerald-500/50 hover:scale-[1.04]
                             active:scale-[0.97] transition-all duration-200"
                  style={{
                    backgroundImage:
                      'linear-gradient(135deg,#4ade80 0%,#10b981 55%,#ea580c 100%)',
                  }}
                >
                  <HiStar size={15} />
                  Get a Free Quote
                </Link>
                <Link
                  to="/about"
                  id="about-learn-more"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl
                             font-semibold text-sm text-gray-900 dark:text-white
                             border border-white/15 bg-black/5 dark:bg-white/5
                             hover:bg-black/10 dark:bg-white/10 hover:border-white/25
                             hover:scale-[1.03] active:scale-[0.97]
                             transition-all duration-200"
                >
                  Learn More
                  <HiArrowRight size={15} />
                </Link>
              </motion.div>
            )}

          </motion.div>
          {/* end right column */}
        </div>
      </div>
    </section>
  )
}
