import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    quote: 'Atlantic AI rebuilt our entire customer workflow. The AI system handles 80% of queries automatically — our team now focuses on what matters. Deployed, tested, and live in under 48 hours.',
    name: 'M. Olivier',
    company: 'Cape Town',
    stars: 5,
    initials: 'MO',
    role: 'Operations Director',
  },
  {
    quote: 'Deployed in 48 hours. Zero downtime. The chatbot handles after-hours enquiries better than most of our staff handle peak hours. Worth every rand and then some.',
    name: 'K. Naidoo',
    company: 'Johannesburg',
    stars: 5,
    initials: 'KN',
    role: 'CEO, Financial Services',
  },
  {
    quote: 'The ROI speaks for itself. Three months post-launch: 40% reduction in admin time, 60% faster lead response. Best digital investment we\'ve made as a business.',
    name: 'T. van der Berg',
    company: 'Durban',
    stars: 5,
    initials: 'TV',
    role: 'Managing Director',
  },
  {
    quote: 'We had a website. Now we have a system. The AI handles booking, follow-ups, and reporting. Atlantic AI understood our business before they wrote a single line of code.',
    name: 'S. Dlamini',
    company: 'Pretoria',
    stars: 5,
    initials: 'SD',
    role: 'Founder, Legal Practice',
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-gold text-lg">★</span>
      ))}
    </div>
  )
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = testimonials.length

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total])
  const prev = useCallback(() => setCurrent(c => (c - 1 + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, 5000)
    return () => clearInterval(t)
  }, [paused, next])

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-charcoal/70">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

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
              What Clients Say
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-none text-cream">
            Verified{' '}
            <span className="text-gold">Results</span>
          </h2>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-card border border-border p-8 lg:p-12"
            >
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="mb-6">
                    <Stars count={testimonials[current].stars} />
                  </div>
                  <div className="font-display font-black text-5xl text-gold leading-none mb-4 select-none">"</div>
                  <p className="text-cream text-lg lg:text-xl leading-relaxed font-light mb-8">
                    {testimonials[current].quote}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gold flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-black text-charcoal text-sm">
                        {testimonials[current].initials}
                      </span>
                    </div>
                    <div>
                      <div className="font-display font-bold text-sm uppercase tracking-widest text-cream">
                        {testimonials[current].name}
                      </div>
                      <div className="text-muted text-xs mt-0.5">{testimonials[current].role}</div>
                      <div className="text-gold/60 text-xs font-display uppercase tracking-wider mt-0.5">
                        {testimonials[current].company}
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span className="inline-flex items-center gap-1.5 border border-green-500/30 bg-green-500/5 text-green-400 text-xs font-display font-bold uppercase tracking-wider px-3 py-1.5">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="transition-all duration-300"
                  style={{
                    height: '2px',
                    width: i === current ? '2rem' : '1rem',
                    background: i === current ? '#00C8FF' : '#1E3A5F',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>

            <div className="flex gap-2">
              <button
                onClick={prev}
                className="w-10 h-10 border border-border hover:border-gold/40 flex items-center justify-center text-muted hover:text-gold transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 border border-border hover:border-gold/40 flex items-center justify-center text-muted hover:text-gold transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
