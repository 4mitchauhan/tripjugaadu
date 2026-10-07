# TripJugaadu — Phase 0 PRD — Part 3: Destination, Booking, Business, Safety, Content

---

## 18. Destination Model

### Purpose

Define how destinations are structured in the product so they can be richly described for travelers while remaining scalable as the platform expands beyond Rishikesh.

### Destination Entity (Conceptual)

| Attribute | Description | Required? |
|---|---|---|
| Name | Display name (e.g., "Rishikesh") | Required |
| Slug | URL-friendly identifier (e.g., "rishikesh") | Required |
| Region | Geographic region (e.g., "Uttarakhand") | Required |
| State | State (e.g., "Uttarakhand") | Required |
| Country | Country (e.g., "India") | Required |
| Tagline | Short tagline (e.g., "Adventure Capital of India") | Required |
| Description | Detailed destination description | Required |
| Hero Image | Primary high-quality hero image | Required |
| Gallery | Multiple destination images | Required |
| Best Time to Visit | Seasonal recommendations | Required |
| How to Reach | Transportation options (nearest airport, railway, road) | Required |
| Coordinates | Latitude/Longitude for map placement | Required |
| Altitude | If relevant (hill destinations) | Optional |
| Categories | What the destination is known for (Adventure, Spiritual, Nature, etc.) | Required |
| Status | Draft / Published / Archived | Required |

### Destination Content Structure

Each destination should contain the following content sections:

```
Destination
├── Overview
│   ├── Description
│   ├── Key Highlights (3-5 bullet points)
│   ├── Best Time to Visit
│   ├── How to Reach (Air / Rail / Road)
│   ├── Altitude / Climate Type
│   └── Region Context
│
├── Adventures (linked from Activity listings)
│   ├── Adventure Category 1 (e.g., Water Sports)
│   │   ├── Activity 1 (Rafting)
│   │   └── Activity 2 (Kayaking)
│   └── Adventure Category 2 (e.g., Aerial)
│       └── Activity 3 (Bungee)
│
├── Stays (linked from Stay listings)
│   ├── Hotels
│   ├── Hostels
│   ├── Camps
│   └── Homestays
│
├── Experiences (V1 — linked from Experience listings)
│
├── Travel Guide
│   ├── What to Carry (destination-level)
│   ├── What to Wear (seasonal)
│   ├── Food & Dining
│   ├── Local Transport
│   ├── Local Tips
│   ├── Important Rules
│   ├── Weather by Month
│   ├── Emergency Contacts
│   └── Suggested Itineraries
│
└── Metadata
    ├── SEO (title, description, keywords)
    ├── Open Graph (title, description, image)
    └── Structured Data (schema.org Place)
```

### Destination Completeness Threshold

A destination should NOT be published unless the following minimum content is present:

| Content | Minimum Threshold |
|---|---|
| Overview | Complete description, highlights, how to reach, best time |
| Hero image + gallery | 1 hero + 5 gallery images minimum |
| Adventures | At least 3 adventure activity listings from verified providers |
| Stays | At least 3 accommodation listings from verified providers |
| Travel guide | What to carry, what to wear, how to reach, local tips |
| SEO metadata | Title, description, Open Graph |

> **Principle 3 in action:** No shallow destinations. Depth first.

### Rishikesh Pilot — Destination Content Outline

| Section | Content Areas (TBD — requires research and editorial) |
|---|---|
| Overview | Adventure capital, spiritual center, Ganges context, geography |
| Adventures | Rafting (multiple stretches), bungee, cliff jumping, camping, trekking, kayaking — TBD based on provider availability |
| Stays | Hotels, hostels, camps, ashrams (if appropriate), homestays — TBD |
| Food | Local cuisine, popular cafes, vegetarian context — TBD |
| Transport | Dehradun airport, Haridwar/Rishikesh railway, bus from Delhi, local auto/taxi — TBD |
| Local Tips | TBD — requires local research |
| Rules | No-plastic policy, river conservation rules, ashram etiquette — TBD (requires verification) |
| Emergency | Hospital, police, river rescue — TBD (must be verified from official sources) |
| Weather | Month-by-month guide, monsoon closure for rafting — TBD |

> **All Rishikesh-specific content marked TBD** — this must be researched and verified before content creation. Do not invent destination information.

---

## 19. Travel Confidence System

### System Overview

The Travel Confidence System (TCS) is the product's primary differentiator. It is a structured information framework designed to reduce traveler uncertainty before a trip.

### Design Principles

