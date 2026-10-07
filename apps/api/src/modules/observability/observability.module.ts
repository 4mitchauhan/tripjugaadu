import { Module } from '@nestjs/common';
import { ObservabilityService } from './observability.service.js';
import { ObservabilityController } from './observability.controller.js';
import { PrismaService } from '../../common/prisma.service.js';

@Module({
  controllers: [ObservabilityController],
  providers: [ObservabilityService, PrismaService],
  exports: [ObservabilityService],
})
export class ObservabilityModule {}
