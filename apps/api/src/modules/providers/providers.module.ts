import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller.js';
import { ProvidersService } from './providers.service.js';
import { PrismaService } from '../../common/prisma.service.js';

@Module({
  controllers: [ProvidersController],
  providers: [ProvidersService, PrismaService],
  exports: [ProvidersService],
})
export class ProvidersModule {}
