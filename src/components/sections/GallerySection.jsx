import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import gallery1 from '@assets/gallery_1.png'
import gallery2 from '@assets/gallery_2.png'
import gallery3 from '@assets/gallery_3.png'

/* ─── Shared Animation ───────────────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: EASE },
  },
}

/* ─── Gallery Data ───────────────────────────────────────────────────────── */
const GALLERY_ITEMS = [
  {
    image: gallery1,
    title: 'Precision Laser Welding',
    desc: 'High-strength, micron-level accuracy for critical components.',
  },
  {
    image: gallery2,
    title: 'VMC Machining',
    desc: 'Advanced CNC milling for complex geometries.',
  },
  {
    image: gallery3,
    title: 'Die & Mould Inspection',
    desc: 'Rigorous quality control for industrial tooling.',
  },
]

export default function GallerySection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="gallery"
      ref={ref}
      className="relative pt-12 lg:pt-16 pb-12 lg:pb-16 bg-white dark:bg-gray-950 overflow-hidden"
    >
      {/* ── Background texture ─────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        
        {/* ── Header ───────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
            <span className="text-xs font-bold tracking-[0.22em] uppercase text-green-400">
              Our Facility
            </span>
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Industrial{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Gallery
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            Take a look at our state-of-the-art machinery and precision processes in action.
          </p>
        </motion.div>

        {/* ── Swiper Slider ────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
          className="rounded-2xl overflow-hidden shadow-2xl shadow-black/60 relative"
          style={{
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            speed={1000}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/40 !w-3 !h-3 !transition-all !duration-300 hover:!bg-green-400',
              bulletActiveClass: '!bg-green-500 !w-6 !rounded-full',
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            loop={true}
            className="w-full h-[350px] md:h-[450px] lg:h-[500px] group"
          >
            {GALLERY_ITEMS.map((item, index) => (
              <SwiperSlide key={index} className="relative overflow-hidden">
                {/* Image with hover zoom */}
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-[10000ms] hover:scale-110 cursor-grab active:cursor-grabbing"
                  style={{ filter: 'brightness(0.75)' }}
                />

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to top, rgba(2,6,23,0.9) 0%, rgba(2,6,23,0.2) 50%, transparent 100%)',
                  }}
                />

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-10 pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                      {item.title}
                    </h3>
                    <p className="text-green-300 md:text-lg font-medium drop-shadow-sm max-w-2xl">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation Buttons */}
            <button aria-label="Previous slide" className="swiper-button-prev-custom absolute top-1/2 left-4 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 text-gray-900 dark:text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-500/80 hover:border-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button aria-label="Next slide" className="swiper-button-next-custom absolute top-1/2 right-4 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-black/10 dark:border-white/10 text-gray-900 dark:text-white cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-green-500/80 hover:border-green-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
            
            {/* Custom Pagination Container overrides */}
            <style>{`
              .swiper-pagination {
                bottom: 24px !important;
                z-index: 20;
              }
            `}</style>
          </Swiper>
        </motion.div>

      </div>
    </section>
  )
}
