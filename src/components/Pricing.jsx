import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight, Zap } from 'lucide-react'

const plan = {
  name: 'Atlantic AI Assistant',
  price: 3000,
  tag: 'The Complete Solution',
  desc: 'One powerful AI assistant. Fully trained on your business, deployed on your site, and managed from your personal dashboard.',
  features: [
    'Atlantic AI Assistant trained on your site with RAG retrieval',
    'Lead capture and management',
    'Full categorized conversation history access',
    'Calendly booking integration',
    'FAQ and insights analytics',
  ],
  cta: 'Get Started',
}

export default function Pricing() {
  const handleContact = () =>
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-card/70">
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
              Pricing
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-none text-cream mb-4">
            Simple,{' '}
            <span className="text-gold">Transparent</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            One solution. Everything you need. No hidden fees, no lock-in traps.
          </p>
        </motion.div>

        {/* Single centered card */}
        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg"
          >
            {/* Top badge */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
              <span className="inline-flex items-center gap-1.5 bg-gold text-charcoal font-display font-bold text-xs uppercase tracking-widest px-4 py-1">
                <Zap className="w-3 h-3 fill-charcoal" />
                {plan.tag}
              </span>
            </div>

            <div className="relative bg-charcoal border border-border border-t-2 border-t-gold p-8 lg:p-12 card-lift">
              {/* Subtle corner glow */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(0,200,255,0.07) 0%, transparent 65%)' }} />

              <div className="relative">
                {/* Title */}
                <h3 className="font-display font-black text-3xl lg:text-4xl uppercase tracking-wide text-cream mb-6">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-2 mb-2">
                  <span className="font-display font-black text-5xl lg:text-6xl text-gold leading-none">
                    R{plan.price.toLocaleString()}
                  </span>
                  <span className="text-muted text-base mb-1">/ month</span>
                </div>

                <p className="text-muted text-sm leading-relaxed mb-8 mt-3">{plan.desc}</p>

                {/* Divider */}
                <div className="w-full h-px bg-border mb-8" />

                {/* Features */}
                <ul className="flex flex-col gap-4 mb-10">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-cream/80 leading-relaxed">
                      <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <button
                  onClick={handleContact}
                  className="w-full inline-flex items-center justify-center gap-2 font-display font-bold text-sm uppercase tracking-widest py-4 bg-gold hover:bg-gold-dark text-charcoal btn-glow transition-all group"
                >
                  {plan.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-muted text-sm mt-10"
        >
          Includes a free discovery call. Custom scoping available on request.
        </motion.p>
      </div>
    </section>
  )
}
