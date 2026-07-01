import { motion } from 'framer-motion';
import { Rocket, Factory, Zap, ShieldCheck, MapPin, Globe } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { staggerContainer, fadeUp, fadeIn } from '../../utils/animations';

const ICON_MAP = {
  Rocket, Factory, Zap, ShieldCheck, MapPin, Globe
};

export default function FutureVisionSection() {
  const { futureVision, machines, goals, innovation } = useData();

  const visibleMachines = machines ? machines.filter(m => !m.isHidden).sort((a, b) => a.order - b.order) : [];

  return (
    <section className="py-24 bg-white dark:bg-gray-950 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-green-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-emerald-600/5 rounded-full blur-[150px]" />
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />
      </div>

      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-32">
        
        {/* (Vision section removed per user request) */}

        {/* 2. Upcoming & New Machinery */}
        {visibleMachines.length > 0 && (
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-black mb-4 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] dark:drop-shadow-none">
                <span
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Future Planning
                </span>
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Discover the latest cutting-edge equipment joining our workshop floor.</p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleMachines.map(machine => (
                <motion.div key={machine._id} variants={fadeUp} className="bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-sm border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden group">
                  <div className="h-48 relative overflow-hidden bg-white dark:bg-gray-950">
                    {machine.image && (
                      <img src={machine.image} alt={machine.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    )}
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                        machine.status === 'Installed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-blue-500/20 text-blue-400 border border-blue-500/20'
                      }`}>
                        {machine.status}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{machine.name}</h4>
                    {machine.launchDate && (
                      <p className="text-green-500 text-sm font-semibold mb-3">Expected: {new Date(machine.launchDate).toLocaleDateString()}</p>
                    )}
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">{machine.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 3. Expansion Goals Timeline */}
        {goals && goals.length > 0 && (
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-4">Our Roadmap</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">Strategic milestones for our continuous growth and capability expansion.</p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500/50 via-emerald-500/50 to-transparent -translate-x-1/2" />
              
              <div className="space-y-12">
                {goals.map((goal, idx) => {
                  const Icon = ICON_MAP[goal.icon] || Rocket;
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div key={goal._id} variants={fadeUp} className={`relative flex items-center justify-between md:justify-normal w-full ${isEven ? 'md:flex-row-reverse' : ''}`}>
                      {/* Empty spacer for alternating sides on desktop */}
                      <div className="hidden md:block w-5/12" />
                      
                      {/* Center Node */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-gray-50 dark:bg-gray-900 border-2 border-green-500 flex items-center justify-center text-green-500 z-10 shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                        <Icon size={18} />
                      </div>

                      {/* Content Card */}
                      <div className="w-full pl-16 md:pl-0 md:w-5/12">
                        <div className={`p-6 bg-white/60 dark:bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-black/5 dark:border-white/5 hover:border-green-500/30 transition-colors ${isEven ? 'md:mr-8 md:text-right' : 'md:ml-8'}`}>
                          <span className="text-green-500 font-bold text-lg mb-1 block">{goal.year}</span>
                          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{goal.title}</h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">{goal.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. Innovation Section */}
        {innovation && Object.keys(innovation).length > 0 && (
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="bg-gray-50 dark:bg-gray-900 rounded-3xl overflow-hidden border border-black/5 dark:border-white/5"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <motion.div variants={fadeIn} className="h-64 lg:h-auto relative">
                {innovation.image ? (
                  <img src={innovation.image} alt={innovation.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gray-800" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-gray-900 to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent hidden lg:block" />
              </motion.div>
              
              <div className="p-8 lg:p-16 flex flex-col justify-center relative z-10">
                <motion.div variants={fadeUp}>
                  <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 mb-6">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white mb-4">{innovation.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-wrap">{innovation.description}</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}
