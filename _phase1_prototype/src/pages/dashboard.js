/* ============================================================
   TRIPJUGAADU — DASHBOARD PAGE
   ============================================================ */

import { renderNav, renderFooter } from '../components.js';

export function renderDashboardPage() {
  const dashCards = [
    { icon: '✈', label: 'My Trips', title: 'My Trips', subtitle: '2 upcoming trips', link: '/dashboard' },
    { icon: '📋', label: 'Bookings', title: 'Bookings', subtitle: '3 active bookings', link: '/dashboard' },
    { icon: '📅', label: 'Itinerary', title: 'Itinerary', subtitle: 'View schedule', link: '/itinerary' },
    { icon: '🎒', label: 'Packing', title: 'Packing', subtitle: '75% complete', link: '/dashboard' },
    { icon: '♡', label: 'Wishlist', title: 'Wishlist', subtitle: '8 saved', link: '/dashboard' },
    { icon: '📌', label: 'Saved', title: 'Saved Destinations', subtitle: '5 destinations', link: '/explore' }
  ];

  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <div class="dashboard">
      <aside class="dashboard__sidebar">
        <div style="padding: var(--space-5); margin-bottom: var(--space-4);">
          <div style="width: 40px; height: 40px; border-radius: 50%; background: var(--color-accent-dim); display: flex; align-items: center; justify-content: center; color: var(--color-accent); font-weight: 700; margin-bottom: var(--space-3);">A</div>
          <span style="font-weight: 600; font-size: var(--text-sm);">Amit</span>
          <span class="label" style="display: block; margin-top: var(--space-1);">Traveler</span>
        </div>

        <div class="dashboard__nav-item dashboard__nav-item--active">
          <span>◆</span> Dashboard
        </div>
        <div class="dashboard__nav-item">
          <span>✈</span> My Trips
        </div>
        <div class="dashboard__nav-item">
          <span>📋</span> Bookings
        </div>
        <div class="dashboard__nav-item" onclick="window.location.hash='/itinerary'">
          <span>📅</span> Itinerary
        </div>
        <div class="dashboard__nav-item">
          <span>🎒</span> Packing
        </div>
        <div class="dashboard__nav-item">
          <span>♡</span> Wishlist
        </div>
        <div class="dashboard__nav-item">
          <span>⚙</span> Settings
        </div>
        <div class="dashboard__nav-item" onclick="window.location.hash='/'" style="margin-top: auto;">
          <span>←</span> Back to Home
        </div>
      </aside>

      <main class="dashboard__content">
        <h2 style="font-size: var(--display-lg); margin-bottom: var(--space-6);" class="reveal">Your Next Adventure</h2>

        <!-- Featured Trip -->
        <div class="dashboard__featured reveal">
          <img class="dashboard__featured-img" src="https://images.unsplash.com/photo-1600089769887-f0890642a730?w=1200&q=80" alt="Rishikesh" />
          <div class="dashboard__featured-overlay"></div>
          <div class="dashboard__featured-content">
            <span class="badge" style="margin-bottom: var(--space-2);">Featured Trip</span>
            <h3 style="font-size: var(--display-md); margin-bottom: 0;">Rishikesh · 12–15 Oct</h3>
            <div class="dashboard__featured-readiness">
              <div class="readiness-bar">
                <div class="readiness-bar__fill" style="width: 80%;"></div>
              </div>
              <span class="label label--accent">80% Ready</span>
            </div>
          </div>
        </div>

        <!-- Quick Access Cards -->
        <div class="dashboard__cards">
          ${dashCards.map(card => `
            <div class="card--info reveal" onclick="window.location.hash='${card.link}'" style="cursor:pointer;">
              <span class="card__label">${card.label}</span>
              <div class="card__icon">${card.icon}</div>
              <h5 class="card__title" style="font-family: var(--font-body); font-size: var(--text-base);">${card.title}</h5>
              <p class="card__desc">${card.subtitle}</p>
            </div>
          `).join('')}
        </div>
      </main>
    </div>
  `;
}
