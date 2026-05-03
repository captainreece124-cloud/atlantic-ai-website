import { useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Home, TrendingUp, Scale, ShoppingBag, Heart, UtensilsCrossed, GraduationCap, Truck } from 'lucide-react'

const industries = [
  {
    icon: Home,
    code: 'RE',
    label: 'Real Estate',
    desc: 'Lead generation, virtual tours, automated follow-ups',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: TrendingUp,
    code: 'FX',
    label: 'Finance',
    desc: 'Client onboarding, reporting dashboards, compliance tools',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: Scale,
    code: 'LG',
    label: 'Legal',
    desc: 'Document automation, client portals, appointment scheduling',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: ShoppingBag,
    code: 'RT',
    label: 'Retail',
    desc: 'E-commerce, inventory management, loyalty systems',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: Heart,
    code: 'HC',
    label: 'Healthcare',
    desc: 'Patient scheduling, record management, teleconsult platforms',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: UtensilsCrossed,
    code: 'HT',
    label: 'Hospitality',
    desc: 'Booking systems, review automation, loyalty programs',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: GraduationCap,
    code: 'ED',
    label: 'Education',
    desc: 'LMS platforms, student portals, automated reporting',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&q=80&auto=format&fit=crop',
  },
  {
    icon: Truck,
    code: 'LS',
    label: 'Logistics',
    desc: 'Fleet tracking, dispatch automation, client communication',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80&auto=format&fit=crop',
  },
]

/* Modal height in rem — must match h-48 = 12rem */
const MODAL_H = 12

function CursorModal({ modal }) {
  const { active, index } = modal

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, { damping: 22, stiffness: 180 })
  const y = useSpring(rawY, { damping: 22, stiffness: 180 })

  useEffect(() => {
    const move = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [rawX, rawY])

  return (
    <motion.div
      className="pointer-events-none fixed z-50 w-72 overflow-hidden"
      style={{
        left: x,
        top: y,
        x: '-50%',
        y: '-50%',
        height: `${MODAL_H}rem`,
      }}
      animate={{ scale: active ? 1 : 0, opacity: active ? 1 : 0 }}
      initial={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Image strip — slides vertically to reveal current industry image */}
      <div
        className="absolute w-full flex flex-col"
        style={{
          transform: `translateY(calc(${-index} * ${MODAL_H}rem))`,
          transition: 'transform 0.5s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        {industries.map((ind) => (
          <div key={ind.code} className="relative flex-shrink-0 w-full" style={{ height: `${MODAL_H}rem` }}>
            <img
              src={ind.image}
              alt={ind.label}
              className="w-full h-full object-cover"
            />
            {/* Subtle gold tint */}
            <div className="absolute inset-0" style={{ background: 'rgba(0,200,255,0.08)' }} />
          </div>
        ))}
      </div>

      {/* "View" label overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="font-display font-bold text-xs uppercase tracking-widest px-3 py-1"
          style={{ background: 'rgba(0,200,255,0.9)', color: '#0A0F1E' }}
        >
          View
        </span>
      </div>
    </motion.div>
  )
}

export default function Industries() {
  const [modal, setModal] = useState({ active: false, index: 0 })

  return (
    <section id="industries" className="py-24 lg:py-32 bg-charcoal/70">
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
              Industries
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-none text-cream mb-4">
            Built For{' '}
            <span className="text-gold">Your Sector</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Industry-specific solutions with deep domain knowledge — not
            generic templates repainted for your market.
          </p>
        </motion.div>

        {/* Desktop: hover-reveal list */}
        <div className="hidden md:block">
          {industries.map(({ icon: Icon, code, label, desc }, index) => (
            <motion.div
              key={code}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              className="group flex items-center justify-between border-t border-border px-2 py-7 cursor-default transition-all duration-200 last:border-b"
              onMouseEnter={() => setModal({ active: true, index })}
              onMouseLeave={() => setModal({ active: false, index })}
            >
              <div className="flex items-center gap-5">
                <div className="w-10 h-10 bg-card border border-border flex items-center justify-center flex-shrink-0 group-hover:border-gold/40 group-hover:bg-gold/10 transition-all duration-300">
                  <Icon className="w-5 h-5 text-muted group-hover:text-gold transition-colors duration-300" />
                </div>
                <h3
                  className="font-display font-bold uppercase tracking-tight text-cream transition-all duration-300 group-hover:translate-x-3"
                  style={{ fontSize: 'clamp(1.5rem, 3.5vw, 3rem)' }}
                >
                  {label}
                </h3>
              </div>
              <p className="text-muted text-sm max-w-xs text-right transition-all duration-300 group-hover:-translate-x-3 hidden lg:block">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mobile: grid fallback */}
        <div className="md:hidden grid grid-cols-2 gap-px bg-border">
          {industries.map(({ icon: Icon, code, label, desc }) => (
            <div key={code} className="bg-charcoal p-5">
              <div className="w-10 h-10 bg-card border border-border flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-muted" />
              </div>
              <div className="font-display font-black text-2xl text-border mb-1 leading-none">{code}</div>
              <h3 className="font-display font-bold text-sm uppercase tracking-wide text-cream mb-1">{label}</h3>
              <p className="text-muted text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Fixed cursor modal — rendered outside section flow so it's never clipped */}
      <CursorModal modal={modal} />
    </section>
  )
}