1. **Structured, not narrative** — Information is presented in structured fields and checklists, not buried in long paragraphs.
2. **Source-attributed** — Every piece of information is labeled as provider-submitted, platform-curated, or user-contributed.
3. **Actionable** — Information leads to action (pack this, wear this, prepare this) not just awareness.
4. **Honest** — If information is unknown, it says "TBD" or "contact the operator." It does not fabricate.

### TCS Components

#### Component 1 — Activity Preparation Card

Displayed on every activity detail page. Fields defined in Module 3 (see Part 2, Module 3A).

Visual design recommendation: This should be a prominent, always-visible section on the activity detail page — not collapsed or hidden. Consider a card-based layout with clear iconography for each field.

#### Component 2 — Destination Preparation Guide

Displayed on the travel guide page. Fields defined in Module 3 (see Part 2, Module 3B).

#### Component 3 — Trip Checklist (V1)

Generated after booking or trip planning. Structure defined in Module 3 (see Part 2, Module 3C).

### Content Attribution Labels

Every TCS content block must display one of the following labels:

| Label | Meaning | Visual Treatment |
|---|---|---|
| "Provider info" | Submitted by the activity operator | Standard text |
| "Platform guide" | Editorially curated by TripJugaadu team | Platform badge |
| "Traveler tip" | From user reviews/feedback (V1+) | User icon |
| "Official source" | From government/official sources (emergency contacts, regulations) | Verified badge + source citation |
| "AI suggestion" | Generated by AI (Future) | AI badge + disclaimer |

### Safety Information Policy

| Rule | Detail |
|---|---|
| **Never fabricate** | The platform will never generate or invent medical, safety, legal, or regulatory information |
| **Provider responsible** | Activity safety requirements are the provider's responsibility. Platform displays, does not verify medical claims. |
| **Standard disclaimer** | Every activity preparation card includes: "Safety and medical information is provided by the activity operator. Consult a medical professional if you have health concerns." |
| **Emergency information** | Emergency contacts must cite their source (e.g., "Source: Uttarakhand Police official website") |
| **No guarantees** | The platform does not guarantee the accuracy of provider-submitted safety information. This must be stated in Terms of Service. |

---

## 20. Trip Builder Definition

### Purpose

The Trip Builder is the planning hub where travelers assemble their trip from destination, dates, and budget through activities and stays into a unified itinerary with total cost visibility.

### Trip Builder Workflow

```
START
│
├── 1. Select Destination
│      └── Choose from available destinations
│
├── 2. Set Dates
│      ├── Start date
│      ├── End date
│      └── Duration auto-calculated
│
├── 3. Set Travelers
│      ├── Number of travelers
│      ├── Traveler types (adults, children) — V1 enhancement
│      └── Group name (optional)
│
├── 4. Set Budget (optional)
│      ├── Total budget
│      └── Per-person budget (auto-calculated)
│
├── 5. Select Interests (optional)
│      └── Tags: Adventure, Nature, Culture, Food, Wellness, Spiritual
│
├── 6. Browse & Add Activities
│      ├── Filtered by destination + dates + interests
│      ├── Show availability status
│      ├── "Add to Trip" button → assign to day
│      └── Running cost updated
│
├── 7. Browse & Add Stay
│      ├── Filtered by destination + dates
│      ├── Show availability
│      ├── "Add to Trip" button
│      └── Running cost updated
│
├── 8. Review Itinerary
│      ├── Day-by-day timeline
│      ├── Activities + stay per day
│      ├── Time gaps / free slots visible
│      └── Reorder capability
│
├── 9. Review Cost
│      ├── Total trip cost
│      ├── Per-person cost
│      ├── Budget remaining (if budget set)
│      └── Itemized breakdown
│
└── 10. Proceed to Booking
       ├── MVP: "Book each item" → individual checkout per item
       └── V1: "Book All" → unified multi-item checkout
```

### Trip States

| State | Description |
|---|---|
| DRAFT | Trip created, items being added. Not yet booked. |
| PLANNED | All items added, itinerary set, not yet booked. |
| PARTIALLY_BOOKED | Some items booked, others pending. |
| FULLY_BOOKED | All items booked and confirmed. |
| IN_PROGRESS | Trip dates have started. |
| COMPLETED | Trip dates have passed. |
| CANCELLED | Entire trip cancelled (all bookings cancelled). |

### Trip Builder Constraints

