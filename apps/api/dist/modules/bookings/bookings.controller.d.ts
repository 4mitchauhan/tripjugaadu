import { BookingsService } from './bookings.service.js';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    createBooking(body: any): Promise<{
        status: string;
        message: string;
        data: import("./bookings.service.js").BookingRecord;
    }>;
    getMyBookings(authHeader?: string): Promise<{
        status: string;
        count: number;
        data: import("./bookings.service.js").BookingRecord[];
    }>;
    getBooking(ref: string): Promise<{
        status: string;
        data: import("./bookings.service.js").BookingRecord;
    }>;
}
