/* ============================================================
   TRIPJUGAADU — AUTH PAGES (Login / Signup)
   ============================================================ */

import { renderNav } from '../components.js';

export function renderLoginPage() {
  return `
    ${renderNav(false)}

    <div class="auth-layout">
      <div class="auth-visual">
        <div class="auth-visual__bg">
          <img src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80" alt="Mountain landscape" />
        </div>
        <div class="auth-visual__overlay"></div>
        <div class="auth-visual__content">
          <h2 style="font-size: var(--display-xl); margin-bottom: var(--space-4);">TRIP<span style="color: var(--color-accent);">JUGAADU</span></h2>
          <p style="font-size: var(--text-lg); color: var(--text-secondary);">Travel smarter. Explore deeper.</p>
        </div>
      </div>

      <div class="auth-form-section">
        <div class="auth-form">
          <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-7);">
            <span class="tag tag--active" id="tab-login" onclick="showAuthTab('login')" style="flex:1; justify-content:center;">Login</span>
            <span class="tag" id="tab-signup" onclick="showAuthTab('signup')" style="flex:1; justify-content:center;">Sign Up</span>
          </div>

          <!-- Login Form -->
          <div id="form-login">
            <p class="auth-form__title">Login to Your Account</p>
            <div class="auth-form__group">
              <label class="auth-form__label">Email</label>
              <input type="email" class="auth-form__input" placeholder="your@email.com" />
            </div>
            <div class="auth-form__group">
              <label class="auth-form__label">Password</label>
              <input type="password" class="auth-form__input" placeholder="Enter your password" />
            </div>
            <button class="btn btn--primary btn--lg btn--full" onclick="window.location.hash='/dashboard'" style="margin-top: var(--space-4);">Login <span class="btn-arrow">→</span></button>
          </div>

          <!-- Signup Form -->
          <div id="form-signup" style="display: none;">
            <p class="auth-form__title">Create Your Account</p>
            <div class="auth-form__group">
              <label class="auth-form__label">Full Name</label>
              <input type="text" class="auth-form__input" placeholder="Your full name" />
            </div>
            <div class="auth-form__group">
              <label class="auth-form__label">Email</label>
              <input type="email" class="auth-form__input" placeholder="your@email.com" />
            </div>
            <div class="auth-form__group">
              <label class="auth-form__label">Password</label>
              <input type="password" class="auth-form__input" placeholder="Create a password" />
            </div>
            <div class="auth-form__group">
              <label class="auth-form__label">Confirm Password</label>
              <input type="password" class="auth-form__input" placeholder="Confirm your password" />
            </div>
            <button class="btn btn--primary btn--lg btn--full" onclick="window.location.hash='/dashboard'" style="margin-top: var(--space-4);">Sign Up <span class="btn-arrow">→</span></button>
          </div>

          <div class="auth-form__divider">or continue with</div>

          <div class="auth-form__social">
            <button class="auth-form__social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
              Google
            </button>
            <button class="auth-form__social-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              Apple
            </button>
          </div>

          <p class="auth-form__footer">
            <span id="auth-footer-text">Don't have an account? </span>
            <a style="cursor:pointer;" onclick="showAuthTab(document.getElementById('form-signup').style.display === 'none' ? 'signup' : 'login')">
              <span id="auth-footer-link">Sign up</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  `;
}

window.showAuthTab = function(tab) {
  const loginForm = document.getElementById('form-login');
  const signupForm = document.getElementById('form-signup');
  const loginTab = document.getElementById('tab-login');
  const signupTab = document.getElementById('tab-signup');
  const footerText = document.getElementById('auth-footer-text');
  const footerLink = document.getElementById('auth-footer-link');

  if (tab === 'login') {
    if (loginForm) loginForm.style.display = 'block';
    if (signupForm) signupForm.style.display = 'none';
    if (loginTab) loginTab.classList.add('tag--active');
    if (signupTab) signupTab.classList.remove('tag--active');
    if (footerText) footerText.textContent = "Don't have an account? ";
    if (footerLink) footerLink.textContent = 'Sign up';
  } else {
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'block';
    if (loginTab) loginTab.classList.remove('tag--active');
    if (signupTab) signupTab.classList.add('tag--active');
    if (footerText) footerText.textContent = 'Already have an account? ';
    if (footerLink) footerLink.textContent = 'Login';
  }
};
