/* ============================================================
   TRIPJUGAADU — EXPLORE / LISTING PAGES
   ============================================================ */

import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES } from '../data.js';
import { renderNav, renderFooter, renderSearchPanel, renderPosterCard } from '../components.js';

export function renderExplorePage() {
  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <section class="section" style="padding-top: var(--space-7);">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Explore India</h2>
          <p class="section__subtitle">Discover destinations, adventures, stays, and experiences across the subcontinent.</p>
        </div>
        <div style="margin-bottom: var(--space-6);">
          ${renderSearchPanel()}
        </div>
        <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-7); flex-wrap: wrap;">
          ${['All', 'Destinations', 'Adventures', 'Stays', 'Experiences'].map((t, i) => `
            <span class="tag ${i === 0 ? 'tag--active' : ''}" onclick="this.parentElement.querySelectorAll('.tag').forEach(x=>x.classList.remove('tag--active'));this.classList.add('tag--active');">${t}</span>
          `).join('')}
        </div>
        <div class="dest-grid">
          ${DESTINATIONS.map(d => renderPosterCard(d, 'destination')).join('')}
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

export function renderAdventuresPage() {
  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <section class="section" style="padding-top: var(--space-7);">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Adventures</h2>
          <p class="section__subtitle">Push your limits with India's most thrilling outdoor activities.</p>
        </div>
        <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-7); flex-wrap: wrap;">
          ${['All', 'Water', 'Air', 'Land', 'Extreme', 'Easy'].map((t, i) => `
            <span class="tag ${i === 0 ? 'tag--active' : ''}" onclick="this.parentElement.querySelectorAll('.tag').forEach(x=>x.classList.remove('tag--active'));this.classList.add('tag--active');">${t}</span>
          `).join('')}
        </div>
        <div class="search-results__grid">
          ${ADVENTURES.map(a => `
            <div class="card--poster" style="aspect-ratio: 3/4;" onclick="window.location.hash='/adventure/${a.id}'">
              <img class="card__image" src="${a.image}" alt="${a.name}" loading="lazy" />
              <div class="card__overlay"></div>
              <div class="card__top-meta">
                <span class="badge">${a.difficulty}</span>
                <span class="label label--accent">${a.duration}</span>
              </div>
              <div class="card__content">
                <h4 class="card__title">${a.name}</h4>
                <p class="card__subtitle">${a.location}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2);">
                  <span style="font-size: var(--text-sm); color: var(--text-secondary);">${a.price}</span>
                  <span class="card__cta">Explore <span class="btn-arrow">→</span></span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

export function renderStaysPage() {
  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <section class="section" style="padding-top: var(--space-7);">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Stays</h2>
          <p class="section__subtitle">Boutique retreats, mountain lodges, heritage homes — every night is an experience.</p>
        </div>
        <div class="search-results__grid">
          ${STAYS.map(s => `
            <div class="card--poster" style="aspect-ratio: 4/3;" onclick="window.location.hash='/stay/${s.id}'">
              <img class="card__image" src="${s.image}" alt="${s.name}" loading="lazy" />
              <div class="card__overlay"></div>
              <div class="card__top-meta">
                <span class="label">${s.amenities.slice(0,3).join(' · ')}</span>
                <span class="label label--accent">★ ${s.rating}</span>
              </div>
              <div class="card__content">
                <h4 class="card__title">${s.name}</h4>
                <p class="card__subtitle">${s.location}</p>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2);">
                  <span style="font-size: var(--text-sm); color: var(--text-secondary);">From ${s.price}</span>
                  <span class="card__cta">Explore <span class="btn-arrow">→</span></span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

export function renderExperiencesPage() {
  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <section class="section" style="padding-top: var(--space-7);">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Experiences</h2>
          <p class="section__subtitle">Go beyond the checklist — local food, culture, nature, and hidden gems.</p>
        </div>
        <div class="search-results__grid">
          ${EXPERIENCES.map(e => `
            <div class="card--poster" style="aspect-ratio: 3/4;" onclick="window.location.hash='/experience/${e.id}'">
              <img class="card__image" src="${e.image}" alt="${e.name}" loading="lazy" />
              <div class="card__overlay"></div>
              <div class="card__top-meta">
                <span class="badge ${e.accent === 'warm' ? 'badge--warm' : e.accent === 'green' ? 'badge--green' : e.accent === 'violet' ? 'badge--violet' : ''}">${e.name}</span>
                <span class="label label--accent">${e.duration}</span>
              </div>
              <div class="card__content">
                <h4 class="card__title">${e.name}</h4>
                <p class="card__subtitle">${e.location}</p>
                <p style="font-size: var(--text-sm); color: var(--text-muted); margin: var(--space-2) 0;">${e.description}</p>
                <span class="card__cta">Explore <span class="btn-arrow">→</span></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}
