var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BookingsService_1;
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { CouponsService } from '../coupons/coupons.service.js';
const CATALOG_ITEMS = {
    'rafting': {
        name: 'White Water Rafting (Grade III/IV)',
        unitPrice: 3999,
        type: 'ADVENTURE',
        destination: 'Rishikesh',
        detail: '3–4 Hours · Certified River Rescue Escort',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    },
    'white-water-rafting': {
        name: 'White Water Rafting (Grade III/IV)',
        unitPrice: 3999,
        type: 'ADVENTURE',
        destination: 'Rishikesh',
        detail: '3–4 Hours · Certified River Rescue Escort',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
    },
    'bungee': {
        name: 'Bungee Jumping (83m Fixed Platform)',
        unitPrice: 5200,
        type: 'ADVENTURE',
        destination: 'Rishikesh',
        detail: '1–2 Hours · NZ Jump Masters',
        image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
    },
    'bungee-jumping-83m': {
        name: 'Bungee Jumping (83m Fixed Platform)',
        unitPrice: 5200,
        type: 'ADVENTURE',
        destination: 'Rishikesh',
        detail: '1–2 Hours · NZ Jump Masters',
        image: 'https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80',
    },
    'trekking': {
        name: 'Hampta Pass & Chandratal Trek',
        unitPrice: 8499,
        type: 'ADVENTURE',
        destination: 'Manali',
        detail: '5 Days · Wilderness First Responders',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    },
    'hampta-pass-trek': {
        name: 'Hampta Pass & Chandratal Trek',
        unitPrice: 8499,
        type: 'ADVENTURE',
        destination: 'Manali',
        detail: '5 Days · Wilderness First Responders',
        image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80',
    },
    'paragliding': {
        name: 'Tandem Paragliding',
        unitPrice: 3200,
        type: 'ADVENTURE',
        destination: 'Manali',
        detail: '30–45 Min · 500+ Hours Flight Master',
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80',
    },
    'tandem-paragliding': {
        name: 'Tandem Paragliding',
        unitPrice: 3200,
        type: 'ADVENTURE',
        destination: 'Manali',
        detail: '30–45 Min · 500+ Hours Flight Master',
        image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&q=80',
    },
    'scuba': {
        name: 'Scuba Diving at Grande Island',
        unitPrice: 4500,
        type: 'ADVENTURE',
        destination: 'Goa',
        detail: '3 Hours · PADI Certified Dive Master',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    },
    'scuba-diving-grande-island': {
        name: 'Scuba Diving at Grande Island',
        unitPrice: 4500,
        type: 'ADVENTURE',
        destination: 'Goa',
        detail: '3 Hours · PADI Certified Dive Master',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80',
    },
    'riverside-retreat': {
        name: 'Riverside Luxury Retreat',
        unitPrice: 6499,
        type: 'STAY',
        destination: 'Rishikesh',
        detail: 'Luxury Boutique Resort · Ganga Access',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    },
    'riverside-luxury-retreat': {
        name: 'Riverside Luxury Retreat',
        unitPrice: 6499,
        type: 'STAY',
        destination: 'Rishikesh',
        detail: 'Luxury Boutique Resort · Ganga Access',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80',
    },
    'mountain-lodge': {
        name: 'Snow Pine Mountain Lodge',
        unitPrice: 4999,
        type: 'STAY',
        destination: 'Manali',
        detail: 'Alpine Cedar Chalet · Apple Orchard View',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    },
    'snow-pine-mountain-lodge': {
        name: 'Snow Pine Mountain Lodge',
        unitPrice: 4999,
        type: 'STAY',
        destination: 'Manali',
        detail: 'Alpine Cedar Chalet · Apple Orchard View',
        image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80',
    },
    'heritage-villa': {
        name: 'Portuguese Heritage Villa',
        unitPrice: 9200,
        type: 'STAY',
        destination: 'Goa',
        detail: 'Colonial Heritage Villa · Private Pool',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    },
    'portuguese-heritage-villa': {
        name: 'Portuguese Heritage Villa',
        unitPrice: 9200,
        type: 'STAY',
        destination: 'Goa',
        detail: 'Colonial Heritage Villa · Private Pool',
        image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80',
    },
    'local-food': {
        name: 'Varanasi Street Food & Chaat Crawl',
        unitPrice: 1200,
        type: 'EXPERIENCE',
        destination: 'Varanasi',
        detail: '3–4 Hours · Local Resident Gastronome',
        image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80',
    },
    'varanasi-street-food': {
        name: 'Varanasi Street Food & Chaat Crawl',
        unitPrice: 1200,
        type: 'EXPERIENCE',
        destination: 'Varanasi',
        detail: '3–4 Hours · Local Resident Gastronome',
        image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=800&q=80',
    },
    'culture': {
        name: 'Royal Heritage & Artisan Haveli Walk',
        unitPrice: 1800,
        type: 'EXPERIENCE',
        destination: 'Jaipur',
        detail: 'Half Day · Private Haveli Access',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    },
    'jaipur-royal-heritage': {
        name: 'Royal Heritage & Artisan Haveli Walk',
        unitPrice: 1800,
        type: 'EXPERIENCE',
        destination: 'Jaipur',
        detail: 'Half Day · Private Haveli Access',
        image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    },
    'wellness': {
        name: 'Riverside Yoga & Sound Healing',
        unitPrice: 1500,
        type: 'EXPERIENCE',
        destination: 'Rishikesh',
        detail: '3 Hours · Tibetan Singing Bowls & Yoga',
        image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    },
    'rishikesh-riverside-yoga': {
        name: 'Riverside Yoga & Sound Healing',
        unitPrice: 1500,
        type: 'EXPERIENCE',
        destination: 'Rishikesh',
        detail: '3 Hours · Tibetan Singing Bowls & Yoga',
        image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=800&q=80',
    },
};
let BookingsService = BookingsService_1 = class BookingsService {
    prisma;
    couponsService;
    logger = new Logger(BookingsService_1.name);
    inMemoryBookings = [
        {
            id: 'book-seed-01',
            bookingRef: 'TJ-784219',
            destination: 'Rishikesh',
            dates: '12–15 Oct 2026',
            guestCount: 2,
            travelerName: 'Amit Sharma',
            travelerEmail: 'amit@tripjugaadu.com',
            travelerPhone: '+91 98765 43210',
            status: 'CONFIRMED',
            paymentStatus: 'CAPTURED',
            subtotal: 21699,
            serviceFee: 799,
            discount: 1500,
            totalAmount: 20998,
            appliedCoupon: 'JUGAADU1500',
            paymentId: 'pay_seed_9041284',
            paymentMethod: 'Razorpay UPI',
            confirmedAt: '2026-10-04T10:30:00.000Z',
            items: [
                { name: 'White Water Rafting (Shivpuri)', detail: '13 Oct, 8:00 AM – 12:00 PM · 2 Adults', price: '₹3,999', unitPrice: 3999, quantity: 2 },
                { name: 'Riverside Luxury Retreat', detail: '12–15 Oct, 3 Nights · Deluxe Room', price: '₹19,497', unitPrice: 6499, quantity: 3 },
            ],
            createdAt: '2026-10-04T10:15:00.000Z',
        },
    ];
    constructor(prisma, couponsService) {
        this.prisma = prisma;
        this.couponsService = couponsService;
    }
    async createBooking(data) {
        const travelerName = (data.travelerName || '').trim();
        const travelerEmail = (data.travelerEmail || '').trim().toLowerCase();
        const travelerPhone = (data.travelerPhone || '').trim();
        if (!travelerName || travelerName.length < 2) {
            throw new BadRequestException('Valid traveler name is required');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!travelerEmail || !emailRegex.test(travelerEmail)) {
            throw new BadRequestException('Valid traveler email address is required');
        }
        const phoneRegex = /^[+]?[\d\s-]{10,15}$/;
        if (!travelerPhone || !phoneRegex.test(travelerPhone)) {
            throw new BadRequestException('Valid traveler contact phone number is required (10–15 digits)');
        }
        const rawGuests = data.travelers ?? data.guestCount ?? 2;
        const guests = typeof rawGuests === 'number' ? rawGuests : parseInt(String(rawGuests), 10);
        if (isNaN(guests) || guests < 1 || guests > 20 || !Number.isInteger(guests)) {
            throw new BadRequestException('Guest count must be an integer between 1 and 20');
        }
        if (data.nights !== undefined) {
            const rawNights = data.nights;
            const nights = typeof rawNights === 'number' ? rawNights : parseInt(String(rawNights), 10);
            if (isNaN(nights) || nights < 1 || nights > 30 || !Number.isInteger(nights)) {
                throw new BadRequestException('Nights must be an integer between 1 and 30');
            }
        }
        const itemId = (data.itemId || data.id || '').toLowerCase();
        const dates = data.dates || data.date || '12–15 Oct 2026';
        const catalogItem = CATALOG_ITEMS[itemId];
        const recentDuplicate = this.inMemoryBookings.find((b) => b.travelerEmail.toLowerCase() === travelerEmail &&
            b.dates === dates &&
            b.status === 'PAYMENT_PENDING' &&
            (b.items.some((it) => it.name === (catalogItem?.name || data.packageName))) &&
            Date.now() - new Date(b.createdAt).getTime() < 60000);
        if (recentDuplicate) {
            this.logger.warn(`Duplicate booking detected for ${travelerEmail}. Reusing active booking ${recentDuplicate.bookingRef}`);
            return recentDuplicate;
        }
        let destination = 'Rishikesh';
        let subtotal = 0;
        const items = [];
        if (catalogItem) {
            destination = catalogItem.destination;
            if (catalogItem.type === 'STAY') {
                const nights = parseInt(data.nights || '3', 10);
                const validNights = isNaN(nights) || nights < 1 ? 3 : nights;
                subtotal = catalogItem.unitPrice * validNights;
                items.push({
                    name: catalogItem.name,
                    detail: `${validNights} Nights · ${dates} · ${guests} Guests`,
                    price: `₹${subtotal.toLocaleString()}`,
                    unitPrice: catalogItem.unitPrice,
                    quantity: validNights,
                    image: catalogItem.image,
                });
            }
            else {
                subtotal = catalogItem.unitPrice * guests;
                items.push({
                    name: catalogItem.name,
                    detail: `${catalogItem.detail} · ${dates} · ${guests} Travelers`,
                    price: `₹${subtotal.toLocaleString()}`,
                    unitPrice: catalogItem.unitPrice,
                    quantity: guests,
                    image: catalogItem.image,
                });
            }
        }
        else {
            destination = data.destination || 'Rishikesh';
            const unitPrice = 3999;
            subtotal = unitPrice * guests;
            items.push({
                name: data.packageName || 'Rishikesh Adventure Expedition',
                detail: `${dates} · ${guests} Travelers`,
                price: `₹${subtotal.toLocaleString()}`,
                unitPrice,
                quantity: guests,
            });
        }
        const serviceFee = 799;
        let discount = 0;
        let appliedCoupon = undefined;
        if (data.couponCode && typeof data.couponCode === 'string' && data.couponCode.trim()) {
            const code = data.couponCode.trim().toUpperCase();
            try {
                const couponResult = await this.couponsService.validateCoupon({
                    code,
                    cartTotal: subtotal,
                });
                if (couponResult.isValid) {
                    discount = couponResult.discountAmount;
                    appliedCoupon = code;
                }
            }
            catch (err) {
                throw new BadRequestException(err?.message || `Coupon '${code}' is invalid or does not meet minimum order requirements`);
            }
        }
        const totalAmount = Math.max(0, subtotal + serviceFee - discount);
        const hex = Math.floor(100000 + Math.random() * 900000).toString();
        const bookingRef = `TJ-${hex}`;
        const newBooking = {
            id: `book-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            bookingRef,
            destination,
            dates,
            guestCount: guests,
            travelerName,
            travelerEmail,
            travelerPhone,
            status: 'PAYMENT_PENDING',
            paymentStatus: 'PENDING',
            subtotal,
            serviceFee,
            discount,
            totalAmount,
            appliedCoupon,
            items,
            createdAt: new Date().toISOString(),
        };
        this.inMemoryBookings.unshift(newBooking);
        this.logger.log(`Created booking ${bookingRef} with status PAYMENT_PENDING for ₹${totalAmount}`);
        return newBooking;
    }
    async getBooking(refOrId) {
        if (!refOrId) {
            throw new NotFoundException('Booking identifier is required');
        }
        const clean = refOrId.trim();
        const booking = this.inMemoryBookings.find((b) => b.bookingRef.toLowerCase() === clean.toLowerCase() || b.id.toLowerCase() === clean.toLowerCase());
        if (!booking) {
            throw new NotFoundException(`Booking with reference or ID '${refOrId}' not found`);
        }
        return booking;
    }
    async confirmBooking(bookingRef, paymentId, paymentMethod = 'Razorpay') {
        const booking = await this.getBooking(bookingRef);
        if (booking.status === 'CONFIRMED') {
            this.logger.log(`Booking ${bookingRef} is already confirmed.`);
            return booking;
        }
        booking.status = 'CONFIRMED';
        booking.paymentStatus = 'CAPTURED';
        booking.paymentId = paymentId;
        booking.paymentMethod = paymentMethod;
        booking.confirmedAt = new Date().toISOString();
        this.logger.log(`Booking ${bookingRef} transitioned to CONFIRMED with payment ${paymentId}`);
        return booking;
    }
    async failBooking(bookingRef, reason) {
        const booking = await this.getBooking(bookingRef);
        if (booking.status !== 'CONFIRMED') {
            booking.status = 'FAILED';
            booking.paymentStatus = 'FAILED';
            booking.failureReason = reason || 'Payment declined or cancelled';
            this.logger.warn(`Booking ${bookingRef} marked FAILED: ${booking.failureReason}`);
        }
        return booking;
    }
    async getAllBookings() {
        return this.inMemoryBookings;
    }
};
BookingsService = BookingsService_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        CouponsService])
], BookingsService);
export { BookingsService };
//# sourceMappingURL=bookings.service.js.map