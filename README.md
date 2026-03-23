# All Care Dental Clinic — Next.js App

Production-ready Next.js (App Router) website for **All Care Dental Clinic, Dr. Pravin Vaishya, Boisar**.

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Animations | Framer Motion |
| Fonts | next/font/google (Cormorant Garamond + DM Sans) |
| Styling | Global CSS with CSS variables |
| SEO | Next.js Metadata API + JSON-LD Schema |

---

## Project Structure

```
dental-clinic/
├── app/
│   ├── layout.tsx          ← Root layout, fonts, SEO metadata, JSON-LD
│   └── page.tsx            ← Main page (assembles all sections)
├── components/
│   ├── Navbar.tsx          ← Sticky nav with scroll shadow
│   ├── Hero.tsx            ← Hero section with Framer Motion + counters
│   ├── TrustStrip.tsx      ← Trust badges strip
│   ├── AppointmentForm.tsx ← Appointment booking form
│   ├── Services.tsx        ← Services grid
│   ├── About.tsx           ← Doctor profile + features
│   ├── Location.tsx        ← Map + address cards
│   ├── Footer.tsx          ← Footer with navigation
│   ├── FloatingElements.tsx← Floating book button + WhatsApp
│   └── CustomCursor.tsx    ← Custom cursor (fine-pointer devices only)
├── lib/
│   ├── RevealWrapper.tsx   ← Framer Motion scroll-reveal wrapper
│   └── useScrollReveal.ts  ← IntersectionObserver hook (alternative)
├── styles/
│   └── globals.css         ← All styles (CSS variables, full design system)
├── public/                 ← Static assets (add favicon.ico, og-image.jpg here)
├── next.config.js
├── tsconfig.json
└── package.json
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

---

## SEO Features

- ✅ `<title>` and `<meta description>` via Next.js Metadata API
- ✅ OpenGraph tags (title, description, image, locale)
- ✅ Twitter Card meta tags
- ✅ Canonical URL
- ✅ JSON-LD Schema: `Dentist` (Local Business) + `Physician` (Doctor)
- ✅ Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<address>`, `role` attributes
- ✅ `alt` and `aria-label` attributes throughout

---

## Animations

- **Hero** — Staggered entrance via Framer Motion `motion.div`
- **Scroll Reveal** — `RevealWrapper` uses `useInView` from Framer Motion
- **Counters** — Custom `useCounter` hook with easing
- **Custom Cursor** — Smooth laggy ring cursor (desktop only)
- **Hover effects** — Pure CSS transitions (card lifts, underline scales)
- **Floating button** — CSS transform show/hide based on scroll position
- **Pulsing dot** — CSS `@keyframes` animation in navbar CTA

---

## Customisation

### Update contact details
Edit `app/page.tsx` (top bar) and each component directly.

### Add a real OG image
Place a `1200×630` image at `public/og-image.jpg`.

### Add a favicon
Place `favicon.ico` at `public/favicon.ico`.

### Connect form to a backend
In `AppointmentForm.tsx`, replace the `setTimeout` simulation inside `handleSubmit` with a real `fetch` call to your API or a service like Formspree / EmailJS.

---

## Deployment

Deploy instantly on **Vercel**:

```bash
npx vercel
```

Or use any Node.js-capable host (Railway, Render, etc.).
