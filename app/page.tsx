import dynamic from "next/dynamic";
import Navbar            from "@/components/Navbar";
import HeroSection       from "@/components/HeroSection";
import TrustStrip        from "@/components/TrustStrip";
import AppointmentSection from "@/components/AppointmentSection";
import FloatingButtons   from "@/components/FloatingButtons";

// Lazy-load below-the-fold sections for performance
const ServicesSection  = dynamic(() => import("@/components/ServicesSection"));
const DoctorSection    = dynamic(() => import("@/components/DoctorSection"));
const ReviewsSection   = dynamic(() => import("@/components/ReviewsSection"));
const GallerySection   = dynamic(() => import("@/components/GallerySection"));
const FAQSection       = dynamic(() => import("@/components/FAQSection"));
const LocationSection  = dynamic(() => import("@/components/LocationSection"));
const Footer           = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustStrip />
        <AppointmentSection />
        <ServicesSection />
        <DoctorSection />
        <ReviewsSection />
        <GallerySection />
        <FAQSection />
        <LocationSection />
      </main>
      <Footer />
      <FloatingButtons />
    </>
  );
}
