# TripJugaadu — Phase 0 PRD — Part 4: Design, Tech, Data, Security, Performance, SEO

---

## 28. Immersive Design Strategy

### Design Philosophy

The website should feel like a **cinematic travel experience**, not a conventional booking portal. The visual design should evoke the feeling of travel — space, depth, motion, wonder — while remaining functional and performant.

### Design System Layers

#### Layer 1 — Layout

| Principle | Application |
|---|---|
| Full-width sections | Hero sections, destination overviews, and image galleries span the full viewport |
| Layered compositions | Content layers float above background elements, creating depth |
| Large photography | Photography is a first-class design element, not a thumbnail |
| Editorial layouts | Long-form content (guides, destination pages) uses magazine-style layouts |
| Asymmetry | Strategic asymmetric layouts for visual interest (not everywhere — balanced with grid) |
| White space | Generous spacing that lets content breathe |
| Grid system | Underlying responsive grid for structure, with intentional breaks for visual moments |

#### Layer 2 — Depth

| Technique | Application |
|---|---|
| Elevation shadows | Multi-level shadow system to create card depth hierarchy |
| Perspective transforms | Subtle CSS perspective on hover for interactive cards |
| Glassmorphism | Frosted glass surfaces for overlays, navigation, and floating elements |
| Floating cards | Cards that appear to float above the background with shadow + transform |
| Layered elements | Foreground/midground/background composition for hero sections |
| Z-depth hierarchy | Clear depth hierarchy: background → content → interactive elements → overlays |

#### Layer 3 — Motion

| Technique | Application | Technology |
|---|---|---|
| Page transitions | Smooth transitions between pages | Framer Motion + Next.js |
| Scroll-triggered animations | Elements animate into view on scroll | Framer Motion / GSAP + ScrollTrigger |
| Parallax scrolling | Multi-speed scrolling layers for depth | Lenis + CSS / GSAP |
| Hover effects | Card lift, image zoom, color shift on hover | CSS + Framer Motion |
| Micro-interactions | Button feedback, toggle animations, loading states | Framer Motion |
| Smooth scrolling | Buttery smooth scroll experience | Lenis |
| Loading animations | Skeleton screens, progressive content reveal | Framer Motion |
| Number animations | Counter animations for prices, stats | Framer Motion |

#### Layer 4 — 3D / WebGL

| Usage | Description | Technology |
|---|---|---|
| Hero decorative objects | 3D objects (compass, globe, terrain fragment) as visual accent on homepage hero | Three.js / React Three Fiber + Drei |
| Atmospheric effects | Particle effects, light rays, floating elements for cinematic feel | Three.js shaders |
| Interactive visual elements | 3D card rotations, perspective shifts on interaction | React Three Fiber |
| Background effects | Subtle 3D backgrounds (noise, gradient meshes) on key pages | WebGL shaders |

**3D Usage Rules:**

| Rule | Detail |
|---|---|
| **Selective, not pervasive** | 3D is used on 2–3 key pages (homepage, maybe destination hero), not everywhere |
| **Decorative, not functional** | 3D enhances visual identity. Core product functionality never depends on 3D. |
| **Performance-budgeted** | 3D assets must load within 200ms, render at 60fps. If not achievable, use CSS fallback. |
| **Progressive enhancement** | Site must be fully functional with 3D disabled. Users on low-end devices see CSS alternatives. |
| **No 3D destination maps** | The platform does NOT create 3D environments for destinations. 3D is for UI depth, not virtual tourism. |
| **Reduced motion respect** | All animations (including 3D) respect `prefers-reduced-motion` media query |

### Visual Identity Direction (To Be Defined in Phase 1)

| Element | Direction |
|---|---|
| Color palette | TBD — should evoke nature/adventure while feeling premium. Avoid generic travel blue. Consider earthy tones + vibrant accents. |
| Typography | TBD — modern, clean, readable. Google Fonts recommended (e.g., Inter for body, Outfit or DM Sans for headings). Must work at all sizes. |
| Iconography | TBD — custom icon set that matches the visual language. Not generic stock icons. |
| Photography style | High-quality, editorial. Real photos from destinations, not stock images. Warm, aspirational, authentic. |
| Illustration style | TBD — if used, should complement photography, not replace it. |

### Performance Budget for Visual Effects

| Effect Category | Budget |
|---|---|
| Page load (above-the-fold) | < 2.5s (LCP) |
| First Input Delay | < 100ms (FID) |
| Cumulative Layout Shift | < 0.1 (CLS) |
| 3D scene load | < 200ms (including assets) |
| 3D scene frame rate | 60fps target, 30fps minimum |
| Total JS bundle (initial) | < 200KB gzipped |
| Image per hero section | < 200KB (WebP/AVIF, responsive srcset) |
| Animation smoothness | 60fps for all CSS/Framer animations |

### Responsive Behavior

| Breakpoint | Visual Approach |
|---|---|
| Desktop (1280px+) | Full immersive experience: parallax, 3D elements, large photography, editorial layouts |
| Tablet (768px–1279px) | Reduced parallax, simplified 3D (or CSS fallback), adapted layouts |
| Mobile (< 768px) | No 3D, minimal parallax, mobile-optimized layouts, touch-friendly interactions, reduced animation |

### Accessibility Requirements for Visual Effects

| Requirement | Implementation |
|---|---|
| Reduced motion | `prefers-reduced-motion`: disable parallax, 3D, complex animations. Use simple fades instead. |
| Color contrast | All text meets WCAG 2.1 AA contrast ratios, even on glass/gradient backgrounds |
| Focus indicators | Visible focus indicators for keyboard navigation |
| Screen reader compatibility | All interactive elements have proper ARIA labels |
| Alternative text | All images have descriptive alt text |
| No seizure triggers | No rapidly flashing or strobing effects |

---

## 29. Technical Architecture Proposal

### Proposed Technology Stack

#### Frontend

