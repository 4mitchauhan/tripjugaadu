import { Controller, Get, Post, Body } from '@nestjs/common';
import { CouponsService, ValidateCouponDto } from './coupons.service.js';

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Get()
  async getCoupons() {
    const coupons = await this.couponsService.getActiveCoupons();
    return {
      status: 'success',
      count: coupons.length,
      data: coupons,
    };
  }

  @Post('validate')
  async validateCoupon(@Body() body: ValidateCouponDto) {
    const result = await this.couponsService.validateCoupon(body);
    return {
      status: 'success',
      data: result,
    };
  }
}
