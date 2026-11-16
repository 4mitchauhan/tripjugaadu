# TRIPJUGAADU — PHASE 2 MASTER TECHNICAL ARCHITECTURE

## 1. Executive Summary
This document serves as the Phase 2 Technical Architecture and Engineering Foundation Blueprint for TripJugaadu. It translates the product requirements (Phase 0) and the immersive UI/UX system (Phase 1) into a practical, secure, and scalable technical foundation. The architecture employs a **Modular Monolith** approach, prioritizing simplicity and maintainability for the MVP while establishing clear domain boundaries to allow for future microservice extraction when scale demands.

## 2. Phase 0/1 Alignment
- **Phase 0 Alignment**: This architecture fully supports the Discover → Understand → Prepare → Plan → Book → Travel journey. Core entities (Destinations, Adventures, Stays, Experiences, Itineraries, Bookings) are modeled as distinct but related domains.
- **Phase 1 Alignment**: The frontend architecture supports the "70% Reference / 30% Product DNA" aesthetic. It provisions for complex motion (GSAP/Framer Motion) and 3D capabilities (Three.js/R3F) while ensuring these immersive elements remain progressively enhanced and do not block core transactional flows.

## 3. Architecture Principles
- **START SIMPLE → DESIGN MODULARLY → SCALE WHEN JUSTIFIED.**
- **Backend**: Authoritative source of truth. No business logic in the UI.
- **Frontend**: Stateless UI rendering, optimized for SEO, mobile-first performance, and immersive interactions.
- **Transactions**: Critical paths (booking, inventory, payments) must be strictly transactional and concurrent-safe.
- **Progressive Enhancement**: 3D and heavy animations must never block core booking paths or degrade low-end device performance.

## 4. Technology Stack
- **Frontend**: Next.js, React, TypeScript, Tailwind CSS (RECOMMENDED)
- **Frontend Motion**: Framer Motion, GSAP (RECOMMENDED)
- **3D**: Three.js, React Three Fiber (OPTIONAL/PROGRESSIVE)
- **Backend**: NestJS, TypeScript (RECOMMENDED)
- **Database**: PostgreSQL (RECOMMENDED), Prisma ORM (RECOMMENDED)
- **Cache**: Redis (RECOMMENDED)
- **Payments**: Razorpay (RECOMMENDED for India)
- **Maps**: Mapbox (RECOMMENDED)
- **Object Storage**: S3-Compatible (AWS S3 or Cloudflare R2) (RECOMMENDED)
- **Authentication**: JWT with HttpOnly Secure Cookies via NextAuth/Nest Auth (RECOMMENDED)

*Note: React/Next.js/NestJS/Postgres is chosen for its strong TypeScript ecosystem, allowing end-to-end type safety across the modular monolith.*

## 5. Technology Decision Matrix

| Layer | Technology | Status | Purpose | Why | Alternative |
|------|------------|--------|---------|-----|-------------|
| Frontend | Next.js | RECOMMENDED | Web App & SSR | SEO, fast initial load, React ecosystem | Vite SPA (Worse SEO) |
| Styling | Tailwind CSS | RECOMMENDED | Utility CSS | Rapid dev, strict design system translation | Vanilla CSS modules |
| Backend | NestJS | RECOMMENDED | API & Business Logic | Enforces modularity, strict TS, dependency injection | Express (Too loose) |
| Database | PostgreSQL | RECOMMENDED | Primary Data Store | Relational integrity for bookings and inventory | MongoDB (No ACID guarantees) |
| ORM | Prisma | RECOMMENDED | DB Access & Migrations | Excellent TS typing, fast iteration | TypeORM / Drizzle |
| Cache | Redis | RECOMMENDED | Rate limiting, transient data | Fast in-memory operations | Memcached |
| Auth | Secure HttpOnly JWT | RECOMMENDED | Session Management | Stateless but secure, immune to basic XSS | Stateful Sessions |
| Payments | Razorpay | RECOMMENDED | Indian Payment Gateway | Best Indian market support and webhooks | Stripe |
| Storage | S3-Compatible | RECOMMENDED | Media Assets | Cheap, infinitely scalable blob storage | Cloudinary (Higher cost) |
| Maps | Mapbox | RECOMMENDED | Location & Routing | Custom map styling for dark aesthetic | Google Maps |
| Motion | Framer Motion + GSAP | RECOMMENDED | Immersive UI | Framer for UI state, GSAP for scroll/sequence | CSS only |
| 3D | React Three Fiber | OPTIONAL | WebGL elements | Declarative 3D integrated with React | Vanilla Three.js |

