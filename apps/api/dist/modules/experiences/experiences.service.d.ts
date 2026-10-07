import { PrismaService } from '../../common/prisma.service.js';
export declare class ExperiencesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        slug: string;
        destinationId: string;
        destinationSlug: string;
        name: string;
        category: string;
        duration: string;
        price: number;
        heroImage: string;
        description: string;
        accentColor: string;
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
    } & {
        id: string;
        slug: string;
        name: string;
        category: string;
        heroImage: string;
        description: string;
        createdAt: Date;
        destinationId: string;
        duration: string;
        price: number;
        accentColor: string;
    })[]>;
    findBySlug(slug: string): Promise<{
        id: string;
        slug: string;
        destinationId: string;
        destinationSlug: string;
        name: string;
        category: string;
        duration: string;
        price: number;
        heroImage: string;
        description: string;
        accentColor: string;
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
    } & {
        id: string;
        slug: string;
        name: string;
        category: string;
        heroImage: string;
        description: string;
        createdAt: Date;
        destinationId: string;
        duration: string;
        price: number;
        accentColor: string;
    })>;
}
