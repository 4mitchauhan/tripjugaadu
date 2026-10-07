import { Controller, Get, Param, Query } from '@nestjs/common';
import { DestinationsService } from './destinations.service.js';

@Controller('destinations')
export class DestinationsController {
  constructor(private readonly destinationsService: DestinationsService) {}

  @Get()
  async getAllDestinations(@Query('featured') featured?: string) {
    const isFeatured = featured === 'true' ? true : featured === 'false' ? false : undefined;
    const destinations = await this.destinationsService.findAll(isFeatured);
    return {
      status: 'success',
      count: destinations.length,
      data: destinations,
    };
  }

  @Get(':slug')
  async getDestinationBySlug(@Param('slug') slug: string) {
    const destination = await this.destinationsService.findBySlug(slug);
    return {
      status: 'success',
      data: destination,
    };
  }
}
