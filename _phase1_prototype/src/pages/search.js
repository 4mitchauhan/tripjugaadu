/* ============================================================
   TRIPJUGAADU — SEARCH RESULTS PAGE
   ============================================================ */

import { ADVENTURES, DESTINATIONS, STAYS } from '../data.js';
import { renderNav, renderFooter } from '../components.js';

export function renderSearchPage() {
  const allResults = [
    ...ADVENTURES.map(a => ({ ...a, type: 'Adventure' })),
    ...DESTINATIONS.map(d => ({ ...d, type: 'Destination', price: '', difficulty: d.category })),
    ...STAYS.map(s => ({ ...s, type: 'Stay', difficulty: '', duration: '' }))
  ];

  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <section class="section" style="padding-top: var(--space-7);">
      <div class="container">
        <!-- Search Bar -->
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-5); display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6); flex-wrap: wrap;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <span style="font-weight: 600;">Rishikesh</span>
          <span style="color: var(--text-muted);">·</span>
          <span class="label">12–15 Oct</span>
          <span style="color: var(--text-muted);">·</span>
          <span class="label">02 Travelers</span>
          <span style="flex:1;"></span>
          <span class="label label--accent" style="cursor: pointer;">Modify Search</span>
        </div>

        <div class="search-results">
          <!-- Filters -->
          <aside class="search-filters">
            <div class="filter-group">
              <div class="filter-group__title">Category</div>
              ${['All', 'Adventures', 'Destinations', 'Stays', 'Experiences'].map((f, i) => `
                <label class="filter-option">
                  <input type="radio" name="category" ${i === 0 ? 'checked' : ''} />
                  ${f}
                </label>
              `).join('')}
            </div>
            <div class="filter-group">
              <div class="filter-group__title">Price Range</div>
              <div style="padding: var(--space-2) 0;">
                <input type="range" min="0" max="50000" value="25000" style="width:100%; accent-color: var(--color-accent);" />
                <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); color: var(--text-muted);">
                  <span>₹0</span>
                  <span>₹50,000</span>
                </div>
              </div>
            </div>
            <div class="filter-group">
              <div class="filter-group__title">Difficulty</div>
              ${['Easy', 'Moderate', 'Hard', 'Extreme'].map(f => `
                <label class="filter-option">
                  <input type="checkbox" />
                  ${f}
                </label>
              `).join('')}
            </div>
            <div class="filter-group">
              <div class="filter-group__title">Rating</div>
              ${['4.5+', '4.0+', '3.5+'].map(f => `
                <label class="filter-option">
                  <input type="radio" name="rating" />
                  ★ ${f}
                </label>
              `).join('')}
            </div>
          </aside>

          <!-- Results Grid -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-5);">
              <span class="label">${allResults.length} Results Found</span>
              <select style="background: var(--bg-card); border: 1px solid var(--border-color); color: var(--text-primary); padding: var(--space-2) var(--space-3); border-radius: var(--radius-md); font-size: var(--text-xs);">
                <option>Most Relevant</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
            <div class="search-results__grid">
              ${allResults.map(r => {
                const hash = r.type === 'Adventure' ? `/adventure/${r.id}` :
                             r.type === 'Stay' ? `/stay/${r.id}` :
                             `/destination/${r.id}`;
                return `
                  <div class="card--poster" style="aspect-ratio: 3/4;" onclick="window.location.hash='${hash}'">
                    <img class="card__image" src="${r.image}" alt="${r.name}" loading="lazy" />
                    <div class="card__overlay"></div>
                    <div class="card__top-meta">
                      <span class="badge">${r.type}</span>
                      <span class="label label--accent">${r.duration || r.days || ''}</span>
                    </div>
                    <div class="card__content">
                      <h4 class="card__title">${r.name}</h4>
                      <p class="card__subtitle">${r.location || r.region || ''}</p>
                      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: var(--space-2);">
                        <span style="font-size: var(--text-sm); color: var(--text-secondary);">${r.price || ''}</span>
                        <span class="card__cta">View <span class="btn-arrow">→</span></span>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}