| Constraint | Behavior |
|---|---|
| Activity date outside trip dates | Warn user, suggest adjusting dates |
| Activity on day with no availability | Show "unavailable" badge, don't block adding (availability may change) |
| Activity on day already full | Show time conflict warning |
| Total cost exceeds budget | Visual budget warning (red), but do not block |
| No stay selected | Warn at review: "You haven't added accommodation" |
| Single-day trip | Allow (day trip use case) |
| Very long trip (> 14 days) | Allow (no artificial limits for MVP) |

### MVP Scope for Trip Builder

**In MVP:**
- Create trip, add activities, add stay, view itinerary, view cost
- Per-item booking (each item booked individually through the booking flow)
- Trip persists in user dashboard

**In V1:**
- Unified multi-item checkout
- Trip checklist generation
- Trip templates

**In Future:**
- Collaborative editing
- AI itinerary suggestions
- Export/share

---

## 21. Marketplace Definition

### Marketplace Type

TripJugaadu operates as a **two-sided marketplace**:

| Side | Participants |
|---|---|
| **Supply (Providers)** | Hotels, hostels, camps, adventure operators, guides, experience providers |
| **Demand (Travelers)** | Individual travelers, groups, families booking travel services |
| **Platform** | Facilitates discovery, trust, booking, and payment |

### Marketplace Flow

```
PROVIDER                          PLATFORM                          TRAVELER
   │                                 │                                 │
   ├──► Register & Verify ──────────►│                                 │
   │                                 │                                 │
   ├──► Create Listings ───────────►│                                 │
   │                                 │                                 │
   ├──► Set Availability ──────────►│                                 │
   │                                 │                                 │
   ├──► Set Pricing ───────────────►│                                 │
   │                                 │                                 │
   │                                 │◄────── Discover & Browse ──────┤
   │                                 │                                 │
   │                                 │◄────── Check Availability ─────┤
   │                                 │                                 │
   │                                 │◄────── Book & Pay ─────────────┤
   │                                 │                                 │
   │◄──── Booking Notification ─────│                                 │
   │                                 │                                 │
   │──── Confirm / Manage ─────────►│                                 │
   │                                 │──────── Confirmation ──────────►│
   │                                 │                                 │
   │◄──── Payout (post-service) ────│                                 │
   │                                 │                                 │
   │                                 │◄────── Review ─────────────────┤
```

### Booking Models

The platform should support two booking confirmation models:

| Model | Description | Use Case |
|---|---|---|
| **Instant Booking** | Booking is confirmed immediately upon payment | Stays with calendar-based availability, activities with slot-based capacity |
| **Request-Based** | Provider must manually confirm the booking after payment (hold period) | Activities with weather/guide dependencies, custom experiences |

**MVP RECOMMENDATION:** Start with **Instant Booking** for stays and **Instant Booking** for activities where the provider maintains accurate availability. Request-based booking adds complexity and should be V1.

> **Requirement Conflict:** Request-based booking is important for adventure operators who depend on weather conditions. But implementing both models in MVP increases complexity.
> 
> **Recommendation:** MVP supports only instant booking. Providers are responsible for keeping availability accurate. A "weather cancellation" policy covers the gap. Request-based booking is added in V1.

### Inventory Management

| Provider Type | Inventory Model |
|---|---|
| Hotels/Stays | **Calendar + Room Type**: Available rooms per type per date |
| Adventure Activities | **Date + Slot + Capacity**: Available slots per date with max participants per slot |
| Experiences (V1) | **Date + Capacity**: Available dates with max group size |

### Platform Role

The platform is a **marketplace facilitator**, not a service provider. This means:

| Responsibility | Platform | Provider |
|---|---|---|
| Service delivery | ✗ | ✓ |
| Service quality | Moderation & reviews | Direct responsibility |
| Pricing | Display + commission | Set by provider |
| Availability | Display + sync | Managed by provider |
| Safety | Information display + disclaimers | Direct responsibility |
| Customer support (service issues) | Escalation & mediation | First line |
| Payment processing | ✓ | Receives payout |
| Refunds (service issues) | Policy enforcement | Provider-funded |
| Refunds (platform issues) | ✓ Platform-funded | ✗ |

---

## 22. Booking Lifecycle

### Booking States

