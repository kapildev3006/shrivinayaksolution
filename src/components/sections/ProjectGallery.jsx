import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiX, HiArrowsExpand } from 'react-icons/hi'
import { useData } from '../../context/DataContext'

export default function ProjectGallery() {
  const { categories: CATEGORIES, projects: PROJECTS } = useData();
  const [activeCategory, setActiveCategory] = useState('All')
  const [filteredProjects, setFilteredProjects] = useState(PROJECTS)
  const [selectedImage, setSelectedImage] = useState(null) // Holds the full project object for the lightbox

  // Handle Filtering
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(PROJECTS)
    } else {
      setFilteredProjects(PROJECTS.filter(p => p.category === activeCategory))
    }
  }, [activeCategory, PROJECTS])

  // Lock background scroll when modal is open
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [selectedImage])

  return (
    <section className={`pt-12 pb-24 bg-white dark:bg-gray-950 relative min-h-screen ${selectedImage ? 'z-[100]' : 'z-10'}`}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Masonry Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.id}
                className="group relative rounded-2xl overflow-hidden cursor-pointer aspect-square bg-gray-50 dark:bg-gray-900 border border-black/5 dark:border-white/5"
                onClick={() => setSelectedImage(project)}
              >
                {/* Image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Subtle dark gradient for text contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

                {/* Glassmorphic Info Card */}
                <div className="absolute inset-x-2 bottom-2 sm:inset-x-3 sm:bottom-3 z-10">
                  <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-2.5 sm:p-3 shadow-2xl transform transition-all duration-500 group-hover:-translate-y-1 group-hover:bg-black/60 group-hover:border-white/20">
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-green-500/20 text-green-400 text-[8px] sm:text-[9px] font-bold uppercase tracking-widest rounded mb-1 sm:mb-1.5">
                          <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse"></span>
                          {project.category}
                        </span>
                        <h3 className="text-white text-sm sm:text-base font-bold leading-tight truncate">
                          {project.title}
                        </h3>
                      </div>
                      
                      {/* Interactive Icon */}
                      <div className="w-7 h-7 shrink-0 rounded-full bg-white/10 text-white flex items-center justify-center opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:bg-green-500 group-hover:shadow-[0_0_10px_rgba(34,197,94,0.5)] transition-all duration-500 ease-out">
                        <HiArrowsExpand size={14} className="transform group-hover:rotate-90 transition-transform duration-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl p-4 sm:p-8"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedImage(null)}
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
                className="relative max-w-4xl w-full bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 max-h-[90vh] flex flex-col lg:flex-row"
                onClick={e => e.stopPropagation()} // Prevent closing when clicking the image card itself
              >
                {/* Image Section - Fills container */}
                <div className="w-full lg:w-[55%] h-[40vh] sm:h-[50vh] lg:h-auto shrink-0 relative">
                  <img 
                    src={selectedImage.image} 
                    alt={selectedImage.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent lg:hidden" />
                </div>

                {/* Details Section */}
                <div className="w-full lg:w-[45%] p-8 lg:p-10 flex flex-col justify-center overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-950 flex-1 min-h-0 min-w-0">
                  <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                    {selectedImage.category}
                  </span>
                  <h2 className="text-3xl font-black text-white mb-4 break-words">
                    {selectedImage.title}
                  </h2>
                  <p className="text-gray-400 leading-relaxed whitespace-pre-wrap break-words">
                    {selectedImage.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
