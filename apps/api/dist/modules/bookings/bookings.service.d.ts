import { PrismaService } from '../../common/prisma.service.js';
import { CouponsService } from '../coupons/coupons.service.js';
export interface BookingItemRecord {
    name: string;
    detail: string;
    price: string;
    unitPrice: number;
    quantity: number;
    image?: string;
}
export interface BookingRecord {
    id: string;
    bookingRef: string;
    destination: string;
    dates: string;
    guestCount: number;
    travelerName: string;
    travelerEmail: string;
    travelerPhone: string;
    status: 'DRAFT' | 'PAYMENT_PENDING' | 'CONFIRMED' | 'FAILED' | 'CANCELLED';
    paymentStatus: 'PENDING' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
    subtotal: number;
    serviceFee: number;
    discount: number;
    totalAmount: number;
    appliedCoupon?: string;
    items: BookingItemRecord[];
    paymentId?: string;
    paymentMethod?: string;
    confirmedAt?: string;
    failureReason?: string;
    createdAt: string;
}
export declare class BookingsService {
    private readonly prisma;
    private readonly couponsService;
    private readonly logger;
    private inMemoryBookings;
    constructor(prisma: PrismaService, couponsService: CouponsService);
    createBooking(data: any): Promise<BookingRecord>;
    getBooking(refOrId: string): Promise<BookingRecord>;
    confirmBooking(bookingRef: string, paymentId: string, paymentMethod?: string): Promise<BookingRecord>;
    failBooking(bookingRef: string, reason?: string): Promise<BookingRecord>;
    getAllBookings(): Promise<BookingRecord[]>;
}
