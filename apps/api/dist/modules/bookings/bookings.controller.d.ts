import { BookingsService } from './bookings.service.js';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    createBooking(body: any): Promise<{
        status: string;
        message: string;
        data: {
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
        };
    }>;
    getMyBookings(): Promise<{
        status: string;
        count: number;
        data: any[];
    }>;
    getBooking(ref: string): Promise<{
        status: string;
        data: any;
    }>;
}
