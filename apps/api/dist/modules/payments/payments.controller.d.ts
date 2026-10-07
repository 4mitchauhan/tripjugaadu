import { PaymentsService } from './payments.service.js';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createOrder(bookingRef: string, amount: number): Promise<{
        status: string;
        data: {
            orderId: string;
            currency: string;
            amount: number;
            amountInRupees: number;
            keyId: string;
            bookingRef: string;
            createdAt: string;
        };
    }>;
    verifyPayment(orderId: string, paymentId: string, signature: string): Promise<{
        status: string;
        data: {
            success: boolean;
            orderId: string;
            paymentId: string;
            status: string;
            verifiedAt: string;
        };
    }>;
    handleWebhook(payload: any, signature?: string): Promise<{
        status: string;
        data: {
            status: string;
            eventId: any;
            event?: undefined;
            processedAt?: undefined;
        } | {
            status: string;
            event: any;
            eventId: any;
            processedAt: string;
        };
    }>;
}
