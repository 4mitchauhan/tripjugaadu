# TripJugaadu (ट्रिप जुगाड़ू)

> **India's Autonomous High-Altitude Adventure & Experiential Travel Ecosystem**

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.3.0-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![NestJS](https://img.shields.io/badge/NestJS-12.0.1-red?style=for-the-badge&logo=nestjs)](https://nestjs.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x%20%7C%206.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19.3-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Three.js](https://img.shields.io/badge/Three.js-0.186-049EF4?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![Vitest](https://img.shields.io/badge/Vitest-36%2F36%20Passing-729B1B?style=for-the-badge&logo=vitest)](https://vitest.dev/)

---

TripJugaadu is an enterprise-grade travel and adventure marketplace engineered specifically for the rugged geography of the Indian subcontinent (Uttarakhand, Himachal Pradesh, Ladakh, Meghalaya, Spiti Valley, and beyond). It unifies high-altitude expedition safety protocols, wilderness eco-stays, verified operator onboarding, autonomous AI trip planning, tamper-proof Razorpay payment processing, and a balanced double-entry financial ledger under a high-performance monorepo architecture.

---

## Table of Contents

1. [Architectural Highlights](#architectural-highlights)
2. [Project Structure & Monorepo Layout](#project-structure--monorepo-layout)
3. [Implemented Capabilities & Phase Roadmap](#implemented-capabilities--phase-roadmap)
   - [Phase 0 & 1 — Design System & Visual Foundation](#phase-0--1--design-system--visual-foundation)
   - [Phase 2 — Cinematic 150-Frame Hero Engine & Three.js Visualizer](#phase-2--cinematic-150-frame-hero-engine--threejs-visualizer)
   - [Phase 3 — Core Travel Marketplace & High-Altitude Catalog](#phase-3--core-travel-marketplace--high-altitude-catalog)
   - [Phase 4 — Operator Portal, Admin Governance & Razorpay Checkout](#phase-4--operator-portal-admin-governance--razorpay-checkout)
   - [Phase 5 — Autonomous AI Travel Intelligence (Gemini + Deterministic Fallback)](#phase-5--autonomous-ai-travel-intelligence-gemini--deterministic-fallback)
   - [Phase 6 — Global FinTech, Multi-Currency, B2B Gateway & Sentinel Telemetry](#phase-6--global-fintech-multi-currency-b2b-gateway--sentinel-telemetry)
   - [Phase 7 — Interactive Audit Resolution (27 Defects Resolved, 0 Regression)](#phase-7--interactive-audit-resolution-27-defects-resolved-0-regression)
   - [Phase 8 — Security & Payment Integrity Hardening](#phase-8--security--payment-integrity-hardening)
4. [Complete Route Map (35 Production Pages)](#complete-route-map-35-production-pages)
5. [Backend API Reference (NestJS — 18 Modules)](#backend-api-reference-nestjs--18-modules)
6. [Offline Expedition & PWA Mode](#offline-expedition--pwa-mode)
7. [Security & Access Control Architecture](#security--access-control-architecture)
8. [Testing & Quality Assurance](#testing--quality-assurance)
9. [Getting Started & Local Development](#getting-started--local-development)
10. [Environment Variables Reference](#environment-variables-reference)
11. [Tech Stack Summary](#tech-stack-summary)

---

## Architectural Highlights

- **Next.js 16 (Turbopack & App Router) + React 19:** Full SSR, SSG, and client hydration across **35 production routes** with zero TypeScript errors (`npx tsc --noEmit` clean).
- **Cinematic 150-Frame Hero Canvas Engine:** Scroll-linked canvas animation rendering 150 calibrated high-definition frames with linear interpolation (`lerp`), Retina/DPR scaling, aspect-ratio cover math, and nearest-loaded-frame fallback.
- **Three.js 3D Mountain Visualizers:** Dynamic WebGL mountain terrain, weather shaders, and expedition preview scenes with SSR-safe fallbacks.
- **Microservice-Ready NestJS 12 API:** 18 domain modules covering bookings, payments, auth, finance, AI, telemetry, operators, and B2B partners.
- **Enterprise Double-Entry Ledger:** Immutable debit/credit records with automated T+1 IMPS/NEFT bank payouts and tiered platform commissions (5% Expeditions, 8% Stays, 7% Cultural Experiences).
- **Tamper-Proof Razorpay Checkout:** Server-authoritative price calculation (rejecting client-tampered totals), HMAC-SHA256 signature verification, webhook idempotency, and double-spend prevention.
- **Cryptographic Security Layer:** Salted `scrypt` password hashing, timing-safe equality checks, HMAC-SHA256 JWT tokens, `AuthGuard` & `RolesGuard` RBAC, and boot-time environment validation.
- **Autonomous AI Travel Intelligence (L1–L5):** Multi-model engine with Google Gemini (Flash 1.5, 2.0, 3.1) and deterministic mock fallback; natural language search, IMF-grounded destination safety Q&A, and L4/L5 autonomous execution with OTP guardrails.
- **Offline-First Expedition Mode:** PWA Service Worker + IndexedDB cache preserving mountain trail guides, emergency contacts, and booking vouchers when cellular signal drops.
- **Global Localization Layer:** Dynamic multi-currency conversion (`INR`, `USD`, `EUR`, `GBP`, `AED`) and trilingual dictionary (English, Hindi, Hinglish).

---

## Project Structure & Monorepo Layout

```
tripjugaadu/
├── apps/
│   ├── api/                           # NestJS Enterprise Backend API
│   │   ├── prisma/                    # Prisma schema and SQLite / PostgreSQL config
│   │   ├── src/
│   │   │   ├── common/                # Shared utilities, crypto, guards, validators
│   │   │   │   ├── crypto.util.ts     # Scrypt password hashing & constant-time compare
│   │   │   │   ├── env.validator.ts   # Boot-time configuration & secret validation
│   │   │   │   ├── jwt.util.ts        # Cryptographic JWT signing & verification
│   │   │   │   ├── prisma.service.ts  # Database client lifecycle management
│   │   │   │   ├── seed-data.ts       # Canonical adventure, stay & operator records
│   │   │   │   └── guards/            # AuthGuard & RolesGuard (@Roles('ADMIN'|'PROVIDER'))
│   │   │   ├── modules/
│   │   │   │   ├── admin/             # Platform KPI dashboard, KYC & audit logs
│   │   │   │   ├── adventures/        # Adventure batches, slots & gear checks
│   │   │   │   ├── ai/                # Gemini & Mock AI, search, destination Q&A, L4/L5
│   │   │   │   │   ├── providers/     # GeminiAiProvider, MockAiProvider
│   │   │   │   │   ├── ai-guardrails.service.ts
│   │   │   │   │   └── ai-tools.service.ts
│   │   │   │   ├── auth/              # JWT auth, user/provider signup, getMe
│   │   │   │   ├── bookings/          # Reservation lifecycle, IDOR defense & check-in
│   │   │   │   ├── collaboration/     # Group trip members & pooled bill-splitting
│   │   │   │   ├── coupons/           # Promotional code engine with cart rules
│   │   │   │   ├── currency/          # Multi-currency exchange rate engine
│   │   │   │   ├── destinations/      # Curated destination catalog & KBYG data
│   │   │   │   ├── experiences/       # Cultural tours & artisan workshops
│   │   │   │   ├── finance/           # Double-entry ledger, payouts & commission tiers
│   │   │   │   ├── observability/     # Health liveness & Prometheus metrics
│   │   │   │   ├── partner/           # B2B HMAC-signed webhooks & catalog feed
│   │   │   │   ├── payments/          # Razorpay order generation & signature verify
│   │   │   │   ├── providers/         # Operator inventory manager & verification
│   │   │   │   ├── search/            # Multi-attribute search & filter engine
│   │   │   │   ├── stays/             # Wilderness camps & eco-resorts
│   │   │   │   └── trips/             # Trip drafts & generated itineraries
│   │   │   └── main.ts                # API bootstrap with correlation IDs & validation
│   │   ├── test/                      # Comprehensive integration test suites
│   │   │   ├── booking-payment.spec.ts# 20 Razorpay & booking integrity tests
│   │   │   ├── security-hardening.spec.ts # 15 security, auth & RBAC tests
│   │   │   └── app.e2e-spec.ts
│   │   └── package.json
│   └── web/                           # Secondary web workspace
├── public/                            # Static assets & PWA files
│   ├── frames/                        # 150 HD cinematic hero animation frames
│   ├── 150_frames_8K_JPEG.zip         # Verified source asset archive
│   ├── sw.js                          # Expedition offline service worker
│   └── favicon.svg
├── scripts/
│   ├── ensure-frames.js               # Verifies and extracts 150 canvas frames
│   ├── verify_hero_animation.js       # Hero canvas audit & acceptance test runner
│   ├── cross_phase_audit.js           # End-to-end integration test runner
│   └── phase6_verification.js         # Enterprise API verification suite
├── src/                               # Next.js 16 App Router Source
│   ├── app/                           # 35 App Router routes & metadata files
│   ├── components/                    # Reusable React 19 UI components
│   │   ├── 3d/                        # Three.js WebGL mountain & adventure scenes
│   │   ├── CinematicHeroCanvas.tsx    # High-performance 150-frame canvas renderer
│   │   ├── DestinationAiAssistant.tsx # Destination-level Q&A widget
│   │   ├── Footer.tsx                 # Enterprise footer with internal routing
│   │   ├── KbygIcon.tsx               # Know Before You Go visual badges
│   │   ├── Navigation.tsx             # Responsive navbar with currency/locale & login
│   │   ├── OfflineExpeditionBanner.tsx# Real-time connectivity state banner
│   │   ├── PageEffects.tsx            # Ambient backdrop lighting effects
│   │   └── SearchPanel.tsx            # Interactive search panel with date & count pickers
│   ├── context/                       # React Context Providers
│   │   ├── LocaleContext.tsx          # Multi-currency & trilingual localization
│   │   └── TripContext.tsx            # Multi-day trip planner, favorites & budget state
│   ├── lib/
│   │   ├── data.ts                    # Canonical listings, destinations & seed records
│   │   ├── i18n.ts                    # I18n translation dictionaries & currency rates
│   │   └── offline-storage.ts         # IndexedDB wrapper for offline expeditions
│   └── styles/                        # Handcrafted Vanilla CSS Design System
│       ├── animations.css             # Keyframe animations & smooth transitions
│       ├── base.css                   # Reset, typography & body defaults
│       ├── components.css             # Buttons, cards, modals, badges, inputs
│       ├── layout.css                 # Grid systems, containers, headers, footers
│       ├── pages.css                  # Page-specific layout definitions
│       ├── responsive.css             # Mobile/tablet media queries & adaptive rules
│       └── tokens.css                 # HSL color palettes, spacing, z-index hierarchy
├── next.config.ts                     # Next.js config with API proxy rewrites (`/api/v1/:path*`)
├── package.json                       # Monorepo root scripts & dependencies
└── tsconfig.json                      # TypeScript 5.x configuration
```

---

## Implemented Capabilities & Phase Roadmap

### Phase 0 & 1 — Design System & Visual Foundation
- **Dark Glassmorphic Aesthetic:** Handcrafted HSL tokens in `tokens.css` with ambient atmospheric lighting (`--bg-main: #010611`, `--color-accent: #00AEEF`, `--color-neon: #39FF14`).
- **Responsive Layout Engine:** Fluid grids and breakpoints (Desktop `>1024px`, Tablet `≤1024px`, Mobile `≤768px`) in `responsive.css`.
- **Component Token Library:** Standardized styles for buttons (`.btn--primary`, `.btn--secondary`, `.btn--ghost`), glass cards (`.card--info`, `.card--poster`), and status badges.

### Phase 2 — Cinematic 150-Frame Hero Engine & Three.js Visualizer
- **150-Frame Canvas Sequence:** Scroll-linked canvas animation loading `frame_001.jpg` through `frame_150.jpg` with sub-millisecond frame switches.
- **Interpolation & Performance:** Implements linear interpolation (`lerp`), Retina/DPR (`window.devicePixelRatio`) scaling, and aspect-ratio cover math.
- **Graceful Fallbacks:** Implements nearest-loaded-frame fallback to ensure no blank flickering during asset streaming, respecting `prefers-reduced-motion`.
- **Automated Verification:** Verified via `scripts/ensure-frames.js` and `scripts/verify_hero_animation.js`.
- **Three.js WebGL Mountain Visualizer:** Added in `apps/web/src/components/3d/` with dynamic terrain, atmospheric lighting, and WebGL capability detection.

### Phase 3 — Core Travel Marketplace & High-Altitude Catalog
- **Curated High-Altitude Destinations:** In-depth guides for Rishikesh, Manali, Ladakh, Spiti Valley, Meghalaya, and Jim Corbett.
- **High-Adrenaline Adventures:** Grade IV white-water rafting, 83m cliff bungee jumping, alpine paragliding, and high-altitude trekking batches.
- **Wilderness Stays:** Riverside luxury Swiss tents, alpine eco-resorts, and heritage mountain homestays.
- **Cultural Experiences:** Guided sunrise kayaking with Ganga Aarti, monastery meditation walks, and local cuisine workshops.
- **Know Before You Go (KBYG):** Safety badges indicating required fitness level, mountain altitude, required permits, and eco-protocols.

### Phase 4 — Operator Portal, Admin Governance & Razorpay Checkout
- **Operator Multi-Step Onboarding (`/provider/register`):** 3-stage wizard (Business Profile → Compliance/PAN → Payout Banking) with strict step guards.
- **Provider Dashboard (`/provider/dashboard`):** Real-time booking arrivals, check-in verification synced with backend, and slot scheduling.
- **Admin Governance Console (`/admin`):** Dedicated tabs for Operator KYC verification, Listing Moderation, Payout Settlements, Telemetry, and Audit Logs.
- **Authoritative Checkout (`/booking`):**
  - Native HTML5 form validation tied to payment submission.
  - Server-side booking creation (`POST /api/v1/bookings`) in `PAYMENT_PENDING` state.
  - Authoritative Razorpay order creation (`POST /api/v1/payments/create-order`).
  - Authoritative coupon validation (`POST /api/v1/coupons/validate`) with coupon removal support.

### Phase 5 — Autonomous AI Travel Intelligence (Gemini + Deterministic Fallback)
- **Multi-Model Provider Architecture:** `GeminiAiProvider` integrating Google Gemini (1.5 Flash, 2.0 Flash, 3.1 Flash-Lite) with timeout fallback to `MockAiProvider`.
- **Natural Language Search (`POST /api/v1/ai/search`):** Extracts destination, budget thresholds, and activity intent from natural queries (e.g., *"Rafting under 5000 in Rishikesh"*).
- **AI Travel Companion (`POST /api/v1/ai/chat`):** Grounded conversational agent answering travel inquiries with real-time inventory suggestions.
- **Destination Safety Q&A (`POST /api/v1/ai/destination-qa`):** Verifies queries against official Indian Mountaineering Foundation (IMF) safety standards.
- **AI Expedition Planner (`POST /api/v1/ai/plan-trip`):** Synthesizes multi-day itineraries with morning, afternoon, and evening slots matched to real marketplace inventory.
- **Autonomous Workflows (L1–L5):**
  - **L4:** 15-minute provisional inventory hold token.
  - **L5 (Guardrail):** Enforces human-in-the-loop explicit OTP confirmation token before financial commitment.

### Phase 6 — Global FinTech, Multi-Currency, B2B Gateway & Sentinel Telemetry
- **Global Currency Engine:** Real-time exchange rate conversions supporting `INR (₹)`, `USD ($)`, `EUR (€)`, `GBP (£)`, and `AED`.
- **Trilingual Localization:** Translation dictionaries for English, Hindi (हिन्दी), and Hinglish (HI-EN).
- **Double-Entry Financial Ledger:** Immutable ledger entries with balanced `DEBIT`/`CREDIT` parity, automated T+1 IMPS/NEFT provider payouts, and platform commission tiers:
  - High-Altitude Expeditions: **5% flat fee**
  - Wilderness Stays & Camps: **8% platform fee**
  - Guided Cultural Experiences: **7% platform fee**
- **B2B Partner Ecosystem:** Authenticated partner catalog feed and HMAC-SHA256 signed webhooks (`x-partner-key` verification).
- **Real-Time Group Collaboration:** Dynamic collaborator invites and pooled bill-splitting with fair share breakdown.
- **Sentinel Observability:** `/health` liveness checks, `/metrics` reporting throughput (RPS), error rates, and P95 latency.

### Phase 7 — Interactive Audit Resolution (27 Defects Resolved, 0 Regression)
All 27 QA defects across 41 interactive controls were audited and resolved with **zero visual redesign**:
1. Associated Pay button with traveler form via `form="traveler-form"`; enforced required name, email, and phone validation.
2. Created conforming App Router pages for `/help`, `/safety`, `/cancellation`, `/terms`, and `/privacy`.
3. Fixed wishlist links to canonical listing IDs; added accessible Listing Not Found states.
4. Forwarded `id`, `date`, `time`, and `travelers` to `/booking` via safe `URLSearchParams`.
5. Validated check-out > check-in date; forwarded stay parameters to checkout.
6. Passed experience ID and guest count to `/booking` and `/trip-builder`.
7. Persisted draft trip data to `sessionStorage` and URL params; dynamic itinerary rendering in `itinerary/page.tsx`.
8. Connected login/register to real `/api/v1/auth/login` and `/api/v1/auth/register` endpoints with session token persistence.
9. Rendered accessible provider availability notices.
10. Replaced `alert()` with an accessible star-rating modal (`role="dialog"`, `aria-modal="true"`, Escape key trap).
11. Functional inline slot editor for adding, modifying, and deleting operational batches.
12. Accessible radiogroup (`role="radiogroup"`, `role="radio"`, `aria-checked`) with keyboard arrow navigation.
13. Server-side coupon verification with removal support.
14. Removed redundant `<Navigation>` and `<Footer>` shells from subpages.
15. Bound check-ins to `PATCH /api/v1/providers/bookings/:id/checkin` and synchronized with `localStorage`.
16. Validated listing creation submitted to `/api/v1/providers/listings` with `UNDER_REVIEW` state.
17. Moderation check prevents publishing unapproved listings.
18. Raised modal z-index to `9999` with backdrop masking lower controls and focus trapping.
19. Enforced sequential step completion before advancing in provider onboarding wizard.
20. Created `SearchPanel.tsx` with functional destination pickers, date selectors, traveler counters, and budget filters; connected to `/search`.
21. Added desktop Login link (`.nav__login-desktop`) in `.nav__actions` with responsive hiding on mobile.
22. Replaced dead `#` links with accessible status indicators.
23. Replaced hardcoded localhost URLs with internal App Router links (`/admin#ledger`, `/admin#health`, `/provider/dashboard#commissions`).
24. Validated collaborator email syntax, blocked duplicates, and posted to `/api/v1/collaboration/:id/members`.
25. Blocked repeated votes per session and updated vote tallies.
26. Added descriptive `aria-label`s to traveler count increment/decrement controls.
27. Added `aria-label="Close dialog"` to icon-only close buttons.

### Phase 8 — Security & Payment Integrity Hardening
- **Cryptographic Password Security:** Replaced insecure password storage with salted `scrypt` hashing (`crypto.util.ts`).
- **Cryptographic JWT Tokens:** Implemented HMAC-SHA256 JWT tokens with signature validation and expiration checks (`jwt.util.ts`).
- **Role-Based Access Control (RBAC):** Built NestJS `AuthGuard` and `RolesGuard` enforcing `@Roles('ADMIN')` and `@Roles('PROVIDER')` boundaries.
- **IDOR Protection:** Restricted `GET /api/v1/bookings/my-bookings` to authenticated user reservations.
- **Constant-Time Comparison:** Secured B2B `X-Partner-Key` authentication against timing attacks.
- **Startup Configuration Validation:** `validateEnvironment()` checks presence of all critical keys at server bootstrap (`env.validator.ts`).
- **Razorpay Payment Integrity:** Server-side order creation, HMAC-SHA256 signature verification, duplicate webhook deduplication, and out-of-order event handling.
- **Automated Test Coverage:** 35 unit and integration tests across `booking-payment.spec.ts` (20 tests) and `security-hardening.spec.ts` (15 tests).

---

## Complete Route Map (35 Production Pages)

| Route | Type | Description |
| :--- | :--- | :--- |
| `/` | Static (○) | Marketplace Homepage with 150-frame cinematic hero, search panel, and curated destinations |
| `/explore` | Static (○) | Interactive expedition catalog with category filters and search panel |
| `/search` | Static (○) | Multi-criteria search results with category filtering, price sliders, and reset controls |
| `/adventures` | Static (○) | High-altitude adventures catalog (Rafting, Bungee, Paragliding, Treks) |
| `/adventure/[id]` | Dynamic (ƒ) | Adventure details with time slot selection, KBYG protocols, and booking trigger |
| `/stays` | Static (○) | Wilderness stays and eco-resorts catalog |
| `/stay/[id]` | Dynamic (ƒ) | Eco-lodge detail page with check-in/out date validation and reservation panel |
| `/experiences` | Static (○) | Curated cultural tours and workshops catalog |
| `/experience/[id]` | Dynamic (ƒ) | Guided experience detail with guest count selection and trip builder integration |
| `/destinations` | Static (○) | Curated destinations grid with region cards |
| `/destination/[id]` | SSG (●) | Destination guide with weather, best season, altitude, and AI assistant (pre-rendered for 6 destinations) |
| `/trip-builder` | Static (○) | Multi-day trip planner with interactive calendar, budget tracker, and collaborator invites |
| `/itinerary` | Static (○) | Dynamically rendered expedition itinerary matching user's draft trip configuration |
| `/booking` | Static (○) | Traveler checkout with native validation, coupon engine, and Razorpay integration |
| `/confirmation` | Static (○) | Authoritative booking confirmation and expedition ticket pass with QR reference |
| `/dashboard` | Static (○) | Traveler dashboard with live trips, packing checklist, wishlist, and operator review modal |
| `/login` | Static (○) | Authentication page with login/registration forms and session management |
| `/provider/dashboard` | Static (○) | Operator operations portal with live arrival check-ins, inventory, and payouts |
| `/provider/listings` | Static (○) | Provider inventory manager with inline slot editor and listing creation modal |
| `/provider/register` | Static (○) | 3-step operator KYC onboarding wizard with validation guards |
| `/admin` | Static (○) | Platform administration console (KYC queue, moderation, ledger, telemetry) |
| `/offline` | Static (○) | Offline fallback page for high-altitude zones without cellular data |
| `/help` | Static (○) | Support & Help Center with categorized FAQs and operator contact |
| `/safety` | Static (○) | Safety protocols, IMF equipment guidelines, and weather thresholds |
| `/cancellation` | Static (○) | Tiered cancellation and emergency refund policy |
| `/terms` | Static (○) | Marketplace terms of service and operator obligations |
| `/privacy` | Static (○) | Privacy policy and zero-trust data protection standards |
| `/manifest.webmanifest`| Static (○) | PWA Web App Manifest |
| `/robots.txt` | Static (○) | Search engine indexing rules |
| `/sitemap.xml` | Static (○) | Dynamic XML sitemap generator |

---

## Backend API Reference (NestJS — 18 Modules)

All API endpoints are prefixed with `/api/v1` and proxied through Next.js rewrites:

### 1. Catalog & Discovery
- `GET /api/v1/destinations` — List curated destinations
- `GET /api/v1/destinations/:id` — Get destination details, weather, and altitude
- `GET /api/v1/adventures` — List adventure batches and instructor credentials
- `GET /api/v1/adventures/:id` — Adventure details and slot availability
- `GET /api/v1/stays` — List eco-lodges and wilderness camps
- `GET /api/v1/stays/:id` — Stay details, amenities, and room inventory
- `GET /api/v1/experiences` — List cultural experiences and workshops
- `GET /api/v1/experiences/:id` — Experience schedule and guide profile
- `GET /api/v1/search?query=...` — Multi-attribute text and filter search

### 2. Authentication & Users
- `POST /api/v1/auth/login` — User and operator login (returns JWT token and sanitized profile)
- `POST /api/v1/auth/register` — New account registration with salted scrypt hashing
- `GET /api/v1/auth/me` — Authenticated profile verification

### 3. Bookings & Payments
- `POST /api/v1/bookings` — Create authoritative reservation in `PAYMENT_PENDING` state
- `GET /api/v1/bookings/:id` — Retrieve booking details and QR voucher
- `GET /api/v1/bookings/my-bookings` — IDOR-protected list of traveler reservations
- `POST /api/v1/payments/create-order` — Authoritative Razorpay order creation (server computes amount in paise)
- `POST /api/v1/payments/verify` — Cryptographic HMAC-SHA256 signature verification
- `POST /api/v1/payments/webhook` — Idempotent webhook handler for `payment.captured` and `payment.failed`
- `POST /api/v1/coupons/validate` — Coupon discount validation against cart total

### 4. Operator & Administration
- `POST /api/v1/providers/register` — Operator KYC application submission
- `GET /api/v1/providers/listings` — List provider's managed inventory
- `POST /api/v1/providers/listings` — Submit new listing for admin moderation
- `PATCH /api/v1/providers/listings/:id/status` — Publish/unpublish approved listing
- `PATCH /api/v1/providers/bookings/:id/checkin` — Check-in verified traveler arrival
- `GET /api/v1/admin/dashboard` — Platform GMV, active listings, and KYC queue
- `GET /api/v1/admin/stats` — Detailed marketplace metrics and operator KPIs
- `GET /api/v1/admin/audit-logs` — Immutable administrative event trail

### 5. FinTech & Multi-Currency
- `GET /api/v1/currency/rates` — Live conversion rates for INR, USD, EUR, GBP, AED
- `GET /api/v1/currency/convert?amount=10000&to=USD` — Converted amount formatting
- `GET /api/v1/finance/summary` — GMV, platform commission, and double-entry balance status
- `GET /api/v1/finance/ledger` — Immutable debit/credit ledger records
- `GET /api/v1/finance/payouts` — Provider bank payout queue
- `POST /api/v1/finance/payouts/:id/settle` — Execute IMPS/NEFT settlement
- `GET /api/v1/finance/commissions` — Active commission tier breakdown

### 6. Autonomous AI Intelligence
- `POST /api/v1/ai/search` — Natural language intent and budget parser
- `POST /api/v1/ai/chat` — Conversational companion grounded in catalog
- `POST /api/v1/ai/destination-qa` — IMF-grounded destination safety Q&A
- `POST /api/v1/ai/plan-trip` — Multi-day automated itinerary generator
- `POST /api/v1/ai/monitor` — Real-time weather, river discharge, and road alerts
- `POST /api/v1/ai/multimodal` — Equipment readiness analysis
- `POST /api/v1/ai/autonomous-workflow` — L4 provisional hold and L5 OTP execution

### 7. B2B Partner Gateway & Collaboration
- `GET /api/v1/partner/catalog` — HMAC-authenticated B2B inventory feed
- `GET /api/v1/partner/webhooks` — Webhook delivery event logs
- `GET /api/v1/collaboration/:id/members` — Group trip members and roles
- `POST /api/v1/collaboration/:id/members` — Invite collaborator (with email syntax validation)
- `GET /api/v1/collaboration/:id/expenses` — Pooled bill-splitting calculation

### 8. Observability & Telemetry
- `GET /api/v1/health` — System liveness & database connectivity
- `GET /api/v1/metrics` — Throughput (RPS), error rate %, and P95 latency

---

## Offline Expedition & PWA Mode

High-altitude adventure travel in Uttarakhand, Himachal Pradesh, and Ladakh frequently encounters complete cellular blackouts. TripJugaadu addresses this via:

1. **Service Worker (`public/sw.js`):** Pre-caches essential routes (`/`, `/offline`, `/explore`, `/trip-builder`), CSS bundles, and visual assets.
2. **Offline Trail Cache (`src/lib/offline-storage.ts`):** An IndexedDB wrapper saving cached itineraries, emergency contacts, mountain trail guides, and offline booking vouchers.
3. **Adaptive Status Banner (`src/components/OfflineExpeditionBanner.tsx`):** Real-time network detection alerting travelers when they enter offline mode and confirming local data availability.

---

## Security & Access Control Architecture

TripJugaadu incorporates defense-in-depth security across every tier:

```
[ Traveler / Client ]
       │
       ▼ (HTTPS / Strict Headers)
[ Next.js API Proxy Rewrites ]
       │
       ▼ (Correlation ID + Env Validator)
[ NestJS Global Middleware ]
       │
       ├─► [ AuthGuard ]: Validates HMAC-SHA256 JWT, checks expiration & signature
       │
       ├─► [ RolesGuard ]: Enforces @Roles('ADMIN') or @Roles('PROVIDER')
       │
       ├─► [ PartnerAuth ]: Constant-time X-Partner-Key validation
       │
       └─► [ Authoritative Pricing Engine ]:
             • Ignores client-provided subtotals or prices
             • Calculates price from server catalog records
             • Generates Razorpay order tied directly to bookingRef
             • Verifies HMAC signature before booking confirmation
```

- **Password Hashing:** Implemented with cryptographic salt and `scrypt` key derivation (`hashPassword`, `verifyPassword`).
- **Timing Attack Resistance:** Header and API key comparisons execute via `crypto.timingSafeEqual`.
- **IDOR Prevention:** Traveler endpoints restrict query results strictly to `req.user.email`.
- **Webhook Deduplication:** Tracked in-memory event registry rejecting duplicate Razorpay webhook IDs.

---

## Testing & Quality Assurance

TripJugaadu includes comprehensive automated testing across both API and frontend layers:

### 1. API Integration Tests (Vitest)
Run the 36 unit and integration tests:
```bash
npm --prefix apps/api test
```

#### Test Suite Breakdown:
- **`test/booking-payment.spec.ts` (20 tests):**
  1. Traveler name presence and minimum length validation
  2. Traveler email and phone syntax validation
  3. Authoritative booking creation with `PAYMENT_PENDING` state
  4. Server-computed pricing ignoring client price tampering
  5. Valid coupon application and discount subtraction
  6. Expired or invalid coupon rejection
  7. Razorpay order generation with server-computed amount in paise
  8. Order amount matching booking total
  9. Pending order reuse on subsequent checkout attempts
  10. Cryptographic HMAC-SHA256 signature verification on payment success
  11. Tampered payment signature rejection
  12. Mismatched order/payment amount rejection
  13. Booking status transition to `CONFIRMED` upon payment capture
  14. Idempotent payment verification (double-spend prevention)
  15. Razorpay webhook processing with event idempotency
  16. Out-of-order webhook event handling
  17. Webhook payment failure processing (`FAILED` state)
  18. Arrival check-in allowed only on `CONFIRMED` bookings
  19. Duplicate check-in prevention
  20. Active booking conflict detection

- **`test/security-hardening.spec.ts` (15 tests):**
  1. Cryptographic salt and `scrypt` password hashing
  2. Generic auth error preventing user enumeration
  3. Cryptographic HMAC-SHA256 JWT signing and verification
  4. Forged and tampered JWT token rejection
  5. Expired JWT token rejection
  6. Unauthenticated request rejection via `AuthGuard`
  7. Role-Based Access Control: Customer blocked from Admin operations (403)
  8. Admin user permitted on Admin operations
  9. Unauthorized financial operations blocked
  10. Provider dashboard protected from standard users
  11. IDOR prevention on traveler bookings
  12. Missing `X-Partner-Key` rejection
  13. Constant-time partner key comparison
  14. Secret sanitization in auth responses (`passwordHash` never leaked)
  15. Boot-time environment variable validation

### 2. TypeScript Type Conformity
Verify complete TypeScript type conformity with zero errors:
```bash
npx tsc --noEmit
```

### 3. Production Build Compilation
Compile the full Next.js App Router bundle using Turbopack:
```bash
npm run build
```
*(All 35 static, SSG, and dynamic routes compile cleanly).*

### 4. Cross-Phase Verification Scripts
```bash
# Verify 150 HD animation frames
node scripts/ensure-frames.js

# Verify hero canvas scroll animation and UI acceptance criteria
node scripts/verify_hero_animation.js

# Verify cross-phase integration (Phases 0–6)
node scripts/cross_phase_audit.js

# Verify FinTech, multi-currency, AI companion, and B2B gateway
node scripts/phase6_verification.js
```

---

## Getting Started & Local Development

### Prerequisites
- **Node.js:** v20.x or higher
- **npm:** v10.x or higher

### 1. Installation
Clone the repository and install root dependencies:
```bash
git clone https://github.com/your-org/tripjugaadu.git
cd tripjugaadu
npm install
```

Install backend API dependencies:
```bash
cd apps/api
npm install
cd ../..
```

### 2. Verify Static Animation Frames
Ensure all 150 high-definition hero animation frames are unpacked:
```bash
node scripts/ensure-frames.js
```

### 3. Environment Variables Configuration
Create `.env` in the project root:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_placeholder
```

Create `apps/api/.env`:
```env
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_SECRET="tripjugaadu_enterprise_secret_2026"
PARTNER_SECRET_KEY="tj_live_ghuk_984128471204"
RAZORPAY_KEY_ID="rzp_test_placeholder"
RAZORPAY_KEY_SECRET="tripjugaadu_sec_key_2026"
RAZORPAY_WEBHOOK_SECRET="rzp_wh_secret_tripjugaadu_2026"
GEMINI_API_KEY=""
GEMINI_MODEL="gemini-1.5-flash"
```

### 4. Run Development Servers
Start both the Next.js frontend and the NestJS API concurrently:

**Terminal 1 — Next.js 16 Web App (Port 3000):**
```bash
npm run dev
```

**Terminal 2 — NestJS API (Port 4000):**
```bash
npm run dev:api
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables Reference

### Frontend (`.env`)
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `NEXT_PUBLIC_API_URL` | Base URL for backend NestJS API | `http://localhost:4000` |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Public client key for Razorpay checkout | `rzp_test_placeholder` |

### Backend (`apps/api/.env`)
| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `PORT` | API server listen port | `4000` |
| `DATABASE_URL` | Prisma database connection string | `file:./dev.db` |
| `JWT_SECRET` | Secret key for signing HMAC-SHA256 JWTs | `tripjugaadu_enterprise_secret_2026` |
| `PARTNER_SECRET_KEY` | B2B partner HMAC authentication key | `tj_live_ghuk_984128471204` |
| `RAZORPAY_KEY_ID` | Razorpay Merchant Key ID | `rzp_test_placeholder` |
| `RAZORPAY_KEY_SECRET` | Razorpay Merchant Secret for order creation & signatures | `tripjugaadu_sec_key_2026` |
| `RAZORPAY_WEBHOOK_SECRET`| Razorpay Webhook Signing Secret | `rzp_wh_secret_tripjugaadu_2026` |
| `GEMINI_API_KEY` | Google Gemini API key (optional; falls back to deterministic model) | `""` |
| `GEMINI_MODEL` | Gemini AI model identifier | `gemini-1.5-flash` |

---

## Tech Stack Summary

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 16.4.0 (Turbopack, App Router, React Server Components) |
| **UI Library** | React 19.3.0 |
| **Language** | TypeScript 5.x / 6.x |
| **Styling** | Vanilla CSS Design System with CSS Tokens & Tailwind CSS |
| **3D & Canvas** | Three.js (0.186), HTML5 Canvas 150-frame animation engine |
| **Icons** | Lucide React |
| **Backend Framework** | NestJS 12.0.1 (Express adapter, modular architecture) |
| **ORM & Database** | Prisma 6.19.3 with SQLite / PostgreSQL |
| **AI Intelligence** | Google Gemini (1.5 Flash, 2.0 Flash) + Deterministic Mock Provider |
| **Payment Gateway** | Razorpay (Server order creation & HMAC-SHA256 signature verification) |
| **Security & Auth** | Scrypt password hashing, HMAC-SHA256 JWTs, AuthGuard, RolesGuard |
| **Offline & PWA** | Custom Service Worker + IndexedDB + Web App Manifest |
| **Testing** | Vitest 4.x, Supertest, Custom Cross-Phase Node.js test runners |

---

## License
Proprietary — TripJugaadu Inc. All rights reserved. Zero-Trust Architecture.