```
                    ┌─────────────┐
                    │   CREATED   │
                    │ (Cart/Trip) │
                    └──────┬──────┘
                           │ User initiates checkout
                           ▼
                    ┌─────────────┐
                    │   PENDING   │
                    │  PAYMENT    │
                    └──────┬──────┘
                           │
                    ┌──────┴──────┐
                    │             │
               Payment         Payment
              succeeds          fails
                    │             │
                    ▼             ▼
             ┌─────────┐  ┌───────────┐
             │CONFIRMED │  │  FAILED   │
             │          │  │(Payment)  │
             └────┬─────┘  └───────────┘
                  │
         ┌───────┼───────┐
         │       │       │
      User    Provider  Service
    cancels  cancels   completed
         │       │       │
         ▼       ▼       ▼
   ┌──────────┐ ┌──────────┐ ┌──────────┐
   │CANCELLED │ │CANCELLED │ │COMPLETED │
   │ (User)   │ │(Provider)│ │          │
   └────┬─────┘ └────┬─────┘ └──────────┘
        │             │
        ▼             ▼
   ┌──────────┐ ┌──────────┐
   │  REFUND  │ │  REFUND  │
   │PROCESSING│ │PROCESSING│
   └────┬─────┘ └────┬─────┘
        │             │
        ▼             ▼
   ┌──────────┐ ┌──────────┐
   │ REFUNDED │ │ REFUNDED │
   │(Partial/ │ │  (Full)  │
   │  Full)   │ │          │
   └──────────┘ └──────────┘
```

### Booking State Table

| State | Description | Trigger |
|---|---|---|
| CREATED | User has selected items, not yet checked out | Item added to trip/cart |
| PENDING_PAYMENT | Checkout initiated, awaiting payment completion | User clicks "Pay" |
| CONFIRMED | Payment successful, booking confirmed | Payment verification success |
| FAILED_PAYMENT | Payment failed or timed out | Payment gateway failure/timeout |
| CANCELLED_BY_USER | User cancelled a confirmed booking | User cancellation action |
| CANCELLED_BY_PROVIDER | Provider cancelled a confirmed booking | Provider cancellation action |
| CANCELLED_BY_PLATFORM | Platform cancelled (fraud, policy violation) | Admin action |
| COMPLETED | Service delivered, trip date passed | Auto-transition after service date |
| REFUND_PROCESSING | Refund initiated, awaiting processing | Cancellation triggers refund policy |
| REFUNDED | Refund completed | Payment gateway refund confirmation |
| DISPUTED | User or provider raised a dispute | Dispute action |

### Payment States

| State | Description |
|---|---|
| INITIATED | Payment request sent to Razorpay |
| PROCESSING | Payment being processed by gateway |
| SUCCESSFUL | Payment confirmed by gateway |
| FAILED | Payment failed (declined, timeout, error) |
| REFUND_INITIATED | Refund request sent to gateway |
| REFUND_PROCESSING | Refund being processed |
| REFUND_COMPLETED | Refund credited to user |
| REFUND_FAILED | Refund failed (requires manual intervention) |

### Cancellation Policy Framework

| Policy Type | Description | Refund |
|---|---|---|
| Free cancellation | Cancel before X hours/days with full refund | 100% refund |
| Partial refund | Cancel before X hours/days with partial refund | Provider-defined % |
| Non-refundable | No refund after booking | 0% refund |
| Weather cancellation | Activity cancelled due to weather (provider-initiated) | 100% refund or reschedule |

**MVP Approach:** Each listing has a cancellation policy field (free text in MVP, structured in V1). The platform enforces refund rules based on the policy selected by the provider.

### Refund Scenarios

| Scenario | Refund Source | Refund Amount | Timeline |
|---|---|---|---|
| User cancels within free cancellation window | Provider (commission returned to platform) | 100% | TBD — Razorpay processing time |
| User cancels outside free cancellation window | Provider-defined policy | As per policy | TBD |
| Provider cancels | Provider (platform facilitates) | 100% | 5–7 business days (TBD) |
| Platform cancels (fraud) | Platform | 100% to user | 5–7 business days (TBD) |
| Payment succeeds but booking fails | Platform | 100% auto-refund | Immediate |
| No-show by user | Per cancellation policy | Per policy | N/A |

### Failure Scenarios

| Failure | Expected Behavior |
|---|---|
| Payment succeeds but booking creation fails | **CRITICAL** — Auto-refund must be triggered. User shown "booking error" with automatic refund notice. Admin alerted. |
| Double payment | Payment gateway's idempotency should prevent. If detected, auto-refund duplicate. Admin alerted. |
| Provider doesn't show up | User can raise dispute. Platform mediates. Full refund from provider. |
| Activity cancelled last minute (weather) | Provider marks as cancelled. Platform sends notification. Full refund processed. Option to reschedule. |
| User loses internet during payment | Razorpay handles session persistence. User can return to complete. Platform checks payment status on return. |

