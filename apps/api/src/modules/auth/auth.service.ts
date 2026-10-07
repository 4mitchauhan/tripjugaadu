import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';

@Injectable()
export class AuthService {
  private inMemoryUsers: any[] = [
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

  constructor(private readonly prisma: PrismaService) {}

  async register(body: { email: string; password?: string; fullName?: string; firstName?: string; lastName?: string }) {
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

  async login(body: { email: string; password?: string }) {
    if (!body.email) {
      throw new BadRequestException('Email is required');
    }

    const user = this.inMemoryUsers.find(u => u.email.toLowerCase() === body.email.toLowerCase());
    if (!user) {
      // Demo auto-registration for streamlined login or check
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

  async getMe(token?: string) {
    return {
      user: this.inMemoryUsers[0]
    };
  }
}
