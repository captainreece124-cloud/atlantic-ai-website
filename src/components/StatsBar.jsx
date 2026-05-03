import { useEffect, useRef, useState } from 'react'
import { useInView } from 'react-intersection-observer'

function CountUp({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const duration = 1500
    const steps = 50
    const increment = target / steps
    let current = 0
    const interval = setInterval(() => {
      current += increment
      if (current >= target) {
        setCount(target)
        clearInterval(interval)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(interval)
  }, [inView, target])

  return <span ref={ref}>{prefix}{count}{suffix}</span>
}

const stats = [
  { label: 'Deployment Time', value: 48, suffix: 'H', prefix: '', detail: 'From kickoff to live' },
  { label: 'Service Pillars', value: 3, suffix: '', prefix: '', detail: 'Brand · Web · AI' },
  { label: 'AI Availability', value: 24, suffix: '/7', prefix: '', detail: 'Always on, always working' },
  { label: 'Starting From', value: 3000, suffix: '', prefix: 'R', detail: 'Atlantic AI Assistant' },
]

export default function StatsBar() {
  return (
    <section id="stats" className="bg-card/70 border-y border-border py-12 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 divide-y-2 lg:divide-y-0 lg:divide-x divide-border">
          {stats.map(({ label, value, suffix, prefix, detail }) => (
            <div key={label} className="text-center pt-8 lg:pt-0 first:pt-0 lg:px-8">
              <div className="font-display font-black text-4xl lg:text-5xl text-gold leading-none mb-1">
                <CountUp target={value} suffix={suffix} prefix={prefix} />
              </div>
              <div className="font-display font-bold text-sm uppercase tracking-widest text-cream mb-1">
                {label}
              </div>
              <div className="text-muted text-xs">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
