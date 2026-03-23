import type { Metadata } from 'next';
import { Cormorant_Garamond, DM_Sans } from 'next/font/google';
import '../styles/globals.css';

/* ── Fonts ── */
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-dm-sans',
  display: 'swap',
});

/* ── SEO Metadata ── */
export const metadata: Metadata = {
  metadataBase: new URL('https://allcaredentalclinicboisar.com'),
  title: {
    default: 'All Care Dental Clinic — Dr. Pravin Vaishya | Boisar',
    template: '%s | All Care Dental Clinic',
  },
  description:
    'Advanced dental care in Boisar by Dr. Pravin Vaishya (B.D.S. Mumbai). Specialising in Root Canal, Dental Implants, Teeth Whitening, Gum Treatment & more. Book online.',
  keywords: [
    'dental clinic boisar',
    'dentist boisar',
    'Dr Pravin Vaishya',
    'root canal boisar',
    'dental implants boisar',
    'teeth whitening boisar',
    'gum treatment boisar',
    'all care dental clinic',
    'ostwal empire boisar dentist',
  ],
  authors: [{ name: 'Dr. Pravin Vaishya' }],
  creator: 'All Care Dental Clinic',
  publisher: 'All Care Dental Clinic',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://allcaredentalclinicboisar.com',
    siteName: 'All Care Dental Clinic',
    title: 'All Care Dental Clinic — Dr. Pravin Vaishya | Boisar',
    description:
      'Modern dental care in Boisar. Root Canal, Implants, UV Whitening, Gum Surgery & more. Book your appointment today.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'All Care Dental Clinic - Boisar',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'All Care Dental Clinic — Dr. Pravin Vaishya | Boisar',
    description:
      'Modern dental care in Boisar. Root Canal, Implants, UV Whitening & more.',
    images: ['/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://allcaredentalclinicboisar.com',
  },
};

/* ── JSON-LD Schema ── */
const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: 'All Care Dental Clinic',
  description:
    'Advanced dental care clinic in Boisar providing Root Canal, Dental Implants, Teeth Whitening, Gum Treatment and complete dental restorations.',
  url: 'https://allcaredentalclinicboisar.com',
  telephone: ['+917620750026', '+919762788098'],
  email: 'pravinvaishya@yahoo.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress:
      'Shop No. 137/E, Arihant Aptt. 1st Floor, Ostwal Empire, Opp. Bus Depo / Rickshaw Stand',
    addressLocality: 'Boisar',
    addressRegion: 'Maharashtra',
    postalCode: '401501',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 19.7958,
    longitude: 72.7587,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '01:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '16:00',
      closes: '20:00',
    },
  ],
  priceRange: '₹₹',
  paymentAccepted: 'Cash, UPI',
  currenciesAccepted: 'INR',
  medicalSpecialty: 'Dentistry',
  hasMap: 'https://maps.google.com/?q=Ostwal+Empire+Boisar',
  sameAs: ['https://wa.me/917620750026'],
};

const doctorSchema = {
  '@context': 'https://schema.org',
  '@type': 'Physician',
  name: 'Dr. Pravin Vaishya',
  description:
    'B.D.S. from Mumbai University, specialising in Root Canal, Dental Implants, UV Teeth Whitening and Gum Surgery.',
  medicalSpecialty: 'Dentistry',
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    credentialCategory: 'degree',
    name: 'Bachelor of Dental Surgery (B.D.S.)',
    recognizedBy: { '@type': 'EducationalOrganization', name: 'Mumbai University' },
  },
  identifier: { '@type': 'PropertyValue', name: 'Registration No.', value: 'A-6039' },
  worksFor: { '@type': 'Dentist', name: 'All Care Dental Clinic' },
  telephone: '+917620750026',
  email: 'pravinvaishya@yahoo.com',
};

/* ── Root Layout ── */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(doctorSchema) }}
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
