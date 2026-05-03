import { ThemeProvider } from './context/ThemeContext'
import Nav from './components/Nav'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Services from './components/Services'
import Process from './components/Process'
import Industries from './components/Industries'
import Pricing from './components/Pricing'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FlowField from './components/ui/flow-field-background'

export default function App() {
  return (
    <ThemeProvider>
      <div className="font-body overflow-x-hidden">
        <Nav />
        <Hero />

        {/* Gold particle flow field — fixed behind all sections below the hero */}
        <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
          <FlowField color="#00FFFF" trailOpacity={0.04} particleCount={500} speed={0.8} />
        </div>

        <StatsBar />
        <Services />
        <Process />
        <Industries />
        <Pricing />
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