### Provider Confirmation Flow (MVP: Instant Only)

```
User pays → Payment verified → Booking created → 
Provider notified → Status: CONFIRMED → 
User receives confirmation
```

In MVP, there is no manual provider confirmation step. The provider is responsible for maintaining accurate availability. If a provider cannot fulfill a confirmed booking, they must cancel and the platform processes a full refund.

---

## 23. Provider System

### Provider Types

| Type | Category | Listing Type |
|---|---|---|
| Hotel / Resort | Accommodation | Rooms (calendar + room type availability) |
| Hostel | Accommodation | Rooms / Dorms |
| Camp | Accommodation | Tents / Packages |
| Homestay | Accommodation | Rooms |
| Adventure Operator | Adventures | Activities (date + slot + capacity) |
| Tour Operator | Adventures / Experiences | Packages / Activities |
| Local Guide | Experiences (V1) | Guided experiences |
| Rental Provider | Transport (V1/V2) | Vehicles |

### Provider Lifecycle

```
REGISTERED
    │ Submits application + documents
    ▼
PENDING_VERIFICATION
    │ Admin reviews
    ├──► VERIFIED ──► Can create listings
    │       │ Listing submitted
    │       ▼
    │   LISTING_PENDING
    │       │ Admin reviews
    │       ├──► LISTING_APPROVED ──► Live on platform
    │       └──► LISTING_REJECTED ──► Feedback provided, can resubmit
    │
    └──► REJECTED ──► Reason provided, can reapply
    
VERIFIED provider can also be:
    SUSPENDED ──► Temporarily disabled (policy violation, complaint investigation)
    DEACTIVATED ──► Permanently removed
```

### Provider Registration Requirements

| Field | Description | Required? |
|---|---|---|
| Business Name | Legal or operating name | Required |
| Business Type | Sole proprietor, company, partnership | Required |
| Provider Category | Hotel / Adventure / Guide / etc. | Required |
| Contact Person | Primary contact name | Required |
| Email | Business email | Required |
| Phone | Business phone | Required |
| Location | Business address, destination | Required |
| GST Number | Goods and Services Tax registration | Optional (TBD — may be required for invoicing) |
| Business License | Relevant business permit/license | Required |
| Safety Certifications | For adventure operators: safety certificates, insurance | Required for adventure operators |
| Bank Details | For payouts | Required (can be added after verification) |
| Profile Photo/Logo | Business logo or photo | Optional |
| Description | Business description | Required |

### Provider Verification Process

| Step | Action | Owner |
|---|---|---|
| 1 | Provider submits registration | Provider |
| 2 | System sends verification email | System |
| 3 | Admin reviews application | Admin |
| 4 | Admin verifies documents (business license, certifications) | Admin |
| 5 | Admin approves or rejects (with reason) | Admin |
| 6 | Provider notified of status | System |
| 7 | If approved, provider creates first listing | Provider |
| 8 | Admin reviews listing | Admin |
| 9 | Listing approved → goes live | Admin |

**Verification Depth (MVP vs Future):**

| MVP | Future |
|---|---|
| Manual document review by admin | Automated document verification (OCR, database checks) |
| Basic credential check | Background checks, safety audit partnerships |
| Email verification | Phone verification + KYC |
| Admin judgment | Scoring system with verification tiers |

### Provider Dashboard Features

| Feature | Description | MVP? |
|---|---|---|
| Overview | Stats: total bookings, revenue this month, active listings, new bookings | Yes |
| Listings | View all listings with status (active, pending, rejected) | Yes |
| Create Listing | Multi-step listing creation form | Yes |
| Edit Listing | Update listing details, photos, pricing | Yes |
| Availability | Calendar/slot manager for each listing | Yes |
| Bookings | List of all bookings with status | Yes |
| Booking Detail | View booking details, guest info, status | Yes |
| Revenue | Revenue breakdown, commission, payout history | V1 |
| Reviews | View and respond to guest reviews | V1 |
| Settings | Business profile, bank details, notification preferences | Yes |
| Analytics | Listing views, conversion, revenue trends | V2 |

### Payout Model

| Aspect | Definition |
|---|---|
| Payout trigger | Service date completion (payout after the activity/checkout date) |
| Payout cycle | TBD — Weekly or bi-weekly recommended |
| Payout method | Bank transfer (NEFT/IMPS/UPI) |
| Commission deduction | Platform commission deducted before payout |
| Payout visibility | Provider sees gross amount, commission, net payout |
| Disputed bookings | Payout held until dispute resolution |

