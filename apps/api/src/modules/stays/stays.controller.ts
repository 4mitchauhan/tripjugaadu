import { Controller, Get, Param } from '@nestjs/common';
import { StaysService } from './stays.service.js';

@Controller('stays')
export class StaysController {
  constructor(private readonly staysService: StaysService) {}

  @Get()
  async getAllStays() {
    const stays = await this.staysService.findAll();
    return {
      status: 'success',
      count: stays.length,
      data: stays,
    };
  }

  @Get(':slug')
  async getStayBySlug(@Param('slug') slug: string) {
    const stay = await this.staysService.findBySlug(slug);
    return {
      status: 'success',
      data: stay,
    };
  }
}
