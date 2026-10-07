var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
let BookingsService = class BookingsService {
    prisma;
    inMemoryBookings = [
        {
            id: 'book-demo-01',
            bookingRef: 'TJ-784219',
            destination: 'Rishikesh',
            dates: '12–15 Oct 2026',
            guestCount: 2,
            status: 'CONFIRMED',
            subtotal: 21699,
            serviceFee: 799,
            discount: 1500,
            totalAmount: 20998,
            items: [
                { name: 'White Water Rafting (Shivpuri)', detail: '13 Oct, 8:00 AM – 12:00 PM · 2 Adults', price: '₹3,999' },
                { name: 'Riverside Luxury Retreat', detail: '12–15 Oct, 3 Nights · Deluxe Room', price: '₹19,497' },
                { name: 'Mohanchatti Bungee Jump (83m)', detail: '14 Oct, 9:00 AM · 2 Jumpers', price: '₹10,400' }
            ],
            createdAt: new Date().toISOString()
        }
    ];
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBooking(data) {
        const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
        const bookingRef = `TJ-${randomHex}`;
        const subtotal = data.subtotal || 21699;
        const serviceFee = data.serviceFee || 799;
        const discount = data.discount || 1500;
        const totalAmount = subtotal + serviceFee - discount;
        const newBooking = {
            id: `booking-${Date.now()}`,
            bookingRef,
            destination: data.destination || 'Rishikesh',
            dates: data.dates || '12–15 Oct 2026',
            guestCount: data.travelers || 2,
            travelerName: data.travelerName || 'Amit Sharma',
            travelerEmail: data.travelerEmail || 'amit@tripjugaadu.com',
            status: 'CONFIRMED',
            subtotal,
            serviceFee,
            discount,
            totalAmount,
            items: data.items || [
                { name: 'White Water Rafting (Shivpuri)', detail: '13 Oct, 8:00 AM – 12:00 PM', price: '₹3,999' },
                { name: 'Riverside Luxury Retreat', detail: '12–15 Oct, 3 Nights', price: '₹19,497' }
            ],
            createdAt: new Date().toISOString()
        };
        this.inMemoryBookings.unshift(newBooking);
        return newBooking;
    }
    async getBooking(refOrId) {
        const booking = this.inMemoryBookings.find(b => b.bookingRef === refOrId || b.id === refOrId);
        if (!booking) {
            return this.inMemoryBookings[0];
        }
        return booking;
    }
    async getAllBookings() {
        return this.inMemoryBookings;
    }
};
BookingsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BookingsService);
export { BookingsService };
//# sourceMappingURL=bookings.service.js.map