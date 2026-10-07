import { PrismaService } from '../../common/prisma.service.js';
export declare class AuthService {
    private readonly prisma;
    private inMemoryUsers;
    constructor(prisma: PrismaService);
    register(body: {
        email: string;
        password?: string;
        fullName?: string;
        firstName?: string;
        lastName?: string;
    }): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            firstName: string;
            lastName: string;
            role: string;
            isVerified: boolean;
        };
    }>;
    login(body: {
        email: string;
        password?: string;
    }): Promise<{
        token: string;
        user: {
            id: any;
            email: any;
            firstName: any;
            lastName: any;
            role: any;
            isVerified: any;
        };
    }>;
    getMe(token?: string): Promise<{
        user: any;
    }>;
}
