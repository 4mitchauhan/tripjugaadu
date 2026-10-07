'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('amit@tripjugaadu.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Amit Sharma');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="pt-20 min-h-screen flex items-center justify-center py-12">
      <div className="container max-w-5xl">
        <div className="auth-layout rounded-3xl overflow-hidden border border-[var(--border-color)]">
          {/* Visual Left Banner */}
          <div className="auth-visual relative hidden md:block">
            <div className="auth-visual__bg">
              <img
                src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80"
                alt="Himalayan ridge"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="auth-visual__overlay"></div>
            <div className="auth-visual__content p-10 z-10 relative">
              <span className="badge mb-3">Traveler Portal</span>
              <h2 className="font-display text-5xl uppercase tracking-wider text-white">
                TRIP<span className="text-[var(--color-accent)]">JUGAADU</span>
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mt-2">
                Travel smarter. Explore deeper. Access your personal itineraries, saved destinations, and travel readiness checklists.
              </p>
            </div>
          </div>

          {/* Form Right Section */}
          <div className="auth-form-section p-8 md:p-12 bg-[var(--bg-secondary)] flex flex-col justify-center">
            <div className="auth-form max-w-md mx-auto w-full">
              {/* Tab Selector */}
              <div className="flex gap-4 mb-8">
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`tag flex-1 justify-center py-2.5 cursor-pointer text-sm font-semibold uppercase tracking-wider ${
                    isLogin ? 'tag--active' : ''
                  }`}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`tag flex-1 justify-center py-2.5 cursor-pointer text-sm font-semibold uppercase tracking-wider ${
                    !isLogin ? 'tag--active' : ''
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Login Form */}
              {isLogin ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="auth-form__title text-2xl font-bold uppercase tracking-wide text-white">Welcome Back</h3>
                  
                  <div className="auth-form__group">
                    <label className="auth-form__label">Email Address</label>
                    <input
                      type="email"
                      required
                      className="auth-form__input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="auth-form__group">
                    <label className="auth-form__label">Password</label>
                    <input
                      type="password"
                      required
                      className="auth-form__input"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary btn--lg btn--full mt-6"
                  >
                    Log In <span className="btn-arrow">→</span>
                  </button>
                </form>
              ) : (
                /* Signup Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="auth-form__title text-2xl font-bold uppercase tracking-wide text-white">Create Account</h3>

                  <div className="auth-form__group">
                    <label className="auth-form__label">Full Legal Name</label>
                    <input
                      type="text"
                      required
                      className="auth-form__input"
                      placeholder="e.g. Amit Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="auth-form__group">
                    <label className="auth-form__label">Email Address</label>
                    <input
                      type="email"
                      required
                      className="auth-form__input"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="auth-form__group">
                    <label className="auth-form__label">Password</label>
                    <input
                      type="password"
                      required
                      className="auth-form__input"
                      placeholder="Create password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn--primary btn--lg btn--full mt-6"
                  >
                    Create Account <span className="btn-arrow">→</span>
                  </button>
                </form>
              )}

              <div className="auth-form__divider my-6 text-center text-xs text-[var(--text-muted)] uppercase tracking-wider">
                or continue with
              </div>

              {/* Social Login */}
              <div className="auth-form__social grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="auth-form__social-btn py-2.5 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:border-[var(--color-accent)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => router.push('/dashboard')}
                  className="auth-form__social-btn py-2.5 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-white text-xs font-semibold flex items-center justify-center gap-2 hover:border-[var(--color-accent)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  Apple
                </button>
              </div>

              <p className="auth-form__footer text-center text-xs text-[var(--text-muted)] mt-6">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-[var(--color-accent)] font-semibold hover:underline"
                >
                  {isLogin ? 'Sign up free' : 'Log in here'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
