import { SearchService } from './search.service.js';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(q?: string, query?: string, category?: string, difficulty?: string, maxPrice?: string, sortBy?: string): Promise<{
        status: string;
        count: number;
        data: any[];
    }>;
}
