import { describe, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../src/modules/auth/auth.service.js';
import { BookingsController } from '../src/modules/bookings/bookings.controller.js';
import { BookingsService } from '../src/modules/bookings/bookings.service.js';
import { CouponsService } from '../src/modules/coupons/coupons.service.js';
import { PartnerService } from '../src/modules/partner/partner.service.js';
import { PrismaService } from '../src/common/prisma.service.js';
import { hashPassword, verifyPassword } from '../src/common/crypto.util.js';
import { signJwt, verifyJwt } from '../src/common/jwt.util.js';
import { AuthGuard } from '../src/common/guards/auth.guard.js';
import { RolesGuard } from '../src/common/guards/roles.guard.js';
import { validateEnvironment } from '../src/common/env.validator.js';
import { Reflector } from '@nestjs/core';
import { UnauthorizedException, ForbiddenException } from '@nestjs/common';

describe('TripJugaadu Security & Configuration Hardening Suite (Step H)', () => {
  let prismaService: PrismaService;
  let authService: AuthService;
  let bookingsService: BookingsService;
  let couponsService: CouponsService;
  let partnerService: PartnerService;
  let reflector: Reflector;
  let authGuard: AuthGuard;
  let rolesGuard: RolesGuard;

  const TEST_JWT_SECRET = 'tripjugaadu_test_jwt_secret_token_12345';

  beforeEach(() => {
    process.env.JWT_SECRET = TEST_JWT_SECRET;
    prismaService = new PrismaService();
    authService = new AuthService(prismaService);
    couponsService = new CouponsService(prismaService);
    bookingsService = new BookingsService(prismaService, couponsService);
    partnerService = new PartnerService();

    reflector = new Reflector();
    authGuard = new AuthGuard();
    rolesGuard = new RolesGuard(reflector);
  });

  // Helper to simulate NestJS ExecutionContext
  function createMockContext(headers: Record<string, string> = {}, handlerRoles?: string[], user?: any) {
    const request: any = { headers, user };
    return {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => ({}),
      }),
      getHandler: () => () => {},
      getClass: () => ({}),
    } as any;
  }

  // 1. Password hashing
  it('1. should store passwords using cryptographic salt and scrypt, never plaintext', () => {
    const rawPass = 'SuperSecret123!';
    const hashed = hashPassword(rawPass);

    expect(hashed).not.toBe(rawPass);
    expect(hashed).toContain(':');
    expect(verifyPassword(rawPass, hashed)).toBe(true);
    expect(verifyPassword('WrongPassword', hashed)).toBe(false);
  });

  // 2. Authentication errors prevent user enumeration
  it('2. should reject invalid credentials with generic error to prevent account enumeration', async () => {
    // Non-existent user
    await expect(
      authService.login({ email: 'ghost@example.com', password: 'password123' }),
    ).rejects.toThrow(UnauthorizedException);  

    // Existing user with wrong password
    await expect(
      authService.login({ email: 'amit@tripjugaadu.com', password: 'WrongPassword' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  // 3. Cryptographic JWT signing and verification
  it('3. should generate and verify authentic HMAC-SHA256 signed JWTs', () => {
    const token = signJwt(
      { sub: 'usr-1', email: 'traveler@tripjugaadu.com', role: 'USER' },
      TEST_JWT_SECRET,
    );

    const verified = verifyJwt(token, TEST_JWT_SECRET);
    expect(verified.valid).toBe(true);
    expect(verified.payload?.email).toBe('traveler@tripjugaadu.com');
    expect(verified.payload?.role).toBe('USER');
  });

  // 4. Forged JWT rejection
  it('4. should reject forged or tampered JWTs', () => {
    const validToken = signJwt(
      { sub: 'usr-1', email: 'traveler@tripjugaadu.com', role: 'USER' },
      TEST_JWT_SECRET,
    );

    // Tamper with payload
    const parts = validToken.split('.');
    const tamperedPayload = Buffer.from(JSON.stringify({ sub: 'usr-1', email: 'traveler@tripjugaadu.com', role: 'ADMIN' }))
      .toString('base64url');
    const forgedToken = `${parts[0]}.${tamperedPayload}.${parts[2]}`;

    const verified = verifyJwt(forgedToken, TEST_JWT_SECRET);
    expect(verified.valid).toBe(false);
    expect(verified.error).toContain('Invalid JWT cryptographic signature');
  });

  // 5. Expired JWT rejection
  it('5. should reject expired JWT tokens', () => {
    // Generate token that expired 10 seconds ago
    const expiredToken = signJwt(
      { sub: 'usr-1', email: 'traveler@tripjugaadu.com', role: 'USER' },
      TEST_JWT_SECRET,
      -10,
    );

    const verified = verifyJwt(expiredToken, TEST_JWT_SECRET);
    expect(verified.valid).toBe(false);
    expect(verified.error).toContain('JWT token has expired');
  });

  // 6. Missing authentication on protected endpoints
  it('6. should reject unauthenticated requests to protected endpoints via AuthGuard', () => {
    const context = createMockContext({});
    expect(() => authGuard.canActivate(context)).toThrow(UnauthorizedException);
  });

  // 7. Role-Based Access Control: Customer blocked from Admin operations
  it('7. should reject normal customer attempting admin operations with 403 Forbidden', () => {
    const customerUser = { sub: 'usr-amit-01', email: 'amit@tripjugaadu.com', role: 'USER' };
    const context = createMockContext({}, ['ADMIN'], customerUser);

    // Mock Reflector returning ['ADMIN']
    reflector.getAllAndOverride = () => ['ADMIN'];
    expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
  });

  // 8. Admin successfully permitted on Admin operations
  it('8. should permit admin user with valid token to access admin operations', () => {
    const adminUser = { sub: 'usr-admin-01', email: 'admin@tripjugaadu.com', role: 'ADMIN' };
    const context = createMockContext({}, ['ADMIN'], adminUser);

    reflector.getAllAndOverride = () => ['ADMIN'];
    expect(rolesGuard.canActivate(context)).toBe(true);
  });

  // 9. Unauthorized financial operations blocked
  it('9. should reject customer attempting sensitive finance operations', () => {
    const customerUser = { sub: 'usr-amit-01', email: 'amit@tripjugaadu.com', role: 'USER' };
    const context = createMockContext({}, ['ADMIN'], customerUser);

    reflector.getAllAndOverride = () => ['ADMIN'];
    expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
  });

  // 10. Provider routes protected from non-providers
  it('10. should block standard customers from accessing provider dashboard and operations', () => {
    const customerUser = { sub: 'usr-amit-01', email: 'amit@tripjugaadu.com', role: 'USER' };
    const context = createMockContext({}, ['PROVIDER', 'ADMIN'], customerUser);

    reflector.getAllAndOverride = () => ['PROVIDER', 'ADMIN'];
    expect(() => rolesGuard.canActivate(context)).toThrow(ForbiddenException);
  });

  // 11. Object-Level Access Control (IDOR prevention on bookings)
  it('11. should restrict getMyBookings to only the authenticated user bookings, preventing IDOR', async () => {
    const bookingsController = new BookingsController(bookingsService);

    // Create a booking for Amit
    await bookingsService.createBooking({
      travelerName: 'Amit Sharma',
      travelerEmail: 'amit@tripjugaadu.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    // Create a booking for another customer (Sneha)
    await bookingsService.createBooking({
      travelerName: 'Sneha Patel',
      travelerEmail: 'sneha@example.com',
      travelerPhone: '+91 9876543210',
      itemId: 'rafting',
      travelers: 2,
    });

    // Amit logs in
    const amitToken = signJwt({ sub: 'usr-amit-01', email: 'amit@tripjugaadu.com', role: 'USER' }, TEST_JWT_SECRET);
    const amitBookingsRes = await bookingsController.getMyBookings(`Bearer ${amitToken}`);

    // Amit should only see his own booking, NOT Sneha's booking
    expect(amitBookingsRes.data.every((b: any) => b.travelerEmail === 'amit@tripjugaadu.com')).toBe(true);
    expect(amitBookingsRes.data.some((b: any) => b.travelerEmail === 'sneha@example.com')).toBe(false);
  });

  // 12. Partner API requires X-Partner-Key header (no default fallback)
  it('12. should reject Partner API requests when X-Partner-Key header is missing', () => {
    expect(() => partnerService.validateKey(undefined)).toThrow(UnauthorizedException);
    expect(() => partnerService.validateKey('')).toThrow(UnauthorizedException);
  });

  // 13. Partner API key timing attack resistance
  it('13. should reject invalid Partner API keys using constant-time comparison', () => {
    expect(() => partnerService.validateKey('invalid_key_xyz_12345')).toThrow(UnauthorizedException);
    const valid = partnerService.validateKey('tj_live_ghuk_984128471204');
    expect(valid.name).toBe('Global Hikes & Expeditions UK');
  });

  // 14. Secret sanitization in auth responses
  it('14. should never expose passwordHash in login or getMe responses', async () => {
    const loginRes = await authService.login({ email: 'amit@tripjugaadu.com', password: 'password123' });
    expect((loginRes.user as any).password).toBeUndefined();
    expect((loginRes.user as any).passwordHash).toBeUndefined();

    const meRes = await authService.getMe(`Bearer ${loginRes.token}`);
    expect((meRes.user as any).password).toBeUndefined();
    expect((meRes.user as any).passwordHash).toBeUndefined();
  });

  // 15. Startup environment validation
  it('15. should validate required environment variables at server bootstrap', () => {
    expect(() => validateEnvironment()).not.toThrow();

    // In production, missing critical secret must throw
    const originalEnv = process.env.NODE_ENV;
    const originalJwt = process.env.JWT_SECRET;
    try {
      process.env.NODE_ENV = 'production';
      delete process.env.JWT_SECRET;
      expect(() => validateEnvironment()).toThrow('CRITICAL CONFIGURATION ERROR');
    } finally {
      process.env.NODE_ENV = originalEnv;
      process.env.JWT_SECRET = originalJwt;
    }
  });
});