## 6. High-Level Architecture
```text
[ USER (Browser/Mobile) ]
        ↓ (HTTPS)
[ CDN / EDGE (Vercel/Cloudflare) ]
        ↓
[ NEXT.JS FRONTEND (SSR / SSG / CSR) ]
        ↓ (REST API / HTTPS)
[ NESTJS BACKEND (Modular Monolith) ]
        ↓
    ( Domain Modules: Auth, Users, Inventory, Bookings, Payments )
        ↓
[ POSTGRESQL (Source of Truth) ] ↔ [ REDIS (Cache / Rate Limiter) ]
        ↓
[ EXTERNAL SERVICES (Razorpay, Mapbox, S3, Email) ]
```
- **CDN**: Serves static assets, Next.js optimized images, and cached pages.
- **Next.js**: Handles SEO, routing, state, and UI.
- **NestJS API**: Houses all business logic, authorization, and validations.
- **Postgres**: ACID compliant, handling complex relational queries.

## 7. Domain Architecture
Modules map to distinct business domains within the NestJS monolith. 
1. **Identity Module**: (Auth, Users, Profiles). Manages access, tokens, and user profiles.
2. **Catalog Module**: (Destinations, Locations, Activities, Adventures, Experiences, Hotels, Rooms). Read-heavy, heavily cached. Owns product definitions.
3. **Inventory Module**: (Providers, Listings, Availability, Pricing). Owns date-specific capacity and pricing rules.
4. **Planning Module**: (Trips, Itineraries, Trip Items, Wishlist). Owns the user's mutable Trip Builder state.
5. **Commerce Module**: (Bookings, Payments, Coupons). Critical transactional boundary. Owns state machines for reservations and money.
6. **Content Module**: (Travel Guides, Packing Guides, Reviews, Media). 
7. **Platform Module**: (Notifications, Search, Admin, Analytics).

## 8. Frontend Architecture
Next.js App Router topology:
- `(public)`: `/`, `/explore`, `/destinations/[id]`, `/adventures/[id]` — Heavily cached, statically generated where possible for SEO.
- `(auth)`: `/login`, `/register`, `/recovery` — CSR/SSR mixed.
- `(user)`: `/dashboard`, `/trip-builder`, `/itinerary`, `/bookings` — Protected routes, CSR/SSR mixed, requires active session.
- `(provider)`: `/provider/*` — Protected, provider role required.
- `(admin)`: `/admin/*` — Protected, admin role required.

## 9. Backend Architecture
Following strict layered architecture in NestJS:
`CONTROLLER` (HTTP, Input validation via class-validator, Auth Guards)
  ↓
`SERVICE` (Business rules, orchestrates other services)
  ↓
`REPOSITORY/PRISMA` (Database operations, Transactions)

## 10. Folder Structure
**Frontend (`apps/web/src/`)**:
```
app/          # Next.js App Router (pages & layouts)
components/   # Shared UI components (buttons, cards, nav)
features/     # Domain-specific components (e.g., features/trip-builder, features/booking)
hooks/        # Shared React hooks
lib/          # 3rd party wrappers (axios, mapbox)
types/        # TS interfaces
styles/       # Global CSS / Design tokens
animations/   # GSAP/Framer variants
```

**Backend (`apps/api/src/`)**:
```
main.ts       # Entry point
modules/      # Domain modules
  ├── auth/
  ├── catalog/
  ├── inventory/
  ├── commerce/
  └── planning/
common/       # Interceptors, filters, guards, decorators
prisma/       # Schema and migrations
```

## 11. State Management
- **Local State** (`useState`, `useReducer`): UI toggles, temporary form inputs.
- **Server State** (`TanStack Query`): Data fetched from API (destinations, bookings). Handles caching, refetching, and loading states automatically.
- **Global State** (`Zustand`): Complex client-side features spanning multiple components (e.g., the active Trip Builder draft state).
- **URL State** (Search Params): Filters, search queries, pagination, active tabs.

