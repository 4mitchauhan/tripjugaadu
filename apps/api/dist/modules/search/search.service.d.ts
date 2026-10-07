import { PrismaService } from '../../common/prisma.service.js';
export declare class SearchService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    search(params: {
        q?: string;
        category?: string;
        difficulty?: string;
        minPrice?: number;
        maxPrice?: number;
        sortBy?: string;
    }): Promise<any[]>;
}
