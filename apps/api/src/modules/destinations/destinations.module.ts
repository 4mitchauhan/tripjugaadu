import { Module } from '@nestjs/common';
import { DestinationsController } from './destinations.controller.js';
import { DestinationsService } from './destinations.service.js';
import { PrismaService } from '../../common/prisma.service.js';

@Module({
  controllers: [DestinationsController],
  providers: [DestinationsService, PrismaService],
  exports: [DestinationsService],
})
export class DestinationsModule {}
