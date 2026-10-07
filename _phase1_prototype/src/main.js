/* ============================================================
   TRIPJUGAADU — MAIN APPLICATION
   Router setup and page initialization
   ============================================================ */

import { Router } from './router.js';
import { initPageEffects } from './components.js';

// Pages
import { renderHomePage } from './pages/home.js';
import { renderExplorePage, renderAdventuresPage, renderStaysPage, renderExperiencesPage } from './pages/explore.js';
import { renderDestinationDetailPage, renderAdventureDetailPage, renderStayDetailPage, renderExperienceDetailPage } from './pages/details.js';
import { renderTripBuilderPage } from './pages/trip-builder.js';
import { renderItineraryPage } from './pages/itinerary.js';
import { renderBookingPage, renderConfirmationPage } from './pages/booking.js';
import { renderDashboardPage } from './pages/dashboard.js';
import { renderLoginPage } from './pages/auth.js';
import { renderSearchPage } from './pages/search.js';

const app = document.getElementById('app');
const router = new Router();

function renderPage(html) {
  app.innerHTML = html;
  app.classList.add('page-enter');
  setTimeout(() => app.classList.remove('page-enter'), 500);
  initPageEffects();
}

// ── ROUTES ──

router
  // Public
  .addRoute('/', () => renderPage(renderHomePage()))
  .addRoute('/explore', () => renderPage(renderExplorePage()))
  .addRoute('/adventures', () => renderPage(renderAdventuresPage()))
  .addRoute('/stays', () => renderPage(renderStaysPage()))
  .addRoute('/experiences', () => renderPage(renderExperiencesPage()))
  .addRoute('/search', () => renderPage(renderSearchPage()))
  
  // Detail pages
  .addRoute('/destination/:id', (params) => renderPage(renderDestinationDetailPage(params)))
  .addRoute('/adventure/:id', (params) => renderPage(renderAdventureDetailPage(params)))
  .addRoute('/stay/:id', (params) => renderPage(renderStayDetailPage(params)))
  .addRoute('/experience/:id', (params) => renderPage(renderExperienceDetailPage(params)))
  
  // Planning
  .addRoute('/trip-builder', () => renderPage(renderTripBuilderPage()))
  .addRoute('/itinerary', () => renderPage(renderItineraryPage()))
  
  // Booking
  .addRoute('/booking', () => renderPage(renderBookingPage()))
  .addRoute('/confirmation', () => renderPage(renderConfirmationPage()))
  
  // User
  .addRoute('/login', () => renderPage(renderLoginPage()))
  .addRoute('/dashboard', () => renderPage(renderDashboardPage()));

// Start
router.start();
