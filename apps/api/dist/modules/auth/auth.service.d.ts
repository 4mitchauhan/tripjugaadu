import { PrismaService } from '../../common/prisma.service.js';
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
export declare class AuthService {
    private readonly prisma;
    private readonly logger;
    private inMemoryUsers;
    constructor(prisma: PrismaService);
    register(body: {
        email: string;
        password?: string;
        fullName?: string;
        firstName?: string;
        lastName?: string;
        role?: 'USER' | 'PROVIDER';
    }): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: "USER" | "PROVIDER" | "ADMIN";
            avatarUrl: string | null;
            isVerified: boolean;
            createdAt: string;
        };
    }>;
    login(body: {
        email: string;
        password?: string;
    }): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: "USER" | "PROVIDER" | "ADMIN";
            avatarUrl: string | null;
            isVerified: boolean;
            createdAt: string;
        };
    }>;
    getMe(authHeader?: string): Promise<{
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: "USER" | "PROVIDER" | "ADMIN";
            avatarUrl: string | null;
            isVerified: boolean;
            createdAt: string;
        };
    }>;
    private sanitizeUser;
}
