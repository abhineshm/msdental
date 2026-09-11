import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Doctors from '@/components/Doctors';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Doctors />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}

export default App;