| Technology | Purpose | Rationale |
|---|---|---|
| **Next.js 14+** (App Router) | Framework | SSR for SEO, file-based routing, API routes, excellent DX, strong community |
| **React 18+** | UI Library | Component-based architecture, ecosystem, team familiarity |
| **TypeScript** | Language | Type safety, better DX, reduced runtime errors |
| **Tailwind CSS** | Styling | Utility-first approach — the user explicitly included this in the stack. Rapid development, consistent design tokens, responsive utilities |
| **Framer Motion** | Animation | Declarative animations, React integration, gesture support |
| **GSAP** | Advanced Animation | ScrollTrigger for scroll-based animations, timeline control for complex sequences |
| **Lenis** | Smooth Scrolling | Lightweight smooth scrolling library, complements GSAP |
| **Three.js** | 3D Engine | WebGL rendering for selective 3D elements |
| **React Three Fiber** | React + Three.js | Declarative Three.js in React components |
| **Drei** | R3F Helpers | Common Three.js helpers and abstractions |

> **Stack Note:** Tailwind CSS is included per the user's specified tech stack. While vanilla CSS was suggested in the system guidelines, the user explicitly listed Tailwind CSS as the preferred styling solution for this project, and it integrates well with Next.js.

#### Backend

| Technology | Purpose | Rationale |
|---|---|---|
| **NestJS** | Backend Framework | Modular architecture, TypeScript, dependency injection, good for marketplace backends, swagger generation |
| **PostgreSQL** | Database | Relational data model fits marketplace entities well, mature, reliable, complex queries |
| **Prisma** | ORM | Type-safe database access, migrations, works excellently with NestJS + TypeScript |
| **Redis** | Caching | Session management, search caching, rate limiting, availability caching |

#### Infrastructure & Services

| Technology | Purpose | Rationale |
|---|---|---|
| **Razorpay** | Payments | Indian payment methods (UPI, cards, net banking, wallets), good documentation, Route for marketplace payouts |
| **Cloudinary** | Image/Media Storage | Image optimization, transformation, CDN delivery, responsive images |
| **Mapbox** | Maps | Interactive maps for location display, better design customization than Google Maps, developer-friendly |
| **NextAuth.js (Auth.js)** | Authentication | **RECOMMENDED** — Integrates natively with Next.js, supports email/password + social login (Google, etc.), session management, JWT/database sessions, free, well-maintained |

> **Authentication Choice Rationale:** NextAuth.js (Auth.js) is recommended over alternatives because:
> - **Native Next.js integration** — works seamlessly with App Router, Server Components, middleware
> - **No external dependency** — runs within the Next.js application, no separate auth service to manage
> - **Social login built-in** — Google, GitHub, etc. with minimal configuration
> - **Credentials provider** — supports email/password with custom validation
> - **Cost** — free (no per-user pricing like Auth0/Clerk)
> - **Database adapter** — Prisma adapter available for session/account persistence
> 
> **Alternatives considered:**
> - **Clerk** — better DX, pre-built UI components, but adds cost at scale and external dependency
> - **Auth0** — enterprise-grade but overkill and expensive for student startup MVP
> - **Firebase Auth** — good but ties to Google ecosystem, less control
> - **Custom JWT** — full control but significant development effort and security risk for a small team

#### Deployment

| Component | Recommendation | Rationale |
|---|---|---|
| Frontend (Next.js) | **Vercel** | Native Next.js hosting, edge functions, CDN, CI/CD, free tier for development |
| Backend (NestJS) | **Railway** or **Render** | Easy deployment, managed PostgreSQL, affordable for MVP. Alternative: DigitalOcean App Platform |
| Database (PostgreSQL) | **Railway PostgreSQL** or **Supabase** (database only) | Managed, affordable, free tiers available |
| Redis | **Upstash** | Serverless Redis, free tier, works with edge functions |
| Domain & DNS | **Cloudflare** | Free CDN, DNS management, DDoS protection |

> **Deployment Alternative:** If the team prefers a single-cloud approach, **DigitalOcean** or **AWS** (Lightsail for simple, EC2/ECS for scalable) can host everything. But for a student startup MVP, the recommended approach prioritizes: low cost, easy deployment, minimal DevOps overhead.

### Architecture Diagram (Conceptual)

```
┌──────────────────────────────────────────────────────────┐
│                      CLIENT (Browser)                     │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │           Next.js Frontend (React + TS)             │ │
│  │  ┌──────────┐ ┌──────────┐ ┌───────────┐          │ │
│  │  │ Pages /  │ │Components│ │  3D Layer  │          │ │
│  │  │  App     │ │(Tailwind)│ │(R3F/Three) │          │ │
│  │  │ Router   │ │          │ │            │          │ │
│  │  └──────────┘ └──────────┘ └───────────┘          │ │
│  │  ┌──────────┐ ┌──────────┐ ┌───────────┐          │ │
│  │  │ Framer   │ │  GSAP    │ │   Lenis   │          │ │
│  │  │ Motion   │ │ScrollTrig│ │  Smooth   │          │ │
│  │  └──────────┘ └──────────┘ └───────────┘          │ │
│  └─────────────────────────────────────────────────────┘ │
└────────────────────────┬─────────────────────────────────┘
                         │ HTTPS / REST API
                         ▼
┌──────────────────────────────────────────────────────────┐
│                    BACKEND (NestJS)                       │
│                                                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │   Auth   │ │ Booking  │ │ Listing  │ │ Payment  │   │
│  │  Module  │ │  Module  │ │  Module  │ │  Module  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │   User   │ │ Provider │ │  Admin   │ │  Search  │   │
│  │  Module  │ │  Module  │ │  Module  │ │  Module  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │
│  ┌──────────┐ ┌──────────┐                              │
│  │Destinatn │ │ Content  │                              │
│  │  Module  │ │  Module  │                              │
│  └──────────┘ └──────────┘                              │
│                                                          │
│  ┌─────────────────────────┐ ┌─────────────────────────┐│
│  │     Prisma ORM          │ │     Redis Cache         ││
│  └───────────┬─────────────┘ └─────────────────────────┘│
└──────────────┼──────────────────────────────────────────-┘
               │
               ▼
┌──────────────────────┐
│     PostgreSQL       │
│     Database         │
└──────────────────────┘

External Services:
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   Razorpay   │ │  Cloudinary  │ │   Mapbox     │ │   Email      │
│  (Payments)  │ │  (Media)     │ │   (Maps)     │ │  (Transact.) │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
```

