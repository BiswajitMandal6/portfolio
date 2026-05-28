import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Reviews from './components/Reviews';
import Gallery from './components/Gallery';
import Appointment from './components/Appointment';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import FloatingElements from './components/FloatingElements';

export default function App() {
  return (
    <div className="relative min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Sticky Header */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Services />
        <WhyChooseUs />
        <Reviews />
        <Gallery />
        <Appointment />
        <FAQ />
        <Contact />
      </main>

      {/* Footer Area */}
      <Footer />

      {/* Floating Action Triggers */}
      <FloatingElements />
    </div>
  );
}
