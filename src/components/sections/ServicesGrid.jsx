import { useState, useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { staggerContainer, fadeUp, hoverLift } from '@utils/animations'
import { HiX, HiCheckCircle, HiArrowsExpand } from 'react-icons/hi'
import { useData } from '../../context/DataContext'

export default function ServicesGrid() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { services: SERVICES } = useData()
  const [selectedService, setSelectedService] = useState(null)
  const [fullImage, setFullImage] = useState(null)

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedService || fullImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedService, fullImage])

  // Remove smooth scrolling logic as it's replaced by modal

  return (
    <section ref={ref} className={`relative py-16 bg-white dark:bg-gray-950 overflow-hidden ${selectedService ? 'z-[100]' : 'z-10'}`}>
      <div className="relative z-10 w-full px-8 sm:px-12 md:px-16 lg:px-24 max-w-[1400px] mx-auto">
        
        {/* Header */}
        <motion.div
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={fadeUp}
          className="text-center mb-16"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Complete{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Industrial Solutions
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto">
            From precision micron-level laser welding to heavy industrial manufacturing, we offer a complete suite of engineering services.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mt-12"
        >
          {SERVICES.map((service) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              whileHover={hoverLift}
              onClick={() => setSelectedService(service)}
              className="group relative h-full flex flex-col cursor-pointer"
            >
              {/* Hover Gradient Border */}
              <div
                className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `linear-gradient(135deg, ${service.color || '#10b981'}, transparent 70%)`,
                }}
              />

              {/* Card Body */}
              <div
                className="relative h-full rounded-2xl overflow-hidden flex flex-col transition-all duration-500 bg-white/80 dark:bg-gray-900/85 border border-black/5 dark:border-white/[0.06] backdrop-blur-md"
              >
                {/* Image Section */}
                <div className="w-full h-36 overflow-hidden relative group/image">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    className="w-full h-full object-cover object-center transition-transform duration-[8000ms] group-hover:scale-110"
                  />
                  {/* Full View Icon */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setFullImage(service.image)
                    }}
                    className="absolute bottom-2 right-2 z-20 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                    aria-label="View Full Image"
                  >
                    <HiArrowsExpand size={18} />
                  </button>
                </div>

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow relative z-20">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300 group-hover:text-green-500">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-3">
                    {service.desc}
                  </p>
                  
                  {/* Learn More link */}
                  <div className="mt-auto flex items-center gap-1 text-xs font-semibold transition-colors duration-300 group-hover:text-green-400 text-gray-500">
                    View Details <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Custom Lightbox Modal */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl p-4 sm:p-8"
              onClick={() => setSelectedService(null)}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-white/20 text-gray-900 dark:text-white rounded-full transition-colors backdrop-blur-md"
              >
                <HiX size={24} />
              </button>

              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                className="relative max-w-5xl w-full bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 max-h-[90vh] flex flex-col lg:flex-row"
                onClick={e => {
                  e.stopPropagation()
                  if (!e.target.closest('a, button, input, select, textarea, [role="button"]')) {
                    window.dispatchEvent(new Event('toggleNavbar'))
                  }
                }} 
              >
                {/* Image Section - Medium Size */}
                <div className="w-full lg:w-2/5 h-[35vh] lg:h-auto shrink-0 relative group/modal-image">
                  <img 
                    src={selectedService.image} 
                    alt={selectedService.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent lg:hidden" />
                  
                  {/* Full View Icon (Modal) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setFullImage(selectedService.image)
                    }}
                    className="absolute bottom-4 right-4 z-20 p-2.5 bg-black/50 hover:bg-black/80 text-white rounded-full opacity-0 group-hover/modal-image:opacity-100 transition-all duration-300 shadow-lg"
                    aria-label="View Full Image"
                  >
                    <HiArrowsExpand size={20} />
                  </button>
                </div>
                
                {/* Details Section */}
                <div className="w-full lg:w-3/5 p-6 sm:p-8 lg:p-10 flex flex-col overflow-y-auto bg-white dark:bg-gray-900 min-w-0 flex-1 min-h-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-px bg-green-500" />
                    <span className="text-green-500 font-bold uppercase tracking-widest text-[10px]">
                      Service Details
                    </span>
                  </div>
                  
                  <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white mb-4 break-words">
                    {selectedService.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base leading-relaxed mb-6 break-words">
                    {selectedService.desc}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {/* Features (if any) */}
                    {selectedService.features && (
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-[11px] uppercase tracking-wider mb-3 border-b border-black/10 dark:border-white/10 pb-1.5">Includes</h4>
                        <ul className="space-y-2">
                          {selectedService.features.map((feature, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-gray-700 dark:text-gray-300 text-[13px] leading-tight break-words">
                              <HiCheckCircle className="text-green-500 mt-[1px] flex-shrink-0" size={14} />
                              <span className="min-w-0 break-words">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Benefits */}
                    {selectedService.benefits && (
                      <div>
                        <h4 className="text-gray-900 dark:text-white font-bold text-[11px] uppercase tracking-wider mb-3 border-b border-black/10 dark:border-white/10 pb-1.5">Benefits</h4>
                        <ul className="space-y-2">
                          {selectedService.benefits.map((benefit, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-gray-700 dark:text-gray-300 text-[13px] leading-tight break-words">
                              <HiCheckCircle className="text-emerald-500 mt-[1px] flex-shrink-0" size={14} />
                              <span className="min-w-0 break-words">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Applications (if any) */}
                    {selectedService.applications && (
                      <div className="sm:col-span-2 mt-2">
                        <h4 className="text-gray-900 dark:text-white font-bold text-[11px] uppercase tracking-wider mb-3 border-b border-black/10 dark:border-white/10 pb-1.5">Applications</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {selectedService.applications.map((app, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-gray-700 dark:text-gray-300 text-[13px] leading-tight break-words">
                              <HiCheckCircle className="text-blue-500 mt-[1px] flex-shrink-0" size={14} />
                              <span className="min-w-0 break-words">{app}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Image Preview Modal */}
        <AnimatePresence>
          {fullImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
              onClick={() => setFullImage(null)}
            >
              {/* Close Button */}
              <button 
                onClick={() => setFullImage(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <HiX size={24} />
              </button>

              {/* Large Image */}
              <motion.img
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                src={fullImage}
                alt="Full Preview"
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl cursor-pointer"
                onClick={e => {
                  e.stopPropagation();
                  window.dispatchEvent(new Event('toggleNavbar'));
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