### Stack Change Recommendations

| Proposed | Status | Notes |
|---|---|---|
| Next.js | CONFIRMED | No change needed |
| React + TypeScript | CONFIRMED | No change needed |
| Tailwind CSS | CONFIRMED | User-specified |
| Framer Motion | CONFIRMED | Best React animation library |
| GSAP | CONFIRMED | Needed for scroll-based animations. Free for non-commercial; check license for commercial use |
| Lenis | CONFIRMED | Lightweight, purpose-built |
| Three.js / R3F / Drei | CONFIRMED | Industry standard for web 3D |
| NestJS | CONFIRMED | Well-suited for marketplace backend |
| PostgreSQL | CONFIRMED | Right choice for relational marketplace data |
| Prisma | CONFIRMED | Strong TypeScript integration |
| Redis | CONFIRMED | Standard caching layer |
| Cloudinary | CONFIRMED | Good fit. Alternative: imgix, but Cloudinary has better free tier |
| Razorpay | CONFIRMED | Best option for Indian payments |
| Mapbox | CONFIRMED | Better design flexibility than Google Maps. Cost-effective at MVP scale |

> **GSAP License Note:** GSAP is free for general website use but has specific licensing for commercial SaaS. The "No Charge" license should cover TripJugaadu as a marketplace website. If the product evolves into a white-label SaaS, GSAP licensing must be reviewed.

---

## 30. Data Model Proposal

### Entity Overview

> **Note:** This is a conceptual data model. Field types, constraints, and indexes will be defined during implementation.

#### User

| Attribute | Type (Conceptual) | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | Primary key |
| email | String | Yes | Unique, used for authentication |
| passwordHash | String | Yes (if credentials auth) | Hashed, never stored in plain text |
| firstName | String | Yes | |
| lastName | String | Yes | |
| phone | String | No | |
| avatar | String (URL) | No | Profile image |
| role | Enum (TRAVELER, PROVIDER, ADMIN) | Yes | |
| status | Enum (ACTIVE, SUSPENDED, DELETED) | Yes | |
| createdAt | DateTime | Yes | |
| updatedAt | DateTime | Yes | |

**Relationships:** User → has many Trips, Bookings, Wishlists, Reviews

#### Provider

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | Primary key |
| userId | UUID (FK → User) | Yes | Provider is linked to a user account |
| businessName | String | Yes | |
| businessType | Enum (SOLE_PROPRIETOR, COMPANY, PARTNERSHIP) | Yes | |
| providerCategory | Enum (HOTEL, HOSTEL, CAMP, HOMESTAY, ADVENTURE_OPERATOR, GUIDE, RENTAL) | Yes | |
| description | Text | Yes | |
| contactEmail | String | Yes | |
| contactPhone | String | Yes | |
| address | String | Yes | |
| destinationId | UUID (FK → Destination) | Yes | Which destination the provider operates in |
| gstNumber | String | No | |
| bankDetails | JSON | No | Structured bank information for payouts |
| verificationStatus | Enum (PENDING, VERIFIED, REJECTED, SUSPENDED) | Yes | |
| verificationDocuments | JSON/Array | Yes | Uploaded document references |
| verificationNotes | Text | No | Internal admin notes |
| createdAt | DateTime | Yes | |
| updatedAt | DateTime | Yes | |

**Relationships:** Provider → has many Listings, Bookings (received)

#### Destination

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| name | String | Yes | "Rishikesh" |
| slug | String | Yes | "rishikesh" — unique, URL-friendly |
| tagline | String | Yes | Short tagline |
| description | Text | Yes | Full description |
| region | String | Yes | "Uttarakhand" |
| state | String | Yes | |
| country | String | Yes | Default "India" for MVP |
| latitude | Float | Yes | |
| longitude | Float | Yes | |
| altitude | Int | No | In meters, if relevant |
| heroImage | String (URL) | Yes | |
| gallery | Array of URLs | Yes | |
| bestTimeToVisit | JSON | Yes | Structured month-by-month |
| howToReach | JSON | Yes | Air, rail, road information |
| categories | Array of Strings | Yes | ["Adventure", "Spiritual", "Nature"] |
| status | Enum (DRAFT, PUBLISHED, ARCHIVED) | Yes | |
| seoTitle | String | Yes | |
| seoDescription | String | Yes | |
| createdAt | DateTime | Yes | |
| updatedAt | DateTime | Yes | |

**Relationships:** Destination → has many Listings, TravelGuides, Attractions

#### Listing (Polymorphic — covers Activities, Stays, Experiences)

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| providerId | UUID (FK → Provider) | Yes | |
| destinationId | UUID (FK → Destination) | Yes | |
| type | Enum (ADVENTURE, STAY, EXPERIENCE) | Yes | Discriminator |
| title | String | Yes | |
| slug | String | Yes | Unique |
| description | Text | Yes | |
| shortDescription | String | Yes | For cards |
| heroImage | String (URL) | Yes | |
| gallery | Array of URLs | Yes | |
| location | JSON | Yes | { address, latitude, longitude, meetingPoint } |
| basePrice | Decimal | Yes | Starting price (per person or per night) |
| pricingUnit | Enum (PER_PERSON, PER_NIGHT, PER_GROUP, FLAT) | Yes | |
| currency | String | Yes | "INR" |
| tags | Array of Strings | Yes | |
| status | Enum (DRAFT, PENDING_APPROVAL, ACTIVE, SUSPENDED, ARCHIVED) | Yes | |
| cancellationPolicy | JSON | Yes | Structured policy |
| seoTitle | String | No | |
| seoDescription | String | No | |
| createdAt | DateTime | Yes | |
| updatedAt | DateTime | Yes | |

