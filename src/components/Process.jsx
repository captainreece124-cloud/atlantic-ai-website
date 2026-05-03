import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, Brain, LayoutDashboard, Rocket, Clock } from 'lucide-react'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Discovery & Alignment',
    desc: 'We start with a deep-dive interview to understand your business, pain points, and goals. Terms are agreed, expectations are set, and we map out exactly what success looks like for your AI system.',
    detail: 'Deep-dive interview · Business audit · Goal alignment',
    deliverable: 'Aligned terms, expectations, and success criteria',
  },
  {
    number: '02',
    icon: Brain,
    title: 'Identity Architecture',
    desc: 'Your AI learns your brand voice, product knowledge, and customer handling protocols. We train it on real scenarios until it responds exactly how you would — only faster and more consistently.',
    detail: 'Brand voice · Product knowledge · Customer protocols',
    deliverable: 'Trained AI matching your voice and handling style',
  },
  {
    number: '03',
    icon: LayoutDashboard,
    title: 'Command Center Setup',
    desc: 'We build and optimize your webapp dashboard — your control room for the AI. View all conversations by category, adjust bot behavior in real-time, track analytics (most-asked questions, product enquiries, engagement trends), and monitor performance. This is where you stay in full control.',
    detail: 'Dashboard build · Real-time controls · Analytics setup',
    deliverable: 'Fully configured webapp control room',
  },
  {
    number: '04',
    icon: Rocket,
    title: 'Agent Deployment',
    desc: 'We install your AI agent seamlessly into your website. It goes live, handling enquiries 24/7 while you monitor everything from the dashboard. No downtime. No friction. Just instant customer engagement.',
    detail: 'Website integration · Live testing · 24/7 monitoring',
    deliverable: 'AI agent live on your website',
  },
  {
    number: '05',
    icon: Clock,
    title: 'Reclaim Your Time',
    desc: "Your AI is running. Your team is freed from repetitive tasks. Enquiries are answered instantly. Leads are captured while you sleep. You're no longer tied to the front desk — you're scaling your business while your AI handles the rest.",
    detail: 'Task automation · Lead capture · 24/7 coverage',
    deliverable: 'Fully autonomous AI handling customer enquiries',
  },
]

function StepCard({ step, isLeft }) {
  const { number, icon: Icon, title, desc, detail, deliverable } = step
  return (
    <div className={`relative overflow-hidden bg-card border border-border p-6 lg:p-8 group hover:border-gold/30 transition-colors duration-500 ${isLeft ? 'text-right' : 'text-left'}`}>
      {/* Watermark number */}
      <span className="absolute -bottom-4 -right-2 font-display font-black leading-none select-none pointer-events-none" style={{ fontSize: '7rem', color: 'rgba(255,255,255,0.035)' }}>
        {number}
      </span>

      <div className="relative">
        <h3 className="font-display font-bold text-2xl uppercase tracking-wide text-cream mb-3 group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-3">{desc}</p>
        <p className="text-gold/60 text-xs font-display font-semibold uppercase tracking-wider mb-5">{detail}</p>

        {/* Deliverable callout */}
        <div className={`pt-4 border-t border-border flex items-start gap-2 ${isLeft ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="font-display font-bold text-[10px] uppercase tracking-widest text-gold whitespace-nowrap">Deliverable:</span>
          <span className="text-muted text-xs leading-relaxed">{deliverable}</span>
        </div>
      </div>
    </div>
  )
}

export default function Process() {
  const lineRef = useRef(null)
  const lineInView = useInView(lineRef, { once: true, margin: '-20%' })

  return (
    <section id="process" className="py-24 lg:py-32 bg-card/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-px bg-gold" />
            <span className="font-display font-semibold text-xs uppercase tracking-[0.2em] text-gold">
              How We Work
            </span>
            <span className="w-8 h-px bg-gold" />
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase leading-none text-cream mb-4">
            5-Step{' '}
            <span className="text-gold">Process</span>
          </h2>
          <p className="text-muted text-lg max-w-xl mx-auto leading-relaxed">
            Structured. Transparent. No surprises.
          </p>
        </motion.div>

        {/* Desktop: alternating layout with animated vertical line */}
        <div className="hidden lg:block relative">
          {/* Vertical center line */}
          <div ref={lineRef} className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
            <motion.div
              className="w-full bg-gold origin-top"
              initial={{ scaleY: 0 }}
              animate={lineInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%' }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex items-center ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
                >
                  {/* Content card */}
                  <div className={`w-[calc(50%-2.5rem)] ${isLeft ? 'pr-10' : 'pl-10'}`}>
                    <StepCard step={step} isLeft={isLeft} />
                  </div>

                  {/* Center icon node */}
                  <div className="flex-shrink-0 w-20 flex justify-center">
                    <div
                      className="w-14 h-14 bg-gold flex items-center justify-center z-10 relative"
                      style={{ boxShadow: '0 0 24px rgba(0,200,255,0.35)' }}
                    >
                      <step.icon className="w-7 h-7 text-charcoal" />
                    </div>
                  </div>

                  {/* Empty opposing side */}
                  <div className="w-[calc(50%-2.5rem)]" />
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Mobile: single column */}
        <div className="lg:hidden flex flex-col gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-12 h-12 bg-gold flex items-center justify-center"
                  style={{ boxShadow: '0 0 16px rgba(0,200,255,0.3)' }}
                >
                  <step.icon className="w-6 h-6 text-charcoal" />
                </div>
                {i < steps.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
              </div>

              <div className="pb-6 flex-1">
                <div className="relative overflow-hidden bg-card border border-border p-4 group hover:border-gold/30 transition-colors duration-500">
                  <span className="absolute -bottom-3 -right-1 font-display font-black leading-none select-none pointer-events-none" style={{ fontSize: '5rem', color: 'rgba(255,255,255,0.035)' }}>
                    {step.number}
                  </span>
                  <div className="relative">
                    <h3 className="font-display font-bold text-lg uppercase tracking-wide text-cream mb-2 group-hover:text-gold transition-colors duration-300">{step.title}</h3>
                    <p className="text-muted text-sm leading-relaxed mb-2">{step.desc}</p>
                    <p className="text-gold/60 text-xs font-display font-semibold uppercase tracking-wider mb-3">{step.detail}</p>
                    <div className="pt-3 border-t border-border flex items-start gap-2">
                      <span className="font-display font-bold text-[10px] uppercase tracking-widest text-gold whitespace-nowrap">Deliverable:</span>
                      <span className="text-muted text-xs leading-relaxed">{step.deliverable}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
