# TRIPJUGAADU — PHASE 2 TECHNICAL ARCHITECTURE & ENGINEERING FOUNDATION

## 1. Executive Summary
This document provides the complete, practical, secure, scalable, and implementation-ready technical architecture for Phase 2 of the TripJugaadu platform. It translates Phase 0 (Product Requirements) and Phase 1 (UI/UX) into a Modular Monolith engineering blueprint suitable for Phase 3 implementation, ensuring cost-consciousness, high performance, and robust security without over-engineering the MVP.

## 2. Phase 0/1 Alignment
- **Phase 0:** The architecture natively supports the core user journey (Discover → Understand → Prepare → Plan → Book → Travel). All required entities (Destinations, Adventures, Hotels, Experiences, Trips, Wishlists, Bookings) are represented as distinct domains.
- **Phase 1:** The architecture provisions for the dark, cinematic, 70% reference-inspired visual language, ensuring that the technology stack (Next.js, Framer Motion, GSAP, React Three Fiber) can execute complex motion and 3D requirements while remaining performant and SEO-friendly.

## 3. Architecture Principles
- **START SIMPLE → DESIGN MODULARLY → SCALE WHEN JUSTIFIED.**
- The initial architecture is a **MODULAR MONOLITH**. 
- Backend modules map strictly to business domains to allow future extraction into microservices if scaling demands it.
- Never over-engineer for hypothetical scale.
- Maintain a single source of truth for critical paths (Booking, Payment, Inventory).

## 4. Technology Stack
- **FRONTEND**: Next.js (App Router), React, TypeScript, Tailwind CSS (RECOMMENDED)
- **FRONTEND MOTION**: Framer Motion, GSAP, Lenis (RECOMMENDED)
- **3D**: Three.js, React Three Fiber, Drei (OPTIONAL/PROGRESSIVE)
- **BACKEND**: NestJS, TypeScript (RECOMMENDED)
- **DATABASE**: PostgreSQL, Prisma ORM (RECOMMENDED)
- **CACHE**: Redis (RECOMMENDED)
- **PAYMENTS**: Razorpay (CONFIRMED for India)
- **MAPS**: Mapbox (RECOMMENDED)
- **OBJECT STORAGE**: S3-compatible (AWS S3 or Cloudflare R2) (RECOMMENDED)
- **AUTHENTICATION**: Secure HttpOnly Session Cookies via JWT (RECOMMENDED)
- **EMAIL**: Resend or SendGrid (RECOMMENDED)
- **DEPLOYMENT**: Vercel for Frontend (RECOMMENDED), Managed Container (e.g., Render/AWS ECS) for Backend (RECOMMENDED)

## 5. Technology Decision Matrix

| Layer | Technology | Status | Purpose | Why | Alternative |
|------|------------|--------|---------|-----|-------------|
| Frontend | Next.js | RECOMMENDED | Web Application | SSR for SEO, App Router, React ecosystem | Vite SPA |
| Styling | Tailwind CSS | RECOMMENDED | CSS Framework | Rapid implementation of Phase 1 design tokens | Vanilla CSS |
| Backend | NestJS | RECOMMENDED | API & Business Logic | Enforces strict modularity and TypeScript | Express |
| Database | PostgreSQL | RECOMMENDED | Primary Datastore | ACID compliance required for commerce | MongoDB |
| ORM | Prisma | RECOMMENDED | Database Access | Excellent TS integration, migrations | TypeORM |
| Cache | Redis | RECOMMENDED | Rate Limiting & Cache | Fast in-memory data store | Memcached |
| Auth | HttpOnly JWT | RECOMMENDED | Authentication | Secure, stateless session management | Stateful Session |
| Payments | Razorpay | RECOMMENDED | Payment Gateway | Best ecosystem for Indian transactions | Stripe |
| Storage | S3-Compatible | RECOMMENDED | Media Storage | Cost-effective blob storage for assets | Cloudinary |
| Maps | Mapbox | RECOMMENDED | Map Provider | Superior dark-mode custom styling capabilities | Google Maps |
| Search | Postgres FTS | RECOMMENDED | Search Engine | Sufficient for MVP, avoids extra infra | Elasticsearch |
| CI/CD | GitHub Actions | RECOMMENDED | Automation | Integrated with repo, highly configurable | GitLab CI |
| 3D | React Three Fiber | OPTIONAL | WebGL Integration | Declarative 3D within React | Vanilla Three.js |
| Motion | Framer + GSAP | RECOMMENDED | Immersive UI | Best-in-class animation orchestration | CSS Transitions |

