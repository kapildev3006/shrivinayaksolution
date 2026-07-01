import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  HiLocationMarker,
  HiPhone,
  HiMail,
} from 'react-icons/hi'
import { FaWhatsapp } from 'react-icons/fa'
import { useData } from '../../context/DataContext'

/* ─── Animation ──────────────────────────────────────────────────────────── */
const EASE = [0.25, 0.46, 0.45, 0.94]

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.1, ease: EASE },
  }),
}

const fadeRight = {
  hidden:  { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

const fadeLeft = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

/* ─── Info Items ─────────────────────────────────────────────────────────── */

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const formRef = useRef()
  const { siteContent } = useData();
  const contactInfoData = siteContent.contact;

  const CONTACT_INFO = [
    {
      icon: HiLocationMarker,
      title: 'Factory Address',
      content: contactInfoData.address,
      href: 'https://maps.google.com/?q=IMT+Manesar,Gurugram',
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/20',
    },
    {
      icon: HiPhone,
      title: 'Phone Number',
      content: contactInfoData.phone,
      href: `tel:${contactInfoData.phone.replace(/\\s/g, '')}`,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
    },
    {
      icon: HiMail,
      title: 'Email Address',
      content: contactInfoData.email,
      href: `mailto:${contactInfoData.email}`,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
    },
  ];

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null) // 'success' | 'error' | null

  const sendEmail = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    const formData = new FormData(formRef.current)
    const data = {
      name: formData.get('user_name'),
      email: formData.get('user_email'),
      phone: formData.get('user_phone'),
      service: formData.get('service'),
      message: formData.get('message')
    }

    try {
      const API_URL = import.meta.env.VITE_API_BASE_URL || '/api';
      const res = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (res.ok) {
        setSubmitStatus('success')
        formRef.current.reset()
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error("Failed to send message", error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      ref={ref}
      className="relative pt-12 lg:pt-16 pb-24 lg:pb-32 bg-gray-50 dark:bg-gray-950 overflow-hidden"
    >
      {/* ── Background Elements ────────────────────────────────────── */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/5 rounded-full blur-[120px] pointer-events-none"
      />
      <div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] pointer-events-none"
      />
      
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        
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
              Get in Touch
            </span>
            <div className="h-px w-8 bg-green-500/50 rounded-full" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 dark:text-white mb-4">
            Contact{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #4ade80, #10b981)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Our Experts
            </span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-base max-w-2xl mx-auto leading-relaxed">
            Ready to discuss your engineering needs? Reach out to us for free consultations, quotations, or technical inquiries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* ── Left Column: Contact Info & Map ──────────────────────── */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeLeft}
            className="flex flex-col gap-8"
          >
            {/* Info Cards */}
            <div className="flex flex-col gap-4">
              {CONTACT_INFO.map((info, idx) => (
                <a
                  key={idx}
                  href={info.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 group hover:-translate-y-1"
                  style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${info.bg} ${info.border} transition-colors group-hover:bg-black/10 dark:bg-white/10`}>
                    <info.icon className={`${info.color} text-xl`} />
                  </div>
                  <div>
                    <h4 className="text-gray-900 dark:text-white font-bold text-sm mb-1">{info.title}</h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed group-hover:text-gray-700 dark:text-gray-300 transition-colors">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${contactInfoData.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full py-4 rounded-xl font-bold text-gray-900 dark:text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-500/20"
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              }}
            >
              <FaWhatsapp size={22} />
              Chat on WhatsApp
            </a>

            {/* Google Map */}
            <div className="w-full h-64 rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 mt-2">
              <iframe
                src="https://www.google.com/maps?q=9WM7%2BVPX+Gurugram,+Haryana&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Map Location"
              />
            </div>
          </motion.div>

          {/* ── Right Column: Contact Form ─────────────────────────── */}
          <motion.div
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={fadeRight}
          >
            <div 
              className="p-8 sm:p-10 rounded-3xl h-full shadow-2xl shadow-black/50 bg-white/80 dark:bg-gray-900/85 border border-black/5 dark:border-white/[0.06] backdrop-blur-md"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Send us a Message</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>

              <form ref={formRef} onSubmit={sendEmail} className="flex flex-col gap-5">
                {/* Name */}
                <div>
                  <label htmlFor="user_name" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input
                    type="text"
                    name="user_name"
                    id="user_name"
                    required
                    className="w-full bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-600"
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label htmlFor="user_email" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      name="user_email"
                      id="user_email"
                      required
                      className="w-full bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-600"
                      placeholder="john@company.com"
                    />
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="user_phone" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Phone Number</label>
                    <input
                      type="tel"
                      name="user_phone"
                      id="user_phone"
                      className="w-full bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-600"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>

                {/* Service Interest */}
                <div>
                  <label htmlFor="service" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Service of Interest</label>
                  <select
                    name="service"
                    id="service"
                    className="w-full bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all appearance-none"
                  >
                    <option value="" className="bg-gray-50 dark:bg-gray-900">Select a service</option>
                    <option value="Laser Welding" className="bg-gray-50 dark:bg-gray-900">Laser Welding & Engraving</option>
                    <option value="VMC Wirecut" className="bg-gray-50 dark:bg-gray-900">VMC Wirecut Job Work</option>
                    <option value="Die & Mould" className="bg-gray-50 dark:bg-gray-900">Die & Mould Repairing</option>
                    <option value="Manufacturing" className="bg-gray-50 dark:bg-gray-900">Manufacturing Solutions</option>
                    <option value="Other" className="bg-gray-50 dark:bg-gray-900">Other Inquiry</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-2">Your Message</label>
                  <textarea
                    name="message"
                    id="message"
                    rows="4"
                    required
                    className="w-full bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 text-gray-900 dark:text-white text-sm focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all placeholder:text-gray-600 resize-none"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-2 rounded-xl font-bold text-gray-950 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg shadow-emerald-600/20"
                  style={{
                    background: 'linear-gradient(135deg, #4ade80 0%, #10b981 55%, #ea580c 100%)',
                  }}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <p className="text-emerald-400 text-sm text-center font-medium mt-2">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center font-medium mt-2">
                    Oops! Something went wrong. Please try again later or contact us via WhatsApp.
                  </p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
