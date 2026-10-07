import { PrismaService } from '../../common/prisma.service.js';
export declare class ValidateCouponDto {
    code: string;
    cartTotal: number;
}
export declare class CouponsService {
    private readonly prisma;
    private activeCoupons;
    constructor(prisma: PrismaService);
    getActiveCoupons(): Promise<{
        code: string;
        description: string;
        minOrderValue: number;
        validUntil: string;
    }[]>;
    validateCoupon(dto: ValidateCouponDto): Promise<{
        isValid: boolean;
        code: string;
        discountType: string;
        discountAmount: number;
        originalTotal: number;
        finalPayable: number;
        message: string;
    }>;
}