## 12. API Architecture
RESTful API, prefixed with `/api/v1/`.
- `GET /api/v1/destinations` (Public)
- `POST /api/v1/trips` (Protected: User)
- `POST /api/v1/bookings/:id/checkout` (Protected: User)
- `PATCH /api/v1/inventory/:id/availability` (Protected: Provider)

Pagination via limit/offset or cursors. Filtering via query params (`?category=adventure&priceLte=5000`).

## 13. API Standards
**Standard Success Response**:
```json
{
  "status": "success",
  "data": { ... },
  "meta": { "page": 1, "total": 100 } // if collection
}
```
**Standard Error Response**:
```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Invalid input provided.",
    "details": ["End date must be after start date"]
  }
}
```
HTTP Status codes: 200 (OK), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 403 (Forbidden), 404 (Not Found), 409 (Conflict/Race condition), 500 (Internal Error).

## 14. Authentication
- **Method**: Email/Password + future OAuth.
- **Session**: HttpOnly, Secure, SameSite=Strict cookies containing a short-lived JWT.
- **Security**: Argon2 or bcrypt for password hashing. Rate limiting on `/login` and `/register`. No tokens in `localStorage`.

## 15. Authorization/RBAC
Roles: `USER`, `PROVIDER`, `ADMIN`.
Enforced via NestJS Guards at the Controller level.
- `USER`: Can manage resources where `resource.userId === currentUser.id`.
- `PROVIDER`: Can manage inventory where `listing.providerId === currentUser.id`.
- `ADMIN`: Global access.

## 16. Database Architecture
**PostgreSQL**. Key entities:
- `User`: id, email, password_hash, role
- `Destination`: id, slug, name, description, region
- `Listing` (Adventures/Stays/Experiences): id, type, provider_id, destination_id, title, base_price
- `Availability`: id, listing_id, date, capacity, price_override
- `Booking`: id, user_id, status, total_amount, payment_id
- `BookingItem`: id, booking_id, listing_id, date, quantity, price_snapshot
- `Trip`: id, user_id, title, status (draft/saved)
- `ItineraryItem`: id, trip_id, listing_id, day, order

## 17. Database Relationships
- `User (1) -> (M) Booking`
- `Provider (1) -> (M) Listing`
- `Destination (1) -> (M) Listing`
- `Listing (1) -> (M) Availability`
- `Booking (1) -> (M) BookingItem`
- `BookingItem (M) -> (1) Listing`
- `Trip (1) -> (M) ItineraryItem`

## 18. Data Ownership
- **Commerce Module** owns `Booking` and `Payment`.
- **Inventory Module** owns `Availability` and `Listing`.
- **Planning Module** owns `Trip` and `Itinerary`.
*No direct database updates across module boundaries.* A Booking updates availability via an internal service call to the Inventory Module.

## 19. Inventory & Availability
Handles double bookings and race conditions.
When a user begins checkout:
1. Fetch `Availability` for dates using a database transaction with row-level locking (`SELECT ... FOR UPDATE`).
2. If `capacity >= requested`, decrement capacity and create `Booking` in `PENDING` status.
3. If checkout expires or fails, a background job (or webhook failure) restores capacity.

## 20. Booking State Machine
- `DRAFT`: Local cart / pre-checkout.
- `PENDING`: Inventory locked, awaiting payment. (Expires in 15 mins).
- `PAYMENT_PENDING`: Gateway processing.
- `CONFIRMED`: Payment successful.
- `FAILED`: Payment failed. Inventory released.
- `EXPIRED`: User abandoned checkout. Inventory released.
- `CANCELLED`: User/Admin cancelled post-confirmation.

## 21. Payment Architecture
**Razorpay**.
1. Backend creates Razorpay Order (`rp_order_id`) linked to `Booking`.
2. Frontend opens Razorpay Checkout using `rp_order_id`.
3. User pays.
4. Razorpay sends Webhook (`payment.captured`) to Backend.
5. Backend verifies webhook signature using Razorpay secret.
6. Backend updates `Payment` and transitions `Booking` to `CONFIRMED`.
*Security*: Frontend success callbacks are strictly visual. The database state is ONLY updated via the verified webhook.

