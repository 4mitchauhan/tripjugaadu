import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';

@Injectable()
export class BookingsService {
  private inMemoryBookings: any[] = [
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

  constructor(private readonly prisma: PrismaService) {}

  async createBooking(data: any) {
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

  async getBooking(refOrId: string) {
    const booking = this.inMemoryBookings.find(b => b.bookingRef === refOrId || b.id === refOrId);
    if (!booking) {
      return this.inMemoryBookings[0];
    }
    return booking;
  }

  async getAllBookings() {
    return this.inMemoryBookings;
  }
}
