/* ============================================================
   TRIPJUGAADU — TRIP BUILDER PAGE
   ============================================================ */

import { DESTINATIONS } from '../data.js';
import { renderNav, renderFooter, initPageEffects } from '../components.js';

export function renderTripBuilderPage() {
  return `
    ${renderNav(false)}
    <div style="height: var(--nav-height);"></div>

    <section class="section" style="text-align: center;">
      <div class="container">
        <div class="section__header reveal" style="text-align: center;">
          <h2 class="section__title" style="display:inline-block;">Build Your Journey</h2>
          <p class="section__subtitle" style="margin: 0 auto;">You bring the idea. We build the journey.</p>
        </div>

        <div class="trip-builder reveal">
          <!-- Steps -->
          <div class="steps" id="trip-steps">
            <div class="step step--active" data-step="1" onclick="setStep(1)">
              <span style="margin-right: var(--space-2); opacity:0.6;">01</span> Destination
            </div>
            <div class="step" data-step="2" onclick="setStep(2)">
              <span style="margin-right: var(--space-2); opacity:0.6;">02</span> Dates
            </div>
            <div class="step" data-step="3" onclick="setStep(3)">
              <span style="margin-right: var(--space-2); opacity:0.6;">03</span> Travelers
            </div>
            <div class="step" data-step="4" onclick="setStep(4)">
              <span style="margin-right: var(--space-2); opacity:0.6;">04</span> Interests
            </div>
            <div class="step" data-step="5" onclick="setStep(5)">
              <span style="margin-right: var(--space-2); opacity:0.6;">05</span> Budget
            </div>
          </div>

          <!-- Step Content -->
          <div class="trip-builder__content" id="step-content">
            <!-- Step 1: Destination -->
            <div id="step-1" class="step-panel">
              <div style="margin-bottom: var(--space-5);">
                <span class="label label--accent">Select Your Destination</span>
              </div>
              <div class="trip-builder__destinations">
                ${DESTINATIONS.map((d, i) => `
                  <div class="trip-builder__dest-card ${i === 0 ? 'trip-builder__dest-card--active' : ''}" data-dest="${d.id}" onclick="selectDest(this, '${d.id}')">
                    <img src="${d.image}" alt="${d.name}" loading="lazy" />
                    <div class="name">${d.name}</div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Step 2: Dates -->
            <div id="step-2" class="step-panel" style="display:none;">
              <div style="margin-bottom: var(--space-5);">
                <span class="label label--accent">Select Your Dates</span>
              </div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); max-width: 500px; margin: 0 auto;">
                <div>
                  <label class="auth-form__label">Check-in</label>
                  <input type="date" class="auth-form__input" value="2024-10-12" />
                </div>
                <div>
                  <label class="auth-form__label">Check-out</label>
                  <input type="date" class="auth-form__input" value="2024-10-15" />
                </div>
              </div>
            </div>

            <!-- Step 3: Travelers -->
            <div id="step-3" class="step-panel" style="display:none;">
              <div style="margin-bottom: var(--space-5);">
                <span class="label label--accent">How Many Travelers?</span>
              </div>
              <div style="display: flex; justify-content: center; gap: var(--space-8); margin-top: var(--space-6);">
                <div style="text-align: center;">
                  <span class="label" style="display: block; margin-bottom: var(--space-3);">Adults</span>
                  <div style="display: flex; align-items: center; gap: var(--space-4);">
                    <button class="btn btn--secondary btn--sm" style="width:36px;height:36px;padding:0;">−</button>
                    <span style="font-family: var(--font-display); font-size: var(--display-md);">02</span>
                    <button class="btn btn--secondary btn--sm" style="width:36px;height:36px;padding:0;">+</button>
                  </div>
                </div>
                <div style="text-align: center;">
                  <span class="label" style="display: block; margin-bottom: var(--space-3);">Children</span>
                  <div style="display: flex; align-items: center; gap: var(--space-4);">
                    <button class="btn btn--secondary btn--sm" style="width:36px;height:36px;padding:0;">−</button>
                    <span style="font-family: var(--font-display); font-size: var(--display-md);">00</span>
                    <button class="btn btn--secondary btn--sm" style="width:36px;height:36px;padding:0;">+</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step 4: Interests -->
            <div id="step-4" class="step-panel" style="display:none;">
              <div style="margin-bottom: var(--space-5);">
                <span class="label label--accent">What Interests You?</span>
              </div>
              <div class="trip-builder__tags" style="justify-content: center;">
                ${['Adventure', 'Nature', 'Culture', 'Food', 'Relaxation', 'Photography', 'Wellness', 'Nightlife', 'History', 'Wildlife'].map((tag, i) => `
                  <span class="tag ${i < 3 ? 'tag--active' : ''}" onclick="this.classList.toggle('tag--active')">${tag}</span>
                `).join('')}
              </div>
            </div>

            <!-- Step 5: Budget -->
            <div id="step-5" class="step-panel" style="display:none;">
              <div style="margin-bottom: var(--space-5);">
                <span class="label label--accent">Set Your Budget</span>
              </div>
              <div style="max-width: 500px; margin: 0 auto; text-align: center;">
                <div style="font-family: var(--font-display); font-size: var(--display-md); margin-bottom: var(--space-5);">
                  ₹5,000 — ₹15,000
                </div>
                <div class="trip-builder__slider">
                  <input type="range" min="1000" max="50000" value="15000" step="1000" />
                  <div class="trip-builder__slider-labels">
                    <span>₹1,000</span>
                    <span>₹50,000</span>
                  </div>
                </div>
                <p style="font-size: var(--text-sm); color: var(--text-muted); margin-top: var(--space-4);">Per person, all inclusive</p>
              </div>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <div style="display: flex; justify-content: space-between; margin-top: var(--space-5);">
            <button class="btn btn--ghost" id="prev-btn" onclick="prevStep()" style="visibility: hidden;">← Back</button>
            <button class="btn btn--primary btn--lg" id="next-btn" onclick="nextStep()">Continue <span class="btn-arrow">→</span></button>
          </div>
        </div>
      </div>
    </section>

    ${renderFooter()}
  `;
}

// Trip Builder step management (attached to window in main.js)
let currentStep = 1;

window.setStep = function(step) {
  currentStep = step;
  updateStepUI();
};

window.nextStep = function() {
  if (currentStep < 5) {
    currentStep++;
    updateStepUI();
  } else {
    window.location.hash = '/itinerary';
  }
};

window.prevStep = function() {
  if (currentStep > 1) {
    currentStep--;
    updateStepUI();
  }
};

window.selectDest = function(el, id) {
  document.querySelectorAll('.trip-builder__dest-card').forEach(c => c.classList.remove('trip-builder__dest-card--active'));
  el.classList.add('trip-builder__dest-card--active');
};

function updateStepUI() {
  // Update step indicators
  document.querySelectorAll('.step').forEach(s => {
    const stepNum = parseInt(s.dataset.step);
    s.classList.remove('step--active', 'step--completed');
    if (stepNum === currentStep) s.classList.add('step--active');
    else if (stepNum < currentStep) s.classList.add('step--completed');
  });

  // Show/hide panels
  document.querySelectorAll('.step-panel').forEach(p => p.style.display = 'none');
  const activePanel = document.getElementById(`step-${currentStep}`);
  if (activePanel) activePanel.style.display = 'block';

  // Prev button visibility
  const prevBtn = document.getElementById('prev-btn');
  if (prevBtn) prevBtn.style.visibility = currentStep > 1 ? 'visible' : 'hidden';

  // Next button text
  const nextBtn = document.getElementById('next-btn');
  if (nextBtn) nextBtn.innerHTML = currentStep === 5 ? 'Build My Trip <span class="btn-arrow">→</span>' : 'Continue <span class="btn-arrow">→</span>';
}
