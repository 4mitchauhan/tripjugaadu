var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException } from '@nestjs/common';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { PrismaService } from '../../common/prisma.service.js';
export class ValidateCouponDto {
    code;
    cartTotal;
}
__decorate([
    IsNotEmpty(),
    IsString(),
    __metadata("design:type", String)
], ValidateCouponDto.prototype, "code", void 0);
__decorate([
    IsNumber(),
    __metadata("design:type", Number)
], ValidateCouponDto.prototype, "cartTotal", void 0);
let CouponsService = class CouponsService {
    prisma;
    activeCoupons = [
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
        },
        {
            code: 'EXPIRED2025',
            description: 'Expired test coupon',
            discountType: 'FIXED',
            discountValue: 500,
            minOrderValue: 1000,
            validUntil: '2025-01-01',
            isActive: true
        }
    ];
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getActiveCoupons() {
        return this.activeCoupons
            .filter(c => c.isActive && new Date(c.validUntil) >= new Date())
            .map(c => ({
            code: c.code,
            description: c.description,
            minOrderValue: c.minOrderValue,
            validUntil: c.validUntil
        }));
    }
    async validateCoupon(dto) {
        if (!dto.code) {
            throw new BadRequestException('Coupon code is required');
        }
        const coupon = this.activeCoupons.find(c => c.code.toUpperCase() === dto.code.trim().toUpperCase() && c.isActive);
        if (!coupon) {
            throw new BadRequestException(`Invalid or inactive coupon code '${dto.code}'`);
        }
        if (coupon.validUntil && new Date(coupon.validUntil) < new Date()) {
            throw new BadRequestException(`Coupon '${coupon.code}' expired on ${coupon.validUntil}`);
        }
        if (dto.cartTotal < coupon.minOrderValue) {
            throw new BadRequestException(`Coupon requires a minimum booking subtotal of ₹${coupon.minOrderValue.toLocaleString()}`);
        }
        let calculatedDiscount = 0;
        if (coupon.discountType === 'FIXED') {
            calculatedDiscount = coupon.discountValue;
        }
        else if (coupon.discountType === 'PERCENTAGE') {
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
};
CouponsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], CouponsService);
export { CouponsService };
//# sourceMappingURL=coupons.service.js.map