## 6. High-Level Architecture
```text
[ USER (Browser / Mobile) ]
           ↓
[ CDN / EDGE (Vercel / Cloudflare) ] (Caches static assets & SSG pages)
           ↓
[ NEXT.JS WEB APPLICATION ] (Handles SSR, Routing, UI State)
           ↓ (HTTPS / REST)
[ NESTJS MODULAR BACKEND ] (Authoritative API)
           ├── [ AUTH MODULE ]
           ├── [ INVENTORY MODULE ]
           ├── [ COMMERCE MODULE ]
           └── [ PLANNING MODULE ]
           ↓
[ POSTGRESQL ] (Source of Truth) ↔ [ REDIS ] (Rate limits, transient cache)
           ↓
[ EXTERNAL SERVICES ] (Razorpay, Mapbox, S3)
```
- **Next.js** handles the visual presentation and SEO.
- **NestJS** enforces business rules, handles transactions, and verifies payments.
- **PostgreSQL** safely stores all authoritative state.

## 7. Domain Module Architecture
1. **Identity Module** (Auth, Users, Profiles)
   - Responsibility: Authentication, RBAC, profiles.
2. **Catalog Module** (Destinations, Locations, Attractions, Travel Guides, Packing Guides)
   - Responsibility: Read-heavy public discovery data.
3. **Inventory Module** (Providers, Listings, Availability, Pricing, Activities, Adventures, Experiences, Hotels, Rooms)
   - Responsibility: Provider capacity, date availability, and pricing engines.
4. **Commerce Module** (Bookings, Payments, Coupons)
   - Responsibility: Financial transactions, booking state machine.
5. **Planning Module** (Trips, Itineraries, Trip Items, Wishlist)
   - Responsibility: User's personal travel plans.
6. **Interaction Module** (Reviews, Notifications)
   - Responsibility: User feedback and alerts.
7. **Platform Module** (Media, Admin, Analytics, Search)
   - Responsibility: Infrastructure utilities and back-office ops.

## 8. Frontend Architecture
Next.js App Router Strategy:
- `(public)/`: `/`, `/explore`, `/destinations/[slug]` (SSG/ISR for SEO)
- `(auth)/`: `/login`, `/register`, `/forgot-password`
- `(user)/`: `/dashboard`, `/trip-builder`, `/itinerary`, `/bookings` (Protected)
- `(provider)/`: `/provider/dashboard`, `/provider/listings` (Protected)
- `(admin)/`: `/admin/*` (Protected)
- `loading.tsx`: Skeleton loaders based on Phase 1 designs.
- `not-found.tsx`: Custom 404 fitting the visual language.

## 9. Frontend Folder Architecture
```
src/
├── app/               # Next.js App Router pages
├── components/        # Shared UI (Buttons, Cards, Nav)
├── features/          # Domain-specific UI
│   ├── destinations/
│   ├── trip-builder/
│   ├── bookings/
│   └── (others...)
├── hooks/             # Shared React hooks
├── lib/               # Third-party wrappers (axios, r3f, mapbox)
├── services/          # API call wrappers
├── types/             # TypeScript definitions
├── utils/             # Helpers (formatters, validators)
├── styles/            # Tailwind config, global CSS, tokens
├── animations/        # GSAP sequences, Framer variants
└── 3d/                # React Three Fiber components
```

## 10. State Management
- **LOCAL STATE** (React `useState`/`useReducer`): Form inputs, UI toggles (modals, dropdowns).
- **SERVER STATE** (TanStack Query): API data (destinations, bookings). Owns caching, invalidation, and loading states.
- **GLOBAL STATE** (Zustand): Persistent client-side flows (e.g., the active Trip Builder draft state).
- **URL STATE** (Search Params): Search filters, pagination, active tabs.
*Rule: Do not put Server State into Global State.*

