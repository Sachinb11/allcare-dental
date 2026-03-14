import type { Metadata } from "next";
import "./globals.css";

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://allcare-dental.vercel.app"),
  title: {
    default:  "All Care Dental Clinic — Dr. Pravin Vaishya | Boisar",
    template: "%s | All Care Dental Clinic Boisar",
  },
  description:
    "Advanced dental care in Boisar by Dr. Pravin Vaishya (BDS Mumbai). Expert Root Canal, Dental Implants, Teeth Whitening, Gum Treatment and more. Book your appointment today.",
  keywords: [
    "dental clinic Boisar","dentist Boisar","Dr Pravin Vaishya","root canal Boisar",
    "dental implants Boisar","teeth whitening Boisar","All Care Dental","best dentist Palghar",
    "gum treatment Boisar","painless dentist Boisar","Ostwal Empire dental","BDS Mumbai dentist",
    "dental clinic near me Boisar","orthodontics Boisar","dental check up Boisar",
  ],
  authors:  [{ name: "Dr. Pravin Vaishya", url: "https://allcare-dental.vercel.app" }],
  creator:  "All Care Dental Clinic",
  publisher:"All Care Dental Clinic",
  category: "Healthcare",
  openGraph: {
    type:      "website",
    locale:    "en_IN",
    url:       "https://allcare-dental.vercel.app",
    siteName:  "All Care Dental Clinic",
    title:     "All Care Dental Clinic — Dr. Pravin Vaishya | Boisar",
    description:
      "Advanced dental care in Boisar by Dr. Pravin Vaishya (BDS Mumbai). Root Canal, Implants, Whitening, Gum Treatment and more.",
    images: [{
      url:    "/og-image.jpg",
      width:  1200,
      height: 630,
      alt:    "All Care Dental Clinic – Dr. Pravin Vaishya, Boisar",
    }],
  },
  twitter: {
    card:        "summary_large_image",
    title:       "All Care Dental Clinic — Dr. Pravin Vaishya | Boisar",
    description: "Advanced dental care in Boisar. Root Canal, Implants, Whitening, Gum Treatment.",
    images:      ["/og-image.jpg"],
  },
  robots: {
    index: true, follow: true,
    googleBot: {
      index: true, follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: "https://allcare-dental.vercel.app" },
  verification: {
    // google: "YOUR_GOOGLE_SEARCH_CONSOLE_ID",  // add when ready
  },
};

// ── Schema.org markup ─────────────────────────────────────────────────────────
const dentistSchema = {
  "@context": "https://schema.org",
  "@type": ["Dentist","MedicalClinic","LocalBusiness"],
  "@id": "https://allcare-dental.vercel.app/#clinic",
  name: "All Care Dental Clinic",
  alternateName: "All Care Dental Boisar",
  description: "Advanced dental care in Boisar by Dr. Pravin Vaishya (BDS Mumbai)",
  url: "https://allcare-dental.vercel.app",
  telephone: ["+917620750026", "+919762788098"],
  email: "pravinvaishya@yahoo.com",
  image: "https://allcare-dental.vercel.app/og-image.jpg",
  logo:  "https://allcare-dental.vercel.app/logo.png",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Shop No. 137/E, Arihant Aptt. 1st Floor, Ostwal Empire, Opp. Bus Depo / Rickshaw Stand",
    addressLocality: "Boisar",
    addressRegion: "Maharashtra",
    postalCode: "401501",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude:  "19.7958",
    longitude: "72.7587",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      opens: "09:30", closes: "20:00",
    },
  ],
  medicalSpecialty: "Dentistry",
  priceRange: "₹₹",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, UPI, Card",
  hasMap: "https://maps.google.com/?q=Ostwal+Empire+Boisar",
  areaServed: ["Boisar","Palghar","Tarapur","Kelwa","Navapur"],
  knowsAbout: ["Root Canal Treatment","Dental Implants","Teeth Whitening","Gum Treatment","Orthodontics","Pediatric Dentistry"],
  sameAs: [],
  employee: {
    "@type": "Physician",
    name: "Dr. Pravin Vaishya",
    jobTitle: "Dentist",
    medicalSpecialty: "Dentistry",
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      recognizedBy: { "@type": "Organization", name: "Mumbai University" },
      name: "Bachelor of Dental Surgery (BDS)",
    },
    identifier: { "@type": "PropertyValue", name: "Registration", value: "A-6039" },
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount:  "120",
    bestRating:   "5",
    worstRating:  "1",
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://allcare-dental.vercel.app" },
    { "@type": "ListItem", position: 2, name: "Book Appointment", item: "https://allcare-dental.vercel.app/#appointment" },
    { "@type": "ListItem", position: 3, name: "Our Services", item: "https://allcare-dental.vercel.app/#services" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#1b3d2f" />
        <meta name="color-scheme" content="light" />
        <meta name="format-detection" content="telephone=yes" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dentistSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
