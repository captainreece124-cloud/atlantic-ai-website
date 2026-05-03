import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

/* ---------------- WordsPullUp ---------------- */
export function WordsPullUp({ text, className = '', showAsterisk = false, style }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const words = text.split(' ')

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((word, i) => {
        const isLast = i === words.length - 1
        return (
          <motion.span
            key={i}
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block relative overflow-hidden"
            style={{ marginRight: isLast ? 0 : '0.25em' }}
          >
            {word}
            {showAsterisk && isLast && (
              <span className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]">*</span>
            )}
          </motion.span>
        )
      })}
    </div>
  )
}

/* ---------------- WordsPullUpMultiStyle ---------------- */
export function WordsPullUpMultiStyle({ segments, className = '', style }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const words = []
  segments.forEach((seg) => {
    seg.text.split(' ').forEach((w) => {
      if (w) words.push({ word: w, className: seg.className })
    })
  })

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: '100%', opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={`inline-block overflow-hidden ${w.className ?? ''}`}
          style={{ marginRight: '0.25em' }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  )
}

/* ---------------- PrismaHero ---------------- */
export function PrismaHero({ onScrollDown }) {
  const handleScroll = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="top" className="h-screen w-full">
      <div className="relative h-full w-full overflow-hidden rounded-none md:rounded-[2rem]">

        {/* Fallback gradient (shows while video loads) */}
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#0D1526] to-[#060C1A]" />

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" />

        {/* Gradient overlay — darkens bottom for text legibility */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* Gold ambient glow */}
        <div className="pointer-events-none absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-gold/8 rounded-full blur-[120px]" />

        {/* Hero content — pinned to bottom */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-3 sm:px-8 md:px-12 lg:px-16">
          <div className="grid grid-cols-12 items-end gap-4 lg:gap-8">

            {/* Left: giant masthead */}
            <div className="col-span-12 lg:col-span-8 xl:col-span-7">
              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 mb-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-gold opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold" />
                </span>
                <span
                  className="font-display font-semibold text-[10px] uppercase tracking-[0.22em]"
                  style={{ color: 'rgba(0,200,255,0.85)' }}
                >
                  AI-Powered Business Solutions · South Africa
                </span>
              </motion.div>

              {/* Giant word */}
              <h1
                className="font-display font-black leading-[0.82] tracking-[-0.03em] text-[22vw] sm:text-[20vw] md:text-[18vw] lg:text-[17vw] xl:text-[16vw]"
                style={{ color: '#F5F4EF' }}
              >
                <WordsPullUp text="Atlantic" />
              </h1>
            </div>

            {/* Right: tagline + CTA */}
            <div className="col-span-12 flex flex-col gap-5 pb-6 lg:col-span-4 xl:col-span-5 lg:pb-12">

              {/* Sub-brand line */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight leading-none"
                style={{ color: '#00C8FF' }}
              >
                AI Automation
              </motion.p>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className="font-body text-sm sm:text-base leading-relaxed max-w-sm"
                style={{ color: 'rgba(245,244,239,0.65)' }}
              >
                Brand identity, custom software, and intelligent automation —
                deployed in 48 hours. Built for South African businesses that
                mean business.
              </motion.p>

              {/* Trust pills */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-2"
              >
                {['48H Deploy', 'Brand · Web · AI', 'From R3,000'].map(b => (
                  <span
                    key={b}
                    className="font-display font-semibold text-[10px] uppercase tracking-widest px-2.5 py-1 border"
                    style={{ borderColor: 'rgba(0,200,255,0.25)', color: 'rgba(0,200,255,0.7)' }}
                  >
                    {b}
                  </span>
                ))}
              </motion.div>

              {/* CTA buttons */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-3"
              >
                {/* Primary — gold pill */}
                <button
                  onClick={() => handleScroll('#contact')}
                  className="group inline-flex items-center gap-2 rounded-full py-1 pl-5 pr-1 text-sm font-display font-bold uppercase tracking-widest transition-all hover:gap-3"
                  style={{ backgroundColor: '#00C8FF', color: '#0A0F1E' }}
                >
                  Start Your Project
                  <span className="flex h-9 w-9 items-center justify-center rounded-full transition-transform group-hover:scale-110" style={{ backgroundColor: '#0A0F1E' }}>
                    <ArrowRight className="h-4 w-4" style={{ color: '#00C8FF' }} />
                  </span>
                </button>

                {/* Secondary — ghost */}
                <button
                  onClick={() => handleScroll('#services')}
                  className="inline-flex items-center gap-2 border px-5 py-2.5 text-xs font-display font-bold uppercase tracking-widest transition-all"
                  style={{
                    borderColor: 'rgba(245,244,239,0.25)',
                    color: 'rgba(245,244,239,0.75)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(0,200,255,0.5)'
                    e.currentTarget.style.color = '#F5F4EF'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(245,244,239,0.25)'
                    e.currentTarget.style.color = 'rgba(245,244,239,0.75)'
                  }}
                >
                  Explore Services
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
