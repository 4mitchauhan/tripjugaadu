import { Module } from '@nestjs/common';
import { StaysController } from './stays.controller.js';
import { StaysService } from './stays.service.js';
import { PrismaService } from '../../common/prisma.service.js';

@Module({
  controllers: [StaysController],
  providers: [StaysService, PrismaService],
  exports: [StaysService],
})
export class StaysModule {}
