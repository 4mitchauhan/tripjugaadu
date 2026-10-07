var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
let AuthService = class AuthService {
    prisma;
    inMemoryUsers = [
        {
            id: 'usr-amit-01',
            email: 'amit@tripjugaadu.com',
            password: 'password123',
            firstName: 'Amit',
            lastName: 'Sharma',
            role: 'USER',
            avatarUrl: null,
            isVerified: true
        }
    ];
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(body) {
        if (!body.email) {
            throw new BadRequestException('Email is required');
        }
        const existing = this.inMemoryUsers.find(u => u.email.toLowerCase() === body.email.toLowerCase());
        if (existing) {
            throw new BadRequestException('User with this email already exists');
        }
        let fName = body.firstName || 'Traveler';
        let lName = body.lastName || '';
        if (body.fullName) {
            const parts = body.fullName.trim().split(' ');
            fName = parts[0] || 'Traveler';
            lName = parts.slice(1).join(' ') || '';
        }
        const newUser = {
            id: `usr-${Date.now()}`,
            email: body.email.toLowerCase(),
            password: body.password || 'securepass',
            firstName: fName,
            lastName: lName,
            role: 'USER',
            avatarUrl: null,
            isVerified: true
        };
        this.inMemoryUsers.push(newUser);
        const token = `tj_jwt_${Buffer.from(JSON.stringify({ id: newUser.id, email: newUser.email, role: newUser.role })).toString('base64')}`;
        return {
            token,
            user: {
                id: newUser.id,
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                role: newUser.role,
                isVerified: newUser.isVerified
            }
        };
    }
    async login(body) {
        if (!body.email) {
            throw new BadRequestException('Email is required');
        }
        const user = this.inMemoryUsers.find(u => u.email.toLowerCase() === body.email.toLowerCase());
        if (!user) {
            return this.register({ email: body.email, fullName: body.email.split('@')[0] });
        }
        const token = `tj_jwt_${Buffer.from(JSON.stringify({ id: user.id, email: user.email, role: user.role })).toString('base64')}`;
        return {
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
                isVerified: user.isVerified
            }
        };
    }
    async getMe(token) {
        return {
            user: this.inMemoryUsers[0]
        };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map