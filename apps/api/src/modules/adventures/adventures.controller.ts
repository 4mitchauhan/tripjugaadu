import { Controller, Get, Param, Query } from '@nestjs/common';
import { AdventuresService } from './adventures.service.js';

@Controller('adventures')
export class AdventuresController {
  constructor(private readonly adventuresService: AdventuresService) {}

  @Get()
  async getAllAdventures(
    @Query('difficulty') difficulty?: string,
    @Query('category') category?: string,
  ) {
    const adventures = await this.adventuresService.findAll(difficulty, category);
    return {
      status: 'success',
      count: adventures.length,
      data: adventures,
    };
  }

  @Get(':slug')
  async getAdventureBySlug(@Param('slug') slug: string) {
    const adventure = await this.adventuresService.findBySlug(slug);
    return {
      status: 'success',
      data: adventure,
    };
  }
}
