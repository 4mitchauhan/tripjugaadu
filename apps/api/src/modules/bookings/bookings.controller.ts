import { Controller, Get, Post, Body, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { BookingsService } from './bookings.service.js';
import { verifyJwt } from '../../common/jwt.util.js';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Body() body: any) {
    const booking = await this.bookingsService.createBooking(body);
    return {
      status: 'success',
      message: 'Booking created, awaiting payment',
      data: booking,
    };
  }

  @Get()
  async getMyBookings(@Headers('authorization') authHeader?: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Authentication token is required to view personal bookings list');
    }

    const verifyResult = verifyJwt(authHeader);
    if (!verifyResult.valid || !verifyResult.payload) {
      throw new UnauthorizedException('Invalid or expired authentication token');
    }

    const user = verifyResult.payload;
    const allBookings = await this.bookingsService.getAllBookings();

    // Admin can view all platform bookings; customers only view their own
    const userBookings = user.role === 'ADMIN'
      ? allBookings
      : allBookings.filter((b) => b.travelerEmail.toLowerCase() === user.email.toLowerCase());

    return {
      status: 'success',
      count: userBookings.length,
      data: userBookings,
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
