import { Module } from '@nestjs/common';
import { AdventuresController } from './adventures.controller.js';
import { AdventuresService } from './adventures.service.js';
import { PrismaService } from '../../common/prisma.service.js';

@Module({
  controllers: [AdventuresController],
  providers: [AdventuresService, PrismaService],
  exports: [AdventuresService],
})
export class AdventuresModule {}
