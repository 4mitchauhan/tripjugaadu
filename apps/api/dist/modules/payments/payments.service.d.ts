import { PrismaService } from '../../common/prisma.service.js';
export declare class PaymentsService {
    private readonly prisma;
    private readonly logger;
    private processedWebhookEvents;
    constructor(prisma: PrismaService);
    createPaymentOrder(bookingRef: string, amountInRupees: number): Promise<{
        orderId: string;
        currency: string;
        amount: number;
        amountInRupees: number;
        keyId: string;
        bookingRef: string;
        createdAt: string;
    }>;
    verifyPayment(orderId: string, paymentId: string, signature: string): Promise<{
        success: boolean;
        orderId: string;
        paymentId: string;
        status: string;
        verifiedAt: string;
    }>;
    processWebhook(payload: any, signature?: string): Promise<{
        status: string;
        eventId: any;
        event?: undefined;
        processedAt?: undefined;
    } | {
        status: string;
        event: any;
        eventId: any;
        processedAt: string;
    }>;
}
