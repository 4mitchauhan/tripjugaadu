import { Controller, Get, Post, Headers, Body } from '@nestjs/common';
import { PartnerService } from './partner.service.js';
import { PartnerBookingRequest } from './partner.interface.js';

@Controller('partner')
export class PartnerController {
  constructor(private readonly partnerService: PartnerService) {}

  @Get('catalog')
  getCatalog(@Headers('x-partner-key') apiKey?: string) {
    const partner = this.partnerService.validateKey(apiKey);
    return {
      status: 'success',
      data: this.partnerService.getPartnerCatalog(partner),
    };
  }

  @Post('bookings')
  createBooking(
    @Headers('x-partner-key') apiKey: string | undefined,
    @Body() body: PartnerBookingRequest,
  ) {
    const partner = this.partnerService.validateKey(apiKey);
    return {
      status: 'success',
      data: this.partnerService.createPartnerBooking(partner, body),
    };
  }

  @Get('webhooks')
  getWebhooks(@Headers('x-partner-key') apiKey?: string) {
    const partner = this.partnerService.validateKey(apiKey);
    return {
      status: 'success',
      count: this.partnerService.getWebhookLogs(partner).length,
      data: this.partnerService.getWebhookLogs(partner),
    };
  }
}
