import { PrismaService } from '../../common/prisma.service.js';
export declare class StaysService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        slug: string;
        destinationId: string;
        destinationSlug: string;
        name: string;
        stayType: string;
        address: string;
        rating: number;
        basePrice: number;
        heroImage: string;
        amenities: string[];
        description: string;
    }[] | ({
        destination: {
            id: string;
            slug: string;
            name: string;
            region: string;
            state: string;
            category: string;
            bestSeason: string | null;
            daysRecommend: string;
            heroImage: string;
            description: string;
            latitude: number | null;
            longitude: number | null;
            featured: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        rooms: {
            id: string;
            name: string;
            stayId: string;
            roomType: string;
            maxGuests: number;
            pricePerNight: number;
            inventory: number;
        }[];
    } & {
        id: string;
        slug: string;
        name: string;
        heroImage: string;
        description: string;
        createdAt: Date;
        destinationId: string;
        basePrice: number;
        rating: number;
        stayType: string;
        address: string | null;
        amenities: string[];
    })[]>;
    findBySlug(slug: string): Promise<{
        id: string;
        slug: string;
        destinationId: string;
        destinationSlug: string;
        name: string;
        stayType: string;
        address: string;
        rating: number;
        basePrice: number;
        heroImage: string;
        amenities: string[];
        description: string;
    } | ({
        destination: {
            id: string;
            slug: string;
            name: string;
            region: string;
            state: string;
            category: string;
            bestSeason: string | null;
            daysRecommend: string;
            heroImage: string;
            description: string;
            latitude: number | null;
            longitude: number | null;
            featured: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
        rooms: {
            id: string;
            name: string;
            stayId: string;
            roomType: string;
            maxGuests: number;
            pricePerNight: number;
            inventory: number;
        }[];
    } & {
        id: string;
        slug: string;
        name: string;
        heroImage: string;
        description: string;
        createdAt: Date;
        destinationId: string;
        basePrice: number;
        rating: number;
        stayType: string;
        address: string | null;
        amenities: string[];
    })>;
}
