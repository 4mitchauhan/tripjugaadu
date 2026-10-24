import { ProvidersService, ProviderRegistrationDto, CreateListingDto } from './providers.service.js';
export declare class ProvidersController {
    private readonly providersService;
    constructor(providersService: ProvidersService);
    register(body: ProviderRegistrationDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            businessName: string;
            businessRegNo: any;
            ownerName: any;
            email: string;
            phone: string;
            activityRegion: any;
            verified: boolean;
            status: string;
            rating: number;
            createdAt: string;
        };
    }>;
    getDashboardSummary(): Promise<{
        status: string;
        data: {
            provider: any;
            stats: {
                totalListings: number;
                publishedListings: number;
                totalBookings: number;
                grossRevenue: any;
                netPayout: number;
                averageRating: number;
            };
            recentBookings: any[];
        };
    }>;
    getListings(): Promise<{
        status: string;
        count: number;
        data: any[];
    }>;
    createListing(body: CreateListingDto): Promise<{
        status: string;
        message: string;
        data: {
            id: string;
            providerId: any;
            title: string;
            category: "Water" | "Land" | "Air" | "Extreme";
            difficulty: "Extreme" | "Easy" | "Moderate" | "Hard";
            destinationSlug: string;
            duration: string;
            basePrice: number;
            capacity: number;
            status: string;
            rating: number;
            viewsCount: number;
            bookingsCount: number;
            heroImage: string;
            description: string;
            requirements: string[];
            whatToCarry: string[];
            whatToWear: string[];
            createdAt: string;
        };
    }>;
    getBookings(): Promise<{
        status: string;
        count: number;
        data: any[];
    }>;
    updateCheckIn(id: string, checkedIn: boolean): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
}
