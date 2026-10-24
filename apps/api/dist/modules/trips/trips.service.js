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
let TripsService = class TripsService {
    prisma;
    inMemoryTrips = [
        {
            id: 'trip-demo-01',
            title: 'Rishikesh High-Adrenaline & River Retreat',
            destinationId: 'rishikesh',
            destinationName: 'Rishikesh',
            startDate: '2026-10-12',
            endDate: '2026-10-15',
            travelersCount: 2,
            budgetTier: 'EXPLORER',
            readinessScore: 80,
            days: [
                {
                    day: 1,
                    label: 'Day 01',
                    items: [
                        { id: 'item-1', name: 'Arrival in Rishikesh & Check-in', time: '12:00 PM', duration: '1 hr', status: 'confirmed', price: '₹6,499' },
                        { id: 'item-2', name: 'Relaxation at Riverside Cafe', time: '2:00 PM', duration: '2 hrs', status: 'confirmed', price: '₹800' },
                        { id: 'item-3', name: 'Parmarth Niketan Ganga Aarti', time: '6:00 PM', duration: '1.5 hrs', status: 'pending', price: 'Free' }
                    ]
                },
                {
                    day: 2,
                    label: 'Day 02',
                    items: [
                        { id: 'item-4', name: 'White Water Rafting (Shivpuri to NIM)', time: '8:00 AM', duration: '3–4 hrs', status: 'confirmed', price: '₹3,999' },
                        { id: 'item-5', name: 'Lunch & Beatles Ashram Exploration', time: '1:30 PM', duration: '2.5 hrs', status: 'pending', price: '₹600' },
                        { id: 'item-6', name: 'Sunset Over-The-River Zipline', time: '5:00 PM', duration: '1 hr', status: 'confirmed', price: '₹1,999' }
                    ]
                },
                {
                    day: 3,
                    label: 'Day 03',
                    items: [
                        { id: 'item-7', name: 'Mohanchatti Bungee Jump (83m)', time: '9:00 AM', duration: '2 hrs', status: 'confirmed', price: '₹5,200' },
                        { id: 'item-8', name: 'Local Handicrafts Souvenir Shopping', time: '1:00 PM', duration: '2 hrs', status: 'pending', price: 'Self' },
                        { id: 'item-9', name: 'Departure to Dehradun Airport', time: '4:30 PM', duration: '1.5 hrs', status: 'pending', price: '₹1,200' }
                    ]
                }
            ]
        }
    ];
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createTrip(dto) {
        const tripId = `trip-${Date.now()}`;
        const destinationId = dto.destinationId || 'rishikesh';
        const destinationCapitalized = destinationId.charAt(0).toUpperCase() + destinationId.slice(1);
        const title = dto.title || `${destinationCapitalized} Adventure Journey`;
        const days = dto.days && dto.days.length > 0
            ? dto.days.map((d) => ({
                day: d.dayNumber || d.day || 1,
                label: d.label || `Day 0${d.dayNumber || d.day || 1}`,
                items: Array.isArray(d.items) ? d.items : [],
            }))
            : [
                {
                    day: 1,
                    label: 'Day 01',
                    items: [
                        { id: `item-${Date.now()}-1`, name: `Arrival in ${destinationCapitalized} & Hotel Check-in`, time: '12:00 PM', duration: '1 hr', status: 'confirmed', price: '₹4,500' },
                        { id: `item-${Date.now()}-2`, name: 'Local Orientation & Welcome Walk', time: '3:00 PM', duration: '2 hrs', status: 'pending', price: 'Free' },
                        { id: `item-${Date.now()}-3`, name: 'Sunset Viewpoint & Regional Dinner', time: '6:30 PM', duration: '2 hrs', status: 'pending', price: '₹800' }
                    ]
                },
                {
                    day: 2,
                    label: 'Day 02',
                    items: [
                        { id: `item-${Date.now()}-4`, name: 'Flagship Adventure Experience', time: '8:30 AM', duration: '4 hrs', status: 'confirmed', price: '₹3,999' },
                        { id: `item-${Date.now()}-5`, name: 'Cultural Trail & Artisan Workshop', time: '2:30 PM', duration: '3 hrs', status: 'pending', price: '₹1,200' }
                    ]
                },
                {
                    day: 3,
                    label: 'Day 03',
                    items: [
                        { id: `item-${Date.now()}-6`, name: 'Morning Nature Trek & Meditation', time: '7:30 AM', duration: '2.5 hrs', status: 'pending', price: 'Free' },
                        { id: `item-${Date.now()}-7`, name: 'Check-out & Onward Journey', time: '1:00 PM', duration: '1 hr', status: 'pending', price: 'Self' }
                    ]
                }
            ];
        const newTrip = {
            id: tripId,
            title,
            destinationId,
            destinationName: destinationCapitalized,
            startDate: dto.startDate || '2026-10-15',
            endDate: dto.endDate || '2026-10-18',
            travelersCount: dto.travelersCount || 2,
            budgetTier: dto.budgetTier || 'EXPLORER',
            budgetLimit: dto.budgetLimit || null,
            unscheduledItems: dto.unscheduledItems || [],
            readinessScore: 85,
            days,
        };
        this.inMemoryTrips.unshift(newTrip);
        return newTrip;
    }
    async findUserTrips() {
        return this.inMemoryTrips;
    }
    async findById(id) {
        const trip = this.inMemoryTrips.find(t => t.id === id);
        if (!trip) {
            return this.inMemoryTrips[0];
        }
        return trip;
    }
};
TripsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], TripsService);
export { TripsService };
//# sourceMappingURL=trips.service.js.map