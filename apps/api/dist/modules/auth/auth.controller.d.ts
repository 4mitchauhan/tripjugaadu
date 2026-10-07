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
                role: string;
                isVerified: boolean;
            };
        };
    }>;
    login(body: any): Promise<{
        status: string;
        message: string;
        data: {
            token: string;
            user: {
                id: any;
                email: any;
                firstName: any;
                lastName: any;
                role: any;
                isVerified: any;
            };
        };
    }>;
    getMe(authHeader?: string): Promise<{
        status: string;
        data: {
            user: any;
        };
    }>;
}
