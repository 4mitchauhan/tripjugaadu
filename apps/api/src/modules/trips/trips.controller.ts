import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TripsService } from './trips.service.js';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  async createTrip(@Body() body: any) {
    const trip = await this.tripsService.createTrip(body);
    return {
      status: 'success',
      message: 'Trip itinerary generated successfully',
      data: trip,
    };
  }

  @Get()
  async getMyTrips() {
    const trips = await this.tripsService.findUserTrips();
    return {
      status: 'success',
      count: trips.length,
      data: trips,
    };
  }

  @Get(':id')
  async getTripById(@Param('id') id: string) {
    const trip = await this.tripsService.findById(id);
    return {
      status: 'success',
      data: trip,
    };
  }
}