**Adventure-specific fields (when type = ADVENTURE):**

| Attribute | Type | Required | Notes |
|---|---|---|---|
| activityCategory | String | Yes | "Water Sports," "Aerial," "Trekking," etc. |
| duration | String | Yes | "3 hours," "Full day" |
| difficulty | Enum (EASY, MODERATE, CHALLENGING, EXPERT) | Yes | |
| minAge | Int | No | |
| maxAge | Int | No | |
| fitnessRequirements | Text | Yes | |
| experiencePrerequisites | Text | Yes | |
| whatToCarry | Array of Strings | Yes | |
| whatToWear | Array of Strings | Yes | |
| whatsProvided | Array of Strings | Yes | |
| importantInstructions | Array of Strings | Yes | |
| weatherConsiderations | Text | Yes | |
| medicalConsiderations | Text | Yes | |
| minGroupSize | Int | No | |
| maxGroupSize | Int | Yes | |
| variants | JSON | No | Different levels/stretches of same activity |

**Stay-specific fields (when type = STAY):**

| Attribute | Type | Required | Notes |
|---|---|---|---|
| stayType | Enum (HOTEL, HOSTEL, CAMP, HOMESTAY, RESORT) | Yes | |
| amenities | Array of Strings | Yes | |
| checkInTime | String | Yes | |
| checkOutTime | String | Yes | |
| totalRooms | Int | Yes | |
| propertyRules | Array of Strings | No | |

**Relationships:** Listing → has many Availability slots, Bookings, Reviews; Listing → belongs to Provider, Destination

> **Design Decision — Polymorphic vs. Separate Tables:**
> 
> **Option A (Polymorphic):** Single `Listing` table with a `type` discriminator and type-specific JSON fields or nullable columns. Simpler queries, unified listing management.
> 
> **Option B (Separate):** Separate `Activity`, `Stay`, `Experience` tables with a shared `Listing` base. Stricter schema, type-specific validation.
> 
> **RECOMMENDATION:** Use Option A (polymorphic) with Prisma's discriminated union approach for MVP. Keeps the codebase simpler. If type-specific complexity grows significantly, refactor to Option B.
> 
> **This is an architectural decision that should be confirmed in Phase 1.**

#### RoomType (for Stays)

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| listingId | UUID (FK → Listing) | Yes | Must be a STAY listing |
| name | String | Yes | "Deluxe Room," "Dorm Bed" |
| description | Text | Yes | |
| maxOccupancy | Int | Yes | |
| bedType | String | No | |
| amenities | Array of Strings | No | Room-specific amenities |
| photos | Array of URLs | No | |
| basePrice | Decimal | Yes | Per night |
| quantity | Int | Yes | Number of rooms of this type |

**Relationships:** RoomType → belongs to Listing (STAY), has many Availability, Bookings

#### Availability

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| listingId | UUID (FK → Listing) | Yes | |
| roomTypeId | UUID (FK → RoomType) | No | Only for STAY listings |
| date | Date | Yes | |
| timeSlot | String | No | For ADVENTURE (e.g., "09:00," "14:00") |
| totalCapacity | Int | Yes | Max bookable units (rooms or participants) |
| bookedCount | Int | Yes | Currently booked |
| remainingCapacity | Int | Yes | Computed: totalCapacity - bookedCount |
| price | Decimal | No | Date-specific price override |
| status | Enum (AVAILABLE, BLOCKED, SOLD_OUT) | Yes | |

**Relationships:** Availability → belongs to Listing and optionally RoomType

#### Trip

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| userId | UUID (FK → User) | Yes | |
| destinationId | UUID (FK → Destination) | Yes | |
| name | String | No | Optional trip name |
| startDate | Date | Yes | |
| endDate | Date | Yes | |
| travelerCount | Int | Yes | |
| budget | Decimal | No | Optional budget |
| interests | Array of Strings | No | |
| status | Enum (DRAFT, PLANNED, PARTIALLY_BOOKED, FULLY_BOOKED, IN_PROGRESS, COMPLETED, CANCELLED) | Yes | |
| totalEstimatedCost | Decimal | Yes | Computed |
| createdAt | DateTime | Yes | |
| updatedAt | DateTime | Yes | |

**Relationships:** Trip → has many TripItems, belongs to User, Destination

#### TripItem

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| tripId | UUID (FK → Trip) | Yes | |
| listingId | UUID (FK → Listing) | Yes | |
| roomTypeId | UUID (FK → RoomType) | No | For stay items |
| type | Enum (ADVENTURE, STAY, EXPERIENCE) | Yes | |
| date | Date | Yes | Day assigned in itinerary |
| timeSlot | String | No | For activities |
| participants | Int | No | For activities |
| checkIn | Date | No | For stays |
| checkOut | Date | No | For stays |
| estimatedPrice | Decimal | Yes | |
| bookingId | UUID (FK → Booking) | No | Linked after booking |
| status | Enum (PLANNED, BOOKED, CANCELLED) | Yes | |

**Relationships:** TripItem → belongs to Trip, Listing; optionally linked to Booking

