import { PrismaService } from '../../common/prisma.service.js';
export declare class AdminService {
    private readonly prisma;
    private auditLogs;
    private pendingProviders;
    private pendingListings;
    constructor(prisma: PrismaService);
    getPlatformStats(): Promise<{
        grossMerchandiseValue: string;
        totalBookings: number;
        verifiedProviders: number;
        pendingApprovals: number;
        activeTravelers: number;
        systemHealth: string;
    }>;
    getPendingProviders(): Promise<any[]>;
    approveProvider(id: string, approved: boolean, reason?: string): Promise<{
        provider: any;
        action: any;
        note: string;
    }>;
    getPendingListings(): Promise<any[]>;
    approveListing(id: string, approved: boolean): Promise<{
        listing: any;
        status: any;
    }>;
    getAuditLogs(): Promise<any[]>;
}
