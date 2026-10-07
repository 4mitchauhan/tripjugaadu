import { CouponsService, ValidateCouponDto } from './coupons.service.js';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    getCoupons(): Promise<{
        status: string;
        count: number;
        data: {
            code: string;
            description: string;
            minOrderValue: number;
            validUntil: string;
        }[];
    }>;
    validateCoupon(body: ValidateCouponDto): Promise<{
        status: string;
        data: {
            isValid: boolean;
            code: string;
            discountType: string;
            discountAmount: number;
            originalTotal: number;
            finalPayable: number;
            message: string;
        };
    }>;
}
