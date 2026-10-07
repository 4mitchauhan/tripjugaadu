import { Controller, Get, Param } from '@nestjs/common';
import { ExperiencesService } from './experiences.service.js';

@Controller('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  async getAllExperiences() {
    const experiences = await this.experiencesService.findAll();
    return {
      status: 'success',
      count: experiences.length,
      data: experiences,
    };
  }

  @Get(':slug')
  async getExperienceBySlug(@Param('slug') slug: string) {
    const experience = await this.experiencesService.findBySlug(slug);
    return {
      status: 'success',
      data: experience,
    };
  }
}