## 22. Trip Builder Architecture
Trip Builder state is **TEMPORARY BUILDER STATE** (Local/Global Zustand state in the browser) until the user explicitly saves or books it.
When saved, it serializes to the `Trip` and `ItineraryItem` tables.
Operations: Add item, remove item, change dates, recalculate budget.

## 23. Itinerary Architecture
Structured hierarchically: `Trip -> Day -> Timeblock/Item`.
Supports linking to existing `BookingItem` IDs to show confirmed vs pending activities on the timeline. Allows free-text items (e.g., "Relax at hotel").

## 24. Search Architecture
MVP: PostgreSQL Full-Text Search (`tsvector`) on Destinations and Listings.
Filters (price, category, rating) applied via standard indexed SQL queries.
*Future*: Elasticsearch/Meilisearch only if SQL performance degrades significantly at scale.

## 25. Media Architecture
Direct upload to S3/Cloudflare R2 via Presigned URLs.
PostgreSQL only stores the URL string.
Validation: Backend generates a signed URL only for valid MIME types and file sizes. Next.js `next/image` handles responsive resizing and WebP conversion at the edge.

## 26. 3D / WebGL Architecture
Stack: React Three Fiber (R3F).
**Status: OPTIONAL.** 
- Must be wrapped in `React.lazy` and `Suspense`.
- Uses device capability detection. If low memory or WebGL is unsupported, rendering falls back to static high-res images.
- Core booking flows must NEVER rely on 3D interaction.

## 27. Motion Architecture
- **Framer Motion**: Micro-interactions, page transitions, modal popups.
- **GSAP**: Scroll-triggered storytelling (e.g., Parallax hero, complex pinned sections).
- Respects `prefers-reduced-motion` media queries globally.

## 28. Caching / Redis
**Redis uses:**
- Rate limiting (Auth endpoints).
- Caching slow catalog queries (`GET /api/v1/destinations`).
**NEVER CACHE**:
- `Availability` (Must remain strictly fresh to prevent overbooking).
- `Pricing` calculations.
- `Booking` status.

## 29. Background Jobs
MVP: Cron jobs within NestJS (`@nestjs/schedule`).
Uses:
- Expiring `PENDING` bookings after 15 minutes and restoring inventory.
- Sending transactional emails.
*Future*: Redis-based queues (BullMQ) if job volume spikes.

## 30. Security Architecture
- **XSS**: Handled by React escaping + CSP headers.
- **CSRF**: Mitigated by SameSite=Strict cookies + explicit CORS policies.
- **Auth**: Passwords hashed with Argon2. 
- **SQLi**: Prevented by Prisma ORM parameterized queries.
- **Rate Limiting**: Enforced via Redis on NestJS.
- **File Uploads**: Pre-signed URLs with size/MIME limits on the bucket.

## 31. Privacy/Data Protection
- Data Minimization: Only request essential PII.
- No sensitive payment data (CC numbers) touches our servers; completely offloaded to Razorpay.
- Passwords are never logged.

## 32. Observability
MVP:
- Pino logger in NestJS.
- Sentry (RECOMMENDED) for error tracking (Frontend & Backend).
- Basic health check endpoints (`/api/v1/health`).

## 33. Testing Strategy
- **Unit Tests** (Vitest/Jest): Complex business logic (Pricing calculators, Trip builders).
- **Integration Tests**: Database queries and module interactions.
- **E2E Tests** (Playwright - RECOMMENDED): Critical flows (Login, Search, Add to Trip, Checkout, Payment Webhook Simulation).

## 34. Environment Strategy
`LOCAL`, `STAGING`, `PRODUCTION`.
Secrets (DB URL, Razorpay Keys, JWT Secrets) managed via `.env` and platform environment variables. No secrets committed to Git.

## 35. Repository Strategy
**Monorepo** (Turborepo RECOMMENDED).
```text
tripjugaadu/
├── apps/
│   ├── web/ (Next.js)
│   └── api/ (NestJS)
├── packages/
│   ├── types/ (Shared TS interfaces)
│   ├── config/ (ESLint, TSConfig)
└── package.json
```
Allows sharing TypeScript definitions (e.g., API responses) between frontend and backend.

