import { PrismaService } from '../../common/prisma.service.js';
interface CreateTripDto {
    destinationId?: string;
    startDate?: string;
    endDate?: string;
    travelersCount?: number;
    interests?: string[];
    budgetTier?: string;
    title?: string;
    days?: any[];
    unscheduledItems?: any[];
    budgetLimit?: number | null;
}
export declare class TripsService {
    private readonly prisma;
    private inMemoryTrips;
    constructor(prisma: PrismaService);
    createTrip(dto: CreateTripDto): Promise<{
        id: string;
        title: string;
        destinationId: string;
        destinationName: string;
        startDate: string;
        endDate: string;
        travelersCount: number;
        budgetTier: string;
        budgetLimit: number | null;
        unscheduledItems: any[];
        readinessScore: number;
        days: {
            day: any;
            label: any;
            items: any;
        }[];
    }>;
    findUserTrips(): Promise<any[]>;
    findById(id: string): Promise<any>;
}
export {};
