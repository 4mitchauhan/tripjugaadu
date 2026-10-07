import { AdminService } from './admin.service.js';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getPlatformStats(): Promise<{
        status: string;
        data: {
            grossMerchandiseValue: string;
            totalBookings: number;
            verifiedProviders: number;
            pendingApprovals: number;
            activeTravelers: number;
            systemHealth: string;
        };
    }>;
    getDashboard(): Promise<{
        status: string;
        data: {
            grossMerchandiseValue: string;
            totalBookings: number;
            verifiedProviders: number;
            pendingApprovals: number;
            activeTravelers: number;
            systemHealth: string;
        };
    }>;
    getPendingProviders(): Promise<{
        status: string;
        count: number;
        data: any[];
    }>;
    approveProvider(id: string, approved: boolean, reason?: string): Promise<{
        status: string;
        message: string;
        data: {
            provider: any;
            action: any;
            note: string;
        };
    }>;
    getPendingListings(): Promise<{
        status: string;
        count: number;
        data: any[];
    }>;
    approveListing(id: string, approved: boolean): Promise<{
        status: string;
        message: string;
        data: {
            listing: any;
            status: any;
        };
    }>;
    getAuditLogs(): Promise<{
        status: string;
        count: number;
        data: any[];
    }>;
}
