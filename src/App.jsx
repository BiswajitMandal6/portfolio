import { MotionConfig } from 'framer-motion'
import Hero from './components/Hero/Hero'
import Navbar from './components/ui/Navbar'
import CustomCursor from './components/ui/CustomCursor'
import About from './components/About/About'
import Projects from './components/Projects/Projects'
import Skills from './components/Skills/Skills'
import Contact from './components/Contact/Contact'

function App() {
  return (
    // MotionConfig prevents framer-motion from hijacking R3F's rAF loop
    <MotionConfig reducedMotion="never">
      <div style={{ background: '#070B14', minHeight: '100vh' }}>
        <CustomCursor />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </MotionConfig>
  )
}

export default App