#### Booking

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| bookingReference | String | Yes | Human-readable booking ID (e.g., "TJ-2024-XXXXX") |
| userId | UUID (FK → User) | Yes | |
| listingId | UUID (FK → Listing) | Yes | |
| providerId | UUID (FK → Provider) | Yes | |
| roomTypeId | UUID (FK → RoomType) | No | For stay bookings |
| tripId | UUID (FK → Trip) | No | If booked through trip builder |
| type | Enum (ADVENTURE, STAY, EXPERIENCE) | Yes | |
| date | Date | Yes | Activity date or check-in date |
| endDate | Date | No | Check-out date for stays |
| timeSlot | String | No | |
| participants | Int | No | |
| guestDetails | JSON | Yes | Names, ages, emergency contact |
| totalAmount | Decimal | Yes | |
| platformCommission | Decimal | Yes | Platform's commission |
| providerAmount | Decimal | Yes | Amount due to provider |
| status | Enum (PENDING_PAYMENT, CONFIRMED, CANCELLED_BY_USER, CANCELLED_BY_PROVIDER, CANCELLED_BY_PLATFORM, COMPLETED, DISPUTED) | Yes | |
| cancellationPolicy | JSON | Yes | Snapshot of policy at booking time |
| paymentId | UUID (FK → Payment) | No | |
| specialRequests | Text | No | |
| createdAt | DateTime | Yes | |
| updatedAt | DateTime | Yes | |

**Relationships:** Booking → belongs to User, Listing, Provider; has one Payment; optionally linked to Trip

#### Payment

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| bookingId | UUID (FK → Booking) | Yes | |
| userId | UUID (FK → User) | Yes | |
| amount | Decimal | Yes | |
| currency | String | Yes | "INR" |
| status | Enum (INITIATED, PROCESSING, SUCCESSFUL, FAILED, REFUND_INITIATED, REFUND_PROCESSING, REFUND_COMPLETED, REFUND_FAILED) | Yes | |
| gatewayOrderId | String | Yes | Razorpay order ID |
| gatewayPaymentId | String | No | Razorpay payment ID (after success) |
| gatewaySignature | String | No | Razorpay signature (for verification) |
| paymentMethod | String | No | UPI, card, net banking, etc. |
| refundAmount | Decimal | No | |
| refundId | String | No | Razorpay refund ID |
| metadata | JSON | No | Additional gateway data |
| createdAt | DateTime | Yes | |
| updatedAt | DateTime | Yes | |

**Relationships:** Payment → belongs to Booking, User

#### Review (V1)

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| userId | UUID (FK → User) | Yes | |
| listingId | UUID (FK → Listing) | Yes | |
| bookingId | UUID (FK → Booking) | Yes | Must have completed booking to review |
| rating | Int | Yes | 1–5 |
| title | String | No | |
| content | Text | No | |
| photos | Array of URLs | No | |
| providerResponse | Text | No | |
| status | Enum (PUBLISHED, FLAGGED, REMOVED) | Yes | |
| createdAt | DateTime | Yes | |

**Relationships:** Review → belongs to User, Listing, Booking

#### Wishlist

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| userId | UUID (FK → User) | Yes | |
| listingId | UUID (FK → Listing) | No | Wishlisted listing |
| destinationId | UUID (FK → Destination) | No | Wishlisted destination |
| createdAt | DateTime | Yes | |

**Relationships:** Wishlist → belongs to User; references Listing or Destination

#### TravelGuide

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| destinationId | UUID (FK → Destination) | Yes | |
| section | String | Yes | "what_to_carry," "how_to_reach," "local_tips," etc. |
| title | String | Yes | |
| content | Text / JSON | Yes | Structured content |
| source | Enum (PLATFORM, OFFICIAL, USER) | Yes | Content attribution |
| lastVerified | Date | No | Last verification date for official content |
| status | Enum (DRAFT, PUBLISHED) | Yes | |
| createdAt | DateTime | Yes | |
| updatedAt | DateTime | Yes | |

**Relationships:** TravelGuide → belongs to Destination

#### Notification (V1)

| Attribute | Type | Required | Notes |
|---|---|---|---|
| id | UUID | Yes | |
| userId | UUID (FK → User) | Yes | |
| type | Enum (BOOKING_CONFIRMED, BOOKING_CANCELLED, PAYMENT_RECEIVED, PROVIDER_UPDATE, PROMOTIONAL, SYSTEM) | Yes | |
| title | String | Yes | |
| message | Text | Yes | |
| isRead | Boolean | Yes | Default false |
| actionUrl | String | No | Deep link |
| createdAt | DateTime | Yes | |

### Entity Relationship Summary

```
User ─────────┬──► Trip ──────────► TripItem ──► Listing
              │                                    ▲
              ├──► Booking ────────────────────────┘
              │       │
              │       └──► Payment
              │
              ├──► Wishlist ──► Listing / Destination
              │
              ├──► Review ──► Listing
              │
              └──► Notification

Provider ─────┬──► Listing ───────► Availability
              │                     RoomType
              └──► Booking (received)

Destination ──┬──► Listing
              └──► TravelGuide

Admin: Acts on Provider (verification), Listing (moderation), Booking (intervention), Content (management)
```

### Ambiguous Entities Requiring Clarification

| Entity | Ambiguity | Recommendation |
|---|---|---|
| **Package** | Is a "package" a bundled listing (e.g., rafting + camping) or a pricing tier? If bundled, it's a composite listing type that adds complexity. | TBD — Defer packages to V2. MVP handles individual listings only. |
| **Experience vs. Activity** | The line between "Adventure" and "Experience" is blurry (e.g., is a guided trek an adventure or an experience?). | RECOMMENDATION: In data model, both are `Listing` with `type` discriminator. The distinction is a frontend category, not a data model difference. |
| **Coupon / Promo** | Coupon system (codes, rules, limits, stacking) can be complex. | Defer to V2. Not MVP. |
| **Payout** | Provider payout tracking (cycles, amounts, status) needs its own entity. | TBD — Needs detailed design when payout system is built (V1). For MVP, payouts are tracked manually. |
| **SafetyInformation** | Should safety info be a separate entity or fields on Listing? | RECOMMENDATION: Keep as structured fields on Listing (for adventures). Separate entity only if safety info needs independent lifecycle. |
| **CancellationPolicy** | Should policies be predefined templates or freeform per listing? | RECOMMENDATION: Start with freeform JSON in MVP. Move to predefined templates in V1 for consistency. |

