import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

import { MACHINE_DATA } from '../../data/machineData';

/* ─── Hero Component ─────────────────────────────────────────────────────── */
export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  const STATS = [
    { value: '500+', label: 'Projects' },
    { value: '100+', label: 'Clients' },
    { value: '10+',  label: 'Years Experience' },
  ];

  // Real index in the looped swiper (mod by length)
  const currentMachine = MACHINE_DATA[activeIndex % MACHINE_DATA.length];

  return (
    <section className="relative w-full min-h-screen flex flex-col bg-white dark:bg-gray-950">

      {/* ─── Full Background Carousel ──────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Swiper
          speed={800}
          loop={true}
          allowTouchMove={false}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="w-full h-full"
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        >
          {MACHINE_DATA.map((machine) => (
            <SwiperSlide key={machine.id}>
              <img
                src={machine.image}
                alt={machine.name}
                className="w-full h-full object-cover object-center"
              />
              {/* Overlays */}
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-gray-950/80 via-transparent to-transparent" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ─── Company Name — Left Center ────────────────────────────────── */}
      <div className="absolute top-1/2 -translate-y-1/2 left-6 sm:left-10 lg:left-16 z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-green-500 mb-1">Welcome to</p>
          <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight drop-shadow-xl">
            Shri Vinayak
          </h1>
          <h1 className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500 leading-tight">
            Engineering Solutions
          </h1>
          <div className="w-12 h-1 rounded-full bg-green-500 mt-3" />
        </motion.div>
      </div>

      {/* ─── Machine Info Overlay — Bottom Right ──────────────────────── */}
      <div className="relative z-10 flex-1 flex items-end justify-end pb-8">
        <div className="px-6 sm:px-10 lg:px-16">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-md text-right"
            >
              {/* Machine Name */}
              <h2 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-2 drop-shadow-xl">
                {currentMachine.name}
              </h2>

              {/* Divider */}
              <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 mb-3 ml-auto" />

              {/* Machine Description */}
              <p className="text-gray-200 text-sm leading-relaxed max-w-xs drop-shadow-md">
                {currentMachine.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Slide Progress Dots ───────────────────────────────────────── */}
      <div className="relative z-10 flex justify-center gap-2 py-4">
        {MACHINE_DATA.map((_, i) => (
          <div
            key={i}
            className={`rounded-full transition-all duration-500 ${
              i === activeIndex % MACHINE_DATA.length
                ? 'w-8 h-2 bg-green-500'
                : 'w-2 h-2 bg-white/30'
            }`}
          />
        ))}
      </div>

    </section>
  );
}
