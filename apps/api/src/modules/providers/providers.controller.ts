import { Controller, Get, Post, Body, Param, Patch, UseGuards } from '@nestjs/common';
import { ProvidersService, ProviderRegistrationDto, CreateListingDto } from './providers.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/guards/roles.decorator.js';

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
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  async getDashboardSummary() {
    const data = await this.providersService.getDashboardSummary();
    return {
      status: 'success',
      data,
    };
  }

  @Get('listings')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  async getListings() {
    const listings = await this.providersService.getListings();
    return {
      status: 'success',
      count: listings.length,
      data: listings,
    };
  }

  @Post('listings')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  async createListing(@Body() body: CreateListingDto) {
    const listing = await this.providersService.createListing(body);
    return {
      status: 'success',
      message: 'Listing submitted for admin moderation',
      data: listing,
    };
  }

  @Get('bookings')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
  async getBookings() {
    const bookings = await this.providersService.getBookings();
    return {
      status: 'success',
      count: bookings.length,
      data: bookings,
    };
  }

  @Patch('bookings/:id/checkin')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('PROVIDER', 'ADMIN')
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
