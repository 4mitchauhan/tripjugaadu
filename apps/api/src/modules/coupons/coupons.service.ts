import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';

export class ValidateCouponDto {
  code!: string;
  cartTotal!: number;
}

@Injectable()
export class CouponsService {
  private activeCoupons = [
    {
      code: 'JUGAADU1500',
      description: '₹1,500 off on all Himalayan and River expeditions',
      discountType: 'FIXED',
      discountValue: 1500,
      minOrderValue: 8000,
      validUntil: '2026-12-31',
      isActive: true
    },
    {
      code: 'HIMALAYA10',
      description: '10% instant discount on High-Altitude Treks',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      maxDiscount: 2500,
      minOrderValue: 6000,
      validUntil: '2026-11-30',
      isActive: true
    },
    {
      code: 'EARLYBIRD',
      description: '₹1,000 off for first-time Indian journey bookings',
      discountType: 'FIXED',
      discountValue: 1000,
      minOrderValue: 5000,
      validUntil: '2026-12-31',
      isActive: true
    }
  ];

  constructor(private readonly prisma: PrismaService) {}

  async getActiveCoupons() {
    return this.activeCoupons.map(c => ({
      code: c.code,
      description: c.description,
      minOrderValue: c.minOrderValue,
      validUntil: c.validUntil
    }));
  }

  async validateCoupon(dto: ValidateCouponDto) {
    if (!dto.code) {
      throw new BadRequestException('Coupon code is required');
    }

    const coupon = this.activeCoupons.find(
      c => c.code.toUpperCase() === dto.code.trim().toUpperCase() && c.isActive
    );

    if (!coupon) {
      throw new BadRequestException(`Invalid or expired coupon code '${dto.code}'`);
    }

    if (dto.cartTotal < coupon.minOrderValue) {
      throw new BadRequestException(
        `Coupon requires a minimum booking subtotal of ₹${coupon.minOrderValue.toLocaleString()}`
      );
    }

    let calculatedDiscount = 0;
    if (coupon.discountType === 'FIXED') {
      calculatedDiscount = coupon.discountValue;
    } else if (coupon.discountType === 'PERCENTAGE') {
      calculatedDiscount = Math.round((dto.cartTotal * coupon.discountValue) / 100);
      if (coupon.maxDiscount && calculatedDiscount > coupon.maxDiscount) {
        calculatedDiscount = coupon.maxDiscount;
      }
    }

    const finalPayable = Math.max(0, dto.cartTotal - calculatedDiscount);

    return {
      isValid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountAmount: calculatedDiscount,
      originalTotal: dto.cartTotal,
      finalPayable,
      message: `Coupon '${coupon.code}' applied successfully: Saved ₹${calculatedDiscount.toLocaleString()}`
    };
  }
}
