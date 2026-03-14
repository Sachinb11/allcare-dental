# 🦷 All Care Dental Clinic — v2.0

**Dr. Pravin Vaishya | Boisar, Maharashtra**
Production-ready Next.js 14 website with full mobile responsiveness, email notifications, WhatsApp integration, and SEO.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local
# → Fill in your Supabase + Resend keys

# 3. Run Supabase schema
# → Paste DATABASE_SCHEMA.sql into Supabase SQL Editor → Run

# 4. Start dev server
npm run dev
# → Open http://localhost:3000
```

---

## 📁 Project Structure

```
allcare-dental/
├── app/
│   ├── api/
│   │   ├── appointments/route.ts   # Save booking + trigger email
│   │   └── send-email/route.ts     # Resend email notification
│   ├── globals.css                  # Full design system + responsive CSS
│   ├── layout.tsx                   # SEO metadata + schema.org JSON-LD
│   └── page.tsx                     # Home page (dynamic imports for perf)
│
├── components/
│   ├── Navbar.tsx                   # Topbar + sticky nav + slide-in drawer
│   ├── HeroSection.tsx              # Animated hero with counter stats
│   ├── TrustStrip.tsx               # 5 trust badges
│   ├── AppointmentSection.tsx       # Full form: validation + spinner + WhatsApp
│   ├── ServicesSection.tsx          # 6 service cards
│   ├── DoctorSection.tsx            # Dr. profile + animated stat counters
│   ├── ReviewsSection.tsx           # Google Reviews (schema.org)
│   ├── GallerySection.tsx           # Before/After flip cards
│   ├── FAQSection.tsx               # Accordion FAQ + FAQPage schema
│   ├── LocationSection.tsx          # 4 info cards + Google Maps
│   ├── Footer.tsx                   # Footer + emergency call button
│   ├── FloatingButtons.tsx          # Cursor + float book btn + mobile bar
│   └── WhatsAppButton.tsx           # Pulsing WhatsApp FAB
│
├── hooks/
│   └── useScrollAnimation.ts        # useScrollAnimation + useCountUp hooks
│
├── lib/
│   ├── supabase.ts                  # Supabase client
│   ├── utils.ts                     # cn(), WhatsApp link builder
│   └── validations.ts               # Zod schema
│
├── types/
│   └── appointment.ts               # TypeScript interfaces
│
├── public/
│   └── manifest.json                # PWA manifest
│
├── .env.example                     # All required env vars
├── DATABASE_SCHEMA.sql              # Supabase setup SQL
├── next.config.js                   # Security headers + image optimization
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🔑 Environment Variables

| Variable | Where to get |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Settings → API |
| `RESEND_API_KEY` | [resend.com](https://resend.com) — free tier: 3k/month |
| `CLINIC_EMAIL` | `pravinvaishya@yahoo.com` |
| `EMAIL_FROM` | Verified domain in Resend |
| `ADMIN_SECRET_KEY` | Any random 32+ char string |
| `NEXT_PUBLIC_SITE_URL` | Your deployed URL |

---

## 📧 Email Setup (Resend — 5 minutes)

1. Sign up free at **resend.com**
2. Add & verify your domain (or use `onboarding@resend.dev` for testing)
3. Create an API key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_xxxxxxxxxx
   CLINIC_EMAIL=pravinvaishya@yahoo.com
   EMAIL_FROM=noreply@yourdomain.com
   ```
5. Deploy — done! Every form submission sends a beautiful email to the clinic.

---

## 🗄️ Database Setup (Supabase)

1. Go to [supabase.com](https://supabase.com) → create project
2. SQL Editor → paste `DATABASE_SCHEMA.sql` → Run
3. Copy URL + keys to `.env.local`

---

## 🌐 API Endpoints

### `POST /api/appointments`
Submit a booking. Saves to Supabase + sends email notification.

```json
{
  "name": "Ravi Sharma",
  "phone": "9876543210",
  "date": "2026-03-20",
  "time": "10:00 AM",
  "treatment": "Root Canal Treatment",
  "notes": "Upper right molar"
}
```

### `POST /api/send-email`
Sends appointment email (called internally by appointments route).

### `GET /api/appointments`
List all appointments (admin only).
```bash
curl -H "Authorization: Bearer YOUR_ADMIN_SECRET_KEY" \
  https://allcare-dental.vercel.app/api/appointments
```

---

## 📱 Mobile Responsiveness

| Breakpoint | Layout changes |
|---|---|
| `≤1100px` | Hero 2-col → 1-col; AB grid, appt grid, loc grid stack |
| `≤768px` | Desktop nav hidden; drawer shown; form 1-col; topbar hidden; sticky mobile call bar shows |
| `≤480px` | Hero buttons stack full-width; gallery 1-col; contact cards stack |

---

## 🚀 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy preview
vercel

# Deploy production
vercel --prod
```

### Add env vars in Vercel:
Dashboard → Project → Settings → Environment Variables → add each from `.env.example`

### Custom domain:
Dashboard → Project → Settings → Domains → Add domain

---

## ✅ Feature Checklist v2.0

### Mobile Responsiveness
- [x] Responsive breakpoints: 1100px, 768px, 480px
- [x] Hamburger menu with slide-in drawer
- [x] `clamp()` fluid typography throughout
- [x] 44px minimum tap targets on mobile
- [x] Sticky call bar on mobile
- [x] Hero stacks to single column
- [x] All grids responsive

### Appointment Form
- [x] Real-time inline field validation
- [x] Loading spinner with disabled state
- [x] Animated success state (SVG checkmark)
- [x] Booking summary on success
- [x] WhatsApp pre-filled confirm button
- [x] Error banner with message
- [x] Sunday & past date prevention
- [x] Phone number auto-sanitize (digits only)

### Email Notifications
- [x] Resend API integration
- [x] Branded HTML email template
- [x] Call + WhatsApp buttons in email
- [x] Plain text fallback
- [x] Dev mode logging (no key needed locally)

### WhatsApp
- [x] Floating button with pulse animation
- [x] Official WA SVG logo
- [x] Pre-filled message on form success
- [x] Direct WA link in contact card
- [x] Adjusts position above mobile call bar

### SEO
- [x] Full Next.js Metadata API
- [x] `Dentist` + `MedicalClinic` schema.org
- [x] `FAQPage` schema (all 8 FAQs)
- [x] `BreadcrumbList` schema
- [x] `AggregateRating` schema (4.9★)
- [x] Review `schema.org/Review` markup
- [x] OpenGraph + Twitter cards
- [x] Security headers (X-Frame, CSP, etc.)

### Performance
- [x] Dynamic imports for all below-fold sections
- [x] Image optimization config (avif/webp)
- [x] `console.log` stripped in production
- [x] Passive scroll event listeners
- [x] PWA manifest.json

---

## 📞 Clinic Contact

**All Care Dental Clinic**
Shop No. 137/E, Arihant Aptt. 1st Floor,
Ostwal Empire, Opp. Bus Depo / Rickshaw Stand,
Boisar (W) – 401 501, Maharashtra

📞 7620750026 | 📱 9762788098
✉️ pravinvaishya@yahoo.com

**Hours:** Mon–Sat · 9:30 AM–12:30 PM & 4:30–8:00 PM | **Closed Sundays**
