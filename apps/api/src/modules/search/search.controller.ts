import { Controller, Get, Query } from '@nestjs/common';
import { SearchService } from './search.service.js';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get()
  async search(
    @Query('q') q?: string,
    @Query('query') query?: string,
    @Query('category') category?: string,
    @Query('difficulty') difficulty?: string,
    @Query('maxPrice') maxPrice?: string,
    @Query('sortBy') sortBy?: string,
  ) {
    const searchTerm = q || query;
    const results = await this.searchService.search({
      q: searchTerm,
      category,
      difficulty,
      maxPrice: maxPrice ? parseInt(maxPrice, 10) : undefined,
      sortBy,
    });

    return {
      status: 'success',
      count: results.length,
      data: results,
    };
  }
}