## 11. API Architecture
RESTful API, versioned.
- `GET /api/v1/destinations`
- `GET /api/v1/adventures/:id`
- `POST /api/v1/trips`
- `POST /api/v1/bookings/:id/checkout`
- `POST /api/v1/webhooks/razorpay`
Auth via HttpOnly cookies. Authorization via JWT claims. Idempotency keys required on POST `/bookings` and POST `/payments`.

## 12. API Response Standard
**Success**:
```json
{ "status": "success", "data": { ... }, "meta": { "page": 1 } }
```
**Error**:
```json
{ 
  "status": "error", 
  "error": { "code": "VALIDATION_ERROR", "message": "Invalid dates" } 
}
```

## 13. Backend Internal Architecture
- **CONTROLLER**: HTTP layer, routing, input validation (DTOs), Auth guards.
- **SERVICE**: Pure business logic, orchestration.
- **REPOSITORY / PRISMA**: Database queries, transactions.
*Rule: No complex business logic inside controllers.*

## 14. Authentication
- **Methods**: Email/Password initially.
- **Session**: HttpOnly, Secure, SameSite=Strict Cookie containing a signed JWT.
- **Security**: Argon2/Bcrypt password hashing. Rate limiting on login/registration. No plaintext passwords.
*Note: Authentication identifies the user. Authorization decides what they can do.*

## 15. Authorization / RBAC
Roles: `USER`, `PROVIDER`, `ADMIN`.
- **USER**: Can manage their own trips (`trip.userId === req.user.id`).
- **PROVIDER**: Can manage their own listings (`listing.providerId === req.user.id`).
- **ADMIN**: Global access.
*Rule: Backend authorization is authoritative. Frontend route protection is only for UX.*

## 16. Database Architecture (PostgreSQL)
Key Conceptual Entities:
- `User`: id, email, password_hash, role
- `Provider`: user_id, company_name, verified
- `Destination`: id, slug, name, location_data
- `Listing`: id, provider_id, destination_id, type (HOTEL/ADVENTURE)
- `Availability`: id, listing_id, date, capacity, price
- `Trip`: id, user_id, title, status
- `ItineraryItem`: id, trip_id, listing_id, day, order
- `Booking`: id, user_id, status, total
- `Payment`: id, booking_id, gateway_id, status

## 17. Database Relationships
- `User (1) -> (M) Trip`
- `Trip (1) -> (M) ItineraryItem`
- `Provider (1) -> (M) Listing`
- `Destination (1) -> (M) Listing`
- `Listing (1) -> (M) Availability`
- `User (1) -> (M) Booking`
- `Booking (1) -> (M) BookingItem`
- `BookingItem (M) -> (1) Listing`

## 18. Data Ownership
- `Commerce Module` owns Booking and Payment state.
- `Inventory Module` owns Listing and Availability.
- `Planning Module` owns Trip state.
*Rule: Modules communicate via internal service calls, not by mutating each other's database tables directly.*

## 19. Inventory & Availability
Handles capacity and double-booking.
- **Scenario**: User A and User B book the final slot.
- **Resolution**: Backend uses row-level locking (`SELECT ... FOR UPDATE`) in a transaction. The first transaction acquires the lock, decrements capacity, and commits. The second transaction reads the updated capacity (0) and fails safely.

## 20. Booking State Machine
- `DRAFT`: Pre-checkout building.
- `PENDING`: Inventory reserved, waiting for payment (15 min expiry).
- `PAYMENT_PENDING`: Redirected to Razorpay.
- `CONFIRMED`: Payment verified via webhook.
- `FAILED`: Payment failed. Inventory released.
- `EXPIRED`: 15 min timeout hit. Inventory released.
- `CANCELLED`: Post-confirmation cancellation.

## 21. Payment Architecture
1. Server validates availability, creates `Booking (PENDING)`, creates Razorpay Order.
2. Client opens Razorpay UI.
3. Razorpay processes payment and sends `payment.captured` Webhook to Backend.
4. Server verifies Webhook signature.
5. Server updates `Payment` and `Booking (CONFIRMED)`.
*Rule: Never trust frontend payment success.*