---

## 31. API Domain Proposal

### API Domain Structure (NestJS Modules)

| Domain | Base Path | Responsibility |
|---|---|---|
| **Auth** | `/api/auth/*` | Registration, login, password reset, session management |
| **Users** | `/api/users/*` | User profile, preferences, account management |
| **Destinations** | `/api/destinations/*` | Destination CRUD, search, content |
| **Listings** | `/api/listings/*` | Listing CRUD, search, filter, availability |
| **Adventures** | `/api/adventures/*` | Adventure-specific endpoints (could be under listings with type filter) |
| **Stays** | `/api/stays/*` | Stay-specific endpoints (could be under listings with type filter) |
| **Availability** | `/api/availability/*` | Availability check, management |
| **Trips** | `/api/trips/*` | Trip CRUD, trip items, itinerary |
| **Bookings** | `/api/bookings/*` | Booking creation, management, cancellation |
| **Payments** | `/api/payments/*` | Payment initiation, verification, refunds, webhooks |
| **Reviews** | `/api/reviews/*` | Review CRUD, moderation (V1) |
| **Wishlist** | `/api/wishlist/*` | Wishlist management |
| **Search** | `/api/search/*` | Global search across entities |
| **Providers** | `/api/providers/*` | Provider registration, profile, dashboard data |
| **Admin** | `/api/admin/*` | Admin operations (verification, moderation, analytics) |
| **Content** | `/api/content/*` | CMS content (guides, editorial) |
| **Upload** | `/api/upload/*` | File/image upload to Cloudinary |

### API Design Principles

| Principle | Detail |
|---|---|
| RESTful | Standard REST conventions (nouns for resources, HTTP methods for actions) |
| Versioned | `/api/v1/` prefix for API versioning |
| Authenticated | JWT-based authentication for protected endpoints |
| Authorized | Role-based access control (TRAVELER, PROVIDER, ADMIN) |
| Paginated | All list endpoints support pagination (cursor or offset) |
| Filtered | List endpoints support query parameter filtering |
| Validated | Request validation using NestJS pipes + class-validator |
| Documented | Auto-generated Swagger/OpenAPI documentation |
| Error-handled | Consistent error response format |

### Key API Endpoints (Conceptual)

| Endpoint | Method | Access | Purpose |
|---|---|---|---|
| `/api/v1/auth/register` | POST | Public | User registration |
| `/api/v1/auth/login` | POST | Public | User login |
| `/api/v1/destinations` | GET | Public | List destinations |
| `/api/v1/destinations/:slug` | GET | Public | Destination detail |
| `/api/v1/listings` | GET | Public | Search/filter listings |
| `/api/v1/listings/:slug` | GET | Public | Listing detail |
| `/api/v1/availability/:listingId` | GET | Public | Check availability |
| `/api/v1/trips` | POST | Traveler | Create trip |
| `/api/v1/trips/:id/items` | POST | Traveler | Add item to trip |
| `/api/v1/bookings` | POST | Traveler | Create booking |
| `/api/v1/bookings/:id/cancel` | POST | Traveler/Provider | Cancel booking |
| `/api/v1/payments/create-order` | POST | Traveler | Initiate Razorpay order |
| `/api/v1/payments/verify` | POST | System | Verify payment |
| `/api/v1/payments/webhook` | POST | Razorpay | Payment webhook |
| `/api/v1/wishlist` | GET/POST/DELETE | Traveler | Manage wishlist |
| `/api/v1/providers/register` | POST | Public | Provider registration |
| `/api/v1/providers/listings` | GET/POST/PUT | Provider | Manage listings |
| `/api/v1/providers/bookings` | GET | Provider | View bookings |
| `/api/v1/admin/providers` | GET | Admin | View providers |
| `/api/v1/admin/providers/:id/verify` | POST | Admin | Verify provider |
| `/api/v1/admin/listings/:id/approve` | POST | Admin | Approve listing |

---

## 32. Security Requirements

### Authentication Security

| Requirement | Implementation |
|---|---|
| Password hashing | bcrypt with appropriate salt rounds (12+) |
| Session management | JWT with short expiry (15 min access, 7 day refresh) OR database sessions via NextAuth |
| HTTPS only | All traffic over TLS. Redirect HTTP → HTTPS |
| CSRF protection | CSRF tokens for state-changing requests |
| Rate limiting | Login attempts: max 5 per 5 minutes per IP/email |
| Account lockout | Temporary lockout after 10 failed attempts |

### Authorization

| Level | Implementation |
|---|---|
| Role-based access | TRAVELER, PROVIDER, ADMIN roles enforced on every protected endpoint |
| Resource ownership | Users can only access their own bookings, trips, profiles |
| Provider scoping | Providers can only manage their own listings and bookings |
| Admin elevation | Admin-only endpoints behind role guard |

### Payment Security

| Requirement | Implementation |
|---|---|
| PCI DSS compliance | Razorpay handles card data. Platform never stores card numbers. |
| Payment verification | Server-side signature verification (Razorpay signature validation) |
| Webhook validation | Verify Razorpay webhook signatures |
| Idempotency | Payment creation must be idempotent (prevent double charges) |

### Data Security

| Requirement | Implementation |
|---|---|
| Encryption at rest | Database encryption (managed by cloud provider) |
| Encryption in transit | TLS for all connections (API, database, Redis) |
| PII handling | Minimize PII storage. Encrypt sensitive fields (bank details, documents). |
| Document storage | Verification documents stored in encrypted object storage, not public |
| Audit logging | Log admin actions (verify, approve, reject, suspend) with timestamp and actor |

### Application Security

