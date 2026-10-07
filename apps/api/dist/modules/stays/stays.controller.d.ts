import { StaysService } from './stays.service.js';
export declare class StaysController {
    private readonly staysService;
    constructor(staysService: StaysService);
    getAllStays(): Promise<{
        status: string;
        count: number;
        data: {
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
        })[];
    }>;
    getStayBySlug(slug: string): Promise<{
        status: string;
        data: {
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
        });
    }>;
}
