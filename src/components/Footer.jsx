import { Zap, ArrowUp } from 'lucide-react'

const serviceLinks = [
  'Brand Identity & Design',
  'Web Development',
  'Web Applications',
  'AI Chatbot Build',
  'Workflow Automation',
  'Enterprise Solutions',
]

const quickLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy.html' },
  { label: 'Terms of Service', href: '/terms.html' },
]

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const handleNav = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-charcoal/90 border-t border-border backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gold rounded-full flex items-center justify-center">
                <Zap className="w-5 h-5 text-charcoal fill-charcoal" />
              </div>
              <div className="leading-none">
                <div className="font-display font-black text-sm uppercase tracking-wider text-cream">
                  Atlantic AI
                </div>
                <div className="font-display text-[10px] uppercase tracking-[0.2em] text-muted">
                  Automation
                </div>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              AI-powered brand identity, web development, and automation
              solutions for South African businesses. Build the future.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Brand', 'Web', 'AI'].map(b => (
                <span key={b} className="font-display font-semibold text-[9px] uppercase tracking-wider border border-gold/30 text-gold/80 px-2 py-1">
                  {b}
                </span>
              ))}
            </div>
            <a
              href="mailto:reece@atlanticaiautomation.com"
              className="text-muted hover:text-cream transition-colors text-sm"
            >
              reece@atlanticaiautomation.com
            </a>
          </div>

          {/* Services */}
          <div>
            <p className="font-display font-bold text-xs uppercase tracking-[0.15em] text-gold mb-5">Services</p>
            <ul className="flex flex-col gap-2.5">
              {serviceLinks.map(s => (
                <li key={s}>
                  <button
                    onClick={() => handleNav('#services')}
                    className="text-muted hover:text-cream text-sm transition-colors text-left"
                  >
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <p className="font-display font-bold text-xs uppercase tracking-[0.15em] text-gold mb-5">Quick Links</p>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <button
                    onClick={() => handleNav(href)}
                    className="text-muted hover:text-cream text-sm transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal + Contact */}
          <div>
            <p className="font-display font-bold text-xs uppercase tracking-[0.15em] text-gold mb-5">Legal</p>
            <ul className="flex flex-col gap-2.5 mb-8">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-muted hover:text-cream text-sm transition-colors">{label}</a>
                </li>
              ))}
            </ul>
            <p className="font-display font-bold text-xs uppercase tracking-[0.15em] text-gold mb-3">Response Time</p>
            <p className="text-muted text-sm">Within 24 hours</p>
            <p className="text-muted/60 text-xs mt-1">Mon–Fri, SAST business hours</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs font-display uppercase tracking-wider">
            © 2025 Atlantic AI Automation. All rights reserved. South Africa.
          </p>
          <div className="flex items-center gap-6">
            <p className="text-muted text-xs font-display uppercase tracking-wider">
              Brand · Web · AI · 48H Deployment
            </p>
            <button
              onClick={scrollTop}
              className="w-8 h-8 bg-gold/10 border border-gold/20 flex items-center justify-center hover:bg-gold/20 transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-gold" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