> **ASSUMPTION:** Payout mechanics depend on Razorpay Route or similar split-payment feature. Exact implementation is TBD pending payment gateway capability review.

---

## 24. Admin System

### Admin Roles (MVP: Single Admin Role)

For MVP, a single "Admin" role with full access is sufficient. Role-based access (Content Admin, Finance Admin, etc.) is V1.

### Admin Dashboard

| Widget | Data Shown |
|---|---|
| Total Bookings (this month) | Count + trend |
| Revenue (this month) | Total GMV + platform commission |
| Active Providers | Count |
| Pending Verifications | Count (with link to queue) |
| Pending Listing Approvals | Count (with link to queue) |
| Active Listings | Count by category |
| Registered Users | Count |
| Recent Bookings | Last 10 bookings |

### Admin Workflows

#### Provider Verification

```
Admin Dashboard → Pending Verifications → Provider Application
    → Review business details
    → Review uploaded documents
    → Internal notes
    → Action: Approve / Reject (with reason) / Request More Info
```

#### Listing Moderation

```
Admin Dashboard → Pending Listings → Listing Preview
    → Review listing details
    → Check completeness (Travel Confidence fields)
    → Check photo quality
    → Check pricing reasonableness
    → Action: Approve / Reject (with feedback) / Request Edits
```

#### Booking Intervention

```
Admin Dashboard → Bookings → Booking Detail
    → View booking status, payment status
    → View communication log (V1)
    → Action: Force cancel + refund / Adjust status / Add note
```

#### Content Management

```
Admin Dashboard → Content → Destinations
    → Create/edit destination pages
    → Manage travel guide content
    → Manage editorial sections (what to carry, local tips, etc.)
    → Publish / unpublish
```

### Admin Content Management (MVP Approach)

For MVP, content management can be a structured admin form (not a full CMS). Fields are predefined per content type (destination overview, travel guide sections, etc.).

**Future:** A full headless CMS or custom content editor for richer editorial capabilities.

---

## 25. Business Model

### Revenue Model Analysis

#### Model 1 — Commission on Bookings *(RECOMMENDED as primary)*

| Aspect | Detail |
|---|---|
| **Who pays** | Provider (commission deducted from booking value) |
| **When** | At payout (after service delivery) |
| **Value exchanged** | Platform provides discovery, booking infrastructure, payment processing, customer acquisition |
| **Rate** | TBD — Industry benchmarks: Hotels 10–20%, Activities 10–15%. Platform should start competitive (10–12%) to attract initial providers |
| **Operational complexity** | Medium — Requires split payment processing, payout management |
| **Potential risks** | Providers may list higher prices to offset commission. Very price-sensitive market may resist. Providers may try to take bookings off-platform once relationship established. |
| **Mitigation** | Transparent commission, value-add services (reviews, analytics), price parity clauses |

#### Model 2 — Service Fee (Traveler-Side)

| Aspect | Detail |
|---|---|
| **Who pays** | Traveler (added at checkout as "platform fee" or "convenience fee") |
| **When** | At booking |
| **Value exchanged** | Platform provides discovery, planning tools, preparation information, unified booking |
| **Rate** | TBD — typically 3–8% or flat fee |
| **Operational complexity** | Low — added to transaction total |
| **Potential risks** | Indian travelers are fee-sensitive. May reduce conversion. Competitor platforms may not charge service fees. |
| **Mitigation** | Position as value-add (trip planning, preparation). Consider waiving for initial period. |

#### Model 3 — Provider Subscription

| Aspect | Detail |
|---|---|
| **Who pays** | Provider (monthly or annual fee for listing on the platform) |
| **When** | Recurring |
| **Value exchanged** | Guaranteed listing visibility, dashboard access, booking management tools |
| **Rate** | TBD — depends on provider size and category |
| **Operational complexity** | Low — recurring billing |
| **Potential risks** | Hard to sell to providers before proving booking volume. Creates friction for onboarding. Small/seasonal operators may not want monthly commitment. |
| **Mitigation** | Only viable after proving booking volume. Better as a premium tier (V2+). |

#### Model 4 — Featured Listings / Advertising

