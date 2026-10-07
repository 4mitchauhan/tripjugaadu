/* ============================================================
   TRIPJUGAADU — BOOKING & CONFIRMATION PAGES
   ============================================================ */

import { BOOKING_ITEMS } from '../data.js';
import { renderNav, renderFooter } from '../components.js';

export function renderBookingPage() {
  const subtotal = 21699;
  const fees = 799;
  const discount = -1500;
  const total = subtotal + fees + discount;

  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <section class="section">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Checkout</h2>
        </div>

        <!-- Steps -->
        <div class="steps reveal" style="max-width: 700px; margin-bottom: var(--space-8);">
          <div class="step step--completed">Select</div>
          <div class="step step--completed">Details</div>
          <div class="step step--active">Review</div>
          <div class="step">Payment</div>
          <div class="step">Confirm</div>
        </div>

        <div class="booking-summary reveal">
          <!-- Items -->
          <div class="booking-items">
            <div style="margin-bottom: var(--space-5);">
              <h4 style="font-family: var(--font-display); font-size: var(--display-sm); margin-bottom: var(--space-1);">Rishikesh</h4>
              <span class="label">12–15 Oct · 02 Travelers</span>
            </div>

            ${BOOKING_ITEMS.map(item => `
              <div class="booking-item">
                <img class="booking-item__img" src="${item.image}" alt="${item.name}" />
                <div class="booking-item__info">
                  <div class="booking-item__name">${item.name}</div>
                  <div class="booking-item__detail">${item.detail}</div>
                </div>
                <div class="booking-item__price">${item.price}</div>
              </div>
            `).join('')}

            <div class="booking-totals">
              <div class="booking-total-row"><span>Subtotal</span><span>₹${subtotal.toLocaleString()}</span></div>
              <div class="booking-total-row"><span>Service Fee</span><span>₹${fees.toLocaleString()}</span></div>
              <div class="booking-total-row" style="color: var(--accent-green);"><span>Discount</span><span>−₹${Math.abs(discount).toLocaleString()}</span></div>
              <div class="booking-total-row booking-total-row--final"><span>Total</span><span>₹${total.toLocaleString()}</span></div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="booking-sidebar">
            <div class="booking-sidebar__card">
              <h4 style="font-family: var(--font-display); font-size: var(--display-sm); margin-bottom: var(--space-4);">₹${total.toLocaleString()}</h4>
              <p style="font-size: var(--text-xs); color: var(--text-muted); margin-bottom: var(--space-5);">Total for 2 travelers, 3 nights</p>
              <button class="btn btn--primary btn--lg btn--full" onclick="window.location.hash='/confirmation'">Continue to Payment <span class="btn-arrow">→</span></button>
              <p style="font-size: var(--text-xs); color: var(--text-muted); margin-top: var(--space-4);">Free cancellation up to 48 hours before check-in</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

export function renderConfirmationPage() {
  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <div class="confirmation page-enter">
      <div class="confirmation__check">✓</div>
      <h2 class="confirmation__title">Booking Confirmed</h2>
      <p class="confirmation__subtitle">Your journey is ready.</p>

      <div class="confirmation__details">
        <div class="confirmation__meta">
          <span>Rishikesh</span>
          <span>12–15 Oct 2024</span>
          <span>02 Travelers</span>
          <span>ID: TJ-${Math.random().toString(36).substring(2, 8).toUpperCase()}</span>
        </div>

        ${BOOKING_ITEMS.map(item => `
          <div style="display: flex; justify-content: space-between; padding: var(--space-2) 0; font-size: var(--text-sm);">
            <span style="text-transform: uppercase; letter-spacing: var(--tracking-wider);">${item.name}</span>
            <span style="color: var(--text-muted);">${item.detail}</span>
          </div>
        `).join('')}
      </div>

      <div class="confirmation__actions">
        <button class="btn btn--primary btn--lg" onclick="window.location.hash='/dashboard'">View My Trip <span class="btn-arrow">→</span></button>
        <button class="btn btn--secondary btn--lg">Download Details</button>
      </div>
    </div>

    ${renderFooter()}
  `;
}
