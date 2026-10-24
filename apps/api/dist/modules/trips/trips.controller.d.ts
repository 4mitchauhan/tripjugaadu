import { TripsService } from './trips.service.js';
export declare class TripsController {
    private readonly tripsService;
    constructor(tripsService: TripsService);
    createTrip(body: any): Promise<{
        status: string;
        message: string;
        data: {
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
        };
    }>;
    getMyTrips(): Promise<{
        status: string;
        count: number;
        data: any[];
    }>;
    getTripById(id: string): Promise<{
        status: string;
        data: any;
    }>;
}
