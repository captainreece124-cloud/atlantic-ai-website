import { motion } from 'framer-motion'
import { Palette, Code2, Bot, ArrowRight } from 'lucide-react'

const services = [
  {
    icon: Palette,
    tag: 'Pillar 01',
    title: 'Always-On Brand Identity',
    desc: "Your AI never clocks out. It delivers your brand voice 24/7 — consistent tone, instant responses, flawless execution whether it's morning or midnight. This isn't a tool. It's a living extension of your business, working while you sleep.",
    features: [
      'Logo design & visual identity system',
      'Brand guidelines & style documentation',
      'Marketing collateral & templates',
      'Social media design kits',
    ],
    cta: 'Build My Brand',
  },
  {
    icon: Code2,
    tag: 'Pillar 02',
    title: 'Built for Tomorrow',
    desc: "We don't build for where AI is today. We build for where it's going. Every system is modular, scalable, and designed to evolve with the technology and grow with your business. Future-proof isn't a feature — it's the foundation.",
    features: [
      'Custom website design & development',
      'Web app & SaaS platform builds',
      'E-commerce & payment integration',
      'Performance-optimised & SEO-ready',
    ],
    cta: 'Build My Platform',
  },
  {
    icon: Bot,
    tag: 'Pillar 03',
    title: 'Radical Efficiency',
    desc: 'Manual tasks are expensive. Repetitive ones are inexcusable. Our automation eliminates the bottlenecks silently draining your business — so your team focuses on what humans do best, and AI handles the rest.',
    features: [
      'AI chatbot & virtual assistant builds',
      'Business workflow automation',
      'CRM & third-party integrations',
      '24/7 operational availability',
    ],
    cta: 'Automate My Business',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const card = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

export default function Services() {
  const handleContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="services" className="py-24 lg:py-32 bg-charcoal/70">
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
              What We Do
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-none text-cream mb-4">
            Three Pillars.{' '}
            <span className="text-gold">One Vision.</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Brand, technology, and intelligence — unified under one roof to
            deliver cohesive digital transformation.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid lg:grid-cols-3 gap-px bg-border"
        >
          {services.map(({ icon: Icon, tag, title, desc, features, cta }) => (
            <motion.div
              key={title}
              variants={card}
              className="bg-charcoal p-8 lg:p-10 group card-lift cursor-default relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold/0 to-gold/0 group-hover:from-gold/5 group-hover:to-gold/0 transition-all duration-500" />

              <div className="relative">
                {/* Tag */}
                <span className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-gold/60 mb-4 block">
                  {tag}
                </span>

                {/* Icon — rotates on hover */}
                <div className="w-14 h-14 bg-gold/10 border border-gold/20 flex items-center justify-center mb-6 group-hover:bg-gold/20 transition-colors">
                  <Icon className="w-7 h-7 text-gold group-hover:rotate-12 transition-transform duration-300" />
                </div>

                <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-cream group-hover:text-gold transition-colors duration-300 mb-3">
                  {title}
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-6">{desc}</p>

                <ul className="flex flex-col gap-2.5 mb-8">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleContact}
                  className="inline-flex items-center gap-2 font-display font-bold text-xs uppercase tracking-widest text-gold hover:text-gold-dark transition-colors group/btn"
                >
                  {cta}
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
