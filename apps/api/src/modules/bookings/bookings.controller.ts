import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BookingsService } from './bookings.service.js';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Body() body: any) {
    const booking = await this.bookingsService.createBooking(body);
    return {
      status: 'success',
      message: 'Booking created and confirmed',
      data: booking,
    };
  }

  @Get()
  async getMyBookings() {
    const bookings = await this.bookingsService.getAllBookings();
    return {
      status: 'success',
      count: bookings.length,
      data: bookings,
    };
  }

  @Get(':ref')
  async getBooking(@Param('ref') ref: string) {
    const booking = await this.bookingsService.getBooking(ref);
    return {
      status: 'success',
      data: booking,
    };
  }
}
