import { useEffect, useRef } from 'react'

export default function FlowFieldBackground({
  className = '',
  color = '#00C8FF',
  trailOpacity = 0.12,
  particleCount = 500,
  speed = 0.8,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const count = isMobile ? Math.floor(particleCount * 0.25) : particleCount

    let width = container.clientWidth
    let height = container.clientHeight
    let particles = []
    let animId

    const mouse = { x: -1000, y: -1000 }

    class Particle {
      constructor() { this.reset(true) }

      reset(randomY = false) {
        this.x = Math.random() * width
        this.y = randomY ? Math.random() * height : Math.random() * height
        this.vx = 0
        this.vy = 0
        this.age = 0
        this.life = Math.random() * 200 + 100
      }

      update() {
        const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI
        this.vx += Math.cos(angle) * 0.2 * speed
        this.vy += Math.sin(angle) * 0.2 * speed

        const dx = mouse.x - this.x
        const dy = mouse.y - this.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = 160
        if (dist < radius) {
          const force = (radius - dist) / radius
          this.vx -= dx * force * 0.05
          this.vy -= dy * force * 0.05
        }

        this.x += this.vx
        this.y += this.vy
        this.vx *= 0.95
        this.vy *= 0.95
        this.age++

        if (this.age > this.life) this.reset()
        if (this.x < 0) this.x = width
        if (this.x > width) this.x = 0
        if (this.y < 0) this.y = height
        if (this.y > height) this.y = 0
      }

      draw(c) {
        c.fillStyle = color
        c.globalAlpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2
        c.fillRect(this.x, this.y, 2, 2)
      }
    }

    const init = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.scale(dpr, dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`

      /* Fill with background colour so first frame has no flash */
      ctx.fillStyle = 'rgb(10, 15, 30)'
      ctx.fillRect(0, 0, width, height)

      particles = Array.from({ length: count }, () => new Particle())
    }

    const animate = () => {
      /* Trail fade using our charcoal colour instead of pure black */
      ctx.fillStyle = `rgba(10, 15, 30, ${trailOpacity})`
      ctx.globalAlpha = 1
      ctx.fillRect(0, 0, width, height)

      for (const p of particles) {
        p.update()
        p.draw(ctx)
      }
      ctx.globalAlpha = 1
      animId = requestAnimationFrame(animate)
    }

    const onResize = () => {
      width = container.clientWidth
      height = container.clientHeight
      init()
    }

    /* Listen on window so pointer-events-none wrapper doesn't block mouse */
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    const onMouseLeave = () => { mouse.x = -1000; mouse.y = -1000 }

    init()
    animate()

    window.addEventListener('resize', onResize)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseleave', onMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseleave', onMouseLeave)
    }
  }, [color, trailOpacity, particleCount, speed])

  return (
    <div ref={containerRef} className={`w-full h-full overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}