## 36. Git Strategy
- `main` branch: Production ready.
- Feature branches (`feat/auth`, `fix/booking-bug`).
- PRs require approval and passing CI.
- Conventional Commits.

## 37. CI/CD
GitHub Actions (RECOMMENDED).
Workflow: `Lint -> Typecheck -> Unit Tests -> Build -> Deploy`.
Deployment blocked if any step fails.

## 38. Code Quality
- Strict TypeScript (`"strict": true`).
- Prettier for formatting.
- ESLint for linting (no unused vars, explicit boundaries).
- Enforced module boundaries in Backend (No circular dependencies).

## 39. SEO Architecture
- Next.js App Router for server-rendered HTML.
- Dynamic meta tags generated on the server for `/destinations/[id]`.
- Semantic HTML (H1, H2) and `alt` tags on all media.
- `robots.txt` and `sitemap.xml` generated automatically.

## 40. Performance Architecture
- Next.js Image Optimization.
- Route-level code splitting.
- Heavy assets (3D, GSAP) lazy-loaded.
- PostgreSQL indexes on heavily queried fields.

## 41. Mobile Architecture
Responsive CSS (Tailwind). Touch-friendly tap targets (min 44px). Disabling heavy WebGL/Parallax on mobile devices to preserve battery and frame rates.

## 42. External Services

| Service | Purpose | MVP | Required? | Alternative | Risk |
|---------|---------|-----|-----------|-------------|------|
| Razorpay | Payments | Yes | Yes | Stripe | API downtime |
| Mapbox | Custom Maps | Yes | Yes | Google Maps | High usage cost |
| AWS S3 | Media Storage | Yes | Yes | Cloudinary | Misconfigured public access |
| Resend | Emails | Yes | Yes | SendGrid | Spam flagging |

## 43. Frontend/Backend Data Flows
**Example: Booking Flow**
`UI` -> `POST /checkout` -> `NestJS Controller` -> `CommerceService` -> `InventoryService` (Locks dates, decrements capacity) -> `CommerceService` (Creates PENDING booking, creates Razorpay Order) -> `API Response` -> `UI` (Opens Razorpay Modal).

## 44. Business Logic Boundaries
- UI contains **Display Logic** (e.g., formatting dates).
- Backend Services contain **Business Logic** (e.g., verifying if a date is bookable).
- NEVER trust frontend calculations for totals or prices.

## 45. Database Indexing
- `Destination.slug` (Unique, B-Tree) - Fast SEO routing.
- `Listing.destination_id` (B-Tree) - Filtering activities by place.
- `Availability.date` (B-Tree) - Date range queries.
- `Booking.user_id` (B-Tree) - User dashboard loading.
- `User.email` (Unique, B-Tree) - Login lookups.

## 46. Transaction Strategy
Strict Database Transactions (`$transaction` in Prisma) required for:
1. Booking creation + Inventory reservation.
2. Webhook processing (Payment update + Booking status update).
*Why*: Ensures partial failures do not leave the database in an inconsistent state (e.g., money recorded but booking failed).

## 47. Concurrency Strategy
Row-level locking (`SELECT FOR UPDATE`) on `Availability` rows during the transaction where capacity is checked and decremented. Prevents User A and User B from booking the last slot simultaneously.
Idempotency keys on Webhooks to prevent duplicate processing of the same payment event.

## 48. Scalability Strategy
- **MVP**: Single monolithic API instance, single Postgres instance.
- **V1**: Multiple API instances behind load balancer, Redis caching for heavy queries.
- **FUTURE**: Read-replicas for Postgres, Elasticsearch for complex search, extraction of Commerce/Inventory into microservices.

## 50. Future Microservice Boundaries
Clear seams exist for extraction:
- `Search Service`: Once full-text SQL is too slow.
- `Payment/Commerce Service`: If transaction volume requires isolated scaling and strict compliance separation.
*Rule: Do not extract until MVP proves product-market fit.*

