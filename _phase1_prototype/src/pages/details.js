/* ============================================================
   TRIPJUGAADU — DETAIL PAGES
   Destination Detail, Adventure Detail, Stay Detail, Experience Detail
   ============================================================ */

import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES, KBYG_ITEMS } from '../data.js';
import { renderNav, renderFooter, renderInfoCard } from '../components.js';

export function renderDestinationDetailPage(params) {
  const dest = DESTINATIONS.find(d => d.id === params.id) || DESTINATIONS[0];
  const relatedAdventures = ADVENTURES.slice(0, 3);

  return `
    ${renderNav(true)}

    <!-- Hero -->
    <section class="adventure-hero" style="height: 70vh;">
      <div class="adventure-hero__bg">
        <img src="${dest.image}" alt="${dest.name}" />
      </div>
      <div class="adventure-hero__overlay"></div>
      <div class="adventure-hero__content" style="max-width: var(--container-max); margin: 0 auto;">
        <span class="label label--accent">${dest.region}</span>
        <h1 style="font-size: var(--display-hero);">${dest.name}</h1>
        <div class="adventure-hero__meta">
          <span>${dest.days}</span>
          <span>${dest.category}</span>
        </div>
      </div>
    </section>

    <!-- Intro -->
    <section class="section">
      <div class="container">
        <div class="reveal" style="max-width: 700px;">
          <h3 style="margin-bottom: var(--space-4);">About ${dest.name}</h3>
          <p style="font-size: var(--text-lg); line-height: var(--leading-relaxed);">${dest.description}</p>
          <p style="margin-top: var(--space-4);">Experience the perfect blend of adventure and tranquility. From thrilling outdoor activities to serene spiritual encounters, this destination offers something for every traveler seeking an authentic Indian experience.</p>
        </div>
      </div>
    </section>

    <!-- Adventures in this destination -->
    <section class="section" style="background: var(--bg-secondary);">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Adventures in ${dest.name}</h2>
        </div>
        <div class="search-results__grid">
          ${relatedAdventures.map(a => `
            <div class="card--poster reveal" style="aspect-ratio: 3/4;" onclick="window.location.hash='/adventure/${a.id}'">
              <img class="card__image" src="${a.image}" alt="${a.name}" loading="lazy" />
              <div class="card__overlay"></div>
              <div class="card__top-meta">
                <span class="badge">${a.difficulty}</span>
                <span class="label label--accent">${a.duration}</span>
              </div>
              <div class="card__content">
                <h4 class="card__title">${a.name}</h4>
                <p class="card__subtitle">${a.location}</p>
                <span class="card__cta">Explore <span class="btn-arrow">→</span></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Know Before You Go -->
    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Know Before You Go</h2>
          <p class="section__subtitle">Everything you need to feel prepared for ${dest.name}.</p>
        </div>
        <div class="kbyg-grid__cards" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: var(--space-4);">
          ${KBYG_ITEMS.map(item => renderInfoCard(item)).join('')}
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section" style="background: linear-gradient(135deg, var(--bg-secondary), var(--bg-deep)); text-align: center;">
      <div class="container reveal">
        <h2 class="section__title" style="display:inline-block;">Ready for ${dest.name}?</h2>
        <p class="section__subtitle" style="margin: var(--space-2) auto var(--space-6);">Build your personalized trip and start your adventure.</p>
        <div style="display: flex; gap: var(--space-4); justify-content: center; flex-wrap: wrap;">
          <button class="btn btn--primary btn--lg" onclick="window.location.hash='/trip-builder'">Build My Trip <span class="btn-arrow">→</span></button>
          <button class="btn btn--secondary btn--lg" onclick="window.location.hash='/itinerary'">View Itinerary</button>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

export function renderAdventureDetailPage(params) {
  const adventure = ADVENTURES.find(a => a.id === params.id) || ADVENTURES[0];

  return `
    ${renderNav(true)}

    <!-- Hero -->
    <section class="adventure-hero">
      <div class="adventure-hero__bg">
        <img src="${adventure.image}" alt="${adventure.name}" />
      </div>
      <div class="adventure-hero__overlay"></div>
      <div class="adventure-hero__content" style="max-width: var(--container-max); margin: 0 auto;">
        <h1 style="font-size: var(--display-xl);">${adventure.name} in ${adventure.location}</h1>
        <div class="adventure-hero__meta">
          <span>${adventure.duration}</span>
          <span>${adventure.difficulty}</span>
          <span>${adventure.price}</span>
        </div>
        <button class="btn btn--primary btn--lg" style="margin-top: var(--space-5);" onclick="window.location.hash='/booking'">Book Now <span class="btn-arrow">→</span></button>
      </div>
    </section>

    <!-- Detail Body -->
    <section class="section">
      <div class="container">
        <div class="adventure-detail__body">
          <div class="adventure-detail__main">
            <div class="detail-section reveal">
              <div class="detail-section__title">Overview</div>
              <div class="detail-section__text">
                <p>${adventure.description}</p>
                <p style="margin-top: var(--space-4);">This experience combines the thrill of adventure with the stunning natural beauty of ${adventure.location}. Suitable for both beginners and experienced adventurers, with professional guides ensuring safety throughout.</p>
              </div>
            </div>

            <div class="detail-section reveal">
              <div class="detail-section__title">Requirements</div>
              <div class="detail-section__list">
                <div class="detail-section__list-item">Minimum age: 16 years (18+ recommended)</div>
                <div class="detail-section__list-item">Moderate physical fitness required</div>
                <div class="detail-section__list-item">Basic swimming ability preferred</div>
                <div class="detail-section__list-item">No prior experience necessary — training provided</div>
                <div class="detail-section__list-item">Valid ID required at the time of activity</div>
              </div>
            </div>

            <div class="detail-section reveal">
              <div class="detail-section__title">What to Carry</div>
              <div class="detail-section__list">
                <div class="detail-section__list-item">Comfortable clothing that can get wet</div>
                <div class="detail-section__list-item">Secure footwear (no flip-flops)</div>
                <div class="detail-section__list-item">Waterproof phone pouch</div>
                <div class="detail-section__list-item">Sunscreen and sunglasses with strap</div>
                <div class="detail-section__list-item">Change of dry clothes</div>
                <div class="detail-section__list-item">Water bottle</div>
              </div>
            </div>

            <div class="detail-section reveal">
              <div class="detail-section__title">What to Wear</div>
              <div class="detail-section__list">
                <div class="detail-section__list-item">Quick-dry shorts or track pants</div>
                <div class="detail-section__list-item">Moisture-wicking t-shirt</div>
                <div class="detail-section__list-item">Secure water shoes or sports sandals</div>
                <div class="detail-section__list-item">Avoid loose or heavy clothing</div>
              </div>
            </div>

            <div class="detail-section reveal">
              <div class="detail-section__title">Important Information</div>
              <div class="detail-section__list">
                <div class="detail-section__list-item">All safety equipment provided by the operator</div>
                <div class="detail-section__list-item">Professional certified guides accompany all trips</div>
                <div class="detail-section__list-item">Activity may be cancelled due to weather conditions</div>
                <div class="detail-section__list-item">Full refund in case of operator cancellation</div>
                <div class="detail-section__list-item">Meeting point details shared 24 hours before</div>
              </div>
            </div>
          </div>

          <!-- Booking Sidebar -->
          <div class="adventure-detail__booking">
            <div class="booking-panel">
              <div class="booking-panel__price">${adventure.price} <span>/ person</span></div>
              <div class="booking-panel__field">
                <label class="booking-panel__label">Date</label>
                <select class="booking-panel__select">
                  <option>13 Oct 2024</option>
                  <option>14 Oct 2024</option>
                  <option>15 Oct 2024</option>
                </select>
              </div>
              <div class="booking-panel__field">
                <label class="booking-panel__label">Travelers</label>
                <select class="booking-panel__select">
                  <option>1 Person</option>
                  <option selected>2 People</option>
                  <option>3 People</option>
                  <option>4 People</option>
                </select>
              </div>
              <div class="booking-panel__field">
                <label class="booking-panel__label">Time Slot</label>
                <select class="booking-panel__select">
                  <option>8:00 AM – 12:00 PM</option>
                  <option>1:00 PM – 5:00 PM</option>
                </select>
              </div>
              <button class="btn btn--primary btn--lg btn--full" onclick="window.location.hash='/booking'" style="margin-top: var(--space-4);">Book Now <span class="btn-arrow">→</span></button>
              <p style="font-size: var(--text-xs); color: var(--text-muted); text-align: center; margin-top: var(--space-3);">Free cancellation up to 24 hours</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Sticky Booking Bar (visible on scroll) -->
    <div class="sticky-booking-bar" id="sticky-bar">
      <div class="sticky-booking-bar__price">${adventure.price} <span>/ person</span></div>
      <div class="sticky-booking-bar__actions">
        <select class="booking-panel__select" style="width: auto; padding: var(--space-2) var(--space-3);">
          <option>13 Oct</option>
          <option>14 Oct</option>
        </select>
        <button class="btn btn--primary" onclick="window.location.hash='/booking'">Book Now <span class="btn-arrow">→</span></button>
      </div>
    </div>

    ${renderFooter()}
  `;
}

export function renderStayDetailPage(params) {
  const stay = STAYS.find(s => s.id === params.id) || STAYS[0];

  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <section class="section" style="padding-top: var(--space-7);">
      <div class="container">
        <!-- Gallery -->
        <div class="hotel-gallery reveal" style="margin-bottom: var(--space-7);">
          <div class="hotel-gallery__main">
            <img src="${stay.image}" alt="${stay.name}" />
          </div>
          <img src="https://images.unsplash.com/photo-1590490360182-c33d57733427?w=600&q=80" alt="Room interior" />
          <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=600&q=80" alt="Hotel view" />
          <img src="https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&q=80" alt="Hotel amenity" />
          <img src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=600&q=80" alt="Hotel exterior" />
        </div>

        <div class="adventure-detail__body">
          <div class="adventure-detail__main">
            <div class="reveal">
              <span class="label label--accent">${stay.location}</span>
              <h2 style="font-size: var(--display-lg); margin: var(--space-2) 0 var(--space-3);">${stay.name}</h2>
              <div class="hotel-amenities" style="margin-bottom: var(--space-5);">
                ${stay.amenities.map(a => `<span class="amenity">${a}</span>`).join('')}
              </div>
              <p>Nestled in the heart of ${stay.location}, this property offers an unforgettable stay experience. Wake up to stunning views, enjoy world-class amenities, and immerse yourself in the local culture — all from the comfort of your room.</p>
            </div>

            <div class="detail-section reveal" style="margin-top: var(--space-6);">
              <div class="detail-section__title">Rooms & Rates</div>
              <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                ${['Standard Room', 'Deluxe Room', 'Suite'].map((room, i) => `
                  <div style="display: flex; justify-content: space-between; align-items: center; padding: var(--space-3); border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                    <div>
                      <div style="font-weight: 600; text-transform: uppercase; letter-spacing: var(--tracking-wider); font-size: var(--text-sm);">${room}</div>
                      <div style="font-size: var(--text-xs); color: var(--text-muted);">${['1 King Bed · City View', '1 King Bed · Mountain View · Balcony', '2 Rooms · Valley View · Private Deck'][i]}</div>
                    </div>
                    <div style="text-align: right;">
                      <div style="font-weight: 700;">₹X,XXX</div>
                      <div style="font-size: var(--text-xs); color: var(--text-muted);">per night</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="detail-section reveal" style="margin-top: var(--space-4);">
              <div class="detail-section__title">Policies</div>
              <div class="detail-section__list">
                <div class="detail-section__list-item">Check-in: 2:00 PM / Check-out: 11:00 AM</div>
                <div class="detail-section__list-item">Free cancellation up to 48 hours before check-in</div>
                <div class="detail-section__list-item">Pets not allowed</div>
                <div class="detail-section__list-item">Valid ID required at check-in</div>
              </div>
            </div>
          </div>

          <!-- Booking Sidebar -->
          <div class="adventure-detail__booking">
            <div class="booking-panel">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
                <div class="booking-panel__price" style="margin-bottom: 0;">₹X,XXX <span>/ night</span></div>
                <span class="badge">★ ${stay.rating}</span>
              </div>
              <div class="booking-panel__field">
                <label class="booking-panel__label">Check-in</label>
                <input type="date" class="auth-form__input" value="2024-10-12" style="width: 100%;" />
              </div>
              <div class="booking-panel__field">
                <label class="booking-panel__label">Check-out</label>
                <input type="date" class="auth-form__input" value="2024-10-15" style="width: 100%;" />
              </div>
              <div class="booking-panel__field">
                <label class="booking-panel__label">Guests</label>
                <select class="booking-panel__select">
                  <option>1 Guest</option>
                  <option selected>2 Guests</option>
                  <option>3 Guests</option>
                </select>
              </div>
              <button class="btn btn--primary btn--lg btn--full" onclick="window.location.hash='/booking'" style="margin-top: var(--space-4);">Reserve <span class="btn-arrow">→</span></button>
              <p style="font-size: var(--text-xs); color: var(--text-muted); text-align: center; margin-top: var(--space-3);">You won't be charged yet</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

export function renderExperienceDetailPage(params) {
  const exp = EXPERIENCES.find(e => e.id === params.id) || EXPERIENCES[0];

  return `
    ${renderNav(true)}

    <section class="adventure-hero">
      <div class="adventure-hero__bg">
        <img src="${exp.image}" alt="${exp.name}" />
      </div>
      <div class="adventure-hero__overlay"></div>
      <div class="adventure-hero__content" style="max-width: var(--container-max); margin: 0 auto;">
        <span class="badge ${exp.accent === 'warm' ? 'badge--warm' : exp.accent === 'green' ? 'badge--green' : exp.accent === 'violet' ? 'badge--violet' : ''}" style="margin-bottom: var(--space-3);">${exp.name}</span>
        <h1 style="font-size: var(--display-xl);">${exp.name} in ${exp.location}</h1>
        <div class="adventure-hero__meta">
          <span>${exp.duration}</span>
          <span>${exp.location}</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="adventure-detail__body">
          <div class="adventure-detail__main">
            <div class="detail-section reveal">
              <div class="detail-section__title">About This Experience</div>
              <div class="detail-section__text">
                <p>${exp.description}</p>
                <p style="margin-top: var(--space-4);">Immerse yourself in an authentic local experience guided by passionate experts who know ${exp.location} inside and out. This isn't a tourist attraction — it's a genuine window into local life.</p>
              </div>
            </div>

            <div class="detail-section reveal">
              <div class="detail-section__title">What's Included</div>
              <div class="detail-section__list">
                <div class="detail-section__list-item">Expert local guide</div>
                <div class="detail-section__list-item">All tastings and activities</div>
                <div class="detail-section__list-item">Transportation within the experience</div>
                <div class="detail-section__list-item">Photos and memories</div>
              </div>
            </div>
          </div>

          <div class="adventure-detail__booking">
            <div class="booking-panel">
              <div class="booking-panel__price">₹X,XXX <span>/ person</span></div>
              <div class="booking-panel__field">
                <label class="booking-panel__label">Date</label>
                <input type="date" class="auth-form__input" style="width: 100%;" value="2024-10-13" />
              </div>
              <div class="booking-panel__field">
                <label class="booking-panel__label">Group Size</label>
                <select class="booking-panel__select">
                  <option>1 Person</option>
                  <option selected>2 People</option>
                  <option>3–4 People</option>
                </select>
              </div>
              <button class="btn btn--primary btn--lg btn--full" onclick="window.location.hash='/booking'" style="margin-top: var(--space-4);">Book Experience <span class="btn-arrow">→</span></button>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}
