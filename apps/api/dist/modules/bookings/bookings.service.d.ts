import { PrismaService } from '../../common/prisma.service.js';
export declare class BookingsService {
    private readonly prisma;
    private inMemoryBookings;
    constructor(prisma: PrismaService);
    createBooking(data: any): Promise<{
        id: string;
        bookingRef: string;
        destination: any;
        dates: any;
        guestCount: any;
        travelerName: any;
        travelerEmail: any;
        status: string;
        subtotal: any;
        serviceFee: any;
        discount: any;
        totalAmount: number;
        items: any;
        createdAt: string;
    }>;
    getBooking(refOrId: string): Promise<any>;
    getAllBookings(): Promise<any[]>;
}
