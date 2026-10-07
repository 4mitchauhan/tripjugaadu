import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ProvidersService, ProviderRegistrationDto, CreateListingDto } from './providers.service.js';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @Post('register')
  async register(@Body() body: ProviderRegistrationDto) {
    const provider = await this.providersService.register(body);
    return {
      status: 'success',
      message: 'Provider registration submitted for verification',
      data: provider,
    };
  }

  @Get('dashboard')
  async getDashboardSummary() {
    const data = await this.providersService.getDashboardSummary();
    return {
      status: 'success',
      data,
    };
  }

  @Get('listings')
  async getListings() {
    const listings = await this.providersService.getListings();
    return {
      status: 'success',
      count: listings.length,
      data: listings,
    };
  }

  @Post('listings')
  async createListing(@Body() body: CreateListingDto) {
    const listing = await this.providersService.createListing(body);
    return {
      status: 'success',
      message: 'Listing submitted for admin moderation',
      data: listing,
    };
  }

  @Get('bookings')
  async getBookings() {
    const bookings = await this.providersService.getBookings();
    return {
      status: 'success',
      count: bookings.length,
      data: bookings,
    };
  }

  @Patch('bookings/:id/checkin')
  async updateCheckIn(
    @Param('id') id: string,
    @Body('checkedIn') checkedIn: boolean,
  ) {
    const booking = await this.providersService.updateBookingCheckIn(id, checkedIn);
    return {
      status: 'success',
      message: 'Check-in status updated',
      data: booking,
    };
  }
}
