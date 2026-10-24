import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller.js';
import { BookingsService } from './bookings.service.js';
import { PrismaService } from '../../common/prisma.service.js';
import { CouponsModule } from '../coupons/coupons.module.js';

@Module({
  imports: [CouponsModule],
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService],
  exports: [BookingsService],
})
export class BookingsModule {}
