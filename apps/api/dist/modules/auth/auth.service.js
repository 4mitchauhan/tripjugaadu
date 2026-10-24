var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var AuthService_1;
import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { hashPassword, verifyPassword } from '../../common/crypto.util.js';
import { signJwt, verifyJwt } from '../../common/jwt.util.js';
let AuthService = AuthService_1 = class AuthService {
    prisma;
    logger = new Logger(AuthService_1.name);
    inMemoryUsers = [
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
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(body) {
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
        const requestedRole = body.role === 'PROVIDER' ? 'PROVIDER' : 'USER';
        const newUser = {
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
    async login(body) {
        if (!body.email || typeof body.email !== 'string') {
            throw new BadRequestException('Email is required');
        }
        const cleanEmail = body.email.trim().toLowerCase();
        const candidatePassword = body.password || '';
        const user = this.inMemoryUsers.find((u) => u.email.toLowerCase() === cleanEmail);
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
    async getMe(authHeader) {
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
    sanitizeUser(user) {
        const { passwordHash: _, ...safeUser } = user;
        return safeUser;
    }
};
AuthService = AuthService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map