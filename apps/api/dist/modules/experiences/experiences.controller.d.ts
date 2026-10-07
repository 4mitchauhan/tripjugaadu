import { ExperiencesService } from './experiences.service.js';
export declare class ExperiencesController {
    private readonly experiencesService;
    constructor(experiencesService: ExperiencesService);
    getAllExperiences(): Promise<{
        status: string;
        count: number;
        data: {
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
        })[];
    }>;
    getExperienceBySlug(slug: string): Promise<{
        status: string;
        data: {
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
        });
    }>;
}
