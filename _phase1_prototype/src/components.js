/* ============================================================
   TRIPJUGAADU — SHARED COMPONENTS
   Navigation, Footer, Utilities
   ============================================================ */

export function renderNav(transparent = true) {
  return `
    <nav class="nav ${transparent ? 'nav--transparent' : 'nav--glass'}" id="main-nav">
      <div class="nav__inner">
        <a class="nav__logo" onclick="window.location.hash='/'">TRIP<span>JUGAADU</span></a>
        <div class="nav__links">
          <a class="nav__link" onclick="window.location.hash='/explore'">Explore</a>
          <a class="nav__link" onclick="window.location.hash='/adventures'">Adventures</a>
          <a class="nav__link" onclick="window.location.hash='/stays'">Stays</a>
          <a class="nav__link" onclick="window.location.hash='/experiences'">Experiences</a>
          <a class="nav__link" onclick="window.location.hash='/trip-builder'">Trips</a>
        </div>
        <div class="nav__actions">
          <button class="btn btn--ghost btn--sm" onclick="window.location.hash='/login'" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          </button>
          <button class="btn btn--secondary btn--sm" onclick="window.location.hash='/login'">Account</button>
          <button class="nav__hamburger" id="nav-hamburger" aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
      <div class="nav__mobile-menu" id="mobile-menu">
        <a class="nav__mobile-link" onclick="closeMobileMenu(); window.location.hash='/explore'">Explore</a>
        <a class="nav__mobile-link" onclick="closeMobileMenu(); window.location.hash='/adventures'">Adventures</a>
        <a class="nav__mobile-link" onclick="closeMobileMenu(); window.location.hash='/stays'">Stays</a>
        <a class="nav__mobile-link" onclick="closeMobileMenu(); window.location.hash='/experiences'">Experiences</a>
        <a class="nav__mobile-link" onclick="closeMobileMenu(); window.location.hash='/trip-builder'">Trips</a>
        <a class="nav__mobile-link" onclick="closeMobileMenu(); window.location.hash='/dashboard'">Dashboard</a>
        <a class="nav__mobile-link" onclick="closeMobileMenu(); window.location.hash='/login'">Login</a>
      </div>
    </nav>
  `;
}

export function renderFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">TRIP<span>JUGAADU</span></div>
            <p class="footer__tagline">Travel smarter. Explore deeper.<br>Discover India's most incredible destinations, adventures, and experiences.</p>
          </div>
          <div>
            <div class="footer__col-title">Explore</div>
            <a class="footer__link" onclick="window.location.hash='/explore'">Destinations</a>
            <a class="footer__link" onclick="window.location.hash='/adventures'">Adventures</a>
            <a class="footer__link" onclick="window.location.hash='/stays'">Stays</a>
            <a class="footer__link" onclick="window.location.hash='/experiences'">Experiences</a>
            <a class="footer__link" onclick="window.location.hash='/trip-builder'">Trip Builder</a>
          </div>
          <div>
            <div class="footer__col-title">Company</div>
            <a class="footer__link">About Us</a>
            <a class="footer__link">Careers</a>
            <a class="footer__link">Press</a>
            <a class="footer__link">Blog</a>
            <a class="footer__link">Contact</a>
          </div>
          <div>
            <div class="footer__col-title">Support</div>
            <a class="footer__link">Help Center</a>
            <a class="footer__link">Safety</a>
            <a class="footer__link">Cancellation</a>
            <a class="footer__link">Terms</a>
            <a class="footer__link">Privacy</a>
          </div>
        </div>
        <div class="footer__bottom">
          <p class="footer__copyright">© 2024 TripJugaadu. All rights reserved.</p>
          <div style="display:flex; gap: var(--space-4);">
            <a class="footer__link" style="padding:0;">Instagram</a>
            <a class="footer__link" style="padding:0;">Twitter</a>
            <a class="footer__link" style="padding:0;">YouTube</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}

export function renderSearchPanel() {
  return `
    <div class="search-panel">
      <div class="search-panel__field">
        <span class="search-panel__label">Destination</span>
        <span class="search-panel__value">Where to?</span>
      </div>
      <div class="search-panel__field">
        <span class="search-panel__label">Dates</span>
        <span class="search-panel__value">Select dates</span>
      </div>
      <div class="search-panel__field">
        <span class="search-panel__label">Travelers</span>
        <span class="search-panel__value">02 People</span>
      </div>
      <div class="search-panel__field">
        <span class="search-panel__label">Budget</span>
        <span class="search-panel__value">₹10K</span>
      </div>
      <button class="search-panel__btn" onclick="window.location.hash='/search'">
        Search
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </button>
    </div>
  `;
}

export function renderPosterCard(item, type = 'destination') {
  const hash = type === 'destination' ? `/destination/${item.id}` : 
               type === 'adventure' ? `/adventure/${item.id}` : 
               type === 'stay' ? `/stay/${item.id}` :
               `/experience/${item.id}`;
  
  const sizeClass = item.size === 'featured' ? 'dest-grid__item--featured' :
                    item.size === 'wide' ? 'dest-grid__item--wide' :
                    item.size === 'medium' ? 'dest-grid__item--medium' :
                    'dest-grid__item--small';

  return `
    <div class="card--poster ${type === 'destination' ? sizeClass : ''}" onclick="window.location.hash='${hash}'" role="article" tabindex="0">
      <img class="card__image" src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="card__overlay"></div>
      <div class="card__top-meta">
        <span class="label">${item.category || item.difficulty || ''}</span>
        <span class="label label--accent">${item.days || item.duration || item.region || ''}</span>
      </div>
      <div class="card__content">
        <h4 class="card__title">${item.name}</h4>
        <p class="card__subtitle">${item.region || item.location || ''}</p>
        <span class="card__cta">Explore <span class="btn-arrow">→</span></span>
      </div>
    </div>
  `;
}

export function renderInfoCard(item) {
  return `
    <div class="card--info reveal">
      <span class="card__label">${item.label}</span>
      <div class="card__icon">${item.icon}</div>
      <h5 class="card__title" style="font-family: var(--font-body); font-size: var(--text-base);">${item.title}</h5>
      <p class="card__desc">${item.description}</p>
    </div>
  `;
}

// Setup scroll-based nav and reveal animations
export function initPageEffects() {
  // Nav scroll effect
  const nav = document.getElementById('main-nav');
  if (nav) {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        nav.classList.remove('nav--transparent');
        nav.classList.add('nav--glass');
      } else {
        nav.classList.add('nav--transparent');
        nav.classList.remove('nav--glass');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Hamburger
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });
  }

  // Scroll reveals
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => observer.observe(el));
  }

  // Parallax hero image
  const heroBg = document.querySelector('.parallax-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }, { passive: true });
  }

  window.scrollTo(0, 0);
}

// Global mobile menu close
window.closeMobileMenu = function() {
  const hamburger = document.getElementById('nav-hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (hamburger) hamburger.classList.remove('active');
  if (mobileMenu) mobileMenu.classList.remove('active');
};
