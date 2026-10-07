import { Module } from '@nestjs/common';
import { ExperiencesController } from './experiences.controller.js';
import { ExperiencesService } from './experiences.service.js';
import { PrismaService } from '../../common/prisma.service.js';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService, PrismaService],
  exports: [ExperiencesService],
})
export class ExperiencesModule {}
