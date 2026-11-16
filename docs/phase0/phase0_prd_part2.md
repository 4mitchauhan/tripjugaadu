# TripJugaadu — Phase 0 PRD — Part 2: Modules, Journeys, Architecture, MVP

---

## 11. Product Modules

### Module 1 — Discovery Engine

**Purpose:** Enable travelers to find destinations, activities, stays, and experiences through browsing, searching, and filtering.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Destination Cards | Visually rich destination cards with hero image, tagline, activity count, starting price | Yes |
| Global Search | Search across destinations, activities, stays, experiences by keyword | Yes |
| Category Navigation | Primary navigation by category: Adventures, Stays, Experiences, Guides | Yes |
| Filters | Filter by price range, difficulty, duration, traveler type, rating | Yes |
| Sort | Sort results by relevance, price (low-high, high-low), rating, popularity | Yes |
| Tags | Activity tags (adventure, wellness, cultural, nature, food) for cross-discovery | Yes |
| Map View | View listings plotted on an interactive map | V1 |
| Similar/Related | "You might also like" recommendations based on current viewing | V1 |
| Trending | Trending destinations/activities based on booking volume | V2 |
| Personalized Feed | Recommendations based on user preferences and history | Future |

### Module 2 — Destination Guide

**Purpose:** Provide comprehensive, editorially curated information about each destination so travelers can understand the place before visiting.

| Content Section | Description | MVP? |
|---|---|---|
| Destination Overview | Summary, highlights, best time to visit, how to reach | Yes |
| Things to Do | Categorized list of activities and experiences | Yes |
| Places to Visit | Notable attractions and landmarks | Yes |
| Adventures Available | Adventure activities with summary cards | Yes |
| Accommodation Overview | Types of stays available, neighborhood guide | Yes |
| Food & Dining | Local cuisine, popular restaurants/cafes, dietary notes | V1 |
| Local Transport | How to get around within the destination | V1 |
| Local Tips | Cultural norms, local customs, practical advice | V1 |
| Weather & Seasons | Monthly weather overview, best/worst seasons | V1 |
| Important Rules | Destination-specific regulations (e.g., no plastic in Rishikesh) | V1 |
| Emergency Info | Local hospital, police, emergency numbers | V1 |
| Suggested Itineraries | Curated 2-day, 3-day, 5-day itinerary templates | V1 |

**Content Classification:**

| Type | Source | Update Frequency | Verified? |
|---|---|---|---|
| Destination overview | Platform editorial | Quarterly | Yes (platform-curated) |
| Activity listings | Provider-submitted | Real-time | Provider-responsible |
| Travel tips | Platform editorial | Quarterly | Yes (platform-curated) |
| Reviews | User-generated | Real-time | Moderated |
| Pricing/availability | Provider-submitted | Real-time | Provider-responsible |
| Emergency contacts | Platform editorial / Official sources | Annually | Must cite source |
| Weather data | External data source | TBD | Source-attributed |

### Module 3 — Travel Confidence System

**Purpose:** Provide structured, actionable preparation information that helps travelers feel ready for their trip. This is the product's primary differentiator.

#### 3A. Activity Preparation

For every bookable activity, the following information structure is required:

