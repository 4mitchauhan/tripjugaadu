import { AuthService } from './auth.service.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: any): Promise<{
        status: string;
        message: string;
        data: {
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
        };
    }>;
    login(body: any): Promise<{
        status: string;
        message: string;
        data: {
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
        };
    }>;
    getMe(authHeader?: string): Promise<{
        status: string;
        data: {
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
        };
    }>;
}
