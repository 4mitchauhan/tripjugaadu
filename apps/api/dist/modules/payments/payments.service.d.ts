import { PrismaService } from '../../common/prisma.service.js';
import { BookingsService } from '../bookings/bookings.service.js';
export interface PaymentOrderRecord {
    orderId: string;
    bookingRef: string;
    amount: number;
    amountInRupees: number;
    currency: string;
    status: 'PENDING' | 'CAPTURED' | 'FAILED';
    paymentId?: string;
    signature?: string;
    createdAt: string;
}
export declare class PaymentsService {
    private readonly prisma;
    private readonly bookingsService;
    private readonly logger;
    private processedWebhookEvents;
    private orders;
    private activeOrders;
    constructor(prisma: PrismaService, bookingsService: BookingsService);
    createPaymentOrder(bookingRef: string, _clientAmount?: number): Promise<{
        orderId: string;
        currency: string;
        amount: number;
        amountInRupees: number;
        keyId: string;
        bookingRef: string;
        createdAt: string;
    }>;
    verifyPayment(orderId: string, paymentId: string, signature: string, bookingRef?: string): Promise<{
        success: boolean;
        orderId: string;
        paymentId: string;
        bookingRef: string;
        status: string;
        alreadyProcessed: boolean;
        bookingStatus?: undefined;
        verifiedAt?: undefined;
    } | {
        success: boolean;
        orderId: string;
        paymentId: string;
        bookingRef: string;
        status: string;
        bookingStatus: string;
        verifiedAt: string;
        alreadyProcessed?: undefined;
    }>;
    processWebhook(payload: any, signature?: string, rawBody?: string): Promise<{
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