## 22. Trip Builder Architecture
- **TEMPORARY BUILDER STATE**: Lives in Frontend `Zustand` store (Dates, Travelers, Budget, Selected Items).
- **PERSISTED TRIP STATE**: Saved to PostgreSQL only when the user clicks "Save" or "Proceed to Book". Prevents database thrashing.

## 23. Itinerary Architecture
Hierarchical: `Trip -> Day -> ItineraryItem`.
Allows linking to actual `Listings` or free-text activities (e.g., "Walk in the park"). Supports drag-and-drop reordering on the frontend by updating the `order` integer field.

## 24. Search Architecture
- **MVP**: PostgreSQL Full-Text Search (`tsvector`) + standard indexed filtering (WHERE price < X AND category = Y).
- **Sorting**: Price, Rating, Relevance.
- **Future**: Elasticsearch only if SQL performance degrades significantly.

## 25. Media Architecture
- **Storage**: S3-Compatible Object Storage.
- **Upload**: Backend generates Pre-signed URLs for direct Client-to-S3 uploads.
- **Validation**: Backend enforces file size and MIME type limits.
- *Rule: Never store large binary media in PostgreSQL.*

## 26. 3D / WebGL Architecture
- **Status**: OPTIONAL / PROGRESSIVE ENHANCEMENT.
- Uses React Three Fiber. Wrapped in `Suspense` and `React.lazy`.
- Detects device capabilities; falls back to static high-res images on low-tier mobile devices or if WebGL context fails.
- *Rule: 3D must NEVER be required for search, booking, or auth.*

## 27. Motion Architecture
- **Framer Motion**: UI state, page transitions, simple layout shifts.
- **GSAP**: Cinematic scroll-triggered storytelling (Parallax).
- **Lenis**: Smooth scrolling (if performance budget permits).
- Respects `prefers-reduced-motion` OS settings.

## 28. Caching / Redis
- **SAFE TO CACHE**: Destination details, site configuration, rate limits.
- **MUST REMAIN FRESH (NEVER CACHE)**: Inventory availability, Booking status, Pricing totals.

## 29. Background Jobs
- **MVP**: NestJS internal Cron (`@nestjs/schedule`).
- **Uses**: Expiring `PENDING` bookings to release locked inventory, sending emails.
- *Alternative*: Avoid heavy message queues (Kafka/RabbitMQ) for MVP.

## 30. Security Architecture
- **XSS**: React auto-escaping, Content Security Policy.
- **CSRF**: SameSite=Strict cookies, CORS whitelisting.
- **SQLi**: Prevented by Prisma ORM.
- **Rate Limiting**: Redis-based rate limiting on sensitive endpoints.
*Rule: Never expose secrets to frontend code.*

## 31. Privacy / Data Protection
- **Data Minimization**: Only store necessary PII.
- **Logging**: Never log passwords, payment secrets, or tokens.
- **Payment Data**: Raw card info is handled entirely by Razorpay; TripJugaadu only stores reference IDs.

## 32. Observability
- **MVP**: Pino logging (JSON), API latency metrics, Sentry for error tracking (frontend & backend).
- **Future**: Datadog/OpenTelemetry distributed tracing.

## 33. Testing Strategy
- **UNIT TESTS**: Pricing calculators, capacity decrement logic (Vitest/Jest).
- **INTEGRATION TESTS**: Prisma DB transactions, Webhook signature verification.
- **E2E TESTS**: Critical flows (Search -> Trip Builder -> Checkout -> Mock Webhook -> Confirmation) via Playwright.

## 34. Environment Strategy
- `LOCAL`, `DEVELOPMENT`, `STAGING`, `PRODUCTION`.
- **Variables**: `DATABASE_URL`, `REDIS_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`, `S3_BUCKET`, `JWT_SECRET`.
- *Rule: Never hardcode secrets. Never provide fake production secrets.*

## 35. Repository Strategy
- **MONOREPO** (Turborepo RECOMMENDED).
- `apps/web` (Next.js), `apps/api` (NestJS).
- `packages/types` (Shared API interfaces), `packages/config` (ESLint/Prettier).

