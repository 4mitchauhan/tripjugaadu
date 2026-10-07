/* ============================================================
   TRIPJUGAADU — ITINERARY PAGE
   ============================================================ */

import { ITINERARY } from '../data.js';
import { renderNav, renderFooter } from '../components.js';

export function renderItineraryPage() {
  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <!-- Destination Header -->
    <section style="position: relative; height: 300px; overflow: hidden;">
      <img src="https://images.unsplash.com/photo-1600089769887-f0890642a730?w=1920&q=80" alt="Rishikesh" style="width:100%;height:100%;object-fit:cover;" />
      <div style="position:absolute;inset:0;background:linear-gradient(to top,var(--bg-primary) 0%,rgba(1,6,17,0.4) 100%);"></div>
      <div style="position:absolute;bottom:0;left:0;right:0;padding:var(--space-8) var(--space-6);text-align:center;">
        <h1 style="font-size: var(--display-xl);">${ITINERARY.destination}</h1>
        <span class="label label--accent" style="font-size: var(--text-sm);">${ITINERARY.days} / ${ITINERARY.nights}</span>
      </div>
    </section>

    <!-- Itinerary Timeline -->
    <section class="section">
      <div class="container container--narrow">
        <div class="timeline">
          ${ITINERARY.schedule.map(day => `
            <div class="timeline__day reveal">
              <div class="timeline__day-marker"></div>
              <div class="timeline__day-label">${day.label}</div>
              ${day.items.map(item => `
                <div class="timeline__item">
                  <div class="timeline__item-info">
                    <div class="timeline__item-name">${item.name}</div>
                    <div class="timeline__item-detail">
                      ${item.time}${item.duration ? ' · ' + item.duration : ''}${item.price ? ' · ' + item.price : ''}
                    </div>
                  </div>
                  <div class="timeline__item-status timeline__item-status--${item.status}">
                    <span class="dot"></span>
                    ${item.status === 'confirmed' ? 'Booked' : 'Pending'}
                  </div>
                </div>
              `).join('')}
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: var(--space-8);" class="reveal">
          <button class="btn btn--primary btn--lg" onclick="window.location.hash='/booking'">Book This Trip <span class="btn-arrow">→</span></button>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}