| Requirement | Implementation |
|---|---|
| Input validation | All inputs validated on server (NestJS class-validator) |
| SQL injection prevention | Parameterized queries via Prisma (ORM-level protection) |
| XSS prevention | React's built-in XSS protection + Content Security Policy headers |
| CORS | Strict CORS configuration (allow only frontend domain) |
| Security headers | Helmet.js for NestJS (X-Content-Type-Options, X-Frame-Options, etc.) |
| Dependency scanning | Automated dependency vulnerability scanning (npm audit, Snyk) |
| File upload validation | Type checking, size limits, malware scanning (via Cloudinary) |

---

## 33. Performance Requirements

### Core Web Vitals Targets

| Metric | Target | Page Type |
|---|---|---|
| Largest Contentful Paint (LCP) | < 2.5s | All pages |
| First Input Delay (FID) | < 100ms | All pages |
| Cumulative Layout Shift (CLS) | < 0.1 | All pages |
| Time to First Byte (TTFB) | < 800ms | SSR pages |
| First Contentful Paint (FCP) | < 1.8s | All pages |

### Performance Strategies

#### Lazy Loading

| Asset | Strategy |
|---|---|
| Below-fold images | Intersection Observer / native `loading="lazy"` |
| 3D scenes | Load Three.js bundle + assets only when viewport approaches hero |
| Route components | Next.js dynamic imports for heavy components |
| Map | Load Mapbox only on pages with maps, on user interaction |
| Video | Poster image first, load video on interaction |

#### Code Splitting

| Strategy | Implementation |
|---|---|
| Route-based splitting | Next.js automatic per-page splitting |
| Component-level splitting | `React.lazy()` + `Suspense` for heavy components (3D, map, rich editor) |
| Library splitting | GSAP, Three.js, Mapbox loaded only on pages that need them |
| Vendor splitting | Separate vendor chunk for stable libraries |

#### Image Optimization

| Strategy | Implementation |
|---|---|
| Format | WebP with AVIF progressive enhancement |
| Responsive | `srcset` with multiple resolutions |
| CDN delivery | Cloudinary URL-based transformations (resize, format, quality) |
| Blur placeholder | Low-quality blur-up placeholder during load |
| Size budget | Hero: < 200KB, Card thumbnails: < 50KB, Gallery: < 150KB |

#### 3D Asset Optimization

| Strategy | Implementation |
|---|---|
| Geometry | Low-poly models (< 10K triangles for decorative objects) |
| Textures | Compressed textures (KTX2 format), max 1024x1024 for decorative |
| Loading | Progressive loading — simple geometry first, textures after |
| LOD | Level-of-detail switching based on viewport distance |
| Fallback | CSS-only fallback (gradient, static image) if WebGL unavailable or slow |

#### Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable parallax, 3D animations, complex transitions */
  /* Use simple opacity fades instead */
  /* Disable Lenis smooth scrolling */
  /* Disable GSAP ScrollTrigger animations */
}
```

#### Progressive Enhancement Strategy

| Level | Experience |
|---|---|
| **Level 1 — Base** | Fully functional site with no JavaScript animations, no 3D, standard scrolling. All content accessible. |
| **Level 2 — Enhanced** | CSS animations, hover effects, smooth scrolling (Lenis), page transitions (Framer Motion) |
| **Level 3 — Full** | 3D decorative elements (Three.js), GSAP scroll animations, parallax effects |

Users on older browsers, low-end devices, or with reduced-motion preferences receive Level 1 or 2. Level 3 is progressively added based on device capability detection.

### Backend Performance

| Area | Target |
|---|---|
| API response time (simple queries) | < 200ms |
| API response time (complex queries with joins) | < 500ms |
| Search response time | < 300ms |
| Availability check | < 200ms |
| Database connection pool | Configured per expected concurrency |
| Redis cache hit ratio | > 80% for frequently accessed data |

### Caching Strategy

| Data | Cache Layer | TTL |
|---|---|---|
| Destination data | Redis | 1 hour |
| Listing summaries | Redis | 15 minutes |
| Search results | Redis | 5 minutes |
| Availability | Redis | 1 minute (near-real-time) |
| Static content (guides) | Redis + CDN | 1 hour |
| User session | Redis | Per session config |
| 3D assets | Browser cache + CDN | 30 days |
| Images | CDN (Cloudinary) | CDN-managed |

---

## 34. SEO Requirements

### SEO Strategy

| Page Type | SEO Approach |
|---|---|
| **Destination pages** | Target: "[destination] travel guide," "things to do in [destination]." SSR for content, structured data (Place). |
| **Adventure pages** | Target: "[activity] in [destination]," "[activity] price [destination]." SSR, structured data (Product, TouristAttraction). |
| **Stay pages** | Target: "[stay name] [destination]," "best [stay type] in [destination]." SSR, structured data (Hotel, LodgingBusiness). |
| **Travel guide pages** | Target: "what to carry for [destination]," "[destination] packing list." Long-form content, SSR. |
| **Itinerary pages** | Target: "[N]-day [destination] itinerary." Editorial content, SSR. |
| **Home page** | Target: Brand terms + "travel platform India," "adventure booking." |

### Technical SEO Requirements

| Requirement | Implementation |
|---|---|
| **Server-Side Rendering** | All public pages rendered via Next.js SSR for crawlability |
| **Dynamic metadata** | Per-page `<title>`, `<meta description>`, Open Graph tags generated from content |
| **Structured data (JSON-LD)** | Schema.org markup: `TouristDestination`, `TouristAttraction`, `Hotel`, `Product`, `Review`, `BreadcrumbList` |
| **Canonical URLs** | Self-referencing canonicals on all pages, proper handling for filtered/sorted views |
| **XML Sitemap** | Auto-generated sitemap including all public pages, updated on content changes |
| **Robots.txt** | Allow search engine crawling of public pages, disallow admin/provider portals |
| **Search-friendly URLs** | Human-readable slugs: `/destinations/rishikesh`, `/adventures/white-water-rafting-16km-rishikesh` |
| **Heading hierarchy** | Single `<h1>` per page, logical `<h2>`–`<h6>` structure |
| **Semantic HTML** | Proper `<main>`, `<nav>`, `<article>`, `<section>`, `<aside>` usage |
| **Image alt text** | Descriptive alt text for all images |
| **Page speed** | Core Web Vitals targets (Section 33) — page speed is a ranking factor |
| **Mobile-first** | Responsive design, mobile-first indexing readiness |
| **Open Graph** | `og:title`, `og:description`, `og:image`, `og:url` for social sharing |
| **Twitter Cards** | `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` |

### URL Structure

| Pattern | Example | Notes |
|---|---|---|
| `/destinations/:slug` | `/destinations/rishikesh` | Destination pages |
| `/adventures/:slug` | `/adventures/white-water-rafting-16km-rishikesh` | Activity pages — slug includes destination for uniqueness and SEO |
| `/stays/:slug` | `/stays/riverside-camp-rishikesh` | Stay pages |
| `/guides/:destination-slug` | `/guides/rishikesh` | Guide pages |
| `/guides/:destination-slug/:section` | `/guides/rishikesh/what-to-carry` | Guide sub-pages (V1) |

### Structured Data Templates

**Destination Page:**
```json
{
  "@context": "https://schema.org",
  "@type": "TouristDestination",
  "name": "Rishikesh",
  "description": "...",
  "image": "...",
  "geo": { "@type": "GeoCoordinates", "latitude": "...", "longitude": "..." },
  "touristType": ["Adventure", "Spiritual", "Nature"]
}
```

**Adventure Activity:**
```json
{
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "White Water Rafting 16km",
  "description": "...",
  "image": "...",
  "offers": {
    "@type": "Offer",
    "price": "...",
    "priceCurrency": "INR",
    "availability": "https://schema.org/InStock"
  }
}
```

**Stay:**
```json
{
  "@context": "https://schema.org",
  "@type": "Hotel",
  "name": "...",
  "description": "...",
  "image": "...",
  "address": { "@type": "PostalAddress", ... },
  "priceRange": "₹₹",
  "starRating": { "@type": "Rating", ... }
}
```

---

## 35. Analytics & KPIs

### Acquisition Metrics

| Metric | Definition | Importance |
|---|---|---|
| **Monthly Unique Visitors** | Unique users visiting the platform per month | Core growth indicator |
| **Traffic Sources** | Breakdown by organic, direct, social, paid, referral | Channel effectiveness |
| **Destination Search Volume** | Number of searches for destinations | Demand signal |
| **Search-to-Detail Rate** | % of searches that lead to a destination/listing detail page view | Search relevance |
| **Landing Page Bounce Rate** | % of users who leave after viewing only one page | Content quality signal |

### Engagement Metrics

| Metric | Definition | Importance |
|---|---|---|
| **Destination Page Views** | Number of destination page views | Content engagement |
| **Activity Detail Views** | Number of activity detail page views | Purchase intent signal |
| **Stay Detail Views** | Number of stay detail page views | Purchase intent signal |
| **Average Session Duration** | Average time spent on the platform per session | Engagement depth |
| **Wishlist Additions** | Number of items added to wishlists | Intent signal |
| **Trip Builder Starts** | Number of trips created in the trip builder | Planning engagement |
| **Trip Builder Completion Rate** | % of started trips that reach the "review" step | Builder usability |
| **Travel Confidence Engagement** | Views/clicks on "what to carry," "what to wear," preparation sections | Differentiator validation |

### Booking Metrics

| Metric | Definition | Importance |
|---|---|---|
| **Checkout Starts** | Number of users entering the checkout flow | Bottom-funnel signal |
| **Booking Conversion Rate** | % of checkout starts that result in confirmed bookings | Revenue efficiency |
| **Average Booking Value (ABV)** | Average transaction value | Revenue per booking |
| **Gross Merchandise Value (GMV)** | Total value of bookings processed | Total marketplace volume |
| **Platform Revenue** | Commission + fees earned | Core business metric |
| **Booking Cancellation Rate** | % of confirmed bookings cancelled | Service quality / policy signal |
| **Refund Rate** | % of bookings resulting in refund | Quality / trust signal |
| **Category Mix** | Booking split by adventure vs. stay vs. experience | Business diversification |

### Marketplace Health Metrics

| Metric | Definition | Importance |
|---|---|---|
| **Active Providers** | Providers with at least 1 active listing | Supply health |
| **Active Listings** | Total live listings | Inventory health |
| **Listings per Destination** | Average listings per published destination | Depth metric |
| **Provider Onboarding Time** | Average time from registration to first live listing | Provider experience |
| **Provider Booking Rate** | % of providers receiving at least 1 booking per month | Provider satisfaction signal |
| **Average Provider Revenue** | Average monthly revenue per active provider | Provider value |
| **Provider Churn Rate** | % of providers who deactivate per quarter | Supply retention |

### Product Quality Metrics (V1+)

| Metric | Definition | Importance |
|---|---|---|
| **Average Review Rating** | Average star rating across reviews | Quality signal |
| **Review Coverage** | % of completed bookings with reviews | Review system health |
| **Support Ticket Volume** | Number of user/provider support requests | Operational health |
| **Dispute Rate** | % of bookings resulting in disputes | Trust signal |

### Analytics Implementation (MVP)

| Phase | Tooling |
|---|---|
| MVP | Google Analytics 4 (or Plausible for privacy-friendly alternative) + basic event tracking |
| V1 | Custom event tracking for marketplace-specific metrics (booking funnel, provider metrics) |
| V2 | Dashboard integration (Metabase or custom admin analytics) |

### KPI Targets (To Be Set After Pilot)

> **Note:** KPI targets should be set after initial pilot launch with Rishikesh. Setting arbitrary targets before launch is guesswork.
> 
> **ASSUMPTION:** Targets will be defined 30 days after MVP launch based on baseline data.