| Aspect | Detail |
|---|---|
| **Who pays** | Provider (for promotional placement) |
| **When** | Per campaign or recurring |
| **Value exchanged** | Increased visibility — featured position, promoted listing |
| **Rate** | TBD — CPC or CPM or flat monthly fee |
| **Operational complexity** | Medium — Requires ad placement system, fair rotation, clear labeling |
| **Potential risks** | Must clearly label promoted content ("Sponsored" / "Featured"). Too many promoted listings degrades trust. |
| **Mitigation** | Cap promoted listings per page. Always label. Mix organic and promoted results fairly. |

#### Model 5 — Premium Trip Planning

| Aspect | Detail |
|---|---|
| **Who pays** | Traveler (for AI-powered or expert-curated trip planning) |
| **When** | Per trip plan request |
| **Value exchanged** | Personalized, curated trip plans beyond self-service trip builder |
| **Rate** | TBD |
| **Operational complexity** | High — Requires either AI infrastructure or human experts |
| **Potential risks** | Low conversion if free trip builder is good enough. Difficult to price. |
| **Mitigation** | Future feature. Validate demand before building. |

### Recommended Revenue Model (MVP)

**Primary:** Commission on bookings (Model 1)  
**Secondary (V1/V2):** Service fee (Model 2, if market accepts it)  
**Future:** Featured listings (Model 4), Premium planning (Model 5)  
**Not recommended for MVP/V1:** Provider subscription (Model 3) — requires proven booking volume first.

| Revenue Model | Phase |
|---|---|
| Commission on bookings | MVP |
| Service fee | TBD — test in V1 |
| Featured listings | V2 |
| Premium trip planning | Future |
| Provider subscription (premium tier) | Future |

> **ASSUMPTION:** Commission rates are TBD. Must be validated through provider outreach. Starting competitive (10–12%) is recommended to build initial supply.

---

## 26. Trust & Safety

### Trust Framework

| Trust Layer | Implementation |
|---|---|
| **Provider Verification** | Document review, credential check before going live |
| **Listing Moderation** | Admin review of every listing before publication |
| **Reviews & Ratings** | Post-service reviews from verified bookers (V1) |
| **Information Attribution** | All content labeled with source (provider, platform, user, AI) |
| **Cancellation Policies** | Clear, upfront cancellation terms on every listing |
| **Payment Security** | PCI-compliant payment processing via Razorpay |
| **Dispute Resolution** | Platform-mediated dispute process |
| **Safety Disclaimers** | Standard disclaimers on adventure activities |

### Provider Verification Requirements

| Provider Type | Minimum Verification |
|---|---|
| Hotels/Stays | Business registration, property photos, address verification |
| Adventure Operators | Business registration, safety certifications (where applicable), insurance documentation, activity photos |
| Guides | ID verification, experience/credential documentation |
| Rental Providers (V1) | Business registration, vehicle documentation |

> **ASSUMPTION:** The specific safety certifications required for adventure operators in Rishikesh/Uttarakhand are TBD. This must be researched (e.g., state tourism department requirements, ATOAI membership). The platform should not define safety standards but should verify that providers hold relevant certifications.

### Review System (V1)

| Feature | Description |
|---|---|
| Verified reviews | Only users with confirmed, completed bookings can review |
| Rating dimensions | Overall rating + specific dimensions (safety, value, experience) |
| Text review | Optional text review |
| Photo upload | Optional photo with review |
| Provider response | Providers can respond publicly to reviews |
| Moderation | Flagging system for inappropriate reviews, admin moderation |
| Display | Average rating, review count, recent reviews on listing page |

### Cancellation & Refund Policy

| Requirement | Detail |
|---|---|
| Every listing must have a cancellation policy | Required field in listing creation |
| Policy must be visible before booking | Displayed on listing page and checkout |
| Refund processing | Per cancellation policy, processed via Razorpay |
| Provider cancellation | Full refund, platform apologizes, suggests alternatives |
| Platform-initiated cancellation | Full refund |
| Weather-related | Provider marks as weather-cancelled, full refund |

### Fraud Prevention (Progressive)

| Phase | Measures |
|---|---|
| MVP | Manual provider verification, payment gateway fraud detection (Razorpay built-in), admin monitoring |
| V1 | Duplicate booking detection, suspicious account flagging, booking velocity limits |
| V2+ | Automated fraud scoring, pattern detection, IP/device analysis |

### Safety Disclosures

| Requirement | Detail |
|---|---|
| Adventure activities | Standard disclaimer on all adventure activity pages |
| Medical requirements | "Consult your physician" disclaimer where medical conditions are mentioned |
| Platform liability | Terms of Service clearly state platform is a marketplace facilitator, not a service provider |
| Emergency information | Sourced from official channels, cited |

### User Reporting