| Field | Description | Source | Required? |
|---|---|---|---|
| Duration | Total duration including briefing and transit | Provider | Required |
| Difficulty Level | Easy / Moderate / Challenging / Expert (with clear definitions) | Provider + Platform review | Required |
| Age Requirements | Minimum/maximum age; parental consent requirements | Provider (must match legal/regulatory norms) | Required where applicable |
| Fitness Requirements | Physical fitness expectations (e.g., "must be able to swim," "moderate hiking fitness") | Provider | Required |
| Experience Prerequisites | Prior experience needed (e.g., "no experience needed," "must have basic kayaking experience") | Provider | Required |
| What to Carry | Itemized list of things to bring (sunscreen, water bottle, extra clothes, etc.) | Provider + Platform curation | Required |
| What to Wear | Clothing and footwear recommendations | Provider + Platform curation | Required |
| What's Provided | Equipment/gear provided by operator (helmet, life jacket, etc.) | Provider | Required |
| Important Instructions | Pre-activity instructions (arrive 30 min early, don't eat heavy meal, etc.) | Provider | Required |
| Weather Considerations | How weather affects the activity, seasonal availability | Provider + Platform curation | Required |
| Medical Considerations | Health conditions that may be relevant (vertigo, heart conditions, pregnancy) | Provider | Required — with disclaimer |
| Cancellation Conditions | Weather-based cancellation, refund policy | Provider | Required |
| Location & Meeting Point | Where to arrive, GPS coordinates, landmarks | Provider | Required |

> **CRITICAL RULE:** The platform must display medical/safety information as provided by the operator with a standard disclaimer: *"This information is provided by the activity operator. Consult your physician for medical advice."* The platform must NEVER generate or fabricate medical or safety claims.

#### 3B. Destination Preparation

For every destination, a general preparation section:

| Field | Description | Source |
|---|---|---|
| General Packing List | Climate-appropriate basics (warm clothes for hills, rain gear for monsoon) | Platform editorial |
| Seasonal Considerations | What to expect in each season | Platform editorial |
| Connectivity | Mobile/internet availability | Platform editorial |
| ATM/Cash | Cash availability, UPI acceptance | Platform editorial |
| Language | Local language, English prevalence | Platform editorial |
| Local Customs | Cultural norms to be aware of | Platform editorial |

#### 3C. Trip Checklist

After a user books or adds items to a trip, the system generates a consolidated checklist:

| Source | Checklist Items |
|---|---|
| Booked activities | Aggregated "what to carry" and "what to wear" from all activities |
| Destination | General destination packing recommendations |
| Dates/Season | Season-specific items |
| User preferences | Any user-added custom items |

**Deduplication:** If multiple activities recommend "sunscreen," it appears once in the consolidated checklist.

### Module 4 — Accommodation

**Purpose:** Enable travelers to discover, compare, and book stays at the destination.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Stay Listings | Property cards with photos, price, rating, type, location | Yes |
| Property Detail Page | Full property information: rooms, amenities, photos, policies, reviews | Yes |
| Room Types | Multiple room types per property with individual pricing | Yes |
| Amenities | Structured amenity list (WiFi, parking, breakfast, AC, hot water, etc.) | Yes |
| Photo Gallery | Multiple photos per property and per room type | Yes |
| Pricing Display | Per-night pricing, total for selected dates, taxes | Yes |
| Availability Calendar | Date-based availability check | Yes |
| Check-in/Check-out | Property-specific check-in/check-out rules | Yes |
| Cancellation Policy | Per-property cancellation terms | Yes |
| Property Location | Address + map pin | Yes |
| Guest Reviews | Reviews from past guests | V1 |
| Property Comparison | Compare 2–3 properties side by side | V2 |
| Neighborhood Info | About the area, distance to key landmarks | V1 |

**Stay Types Supported:**

| Type | Description |
|---|---|
| Hotel | Traditional hotel with rooms |
| Hostel | Budget accommodation with dorm/private options |
| Camp | Tented accommodation, often near adventure sites |
| Homestay | Local family-hosted accommodation |
| Resort | Premium accommodation with facilities |
| Cottage/Villa | Independent units — V2 |

### Module 5 — Adventures

**Purpose:** Enable travelers to discover, understand, and book adventure activities.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Activity Listing | Activity cards with photo, title, difficulty, duration, price | Yes |
| Activity Detail Page | Full information including Travel Confidence fields | Yes |
| Operator Information | Operator name, credentials, safety certifications | Yes |
| Slot/Session Selection | Choose date + time slot (for slot-based activities) | Yes |
| Group Size | Min/max participants, current availability | Yes |
| Pricing | Per-person pricing, group rates where applicable | Yes |
| Variants | Different levels of the same activity (e.g., 9km vs 16km vs 26km rafting) | Yes |
| Photo/Video Gallery | Activity photos and videos | Yes |
| Reviews | Activity-specific reviews | V1 |
| Difficulty Comparison | Compare difficulty across similar activities | V2 |

**Activity Types (Rishikesh Pilot):**

| Activity | Variants |
|---|---|
| White Water Rafting | 9km / 16km / 26km / 36km stretches — TBD based on actual operator offerings |
| Bungee Jumping | Standard — TBD based on operator |
| Cliff Jumping | TBD |
| Camping | Riverside camping, beach camping — TBD |
| Trekking | Day treks, multi-day — TBD |
| Kayaking | TBD |
| Body Surfing | TBD |
| Yoga / Wellness | TBD — may be classified under Experiences |

> **Note:** Exact activity inventory for Rishikesh is TBD and must be validated through provider outreach during pilot preparation.

### Module 6 — Experiences

**Purpose:** Enable travelers to discover and book local, cultural, food, wellness, and guided experiences.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Experience Listing | Experience cards with photo, type, duration, price | V1 |
| Experience Detail Page | Full description, what's included, what to bring | V1 |
| Guide Profile | Guide information, languages, expertise | V1 |
| Booking | Date + group-size based booking | V1 |
| Categories | Cultural, food, nature, wellness, spiritual, photography | V1 |

> **MVP Decision:** Experiences module is SHOULD HAVE for V1, not MVP. MVP focuses on Adventures and Stays. Experiences will share the same underlying listing/booking infrastructure but have their own frontend category.

### Module 7 — Trip Builder

**Purpose:** Allow travelers to assemble a complete trip — destination, dates, travelers, activities, stays — and see a unified cost estimate and itinerary.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Trip Creation | Create trip with destination, dates, number of travelers | Yes |
| Add Activities | Add adventure activities to the trip | Yes |
| Add Stays | Add accommodation to the trip | Yes |
| Day Assignment | Assign activities to specific days | Yes |
| Cost Aggregation | Total estimated cost, per-person cost | Yes |
| Basic Itinerary View | Day-by-day view of planned activities and stay | Yes |
| Budget Setting | Set a budget and see remaining budget as items are added | Yes |
| Add Experiences | Add experiences to the trip | V1 |
| Itinerary Optimization | Suggest optimal ordering based on location/timing | Future |
| Collaborative Editing | Share trip with friends for group editing | Future |
| Trip Templates | Pre-built trip templates (e.g., "3-Day Adventure Rishikesh") | V1 |
| Export/Share | Share trip plan as link or PDF | V2 |

**Trip Builder Data Model (Conceptual):**

```
Trip
├── Destination
├── Dates (start, end)
├── Travelers (count, type)
├── Budget (optional)
├── Items[]
│   ├── TripItem (type: STAY)
│   │   ├── Hotel/Room selection
│   │   ├── Check-in / Check-out
│   │   └── Price
│   ├── TripItem (type: ADVENTURE)
│   │   ├── Activity selection
│   │   ├── Date + Slot
│   │   ├── Participants
│   │   └── Price
│   └── TripItem (type: EXPERIENCE) — V1
│       ├── Experience selection
│       ├── Date
│       └── Price
├── Total Cost
├── Per-Person Cost
└── Itinerary (derived from items + dates)
```

### Module 8 — Booking Engine

**Purpose:** Handle the complete booking lifecycle from selection through payment to confirmation and management.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Availability Check | Real-time availability verification at checkout | Yes |
| Cart / Trip Summary | Review all selected items before checkout | Yes |
| Traveler Details | Collect traveler information required for booking | Yes |
| Checkout Flow | Single-page or multi-step checkout | Yes |
| Payment Integration | Razorpay: UPI, cards, net banking, wallets | Yes |
| Payment Verification | Server-side payment verification | Yes |
| Booking Confirmation | Confirmation page + email | Yes |
| Booking ID | Unique booking reference for each booking | Yes |
| Booking Status | Pending → Confirmed → Completed / Cancelled | Yes |
| Cancellation | User-initiated cancellation with policy enforcement | Yes |
| Refund Processing | Policy-based refund calculation and processing | Yes |
| Booking Modification | Date changes, participant changes (where provider allows) | V1 |
| Multi-Item Checkout | Book entire trip (multiple items) in single transaction | V1 |
| Coupon / Promo Code | Apply discount codes at checkout | V2 |

### Module 9 — User Dashboard

**Purpose:** Give travelers a single view of their trips, bookings, preparations, and saved items.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Dashboard Overview | Summary of upcoming trips, recent bookings | Yes |
| My Trips | List of all trips (upcoming, past) | Yes |
| Trip Detail | View trip itinerary, bookings, checklist | Yes |
| Upcoming Bookings | List of confirmed upcoming bookings | Yes |
| Past Bookings | History of completed/cancelled bookings | Yes |
| Booking Detail | Full booking information, status, cancellation option | Yes |
| Wishlist | Saved destinations, activities, stays | Yes |
| Profile Management | Edit personal details, preferences | Yes |
| Travel Checklist | Consolidated preparation checklist for upcoming trips | V1 |
| Payment History | Record of all payments | V1 |
| Review Management | Manage submitted reviews | V1 |
| Notifications | Booking updates, reminders, promotional | V1 |

### Module 10 — Provider Platform

**Purpose:** Enable service providers to onboard, manage their listings, handle bookings, and track revenue.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Provider Registration | Sign up with business details | Yes |
| Verification Submission | Upload required documents for verification | Yes |
| Provider Dashboard | Overview: bookings, revenue, listing status | Yes |
| Listing Creation | Create new listings (stays or activities) | Yes |
| Listing Editor | Edit listing details, photos, pricing | Yes |
| Availability Management | Calendar-based availability management | Yes |
| Pricing Management | Set base prices, seasonal pricing | Yes |
| Booking Management | View bookings, confirm/reject (if request-based), mark complete | Yes |
| Revenue Summary | Earnings overview, commission breakdown | V1 |
| Payout History | Record of payouts received | V1 |
| Review Management | View and respond to reviews | V1 |
| Analytics | Listing views, booking conversion, revenue trends | V2 |
| Multi-Listing | Manage multiple properties/activities | Yes |
| Notification Center | Booking alerts, payout notifications, platform updates | V1 |

### Module 11 — Admin Platform

**Purpose:** Enable platform administrators to manage users, providers, content, bookings, and platform operations.

| Sub-Feature | Description | MVP? |
|---|---|---|
| Admin Dashboard | Platform-wide metrics overview | Yes |
| Provider Management | View, verify, approve, suspend providers | Yes |
| Listing Moderation | Review, approve, reject, flag listings | Yes |
| Booking Management | View all bookings, intervene in disputes | Yes |
| Content Management | Create/edit destination pages, guides, editorial content | Yes |
| User Management | View user accounts, handle account issues | V1 |
| Payment Management | Monitor transactions, manage payout cycles | V1 |
| Review Moderation | Review flagged reviews, remove policy-violating content | V1 |
| Coupon Management | Create and manage promotional codes | V2 |
| Analytics & Reports | Detailed platform analytics, export reports | V1 |
| Configuration | Platform settings (commission rates, policies, feature flags) | V1 |

## 12. User Journeys

### Journey A — Discover Destination

**User:** First-time visitor considering a trip

| Step | User Action | System Response |
|---|---|---|
| 1 | Visits homepage | Shows immersive hero section, featured destinations, discovery categories |
| 2 | Clicks "Rishikesh" destination card or searches "Rishikesh" | Navigates to Rishikesh destination page |
| 3 | Browses destination overview | Shows overview, hero imagery, key highlights, best time, how to reach |
| 4 | Scrolls to "Adventures" section | Shows adventure category cards (Rafting, Bungee, Trekking, etc.) |
| 5 | Clicks "White Water Rafting" | Shows rafting listings with variants (9km, 16km, 26km) |
| 6 | Clicks a specific rafting listing | Shows full activity detail page with Travel Confidence information |
| 7 | Reviews preparation info | Sees what to carry, what to wear, difficulty, duration, requirements |
| 8 | Adds to wishlist or proceeds to book | System saves to wishlist / begins booking flow |

**Entry Point:** Homepage, search, direct URL, social media link  
**User Goal:** Understand what Rishikesh offers and whether specific activities are right for them  
**Success State:** User has enough information to decide whether to visit and what to do  
**Failure States:**
- No results for search → show "no destinations found" + suggest alternatives
- Destination page has insufficient content → violates Principle 3 (shouldn't launch without depth)
- Slow page load (heavy visuals) → progressive loading, skeleton screens

**Edge Cases:**
- User searches for a destination not yet on the platform → show "coming soon" + email notification signup
- User arrives via deep link to a specific activity that's been delisted → show "unavailable" + suggest similar

### Journey B — Book an Adventure

**User:** Traveler ready to book a specific adventure activity

| Step | User Action | System Response |
|---|---|---|
| 1 | On activity detail page, clicks "Book Now" or "Check Availability" | Shows date selection interface |
| 2 | Selects preferred date | System checks availability for that date |
| 3 | If available, selects time slot (if applicable) | Shows available slots with remaining capacity |
| 4 | Selects number of participants | Updates pricing (per person × count) |
| 5 | Reviews activity summary (date, time, participants, total price) | Shows booking summary with all details |
| 6 | If not logged in, prompted to login/signup | Authentication flow, then returns to booking |
| 7 | Enters traveler details (names, ages, emergency contact) | Validates required fields |
| 8 | Reviews mandatory requirements (age, health acknowledgment) | User must acknowledge requirements checkbox |
| 9 | Proceeds to payment | Redirects to Razorpay payment gateway |
| 10 | Completes payment | System verifies payment, creates booking |
| 11 | Booking confirmed | Shows confirmation page with booking ID, summary, preparation info link |
| 12 | Receives confirmation email | Email with booking details, preparation checklist, meeting point, contact |

**Entry Point:** Activity detail page  
**User Goal:** Successfully book an adventure activity for specific dates  
**Success State:** Booking confirmed, payment processed, confirmation received  
**Failure States:**

| Failure | System Behavior |
|---|---|
| No availability for selected date | Show "sold out" + suggest alternative dates |
| Payment fails | Return to checkout with error message, preserve cart |
| Payment succeeds but booking creation fails | CRITICAL — see Edge Cases section |
| Session expires during checkout | Preserve cart in local storage, prompt re-login |
| Activity delisted during checkout | Show "no longer available" + suggest alternatives |

**Decision Points:**
- Login required before payment (not before browsing)
- Traveler age entered vs. provider's age requirement → system warns if mismatch but does NOT block (provider-responsible)
- Slot capacity reached → show "sold out for this slot" + suggest other slots/dates

### Journey C — Book Accommodation

**User:** Traveler booking a hotel, hostel, camp, or homestay

| Step | User Action | System Response |
|---|---|---|
| 1 | On destination page or stays listing, clicks a property | Shows property detail page |
| 2 | Reviews property info (photos, amenities, rooms, location) | Full property details displayed |
| 3 | Selects check-in and check-out dates | System checks room availability |
| 4 | Views available room types with pricing | Shows room cards with per-night and total pricing |
| 5 | Selects a room type and quantity | Updates booking summary |
| 6 | Clicks "Book Now" | Proceeds to checkout |
| 7 | If not logged in, prompted to login/signup | Authentication flow |
| 8 | Enters guest details | Validates fields |
| 9 | Reviews cancellation policy | Must acknowledge cancellation terms |
| 10 | Proceeds to payment | Razorpay payment flow |
| 11 | Payment confirmed | Booking created, confirmation shown |
| 12 | Receives confirmation email | Email with booking ID, check-in instructions, property contact |

**Entry Point:** Property detail page, stays listing  
**User Goal:** Book accommodation for specific dates  
**Success State:** Booking confirmed with check-in details  
**Failure States:**

| Failure | System Behavior |
|---|---|
| No availability for selected dates | Show "sold out" + suggest nearby dates or alternative properties |
| Room becomes unavailable between selection and payment | Show "no longer available, someone just booked this" + suggest alternatives |
| Payment fails | Return to checkout, preserve selections |

### Journey D — Build Complete Trip

**User:** Traveler planning an entire trip from scratch

| Step | User Action | System Response |
|---|---|---|
| 1 | Clicks "Plan Your Trip" or "Trip Builder" | Opens trip builder interface |
| 2 | Selects destination (Rishikesh) | Loads destination context |
| 3 | Sets travel dates (e.g., Nov 15–18) | Validates dates, calculates duration (3 nights, 4 days) |
| 4 | Sets number of travelers and type (e.g., 4 friends) | Updates context for pricing calculations |
| 5 | Sets budget (optional, e.g., ₹8,000 per person) | Budget tracker initialized |
| 6 | Selects interests (e.g., Adventure, Nature, Food) | Filters suggestions based on interests |
| 7 | Browses suggested activities | Shows relevant activities with "Add to Trip" buttons |
| 8 | Adds activities to specific days | Activities placed on day-wise itinerary |
| 9 | Browses stays | Shows available stays for selected dates |
| 10 | Adds a stay | Stay added to trip, cost updated |
| 11 | Reviews itinerary | Day-by-day view: Day 1 — Check in, Rafting; Day 2 — Bungee, Café hopping; etc. |
| 12 | Reviews total cost | Total cost and per-person cost displayed. Budget remaining shown if budget was set. |
| 13 | Clicks "Book Trip" | Proceeds to checkout for all items |
| 14 | Payment flow | Single payment for all items (V1) OR individual booking per item (MVP) |
| 15 | Trip confirmed | All bookings confirmed, unified trip view in dashboard |

**Entry Point:** Trip Builder page, CTA from destination page  
**User Goal:** Plan and book a complete trip with cost visibility  
**Success State:** Complete trip with itinerary, total cost, and all bookings confirmed  
**Failure States:**

| Failure | System Behavior |
|---|---|
| Activity unavailable for selected date | Mark as "unavailable" in trip, suggest alternatives |
| Total cost exceeds budget | Visual warning, suggest budget-friendly alternatives |
| Partial booking failure (some items fail) | Complete successful bookings, clearly show failed items with retry option |

**MVP Note:** In MVP, the trip builder creates a trip plan with cost aggregation, but booking may be per-item (not unified checkout). Unified multi-item checkout is V1.

### Journey E — Prepare for Trip

**User:** Traveler with confirmed bookings preparing for their trip

| Step | User Action | System Response |
|---|---|---|
| 1 | Opens User Dashboard → My Trips | Shows upcoming trips |
| 2 | Clicks on their Rishikesh trip | Shows trip detail with itinerary and bookings |
| 3 | Clicks "Trip Checklist" or "Prepare for Trip" | Shows consolidated preparation checklist |
| 4 | Reviews "What to Carry" | Aggregated, deduplicated list from all booked activities + destination |
| 5 | Reviews "What to Wear" | Clothing/footwear recommendations for all activities |
| 6 | Reviews activity-specific requirements | Per-activity requirements, instructions, meeting points |
| 7 | Reviews destination information | Weather, local tips, transport, emergency contacts |
| 8 | Checks off items as packed/prepared | Checklist items toggle as completed (persistent) |
| 9 | Trip day arrives | All booking details, meeting points, operator contacts accessible from dashboard |

**Entry Point:** User Dashboard → Trip Detail  
**User Goal:** Feel fully prepared for the trip  
**Success State:** All checklist items reviewed, traveler feels informed and ready  
**Failure States:**

| Failure | System Behavior |
|---|---|
| Booking cancelled by provider | Notification to user, item removed from trip, suggest alternatives |
| Activity requirements changed | Notification to user with updated requirements |
| Weather alert for travel dates | V1/Future: weather-aware notification |

### Journey F — Provider Onboarding

**User:** Adventure operator or hotel owner registering on the platform

| Step | User Action | System Response |
|---|---|---|
| 1 | Visits provider registration page | Shows registration form |
| 2 | Enters business details (name, type, location, contact) | Validates input |
| 3 | Selects provider type (Adventure Operator / Hotel / Guide / etc.) | Shows type-specific fields |
| 4 | Uploads verification documents (business license, safety certifications, photos) | Files uploaded and stored securely |
| 5 | Submits registration | Application enters "Pending Verification" status |
| 6 | Admin reviews application | Provider receives "under review" notification |
| 7 | Admin approves or requests additional info | Provider notified of status |
| 8 | If approved, provider gains access to Provider Dashboard | Dashboard with "Create Your First Listing" prompt |
| 9 | Creates first listing | Listing creation wizard (details, photos, pricing, availability) |
| 10 | Submits listing for review | Listing enters "Pending Approval" status |
| 11 | Admin approves listing | Listing goes live on the platform |
| 12 | First booking arrives | Provider notified, manages booking from dashboard |

**Entry Point:** Provider registration page (linked from footer, "List Your Business" CTA)  
**User Goal:** Get their business listed on the platform and start receiving bookings  
**Success State:** Provider verified, listing live, able to receive and manage bookings  
**Failure States:**

| Failure | System Behavior |
|---|---|
| Verification rejected | Clear reason provided, option to resubmit with corrections |
| Listing rejected | Specific feedback on what needs to change |
| Incomplete application | Save draft, prompt to complete |
| Duplicate registration | Detect by business name + location, flag for review |

### Journey G — Admin Moderation

**User:** Platform administrator managing providers and content

| Step | User Action | System Response |
|---|---|---|
| 1 | Logs into Admin Portal | Shows admin dashboard with pending actions |
| 2 | Views "Pending Provider Verifications" queue | List of providers awaiting verification |
| 3 | Opens a provider application | Shows business details, documents, submitted information |
| 4 | Reviews documents and information | Admin can verify, cross-check, add internal notes |
| 5 | Approves or rejects (with reason) | Provider notified, status updated |
| 6 | Views "Pending Listing Approvals" queue | List of listings awaiting approval |
| 7 | Opens a listing | Full listing preview as it would appear to travelers |
| 8 | Reviews content quality, accuracy, completeness | Checks Travel Confidence fields, photos, pricing |
| 9 | Approves, rejects (with feedback), or requests edits | Listing status updated, provider notified |
| 10 | Monitors active listings/reviews | Flags issues, responds to reports, suspends if needed |

**Entry Point:** Admin Portal login  
**User Goal:** Ensure platform quality by verifying providers and moderating content  
**Success State:** Only verified providers and quality-checked listings are live  
**Failure States:**

| Failure | System Behavior |
|---|---|
| Fraudulent provider bypasses verification | Flag mechanism, user reporting, periodic re-verification |
| Listing with unsafe content goes live | Automated content checks (V1), manual review for MVP |
| Admin accidentally rejects legitimate provider | Audit log, undo capability, provider appeal process |

---

## 13. Information Architecture

```
TripJugaadu
│
├── PUBLIC PAGES
│   ├── Home
│   │   ├── Hero Section (immersive, CTA)
│   │   ├── Featured Destinations
│   │   ├── Popular Adventures
│   │   ├── How It Works
│   │   └── Featured Stays
│   │
│   ├── Destinations
│   │   ├── Destination Listing (browseable, searchable)
│   │   └── Destination Detail
│   │       ├── Overview
│   │       ├── Adventures
│   │       ├── Stays
│   │       ├── Experiences (V1)
│   │       ├── Travel Guide
│   │       └── Trip Builder CTA
│   │
│   ├── Adventures
│   │   ├── Adventure Listing (filterable by destination, type, difficulty)
│   │   └── Adventure Detail
│   │       ├── Overview & Gallery
│   │       ├── Travel Confidence Info
│   │       ├── Pricing & Variants
│   │       ├── Availability & Booking
│   │       ├── Operator Info
│   │       ├── Reviews (V1)
│   │       └── Related Adventures
│   │
│   ├── Stays
│   │   ├── Stay Listing (filterable by destination, type, price, amenities)
│   │   └── Stay Detail
│   │       ├── Overview & Gallery
│   │       ├── Room Types
│   │       ├── Amenities
│   │       ├── Location
│   │       ├── Policies
│   │       ├── Availability & Booking
│   │       ├── Reviews (V1)
│   │       └── Nearby Activities
│   │
│   ├── Experiences (V1)
│   │   ├── Experience Listing
│   │   └── Experience Detail
│   │
│   ├── Travel Guides
│   │   ├── Guide Listing (by destination)
│   │   └── Guide Detail
│   │       ├── What to Carry
│   │       ├── What to Wear
│   │       ├── How to Reach
│   │       ├── Best Time to Visit
│   │       ├── Local Tips
│   │       └── Suggested Itineraries
│   │
│   ├── Trip Builder
│   │   ├── Trip Creation
│   │   ├── Activity Selection
│   │   ├── Stay Selection
│   │   ├── Itinerary View
│   │   └── Cost Summary
│   │
│   ├── Search Results
│   │
│   ├── About Us
│   ├── Contact
│   ├── Terms of Service
│   ├── Privacy Policy
│   ├── Cancellation & Refund Policy
│   └── Provider Registration (Landing)
│
├── AUTHENTICATED PAGES (Traveler)
│   ├── Checkout
│   │   ├── Booking Summary
│   │   ├── Traveler Details
│   │   ├── Payment
│   │   └── Confirmation
│   │
│   ├── User Dashboard
│   │   ├── Overview
│   │   ├── My Trips
│   │   │   ├── Trip Detail
│   │   │   └── Trip Checklist
│   │   ├── My Bookings
│   │   │   └── Booking Detail
│   │   ├── Wishlist
│   │   ├── Profile Settings
│   │   └── Payment History (V1)
│   │
│   └── Authentication
│       ├── Login
│       ├── Register
│       ├── Forgot Password
│       └── Reset Password
│
├── PROVIDER PORTAL
│   ├── Provider Dashboard
│   │   ├── Overview
│   │   ├── My Listings
│   │   │   ├── Create Listing
│   │   │   ├── Edit Listing
│   │   │   └── Listing Detail
│   │   ├── Availability Manager
│   │   ├── Bookings
│   │   │   └── Booking Detail
│   │   ├── Revenue (V1)
│   │   ├── Reviews (V1)
│   │   └── Profile / Settings
│   │
│   └── Provider Auth
│       ├── Register
│       ├── Login
│       └── Verification Status
│
└── ADMIN PORTAL
    ├── Admin Dashboard
    ├── Provider Management
    │   ├── Pending Verifications
    │   └── Provider Detail
    ├── Listing Management
    │   ├── Pending Approvals
    │   └── Listing Detail
    ├── Booking Management
    ├── Content Management
    │   ├── Destinations
    │   ├── Travel Guides
    │   └── Editorial Content
    ├── User Management (V1)
    ├── Payment Management (V1)
    ├── Review Moderation (V1)
    └── Analytics (V1)
```

---

## 14. Sitemap

### Public Sitemap

| URL Pattern | Page |
|---|---|
| `/` | Home |
| `/destinations` | Destination listing |
| `/destinations/:slug` | Destination detail (e.g., `/destinations/rishikesh`) |
| `/adventures` | All adventures listing |
| `/adventures/:slug` | Adventure detail (e.g., `/adventures/white-water-rafting-16km-rishikesh`) |
| `/stays` | All stays listing |
| `/stays/:slug` | Stay detail (e.g., `/stays/riverside-camp-rishikesh`) |
| `/experiences` | All experiences listing (V1) |
| `/experiences/:slug` | Experience detail (V1) |
| `/guides` | Travel guides listing |
| `/guides/:destination-slug` | Destination guide (e.g., `/guides/rishikesh`) |
| `/trip-builder` | Trip builder |
| `/search` | Search results |
| `/about` | About us |
| `/contact` | Contact |
| `/terms` | Terms of service |
| `/privacy` | Privacy policy |
| `/cancellation-policy` | Cancellation & refund policy |
| `/for-providers` | Provider registration landing |

### Authenticated Sitemap

| URL Pattern | Page |
|---|---|
| `/login` | Login |
| `/register` | Register |
| `/forgot-password` | Forgot password |
| `/reset-password` | Reset password |
| `/checkout` | Checkout flow |
| `/booking/confirmation/:id` | Booking confirmation |
| `/dashboard` | User dashboard |
| `/dashboard/trips` | My trips |
| `/dashboard/trips/:id` | Trip detail |
| `/dashboard/bookings` | My bookings |
| `/dashboard/bookings/:id` | Booking detail |
| `/dashboard/wishlist` | Wishlist |
| `/dashboard/profile` | Profile settings |

### Provider Sitemap

| URL Pattern | Page |
|---|---|
| `/provider/register` | Provider registration |
| `/provider/login` | Provider login |
| `/provider/dashboard` | Provider dashboard |
| `/provider/listings` | My listings |
| `/provider/listings/new` | Create listing |
| `/provider/listings/:id/edit` | Edit listing |
| `/provider/availability` | Availability manager |
| `/provider/bookings` | Bookings |
| `/provider/bookings/:id` | Booking detail |
| `/provider/revenue` | Revenue (V1) |
| `/provider/settings` | Provider profile/settings |

### Admin Sitemap

| URL Pattern | Page |
|---|---|
| `/admin` | Admin dashboard |
| `/admin/providers` | Provider management |
| `/admin/providers/:id` | Provider detail |
| `/admin/listings` | Listing management |
| `/admin/listings/:id` | Listing detail |
| `/admin/bookings` | Booking management |
| `/admin/content` | Content management |
| `/admin/content/destinations` | Destination editor |
| `/admin/content/guides` | Guide editor |
| `/admin/users` | User management (V1) |
| `/admin/payments` | Payment management (V1) |
| `/admin/analytics` | Analytics (V1) |

---

## 15. Page Inventory

| # | Page | Purpose | Primary User | Main Components | Main Actions | Required Backend Data | Phase |
|---|---|---|---|---|---|---|---|
| 1 | Home | Landing, discovery entry point | All visitors | Hero section, destination cards, adventure highlights, CTA, how-it-works | Browse destinations, search, start trip builder | Featured destinations, popular activities | MVP |
| 2 | Destination Listing | Browse all destinations | All visitors | Search bar, destination grid, filters | Search, filter, click destination | All destinations with summary data | MVP |
| 3 | Destination Detail | Deep dive into a destination | All visitors | Hero, overview, adventure cards, stay cards, guide summary, CTA | Browse sections, click activities/stays, start trip | Destination data, associated listings | MVP |
| 4 | Adventure Listing | Browse/filter adventures | All visitors | Filter sidebar, activity cards, sort controls | Filter, sort, click activity | Activities with filters metadata | MVP |
| 5 | Adventure Detail | Full activity information + booking | All visitors / Travelers | Gallery, description, Travel Confidence block, pricing, availability, operator info, reviews | Read details, check availability, book, wishlist | Full activity data, availability, operator, reviews | MVP |
| 6 | Stay Listing | Browse/filter accommodation | All visitors | Filter sidebar, property cards, sort, map toggle | Filter, sort, click property | Properties with summary data | MVP |
| 7 | Stay Detail | Full property information + booking | All visitors / Travelers | Gallery, rooms, amenities, location map, policies, reviews | Select room, select dates, book, wishlist | Full property data, room types, availability, reviews | MVP |
| 8 | Travel Guide | Destination preparation guide | All visitors | Sections: what to carry, how to reach, best time, tips | Read, reference during planning | Guide content, destination data | MVP |
| 9 | Trip Builder | Plan a complete trip | Travelers | Trip form, activity browser, stay browser, itinerary timeline, cost calculator | Create trip, add items, view cost, book | Activities, stays, availability, pricing | MVP |
| 10 | Search Results | Show search results | All visitors | Search input, result cards (mixed types), filters | Refine search, click result | Search index results | MVP |
| 11 | Login | User authentication | All users | Email/password form, social login buttons, register link | Login, social auth, navigate to register | Auth service | MVP |
| 12 | Register | User registration | New users | Registration form, terms acceptance, social signup | Register, social auth | Auth service | MVP |
| 13 | Checkout | Booking checkout | Travelers | Booking summary, traveler form, payment section | Enter details, pay | Cart/trip items, pricing, payment gateway | MVP |
| 14 | Booking Confirmation | Post-payment confirmation | Travelers | Confirmation summary, booking ID, next steps, preparation link | View details, go to dashboard | Booking data | MVP |
| 15 | User Dashboard | User home base | Travelers | Trip summary, upcoming bookings, quick links | Navigate to trips/bookings/wishlist | User trips, bookings | MVP |
| 16 | My Trips | Trip list | Travelers | Trip cards (upcoming/past), create new trip CTA | View trip, create trip | User trips | MVP |
| 17 | Trip Detail | Single trip view | Travelers | Itinerary, booked items, cost summary, checklist link | View itinerary, access checklist | Trip data, bookings | MVP |
| 18 | My Bookings | Booking list | Travelers | Booking cards with status | View booking, cancel | User bookings | MVP |
| 19 | Booking Detail | Single booking view | Travelers | Booking info, status, activity/stay details, cancel button | Cancel, view preparation info | Booking data | MVP |
| 20 | Wishlist | Saved items | Travelers | Saved item cards (activities, stays, destinations) | Remove, book, view | Wishlist data | MVP |
| 21 | Profile Settings | User profile management | Travelers | Profile form, preferences, password change | Edit profile, change password | User data | MVP |
| 22 | Experience Listing | Browse experiences | All visitors | Experience cards, filters, categories | Browse, click | Experience data | V1 |
| 23 | Experience Detail | Full experience info + booking | All visitors / Travelers | Gallery, description, guide profile, pricing, booking | Read, book | Experience data, guide, availability | V1 |
| 24 | Trip Checklist | Preparation checklist | Travelers | Consolidated checklist, per-activity items | Check items, review | Aggregated from trip bookings | V1 |
| 25 | Provider Registration | Provider signup | Providers | Registration form, document upload, type selection | Register, submit documents | Provider service | MVP |
| 26 | Provider Dashboard | Provider home base | Providers | Stats overview, recent bookings, listing status | Navigate to sections | Provider bookings, listings, revenue | MVP |
| 27 | Provider Listings | Manage listings | Providers | Listing cards, create new CTA | Create, edit, view | Provider listings | MVP |
| 28 | Create/Edit Listing | Listing management | Providers | Multi-step form (details, photos, pricing, availability, policies) | Create/update listing | Listing schema | MVP |
| 29 | Provider Availability | Calendar management | Providers | Calendar view, slot management | Block dates, set capacity | Availability data | MVP |
| 30 | Provider Bookings | Booking management | Providers | Booking list, status filters | View, confirm, reject | Provider bookings | MVP |
| 31 | Provider Revenue | Revenue tracking | Providers | Revenue chart, payout history, commission breakdown | View, export | Financial data | V1 |
| 32 | Admin Dashboard | Platform overview | Admins | Key metrics, pending queues, alerts | Navigate to sections | Aggregated platform data | MVP |
| 33 | Admin Provider Mgmt | Verify providers | Admins | Provider list, verification queue, status filters | Approve, reject, suspend | Provider data, documents | MVP |
| 34 | Admin Listing Mgmt | Moderate listings | Admins | Listing queue, preview, approval controls | Approve, reject, flag | Listing data | MVP |
| 35 | Admin Booking Mgmt | Monitor bookings | Admins | Booking list, filters, dispute flags | View, intervene | All bookings | MVP |
| 36 | Admin Content | Manage editorial content | Admins | Content editor, destination pages, guide pages | Create, edit, publish | CMS content | MVP |
| 37 | About | Company information | All visitors | Company story, mission, team | Read | Static content | MVP |
| 38 | Contact | Contact form | All visitors | Contact form, email, phone | Submit inquiry | Contact service | MVP |
| 39 | Terms of Service | Legal | All visitors | Legal text | Read | Static content | MVP |
| 40 | Privacy Policy | Legal | All visitors | Legal text | Read | Static content | MVP |
| 41 | Cancellation Policy | Policy | All visitors | Policy text | Read | Static content | MVP |
| 42 | Provider Landing | Provider acquisition | Potential providers | Value prop, features, registration CTA | Register | Static + dynamic content | MVP |
| 43 | Forgot Password | Password recovery | All users | Email input | Submit | Auth service | MVP |
| 44 | 404 / Error | Error handling | All visitors | Error message, navigation back | Navigate home/back | None | MVP |

---

## 16. MVP Definition

### What IS in the MVP

| Category | Features |
|---|---|
| **Authentication** | Email/password registration & login, password reset. Social login (Google) if implementation cost is low. |
| **Destination Discovery** | Homepage with featured destinations, destination listing page, destination detail page (Rishikesh). |
| **Adventure Listings** | Adventure listing page with filters, adventure detail page with full Travel Confidence information. |
| **Stay Listings** | Stay listing page with filters, stay detail page with room types, amenities, photos. |
| **Travel Confidence** | What to carry, what to wear, difficulty, duration, requirements, instructions — displayed on every activity page. |
| **Destination Guide** | Basic travel guide for Rishikesh (overview, how to reach, best time, key tips). |
| **Trip Builder** | Create trip (destination, dates, travelers), add activities and stays, day assignment, cost aggregation, basic itinerary view. |
| **Booking Flow** | Individual item booking (per activity or per stay): select → dates → details → payment → confirmation. |
| **Payment** | Razorpay integration (UPI, cards, net banking). |
| **User Dashboard** | My trips, my bookings, wishlist, profile. |
| **Provider Onboarding** | Registration, document submission, admin verification flow. |
| **Provider Dashboard** | Listing management (create, edit), availability management, booking management. |
| **Admin Portal** | Provider verification queue, listing approval queue, booking overview, basic content management. |
| **Search** | Basic search across destinations, activities, stays. |
| **Immersive Design** | Cinematic hero section (homepage), smooth page transitions, scroll animations, depth effects — with performance fallbacks. |

### What is OUTSIDE the MVP

| Feature | Phase | Reason for Exclusion |
|---|---|---|
| Experience listings | V1 | Requires separate provider category and content; adds scope |
| Multi-item checkout | V1 | Complex payment splitting; single-item booking works for MVP |
| Reviews & ratings | V1 | Requires post-trip workflow, moderation; not needed for initial bookings |
| Map-based discovery | V1 | Requires Mapbox integration, geo data; enhances but not critical |
| Trip checklist (preparation) | V1 | Logical V1 addition once trips are being booked |
| Revenue dashboard (provider) | V1 | Providers need basic booking management first |
| Advanced admin analytics | V1 | Basic dashboard sufficient for MVP scale |
| Weather integration | V1 | Requires external API; static seasonal info suffices for MVP |
| Emergency information | V1 | Important but can be static content initially |
| Notifications (email/push) | V1 | Booking confirmation email is MVP; broader notifications are V1 |
| Coupon/promo codes | V2 | Marketing feature, not core |
| Property comparison | V2 | Enhancement, not core |
| Collaborative trip planning | Future | Complex real-time sync |
| Mobile application | Future | Web-first strategy |
| Social features | Future | Not core to value prop |
| Loyalty program | Future | Requires scale |
| Flights / trains booking | Future | Requires aggregator API integration |
| Nationwide inventory | Future | One destination at a time |
| Rental/transport marketplace | V1/V2 | Adds provider category complexity |

### MVP Scale Expectations

| Metric | Expected at MVP Launch |
|---|---|
| Destinations | 1 (Rishikesh) |
| Adventure providers | 3–10 (TBD — requires provider outreach) |
| Stay providers | 5–15 (TBD — requires provider outreach) |
| Activity listings | 10–30 |
| Stay listings | 5–15 |
| Concurrent users | Low (< 100 initially) |
| Team size | Small (2–5 developers, student startup context) |

---

## 17. Feature Prioritization

### Prioritization Criteria

| Criterion | Weight | Description |
|---|---|---|
| User Value | 30% | How much does this feature improve the traveler experience? |
| Business Value | 25% | Does this feature drive revenue, retention, or marketplace growth? |
| Development Complexity | 20% | How much engineering effort is required? (Lower complexity = higher priority) |
| Dependency | 15% | Is this a prerequisite for other features? |
| Risk | 10% | Does building this early reduce product risk? |

### Priority Matrix

| Feature | User Value | Business Value | Complexity | Dependency | Risk Reduction | Priority |
|---|---|---|---|---|---|---|
| Authentication | Medium | High | Low | Critical (blocks all authenticated features) | High | **MUST HAVE** |
| Destination Detail Page | High | High | Medium | High (content foundation) | High | **MUST HAVE** |
| Adventure Detail + Travel Confidence | Very High | High | Medium | High (core differentiator) | Very High | **MUST HAVE** |
| Stay Detail Page | High | High | Medium | High (revenue) | High | **MUST HAVE** |
| Booking Flow | High | Critical | High | Depends on Auth, Listings | Very High | **MUST HAVE** |
| Payment Integration | High | Critical | High | Depends on Booking | Critical | **MUST HAVE** |
| Trip Builder (basic) | Very High | High | High | Depends on Listings | High | **MUST HAVE** |
| Provider Onboarding | Medium (user) / High (platform) | Critical | Medium | Depends on Auth, Admin | Critical | **MUST HAVE** |
| Admin Verification | Low (user) / High (platform) | Critical | Medium | Depends on Auth | Critical | **MUST HAVE** |
| User Dashboard | High | Medium | Medium | Depends on Auth, Booking | Medium | **MUST HAVE** |
| Search | High | Medium | Medium | Depends on Listings | Medium | **MUST HAVE** |
| Wishlist | Medium | Medium | Low | Depends on Auth | Low | **MUST HAVE** |
| Immersive Hero Section | Medium | Medium | Medium | Independent | Medium (validates visual identity) | **MUST HAVE** |
| Reviews | High | High | Medium | Depends on Booking completion | Medium | **SHOULD HAVE** |
| Map Discovery | Medium | Medium | Medium | Depends on Mapbox | Low | **SHOULD HAVE** |
| Experience Listings | High | High | Medium | Depends on Listing infra | Medium | **SHOULD HAVE** |
| Multi-item Checkout | High | High | High | Depends on Booking | Medium | **SHOULD HAVE** |
| Trip Checklist | High | Medium | Low | Depends on Trip Builder + Booking | Medium | **SHOULD HAVE** |
| Advanced Filters | Medium | Medium | Low | Depends on Listings | Low | **SHOULD HAVE** |
| Notifications | Medium | Medium | Medium | Depends on Booking | Low | **SHOULD HAVE** |
| Coupon System | Medium | Medium | Medium | Depends on Checkout | Low | **COULD HAVE** |
| Comparison Feature | Medium | Low | Medium | Depends on Listings | Low | **COULD HAVE** |
| Collaborative Planning | High | Medium | Very High | Depends on Trip Builder | Low | **FUTURE** |
| Mobile App | High | High | Very High | Depends on stable web app | Low | **FUTURE** |

