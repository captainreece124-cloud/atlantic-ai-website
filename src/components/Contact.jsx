import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { MessageCircle, Phone, Mail, CheckCircle, ArrowRight, Send, AlertCircle } from 'lucide-react'

const services = [
  'AI Chatbot & Automation',
  'Website Development',
  'Web Application / SaaS',
  'Brand Identity & Design',
  'Full-Service Package',
  'Other / Not Sure',
]

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setSubmitting(true)
    setFormError(null)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        reset()
      }, 6000)
    } catch {
      setFormError('Something went wrong. Please reach out via WhatsApp or email directly.')
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (hasError) =>
    `w-full bg-card border ${hasError ? 'border-red-500' : 'border-border focus:border-gold'} text-cream placeholder:text-muted font-body text-sm px-4 py-3.5 focus:outline-none transition-all duration-200 focus:shadow-[0_0_0_2px_rgba(0,200,255,0.15)]`

  return (
    <section id="contact" className="py-24 lg:py-32 bg-card/70 bg-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-gold">
              Get In Touch
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-7xl uppercase leading-none text-cream mb-4">
            Start Your{' '}
            <span className="text-gold">Project</span>
          </h2>
          <p className="text-muted text-lg max-w-lg mx-auto leading-relaxed">
            Book a free discovery call or send us a message. We respond within
            24 hours — usually faster.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-charcoal border border-border p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <CheckCircle className="w-14 h-14 text-gold" />
                <h3 className="font-display font-black text-2xl uppercase text-cream">
                  Message Sent!
                </h3>
                <p className="text-muted text-sm max-w-xs">
                  We've received your enquiry and will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-display font-bold text-xl uppercase tracking-wide text-cream mb-6">
                  Request a Free Discovery Call
                </h3>
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register('firstName', { required: 'Required' })}
                        className={inputClass(errors.firstName)}
                        placeholder="First Name *"
                      />
                      {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register('lastName', { required: 'Required' })}
                        className={inputClass(errors.lastName)}
                        placeholder="Last Name *"
                      />
                      {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
                    </div>
                  </div>

                  <div>
                    <input
                      {...register('business', { required: 'Required' })}
                      className={inputClass(errors.business)}
                      placeholder="Business Name *"
                    />
                    {errors.business && <p className="text-red-400 text-xs mt-1">{errors.business.message}</p>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register('email', {
                          required: 'Required',
                          pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' },
                        })}
                        type="email"
                        className={inputClass(errors.email)}
                        placeholder="Email Address *"
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                    <div>
                      <input
                        {...register('phone')}
                        type="tel"
                        className={inputClass(false)}
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div>
                    <select
                      {...register('service', { required: 'Please select a service' })}
                      className={`${inputClass(errors.service)} bg-card`}
                      defaultValue=""
                    >
                      <option value="" disabled>Service Interest *</option>
                      {services.map(s => (
                        <option key={s} value={s} className="bg-card text-cream">{s}</option>
                      ))}
                    </select>
                    {errors.service && <p className="text-red-400 text-xs mt-1">{errors.service.message}</p>}
                  </div>

                  <textarea
                    {...register('message')}
                    className={`${inputClass(false)} resize-none`}
                    rows={4}
                    placeholder="Tell us about your project (optional)"
                  />

                  {/* POPIA consent checkbox */}
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox"
                      id="consent"
                      {...register('consent', { required: 'You must consent to submit this form' })}
                      className="mt-0.5 w-4 h-4 flex-shrink-0 accent-gold cursor-pointer"
                    />
                    <label htmlFor="consent" className="text-muted text-xs leading-relaxed cursor-pointer">
                      I consent to Atlantic AI processing my personal information as described in the{' '}
                      <a href="/privacy.html" className="text-gold hover:underline">Privacy Policy</a>
                      {' '}*
                    </label>
                  </div>
                  {errors.consent && (
                    <p className="text-red-400 text-xs -mt-2 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      {errors.consent.message}
                    </p>
                  )}

                  {formError && (
                    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 px-4 py-3">
                      <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-xs leading-relaxed">{formError}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-display font-bold text-sm uppercase tracking-widest py-4 transition-all btn-glow group mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? 'Sending…' : 'Send Message'}
                    {!submitting && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                  </button>

                  {/* POPIA disclaimer */}
                  <p className="text-muted/60 text-[11px] leading-relaxed border-t border-border pt-3">
                    By submitting this form, you consent to Atlantic Digital Solutions (Pty) Ltd trading as Atlantic AI
                    processing your personal information to respond to your enquiry. Your information will be processed
                    in accordance with our{' '}
                    <a href="/privacy.html" className="text-gold/70 hover:text-gold transition-colors">Privacy Policy</a>
                    {' '}and will not be shared with third parties. You have the right to access, correct, or delete
                    your information at any time by contacting{' '}
                    <a href="mailto:reece@atlanticaiautomation.com" className="text-gold/70 hover:text-gold transition-colors">
                      reece@atlanticaiautomation.com
                    </a>.
                  </p>
                </form>
              </>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-4"
          >
            {[
              {
                icon: Mail,
                label: 'Email Us',
                lines: ['reece@atlanticaiautomation.com'],
                href: 'mailto:reece@atlanticaiautomation.com',
              },
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                lines: ['+27 67 638 1778', 'Usually responds within the hour'],
                href: 'https://wa.me/27676381778',
              },
              {
                icon: Phone,
                label: 'Response Time',
                lines: ['Within 24 hours', 'Mon–Fri, business hours SAST'],
              },
            ].map(({ icon: Icon, label, lines, href }) => (
              <a
                key={label}
                href={href || undefined}
                target={href?.startsWith('http') ? '_blank' : undefined}
                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`flex gap-4 p-5 bg-charcoal border border-border ${href ? 'hover:border-gold/40 hover:bg-gold/5 transition-all' : ''}`}
              >
                <Icon className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-display font-bold text-xs uppercase tracking-widest text-gold mb-1">{label}</p>
                  {lines.map(l => <p key={l} className="text-cream text-sm">{l}</p>)}
                </div>
              </a>
            ))}

            {/* Value props */}
            <div className="bg-charcoal border border-border p-5 mt-2">
              <p className="font-display font-bold text-xs uppercase tracking-widest text-gold mb-4">Why Atlantic AI</p>
              <ul className="flex flex-col gap-3">
                {[
                  '48-hour deployment timeline',
                  'Fixed-scope, no surprise billing',
                  'AI systems that actually work',
                  'South African market expertise',
                ].map(v => (
                  <li key={v} className="flex items-center gap-2.5 text-sm text-muted">
                    <CheckCircle className="w-4 h-4 text-gold flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