| Report Type | Process |
|---|---|
| Report a listing | User flags listing → Admin reviews → Action (remove, warn provider, no action) |
| Report a review | User flags review → Admin reviews → Action (remove if policy-violating, no action) |
| Report a provider | User flags provider → Admin investigates → Action (warn, suspend, deactivate) |
| Booking complaint | User raises complaint → Platform mediates → Resolution (refund, partial refund, no action) |

---

## 27. Content Strategy

### Content Types

| Type | Owner | Update Frequency | Purpose |
|---|---|---|---|
| **Editorial** (destination guides, preparation guides) | Platform team | Quarterly or as needed | SEO, user value, differentiation |
| **Listing content** (activity/stay descriptions) | Providers | Real-time (provider-managed) | Marketplace inventory |
| **Reviews** (V1) | Users | Real-time | Trust, social proof |
| **Metadata** (SEO, structured data) | Platform team + automated | Per content update | Search visibility |
| **Static pages** (terms, privacy, about) | Platform team | As needed | Legal, trust |

### Destination Content Template

Every destination must have the following content structure:

#### Overview Section
- **Destination title and tagline** — e.g., "Rishikesh — Adventure Capital of India"
- **Introduction** — 2–3 paragraph description of the destination
- **Key highlights** — 5–7 bullet points (e.g., "World-class white water rafting," "Sacred Ganges ghats")
- **Hero image** — High-quality, wide-format image
- **Gallery** — Minimum 5 curated images

#### Practical Information
- **Best time to visit** — Month-by-month recommendation with reasoning
- **How to reach** — Nearest airport, railway station, road connectivity
- **Getting around** — Local transport options (auto, taxi, walking, rental)
- **Connectivity** — Mobile network, WiFi availability
- **Currency/Payments** — ATM availability, UPI/cash acceptance

#### Experience Content
- **Top adventures** — Curated list with short descriptions, linked to listings
- **Top stays** — Curated accommodation picks, linked to listings
- **Food guide** — Local cuisine highlights, restaurant types, dietary notes
- **Cultural experiences** — Temples, ashrams, local culture, festivals (seasonal)
- **Nature & outdoors** — Scenic spots, viewpoints, nature walks

#### Preparation Content (Travel Confidence)
- **What to carry** — Destination-level packing guide (season-aware)
- **What to wear** — Climate-appropriate clothing guide
- **Local customs** — Cultural norms, etiquette
- **Important rules** — Destination-specific regulations
- **Emergency contacts** — Hospital, police, tourism helpline (sourced from official channels)

#### Suggested Itineraries
- **2-day itinerary** — Weekend trip plan
- **3-day itinerary** — Standard trip plan
- **5-day itinerary** — Extended trip plan
- Each with: day-by-day activities, estimated costs, tips

### Content Quality Standards

| Standard | Requirement |
|---|---|
| **Accuracy** | All factual claims must be verifiable. Mark unverified information as TBD. |
| **Recency** | Content must indicate last-updated date. Review all content at least quarterly. |
| **Attribution** | Source all official information (emergency contacts, regulations). |
| **Completeness** | Destination must meet completeness threshold before publishing (see Section 18). |
| **Tone** | Informative, helpful, enthusiastic but not hyperbolic. No superlatives without evidence. |
| **Photography** | High-quality images. No stock photos for destination pages. Provider photos allowed for listings. |

### Dynamic vs. Static Content

| Content | Type | Update Mechanism |
|---|---|---|
| Destination overview, guides | Semi-static | Admin CMS, quarterly review |
| Listing descriptions | Dynamic | Provider dashboard |
| Pricing, availability | Dynamic | Provider dashboard + API |
| Reviews | Dynamic | User submission |
| Weather data | Dynamic | External API (V1) |
| Emergency contacts | Semi-static | Annual review, official source verification |
| Suggested itineraries | Semi-static | Platform editorial, seasonal updates |

### SEO Content Strategy

| Content Type | SEO Target |
|---|---|
| Destination pages | "[Destination name] travel guide," "things to do in [destination]" |
| Adventure detail pages | "[Activity] in [destination]," "[activity] [destination] price" |
| Stay detail pages | "[Hotel name] [destination]," "best [stay type] in [destination]" |
| Travel guide pages | "what to carry for [destination]," "[destination] packing list" |
| Itinerary pages | "[N] day [destination] itinerary," "[destination] trip plan" |

> **Content creation for Rishikesh is TBD** — All specific content must be researched and verified. This section defines the template, not the content itself.