## 36. Git Strategy
- `main` (Production), feature branches (`feat/*`, `fix/*`).
- Pull Requests required.
- Conventional Commits enforced.

## 37. CI/CD
- **Flow**: Code -> PR -> Lint -> Typecheck -> Unit Test -> Build.
- Failures in CI strictly block deployment to Staging/Production.

## 38. Code Quality
- `strict: true` in `tsconfig.json`.
- ESLint + Prettier enforced on pre-commit hook.
- Avoid unnecessary abstractions (e.g., no generic repository patterns over Prisma).

## 39. SEO Architecture
- Next.js Server-Side Rendering (SSR) for `/destinations/*`, `/adventures/*`.
- Dynamic Canonical URLs, Open Graph meta tags, structured JSON-LD data for activities.
- *Rule: Internal database IDs should not be in public URLs; use SEO-friendly slugs.*

## 40. Performance Architecture
- Heavy assets (3D, large GSAP sequences) lazy-loaded.
- Images optimized via Next.js `next/image` (WebP).
- Route-level code splitting.

## 41. Mobile Architecture
- Mobile-first CSS via Tailwind.
- Touch-friendly tap targets (min 44x44px).
- Reduced 3D/Motion automatically triggered on mobile viewports.

## 42. External Services

| Service | Purpose | MVP | Required? | Alternative | Risk |
|---------|---------|-----|-----------|-------------|------|
| Razorpay | Payments | Yes | Yes | Stripe | Gateway downtime |
| Mapbox | Custom maps | Yes | Yes | Google Maps | High cost at scale |
| AWS S3 / R2 | Media | Yes | Yes | Cloudinary | Misconfigured ACLs |
| Resend | Emails | Yes | Yes | SendGrid | Spam filtering |

## 43. Frontend ↔ Backend Data Flows
**Booking Flow**:
1. User (Frontend) clicks "Pay".
2. UI calls `POST /api/v1/bookings/checkout`.
3. Backend validates input, begins DB Transaction.
4. Backend locks Availability, decrements capacity.
5. Backend creates Booking, creates Razorpay Order, commits Transaction.
6. Backend responds with `order_id`.
7. UI opens Razorpay.

## 44. Business Logic Boundaries
- **Availability rules** -> `InventoryService` (Backend)
- **Pricing calculations** -> `PricingService` (Backend)
- **Payment verification** -> `PaymentService` (Backend)
*Rule: Never duplicate these rules in the frontend.*

## 45. Database Indexing
- `Destination.slug` (Unique) -> Fast SEO lookups.
- `Listing.destination_id` -> Fast catalog filtering.
- `Availability.date` -> Fast date-range queries.
- `Booking.user_id` -> Fast dashboard loads.

## 46. Transaction Strategy
Transactions are **REQUIRED** for:
- Booking creation + Inventory reservation.
- Webhook processing (Payment update + Booking update).
- Cancellation (Booking update + Inventory restoration).

## 47. Concurrency Strategy
- Row-level locking (`FOR UPDATE`) protects inventory during checkout.
- Idempotency Keys (e.g., webhook event IDs) protect against duplicate webhook deliveries from Razorpay.

## 48. Scalability Strategy
- **MVP**: Modular monolith on a PaaS (Render/Heroku), Managed Postgres.
- **V1**: Horizontal scaling of API, Redis caching for catalog.
- **FUTURE**: Read-replicas, microservices for Commerce.

## 50. Future Microservice Boundaries
- `Commerce Service` (Booking, Payments).
- `Inventory Service` (Providers, Listings, Availability).
- Evidence required for extraction: Distinct scaling needs or team size growth.

## 51. Project Directory Structure
```
tripjugaadu/
├── apps/
│   ├── web/ (Next.js)
│   └── api/ (NestJS)
├── packages/
│   ├── types/
│   ├── ui/
│   └── config/
├── docs/
├── .github/
└── package.json
```

## 52. Documentation Strategy
- `README.md` (Setup).
- `/docs/architecture.md` (This document).
- `/docs/api.md` (OpenAPI/Swagger specs).
- `/docs/database.md` (ER Diagrams).

