import { PrismaService } from '../../common/prisma.service.js';
interface CreateTripDto {
    destinationId: string;
    startDate: string;
    endDate: string;
    travelersCount?: number;
    interests?: string[];
    budgetTier?: string;
    title?: string;
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
        readinessScore: number;
        days: {
            day: number;
            label: string;
            items: {
                id: string;
                name: string;
                time: string;
                duration: string;
                status: string;
                price: string;
            }[];
        }[];
    }>;
    findUserTrips(): Promise<any[]>;
    findById(id: string): Promise<any>;
}
export {};
