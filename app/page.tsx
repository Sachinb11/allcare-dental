import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import TrustStrip from '@/components/TrustStrip';
import Services from '@/components/Services';
import About from '@/components/About';
import GoogleReviews from '@/components/GoogleReviews';
import Testimonials from '@/components/Testimonials';
import Location from '@/components/Location';
import Footer from '@/components/Footer';
import FloatingElements from '@/components/FloatingElements';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <>
      <CustomCursor />

      {/* Top Bar */}
      <div className="topbar" role="banner" aria-label="Contact information">
        <div className="tg">
          <span>
            📍 Shop 137/E, Arihant Aptt., Ostwal Empire, Boisar (W) – 401 501
          </span>
          <span className="ts">|</span>
          <a href="mailto:pravinvaishya@yahoo.com">✉ pravinvaishya@yahoo.com</a>
        </div>
        <div className="tg">
          <a href="tel:7620750026">📞 7620750026</a>
          <span className="ts">|</span>
          <a href="tel:9762788098">📱 9762788098</a>
        </div>
      </div>

      <Navbar />

      <main>
        <Hero />
        <TrustStrip />
        <Services />
        <About />
        {/* ── New sections ── */}
        <GoogleReviews />
        <Testimonials />
        <Location />
      </main>

      <Footer />
      <FloatingElements />
    </>
  );
}