## 51. Project Directory Structure
```
tripjugaadu/
├── apps/
│   ├── web/               # Next.js Frontend
│   └── api/               # NestJS Backend
├── packages/
│   ├── types/             # Shared Interfaces
│   └── config/            # Shared ESLint/TSConfig
├── docs/                  # Architecture & API Specs
├── .github/               # CI/CD Workflows
└── package.json
```

## 52. Documentation Strategy
- `README.md`: Setup instructions.
- `/docs/architecture.md`: System design (This document).
- `/docs/api.md` or Swagger UI integrated into NestJS.
- `/docs/database.md`: ER Diagram and schema explanations.

## 53. Local Development Strategy
- **Frontend/Backend**: Run natively via Node.js (`npm run dev` via Turborepo).
- **Infrastructure (Postgres/Redis)**: Run locally via `docker-compose.yml`.
*Why*: Keeps Node.js debugging fast and native, while standardizing database versions.

## 54. Technical Risks

| Risk | Impact | Mitigation | Phase |
|------|--------|------------|-------|
| Double Booking | High (Customer trust) | Row-level locking & DB transactions | MVP |
| WebGL Performance | Medium (UX drop) | Device detection & static fallbacks | MVP |
| Webhook Failures | High (Lost money status) | Idempotent retry handlers, reconciliation cron | MVP |
| Scope Creep | High (Delayed launch) | Stick strictly to Phase 0 requirements | MVP |

## 55. ADRs (Architecture Decision Records)
- **ADR-001**: Modular Monolith over Microservices to ensure rapid MVP iteration.
- **ADR-002**: Next.js App Router for SEO and server-rendering.
- **ADR-003**: NestJS to enforce strict separation of concerns and dependency injection.
- **ADR-004**: PostgreSQL as the source of truth for ACID compliance.
- **ADR-005**: Strict separation of 3D/Motion from core booking logic to ensure accessibility and performance.

## 56. MVP / V1 / FUTURE Classification
- **MVP**: Monolith, Postgres search, basic Trip Builder, Razorpay payments, standard email auth.
- **V1**: Advanced filtering, OAuth (Google/Apple), automated refunds.
- **FUTURE**: Microservices, Elasticsearch, Global payment gateways.

## 57. Phase 3 Handoff
Phase 3 Engineering Checklist:
- [ ] Initialize Turborepo (web + api + packages).
- [ ] Setup Next.js with Tailwind and Phase 1 Design Tokens.
- [ ] Setup NestJS with Prisma and PostgreSQL connection.
- [ ] Define initial Prisma Schema (Users, Listings, Availability, Bookings).
- [ ] Implement robust error handling and API response interceptors in NestJS.
- [ ] Setup Docker Compose for local Postgres + Redis.
- [ ] Implement Auth module (JWT, Login, Register).
- [ ] Configure CI/CD pipeline.

## 58. Final Architecture Audit
- **CHECK 1 (PRODUCT)**: Supports full user journey. 
- **CHECK 2 (UI)**: Next.js + Framer Motion supports all Phase 1 layouts.
- **CHECK 4 (BOOKING)**: Strict state machine and transactional locks guarantee consistency.
- **CHECK 5 (PAYMENT)**: Server-side webhook verification enforces security.
- **CHECK 6 (SECURITY)**: AuthZ handled strictly via NestJS Guards.
- **CHECK 8 (MOBILE)**: WebGL isolation ensures mobile performance.
- **CHECK 14 (DATA CONSISTENCY)**: Modular domain boundaries establish strict data ownership.

## 59. Final Decision Table

| Decision | Status | Reason | Alternative | Phase |
|----------|--------|--------|-------------|-------|
| Modular Monolith | CONFIRMED | Speed of development, simple deployment | Microservices | MVP |
| Next.js | CONFIRMED | SEO and UI rendering | Vite SPA | MVP |
| NestJS | CONFIRMED | Enforces backend modularity | Express | MVP |
| PostgreSQL | CONFIRMED | ACID compliance for commerce | MongoDB | MVP |
| Razorpay | RECOMMENDED | Superior Indian market support | Stripe | MVP |
| React Three Fiber | OPTIONAL | Immersive enhancements | Vanilla Three.js | MVP |
| Monorepo (Turbo) | RECOMMENDED | Code sharing (types/configs) | Multi-repo | MVP |