## 53. Local Development Strategy
- Frontend/Backend run natively (`npm run dev`).
- PostgreSQL and Redis run via `docker-compose.yml`.
- Simplifies dependency management without slowing down Node.js HMR.

## 54. Technical Risks

| Risk | Impact | Mitigation | Phase affected |
|------|--------|------------|----------------|
| Double Booking | High | DB Row-level locks, strict transactions | MVP |
| Payment Webhook Failure | High | Idempotent retries, manual reconciliation sync | MVP |
| Mobile Performance Drop | Medium | Lazy load 3D/Motion, use Next.js Image optimization | MVP |

## 55. Architecture Decision Records (ADRs)
- **ADR-001**: Modular Monolith. (Faster MVP iteration than microservices).
- **ADR-002**: Next.js. (SEO requirements).
- **ADR-003**: NestJS. (Enforces architectural boundaries).
- **ADR-004**: PostgreSQL + Prisma. (ACID guarantees for commerce).
- **ADR-005**: Razorpay. (Best Indian market support).

## 56. MVP / V1 / FUTURE Classification
- **MVP**: Monolith, PG Search, Razorpay, Email Auth, Trip Builder.
- **V1**: OAuth, advanced caching, automated refunds.
- **FUTURE**: Microservices, global gateways.

## 57. Phase 3 Handoff
**Phase 3 Implementation Checklist:**
- [ ] Initialize Turborepo.
- [ ] Setup Next.js with Tailwind & Phase 1 Tokens.
- [ ] Setup NestJS + Prisma + PostgreSQL Docker.
- [ ] Implement Auth Foundation (JWT, Session).
- [ ] Define initial Database Schema (Users, Listings, Availability, Bookings).
- [ ] Implement Database Seeding.
- [ ] Setup CI/CD (GitHub Actions).

## 58. Final Architecture Audit
- **CHECK 1 (PRODUCT)**: YES. All required MVP flows are supported.
- **CHECK 2 (UI)**: YES. Next.js + Framer + GSAP supports Phase 1.
- **CHECK 3 (DATA)**: YES. Relational model prevents duplication.
- **CHECK 4 (BOOKING)**: YES. Explicit State Machine handles lifecycle.
- **CHECK 5 (PAYMENT)**: YES. Server-side webhooks only.
- **CHECK 6 (SECURITY)**: YES. NestJS Guards handle AuthZ.
- **CHECK 7 (PERFORMANCE)**: YES. WebGL is strictly optional/fallback-ready.
- **CHECK 8 (MOBILE)**: YES. Lazy loading + responsive design provisions made.
- **CHECK 9 (SEO)**: YES. SSR via Next.js handles indexing.
- **CHECK 10 (TESTING)**: YES. Architecture is highly testable.
- **CHECK 11 (COST)**: YES. Monolith + Managed DB is cost-effective.
- **CHECK 12 (COMPLEXITY)**: YES. Microservices and queues deferred.
- **CHECK 13 (SCALABILITY)**: YES. Modular domains allow future extraction.
- **CHECK 14 (DATA CONSISTENCY)**: YES. Domain ownership clearly defined.
- **CHECK 15 (EXTERNAL SERVICES)**: YES. Async/graceful degradation defined.

## 59. Final Decision Table

| Decision | Status | Reason | Alternative | Phase |
|----------|--------|--------|-------------|-------|
| Modular Monolith | CONFIRMED | Reduces MVP operational complexity | Microservices | MVP |
| Next.js | CONFIRMED | SEO and UI rendering | Vite SPA | MVP |
| NestJS | CONFIRMED | Enforces backend modularity & TS | Express | MVP |
| PostgreSQL | CONFIRMED | ACID compliance for commerce | MongoDB | MVP |
| Razorpay | RECOMMENDED | Superior Indian market support | Stripe | MVP |
| S3-Compatible Storage | RECOMMENDED | Cost-effective media storage | Cloudinary | MVP |
| React Three Fiber | OPTIONAL | Immersive visual enhancements | Vanilla Three.js | MVP |
| Mapbox | RECOMMENDED | Superior dark-mode map styling | Google Maps | MVP |
| Turborepo | RECOMMENDED | Code sharing across TS projects | Separate repos | MVP |
