import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { hashPassword, verifyPassword } from '../../common/crypto.util.js';
import { signJwt, verifyJwt } from '../../common/jwt.util.js';

export interface UserRecord {
  id: string;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'PROVIDER' | 'ADMIN';
  avatarUrl: string | null;
  isVerified: boolean;
  createdAt: string;
}

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  // Pre-hashed credentials for default roles (Amit: USER, Operator: PROVIDER, Admin: ADMIN)
  private inMemoryUsers: UserRecord[] = [
    {
      id: 'usr-amit-01',
      email: 'amit@tripjugaadu.com',
      passwordHash: hashPassword('password123'),
      firstName: 'Amit',
      lastName: 'Sharma',
      role: 'USER',
      avatarUrl: null,
      isVerified: true,
      createdAt: '2026-10-01T00:00:00.000Z',
    },
    {
      id: 'usr-provider-01',
      email: 'operator@himalayaexpeditions.com',
      passwordHash: hashPassword('providerpass123'),
      firstName: 'Vikram',
      lastName: 'Negi',
      role: 'PROVIDER',
      avatarUrl: null,
      isVerified: true,
      createdAt: '2026-10-01T00:00:00.000Z',
    },
    {
      id: 'usr-admin-01',
      email: 'admin@tripjugaadu.com',
      passwordHash: hashPassword('adminpass123'),
      firstName: 'Security',
      lastName: 'Officer',
      role: 'ADMIN',
      avatarUrl: null,
      isVerified: true,
      createdAt: '2026-10-01T00:00:00.000Z',
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  async register(body: {
    email: string;
    password?: string;
    fullName?: string;
    firstName?: string;
    lastName?: string;
    role?: 'USER' | 'PROVIDER';
  }) {
    if (!body.email || typeof body.email !== 'string') {
      throw new BadRequestException('Valid email address is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleanEmail = body.email.trim().toLowerCase();
    if (!emailRegex.test(cleanEmail)) {
      throw new BadRequestException('Invalid email address format');
    }

    const password = body.password || '';
    if (password.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }

    const existing = this.inMemoryUsers.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      throw new BadRequestException('An account with this email address already exists');
    }

    let fName = body.firstName?.trim() || 'Traveler';
    let lName = body.lastName?.trim() || '';
    if (body.fullName) {
      const parts = body.fullName.trim().split(' ');
      fName = parts[0] || 'Traveler';
      lName = parts.slice(1).join(' ') || '';
    }

    // Role cannot be arbitrarily escalated to ADMIN during registration
    const requestedRole: 'USER' | 'PROVIDER' = body.role === 'PROVIDER' ? 'PROVIDER' : 'USER';

    const newUser: UserRecord = {
      id: `usr-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email: cleanEmail,
      passwordHash: hashPassword(password),
      firstName: fName,
      lastName: lName,
      role: requestedRole,
      avatarUrl: null,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };

    this.inMemoryUsers.push(newUser);
    this.logger.log(`New user registered: ${newUser.email} [${newUser.role}]`);

    const token = signJwt({
      sub: newUser.id,
      email: newUser.email,
      role: newUser.role,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    });

    return {
      token,
      user: this.sanitizeUser(newUser),
    };
  }

  async login(body: { email: string; password?: string }) {
    if (!body.email || typeof body.email !== 'string') {
      throw new BadRequestException('Email is required');
    }

    const cleanEmail = body.email.trim().toLowerCase();
    const candidatePassword = body.password || '';

    const user = this.inMemoryUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    // Constant-time check / generic error to prevent user enumeration
    if (!user || !verifyPassword(candidatePassword, user.passwordHash)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = signJwt({
      sub: user.id,
      email: user.email,
      role: user.role,
      firstName: user.firstName,
      lastName: user.lastName,
    });

    this.logger.log(`User logged in: ${user.email} [${user.role}]`);

    return {
      token,
      user: this.sanitizeUser(user),
    };
  }

  async getMe(authHeader?: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authentication token is required');
    }

    const verifyResult = verifyJwt(authHeader);
    if (!verifyResult.valid || !verifyResult.payload) {
      throw new UnauthorizedException(verifyResult.error || 'Invalid or expired token');
    }

    const user = this.inMemoryUsers.find((u) => u.id === verifyResult.payload?.sub);
    if (!user) {
      throw new UnauthorizedException('User account associated with this token no longer exists');
    }

    return {
      user: this.sanitizeUser(user),
    };
  }

  private sanitizeUser(user: UserRecord) {
    const { passwordHash: _, ...safeUser } = user;
    return safeUser;
  }
}
