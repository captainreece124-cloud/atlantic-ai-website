import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, Zap } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const links = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Industries', href: '#industries' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Try Demo', href: '#contact' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const { theme, toggleTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Scroll-spy
  useEffect(() => {
    const sectionIds = ['services', 'process', 'industries', 'pricing', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionIds.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleLink = (href) => {
    setOpen(false)
    setTimeout(() => {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const isActive = (href) => {
    const id = href.replace('#', '')
    return activeSection === id
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glassmorphism border-b border-white/5 shadow-xl' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => { e.preventDefault(); handleLink('#top') }}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 bg-gold rounded-full flex items-center justify-center group-hover:bg-gold-dark transition-colors">
              <Zap className="w-5 h-5 text-charcoal fill-charcoal" />
            </div>
            <div className="leading-none">
              <div className="font-display font-black text-sm uppercase tracking-wider text-cream dark:text-cream">
                Atlantic AI
              </div>
              <div className="font-display text-[9px] uppercase tracking-[0.2em] text-muted">
                Automation
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <button
                key={l.href + l.label}
                onClick={() => handleLink(l.href)}
                className={`font-body font-600 text-sm uppercase tracking-[1.2px] transition-colors ${
                  isActive(l.href)
                    ? 'text-gold'
                    : 'text-muted hover:text-cream'
                }`}
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Desktop right: dark mode + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-9 h-9 flex items-center justify-center border border-border rounded-full hover:border-gold/40 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark'
                ? <Sun className="w-4 h-4 text-muted hover:text-gold transition-colors" />
                : <Moon className="w-4 h-4 text-muted hover:text-gold transition-colors" />
              }
            </button>
            <button
              onClick={() => handleLink('#contact')}
              className="bg-gold hover:bg-gold-dark text-charcoal font-display font-bold text-sm uppercase tracking-widest px-5 py-2.5 transition-all btn-glow"
            >
              Get Started
            </button>
          </div>

          {/* Mobile toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-muted" aria-label="Toggle theme">
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 text-cream"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden glassmorphism border-b border-white/5 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {links.map((l) => (
                <button
                  key={l.href + l.label}
                  onClick={() => handleLink(l.href)}
                  className="font-display font-semibold text-sm uppercase tracking-widest text-muted hover:text-cream py-3 border-b border-white/5 text-left transition-colors"
                >
                  {l.label}
                </button>
              ))}
              <div className="pt-4">
                <button
                  onClick={() => handleLink('#contact')}
                  className="w-full bg-gold text-charcoal font-display font-bold text-sm uppercase tracking-widest py-3"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
