import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, fadeUp, fadeRight, hoverLift } from '@utils/animations'
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
  HiArrowRight,
} from 'react-icons/hi'
import { HiStar } from 'react-icons/hi2'
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from 'react-icons/fa'
import { useData } from '../../context/DataContext'

/* ─── Footer Data ────────────────────────────────────────────────────────── */
const QUICK_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Our Services', path: '/services' },
  { name: 'Project Gallery', path: '/gallery' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
]

const SERVICE_LINKS = [
  { name: 'Laser Welding & Engraving', path: '/services' },
  { name: 'VMC Wirecut Job Work', path: '/services' },
  { name: 'Die & Mould Repair', path: '/services' },
  { name: 'Custom Manufacturing', path: '/services' },
  { name: 'Industrial Maintenance', path: '/services' },
]

const SOCIAL_LINKS = [
  { name: 'Facebook', icon: FaFacebookF, href: '#' },
  { name: 'Twitter', icon: FaTwitter, href: '#' },
  { name: 'LinkedIn', icon: FaLinkedinIn, href: '#' },
  { name: 'Instagram', icon: FaInstagram, href: '#' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { siteContent } = useData()
  const contactInfo = siteContent.contact

  return (
    <footer className="relative bg-[#020617] pt-12 pb-6 overflow-hidden border-t border-white/5">
      {/* ── Background Glow ────────────────────────────────────────── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-green-500/5 rounded-[100%] blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        
        {/* ── Main Grid ────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 mb-10"
        >
          
          {/* Column 1: Company Info */}
          <motion.div variants={fadeUp} className="lg:pr-6">
            <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <HiStar className="text-white text-lg" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-white text-lg tracking-tight leading-none group-hover:text-green-400 transition-colors">
                  Shri Vinayak
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-tight">
                  Engineering Solutions
                </span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Delivering uncompromising precision and industrial excellence through advanced laser welding, CNC machining, and comprehensive manufacturing solutions since 1998.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit our ${social.name} page`}
                  className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-white/10 text-gray-400 hover:bg-green-500 hover:text-white hover:border-green-400 hover:-translate-y-1 transition-all duration-300"
                >
                  <social.icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {QUICK_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-gray-400 text-sm hover:text-green-400 transition-colors"
                  >
                    <HiArrowRight className="text-green-500/0 -ml-4 group-hover:text-green-500 group-hover:ml-0 transition-all duration-300" size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Services */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Our Services
            </h4>
            <ul className="flex flex-col gap-2">
              {SERVICE_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="group flex items-center gap-2 text-gray-400 text-sm hover:text-green-400 transition-colors"
                  >
                    <HiArrowRight className="text-green-500/0 -ml-4 group-hover:text-green-500 group-hover:ml-0 transition-all duration-300" size={14} />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Info */}
          <motion.div variants={fadeUp}>
            <h4 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Contact Us
            </h4>
            <ul className="flex flex-col gap-3">
              <li className="flex items-start gap-3">
                <HiLocationMarker className="text-green-400 flex-shrink-0 mt-0.5" size={18} />
                <span className="text-gray-400 text-sm leading-relaxed">
                  {contactInfo.address}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <HiPhone className="text-emerald-400 flex-shrink-0" size={18} />
                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} className="text-gray-400 text-sm hover:text-white transition-colors">
                  {contactInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <HiMail className="text-blue-400 flex-shrink-0" size={18} />
                <a href={`mailto:${contactInfo.email}`} className="text-gray-400 text-sm hover:text-white transition-colors">
                  {contactInfo.email}
                </a>
              </li>
            </ul>
          </motion.div>

        </motion.div>

        {/* ── Bottom Bar ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-gray-500 text-sm text-center md:text-left">
            &copy; {currentYear} Shri Vinayak Engineering Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
