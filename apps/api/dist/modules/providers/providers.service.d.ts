import { PrismaService } from '../../common/prisma.service.js';
export declare class ProviderRegistrationDto {
    businessName: string;
    businessRegNo?: string;
    ownerName: string;
    email: string;
    phone: string;
    activityRegion: string;
}
export declare class CreateListingDto {
    title: string;
    category: 'Water' | 'Land' | 'Air' | 'Extreme';
    difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
    destinationSlug: string;
    duration: string;
    basePrice: number;
    capacity: number;
    description: string;
    heroImage: string;
    requirements: string[];
    whatToCarry: string[];
    whatToWear: string[];
}
export declare class ProvidersService {
    private readonly prisma;
    private inMemoryProviders;
    private inMemoryListings;
    private inMemoryBookings;
    constructor(prisma: PrismaService);
    register(dto: ProviderRegistrationDto): Promise<{
        id: string;
        businessName: string;
        businessRegNo: string;
        ownerName: string;
        email: string;
        phone: string;
        activityRegion: string;
        verified: boolean;
        status: string;
        rating: number;
        createdAt: string;
    }>;
    getDashboardSummary(): Promise<{
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
    }>;
    getListings(): Promise<any[]>;
    createListing(dto: CreateListingDto): Promise<{
        id: string;
        providerId: any;
        title: string;
        category: "Water" | "Extreme" | "Land" | "Air";
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
    }>;
    getBookings(): Promise<any[]>;
    updateBookingCheckIn(bookingId: string, checkedIn: boolean): Promise<any>;
}
