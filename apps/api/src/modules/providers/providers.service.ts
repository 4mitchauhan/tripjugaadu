import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';

export class ProviderRegistrationDto {
  businessName!: string;
  businessRegNo?: string;
  ownerName!: string;
  email!: string;
  phone!: string;
  activityRegion!: string;
}

export class CreateListingDto {
  title!: string;
  category!: 'Water' | 'Land' | 'Air' | 'Extreme';
  difficulty!: 'Easy' | 'Moderate' | 'Hard' | 'Extreme';
  destinationSlug!: string;
  duration!: string;
  basePrice!: number;
  capacity!: number;
  description!: string;
  heroImage!: string;
  requirements!: string[];
  whatToCarry!: string[];
  whatToWear!: string[];
}

@Injectable()
export class ProvidersService {
  private inMemoryProviders: any[] = [
    {
      id: 'prov-01',
      businessName: 'Himalayan Rapids & Trails Ltd.',
      businessRegNo: 'UT-UK-2021-99881',
      ownerName: 'Rajesh Negi',
      email: 'himalayan.expeditions@tripjugaadu.com',
      phone: '+91 98123 45678',
      activityRegion: 'Rishikesh & Uttarakhand',
      verified: true,
      status: 'APPROVED',
      rating: 4.9,
      createdAt: new Date('2026-01-15').toISOString()
    }
  ];

  private inMemoryListings: any[] = [
    {
      id: 'list-01',
      providerId: 'prov-01',
      title: 'White Water Rafting (Grade III/IV)',
      category: 'Water',
      difficulty: 'Moderate',
      destinationSlug: 'rishikesh',
      duration: '3–4 Hours',
      basePrice: 3999,
      capacity: 24,
      status: 'PUBLISHED',
      rating: 4.9,
      viewsCount: 1420,
      bookingsCount: 86,
      heroImage: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      description: 'Conquer the legendary Three Blind Mice, Golf Course, and Roller Coaster rapids on the Ganga.',
      createdAt: new Date('2026-02-10').toISOString()
    },
    {
      id: 'list-02',
      providerId: 'prov-01',
      title: 'Over-The-River Sunset Zipline',
      category: 'Air',
      difficulty: 'Easy',
      destinationSlug: 'rishikesh',
      duration: '1 Hour',
      basePrice: 1999,
      capacity: 30,
      status: 'PUBLISHED',
      rating: 4.8,
      viewsCount: 890,
      bookingsCount: 52,
      heroImage: 'https://images.unsplash.com/photo-1530374036894-16864fb63b8e?w=800&q=80',
      description: 'Fly across the Ganga river valley at 60 km/h with certified mountaineering instructors.',
      createdAt: new Date('2026-03-01').toISOString()
    }
  ];

  private inMemoryBookings: any[] = [
    {
      id: 'book-prov-01',
      bookingRef: 'TJ-784219',
      listingTitle: 'White Water Rafting (Grade III/IV)',
      travelerName: 'Amit Sharma',
      guestCount: 2,
      scheduledDate: '2026-10-13',
      timeSlot: '8:00 AM – 12:00 PM',
      totalAmount: 7998,
      status: 'CONFIRMED',
      checkedIn: false
    },
    {
      id: 'book-prov-02',
      bookingRef: 'TJ-992144',
      listingTitle: 'Over-The-River Sunset Zipline',
      travelerName: 'Priya Verma',
      guestCount: 2,
      scheduledDate: '2026-10-14',
      timeSlot: '4:00 PM – 5:00 PM',
      totalAmount: 3998,
      status: 'CONFIRMED',
      checkedIn: true
    }
  ];

  constructor(private readonly prisma: PrismaService) {}

  async register(dto: ProviderRegistrationDto) {
    if (!dto.businessName || !dto.email) {
      throw new BadRequestException('Business name and contact email are required');
    }

    const provider = {
      id: `prov-${Date.now()}`,
      businessName: dto.businessName,
      businessRegNo: dto.businessRegNo || (dto as any).registrationNo || `REG-${Date.now()}`,
      ownerName: dto.ownerName || (dto as any).contactPerson || 'Operator Representative',
      email: dto.email,
      phone: dto.phone,
      activityRegion: dto.activityRegion || (dto as any).city || 'Pan-India',
      verified: false,
      status: 'PENDING',
      rating: 5.0,
      createdAt: new Date().toISOString()
    };

    this.inMemoryProviders.push(provider);
    return provider;
  }

  async getDashboardSummary() {
    const totalListings = this.inMemoryListings.length;
    const publishedListings = this.inMemoryListings.filter(l => l.status === 'PUBLISHED').length;
    const totalBookings = this.inMemoryBookings.length;
    const grossRevenue = this.inMemoryBookings.reduce((sum, b) => sum + b.totalAmount, 0);
    const netPayout = Math.round(grossRevenue * 0.90); // 10% platform commission

    return {
      provider: this.inMemoryProviders[0],
      stats: {
        totalListings,
        publishedListings,
        totalBookings,
        grossRevenue,
        netPayout,
        averageRating: 4.9
      },
      recentBookings: this.inMemoryBookings.slice(0, 5)
    };
  }

  async getListings() {
    return this.inMemoryListings;
  }

  async createListing(dto: CreateListingDto) {
    if (!dto.title || !dto.basePrice) {
      throw new BadRequestException('Listing title and base price are required');
    }

    const newListing = {
      id: `list-${Date.now()}`,
      providerId: this.inMemoryProviders[0].id,
      title: dto.title,
      category: dto.category || 'Water',
      difficulty: dto.difficulty || 'Moderate',
      destinationSlug: dto.destinationSlug || 'rishikesh',
      duration: dto.duration || '3 Hours',
      basePrice: dto.basePrice,
      capacity: dto.capacity || 20,
      status: 'UNDER_REVIEW', // goes to admin moderation
      rating: 5.0,
      viewsCount: 0,
      bookingsCount: 0,
      heroImage: dto.heroImage || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80',
      description: dto.description || '',
      requirements: dto.requirements || [],
      whatToCarry: dto.whatToCarry || [],
      whatToWear: dto.whatToWear || [],
      createdAt: new Date().toISOString()
    };

    this.inMemoryListings.unshift(newListing);
    return newListing;
  }

  async getBookings() {
    return this.inMemoryBookings;
  }

  async updateBookingCheckIn(bookingId: string, checkedIn: boolean) {
    const booking = this.inMemoryBookings.find(b => b.id === bookingId);
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    booking.checkedIn = checkedIn;
    return booking;
  }
}
