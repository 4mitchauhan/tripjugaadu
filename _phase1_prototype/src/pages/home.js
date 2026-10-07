/* ============================================================
   TRIPJUGAADU — HOMEPAGE
   ============================================================ */

import { DESTINATIONS, ADVENTURES, STAYS, EXPERIENCES, KBYG_ITEMS } from '../data.js';
import { renderNav, renderFooter, renderSearchPanel, renderPosterCard, renderInfoCard, initPageEffects } from '../components.js';

export function renderHomePage() {
  return `
    ${renderNav(true)}

    <!-- HERO -->
    <section class="hero" id="hero">
      <div class="hero__bg">
        <img class="parallax-bg" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=85" alt="Himalayan landscape" />
      </div>
      <div class="hero__overlay"></div>
      <div class="hero__content">
        <p class="hero__eyebrow">TripJugaadu Presents</p>
        <h1 class="hero__title">Your Next<br>Adventure<br>Starts Here</h1>
        <p class="hero__subtitle">Discover places. Prepare better. Build your journey. Travel smarter across India.</p>
        <div class="hero__actions">
          <button class="btn btn--primary btn--lg" onclick="window.location.hash='/explore'">Explore India <span class="btn-arrow">→</span></button>
          <button class="btn btn--secondary btn--lg" onclick="window.location.hash='/trip-builder'">Build My Trip</button>
        </div>
      </div>
      <div class="hero__search">
        ${renderSearchPanel()}
      </div>
    </section>

    <!-- DESTINATIONS -->
    <section class="section" id="destinations">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Where Will You Go Next?</h2>
          <p class="section__subtitle">Discover India's most breathtaking destinations — from sacred rivers to snow-capped peaks.</p>
        </div>
        <div class="dest-grid">
          ${DESTINATIONS.map(d => renderPosterCard(d, 'destination')).join('')}
        </div>
      </div>
    </section>

    <!-- ADVENTURES -->
    <section class="section" id="adventures" style="background: linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary));">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Chase the Unexpected</h2>
          <p class="section__subtitle">From raging rapids to soaring skies — push your limits with India's most thrilling adventures.</p>
        </div>
        <div class="adventure-scroll">
          ${ADVENTURES.map(a => renderPosterCard(a, 'adventure')).join('')}
        </div>
      </div>
    </section>

    <!-- STAYS -->
    <section class="section" id="stays">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Stay Somewhere Worth Remembering</h2>
          <p class="section__subtitle">Boutique retreats, mountain lodges, and heritage homes — every night is an experience.</p>
        </div>
        <div class="stays-grid">
          ${STAYS.map(s => {
            const sizeClass = s.size === 'large' ? 'stays-grid__item--large' :
                              s.size === 'medium' ? 'stays-grid__item--medium' :
                              'stays-grid__item--small';
            return `
              <div class="${sizeClass}">
                <div class="card--poster" style="aspect-ratio: ${s.size === 'large' ? '4/3' : '3/2'};" onclick="window.location.hash='/stay/${s.id}'">
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
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </section>

    <!-- EXPERIENCES -->
    <section class="section" id="experiences" style="background: linear-gradient(to bottom, var(--bg-primary), var(--bg-secondary), var(--bg-primary));">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Go Beyond the Checklist</h2>
          <p class="section__subtitle">Local food, culture, wellness, and hidden gems — the moments that make a trip unforgettable.</p>
        </div>
        <div class="experience-scroll">
          ${EXPERIENCES.map(e => `
            <div class="card--poster" onclick="window.location.hash='/experience/${e.id}'">
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

    <!-- KNOW BEFORE YOU GO -->
    <section class="section" id="kbyg">
      <div class="container">
        <div class="section__header reveal">
          <h2 class="section__title">Know Before You Go</h2>
          <p class="section__subtitle">Everything you need to feel prepared before your journey.</p>
        </div>
        <div class="kbyg-grid">
          <div class="kbyg-grid__cards">
            ${KBYG_ITEMS.map(item => renderInfoCard(item)).join('')}
          </div>
          <div class="kbyg-grid__readiness reveal">
            <span class="label label--accent" style="margin-bottom: var(--space-4);">Trip Readiness</span>
            <h4 style="font-family: var(--font-display); font-size: var(--display-sm); margin-bottom: var(--space-1);">Rishikesh</h4>
            <span class="label" style="margin-bottom: var(--space-5);">03 Days / 02 Nights</span>
            <div class="progress-ring" style="margin: 0 auto var(--space-5);">
              <svg class="progress-ring__svg" width="120" height="120" viewBox="0 0 120 120">
                <circle class="progress-ring__bg" cx="60" cy="60" r="52" />
                <circle class="progress-ring__fill" cx="60" cy="60" r="52" 
                  stroke-dasharray="326.73" 
                  stroke-dashoffset="65.35" />
              </svg>
              <span class="progress-ring__text">80%</span>
            </div>
            <div style="text-align: left; width: 100%;">
              ${['Stay', 'Adventure', 'Itinerary', 'Packing'].map(item => `
                <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) 0; border-bottom: 1px solid var(--border-color);">
                  <span style="color: var(--status-success);">✓</span>
                  <span style="font-size: var(--text-sm); text-transform: uppercase; letter-spacing: var(--tracking-wider); font-weight: 500;">${item}</span>
                </div>
              `).join('')}
              <div style="display: flex; align-items: center; gap: var(--space-3); padding: var(--space-2) 0;">
                <span style="color: var(--text-muted);">○</span>
                <span style="font-size: var(--text-sm); text-transform: uppercase; letter-spacing: var(--tracking-wider); font-weight: 500; color: var(--text-muted);">Conditions Check</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- TRIP BUILDER CTA -->
    <section class="section" style="background: linear-gradient(135deg, var(--bg-secondary), var(--bg-deep)); text-align: center;">
      <div class="container reveal">
        <h2 class="section__title" style="margin: 0 auto var(--space-4);">Build Your Journey</h2>
        <p class="section__subtitle" style="margin: 0 auto var(--space-6);">You bring the idea. We build the journey. Create a personalized trip in minutes.</p>
        <button class="btn btn--primary btn--lg" onclick="window.location.hash='/trip-builder'">Start Building <span class="btn-arrow">→</span></button>
      </div>
    </section>

    ${renderFooter()}
  `;
}
