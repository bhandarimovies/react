/**
 * Contact.jsx — Contact form page
 */
import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  GithubIcon,
  LinkedinIcon,
  LoaderIcon,
  MailIcon,
  MapPinIcon,
  RefreshCcwIcon,
  ShieldIcon,
} from '../components/Icons.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_asxw3oi',
  TEMPLATE_ID: 'template_zcleh28',
  PUBLIC_KEY: 'MCmrVqLcXrnO7HNAC',
}

const CONTACT_INFO = [
  {
    label: 'Email',
    value: 'bhandari77333@gmail.com',
    icon: MailIcon,
    href: 'mailto:bhandari77333@gmail.com',
  },
  {
    label: 'GitHub',
    value: 'github.com/bhandarimovies',
    icon: GithubIcon,
    href: 'https://github.com/bhandarimovies',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/madhav-bhandari-521186294',
    icon: LinkedinIcon,
    href: 'https://linkedin.com/in/madhav-bhandari-521186294',
  },
  {
    label: 'Location',
    value: 'Sikkim, India',
    icon: MapPinIcon,
    href: null,
  },
]

function validateForm(data) {
  const errs = {}
  if (!data.name.trim()) errs.name = 'Name is required'
  else if (data.name.trim().length < 2) errs.name = 'Name too short'

  if (!data.email.trim()) errs.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Invalid email format'

  if (!data.message.trim()) errs.message = 'Message is required'
  else if (data.message.trim().length < 10) errs.message = 'Message too short (min 10 chars)'

  return errs
}

export default function Contact() {
  const formRef = useRef(null)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm(formData)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        formRef.current,
        EMAILJS_CONFIG.PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setErrors({})
  }

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="page-wrapper"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <p className="text-xs text-gray-600 mb-2 terminal-prompt">./send-message.sh</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-100 section-title">
            Contact
          </h1>
          <p className="mt-4 text-gray-500 text-sm max-w-xl">
            Have a project idea, security question, or just want to connect?
            Drop a message. I respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 space-y-4"
          >
            <div className="cyber-card p-5">
              <p className="text-xs text-neon/50 mb-4">// reach_me_at</p>
              <div className="space-y-3">
                {CONTACT_INFO.map(({ label, value, icon: Icon, href }) => (
                  <div key={label} className="flex items-start gap-3 group">
                    <span className="mt-0.5 text-neon/40 group-hover:text-neon transition-colors">
                      <Icon className="h-4 w-4 fill-current" />
                    </span>
                    <div>
                      <p className="text-gray-600 text-xs">{label}</p>
                      {href ? (
                        <a
                          href={href}
                          target={href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-gray-400 text-xs hover:text-neon transition-colors"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="text-gray-400 text-xs">{value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cyber-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                <span className="text-neon text-xs font-medium">Available for Work</span>
              </div>
              <p className="text-gray-500 text-xs leading-relaxed">
                Currently seeking internship opportunities in web development
                or cybersecurity. Open to remote and on-site roles.
              </p>
            </div>

            <div className="cyber-card p-5 text-xs text-gray-600">
              <p className="text-neon/40 mb-2"># response_time</p>
              <p className="terminal-prompt">avg response: ~24h</p>
              <p className="terminal-prompt">timezone: IST (UTC+5:30)</p>
              <p className="terminal-prompt">preferred: email/linkedin</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3"
          >
            <div className="cyber-card p-6 relative corner-tl corner-br">
              <p className="text-xs text-neon/50 mb-6">// compose_message.exe</p>

              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12"
                  >
                    <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full border border-neon/20 text-neon">
                      <CheckCircleIcon className="h-8 w-8" />
                    </div>
                    <h3 className="text-neon text-lg font-bold mb-2">Message Transmitted!</h3>
                    <p className="text-gray-500 text-sm mb-6">
                      Your message has been sent successfully. I&apos;ll get back to you soon.
                    </p>
                    <button onClick={resetForm} className="btn-neon inline-flex items-center gap-2 text-xs">
                      <RefreshCcwIcon className="h-4 w-4" />
                      <span>send another</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                    noValidate
                  >
                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">
                        <span className="text-neon/40 mr-1">$</span> name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full bg-cyber-dark border text-gray-300 text-sm px-3 py-2.5 outline-none transition-colors font-mono placeholder:text-gray-700 focus:border-neon/50 ${
                          errors.name ? 'border-red-500/50' : 'border-neon/20'
                        }`}
                        disabled={status === 'sending'}
                      />
                      {errors.name && (
                        <p className="mt-1 flex items-center gap-1 text-red-400 text-xs">
                          <AlertTriangleIcon className="h-3.5 w-3.5" />
                          <span>{errors.name}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">
                        <span className="text-neon/40 mr-1">$</span> email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full bg-cyber-dark border text-gray-300 text-sm px-3 py-2.5 outline-none transition-colors font-mono placeholder:text-gray-700 focus:border-neon/50 ${
                          errors.email ? 'border-red-500/50' : 'border-neon/20'
                        }`}
                        disabled={status === 'sending'}
                      />
                      {errors.email && (
                        <p className="mt-1 flex items-center gap-1 text-red-400 text-xs">
                          <AlertTriangleIcon className="h-3.5 w-3.5" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1.5">
                        <span className="text-neon/40 mr-1">$</span> message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Write your message here..."
                        className={`w-full bg-cyber-dark border text-gray-300 text-sm px-3 py-2.5 outline-none transition-colors font-mono placeholder:text-gray-700 focus:border-neon/50 resize-none ${
                          errors.message ? 'border-red-500/50' : 'border-neon/20'
                        }`}
                        disabled={status === 'sending'}
                      />
                      <div className="flex justify-between mt-1">
                        {errors.message && (
                          <p className="flex items-center gap-1 text-red-400 text-xs">
                            <AlertTriangleIcon className="h-3.5 w-3.5" />
                            <span>{errors.message}</span>
                          </p>
                        )}
                        <p className="text-gray-700 text-xs ml-auto">
                          {formData.message.length} chars
                        </p>
                      </div>
                    </div>

                    {status === 'error' && (
                      <div className="border border-red-500/30 bg-red-500/5 p-3 text-xs text-red-400 flex items-center gap-2">
                        <AlertTriangleIcon className="h-4 w-4 flex-shrink-0" />
                        <span>Failed to send message. Please check your EmailJS configuration or try again.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      className={`btn-neon w-full justify-center inline-flex items-center gap-2 text-xs ${
                        status === 'sending' ? 'opacity-60 cursor-not-allowed' : ''
                      }`}
                    >
                      {status === 'sending' ? (
                        <>
                          <LoaderIcon className="h-4 w-4 animate-spin" />
                          <span>transmitting...</span>
                        </>
                      ) : (
                        <>
                          <ShieldIcon className="h-4 w-4" />
                          <span>send message</span>
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
