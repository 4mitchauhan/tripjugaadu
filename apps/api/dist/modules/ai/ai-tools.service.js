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
import { SEED_DESTINATIONS, SEED_ADVENTURES, SEED_STAYS, SEED_EXPERIENCES } from '../../common/seed-data.js';
let AiToolsService = class AiToolsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async searchDestinations(query, region) {
        if (this.prisma.isAvailable()) {
            try {
                return await this.prisma.destination.findMany({
                    where: {
                        OR: query
                            ? [
                                { name: { contains: query, mode: 'insensitive' } },
                                { region: { contains: query, mode: 'insensitive' } },
                                { description: { contains: query, mode: 'insensitive' } },
                            ]
                            : undefined,
                        region: region ? { contains: region, mode: 'insensitive' } : undefined,
                    },
                    take: 5,
                });
            }
            catch {
            }
        }
        return SEED_DESTINATIONS.filter((d) => {
            const matchQ = query ? d.name.toLowerCase().includes(query.toLowerCase()) || d.region.toLowerCase().includes(query.toLowerCase()) : true;
            const matchR = region ? d.region.toLowerCase().includes(region.toLowerCase()) : true;
            return matchQ && matchR;
        }).slice(0, 5);
    }
    async searchAdventures(destinationSlug, difficulty, maxPrice) {
        if (this.prisma.isAvailable()) {
            try {
                return await this.prisma.adventure.findMany({
                    where: {
                        destination: destinationSlug ? { slug: destinationSlug } : undefined,
                        basePrice: maxPrice ? { lte: maxPrice } : undefined,
                    },
                    include: { destination: true },
                    take: 6,
                });
            }
            catch {
            }
        }
        return SEED_ADVENTURES.filter((a) => {
            const matchD = destinationSlug ? a.destinationId === destinationSlug : true;
            const matchP = maxPrice ? a.basePrice <= maxPrice : true;
            return matchD && matchP;
        }).slice(0, 6);
    }
    async searchStays(destinationSlug, maxPrice) {
        if (this.prisma.isAvailable()) {
            try {
                return await this.prisma.stay.findMany({
                    where: {
                        destination: destinationSlug ? { slug: destinationSlug } : undefined,
                        basePrice: maxPrice ? { lte: maxPrice } : undefined,
                    },
                    include: { destination: true },
                    take: 4,
                });
            }
            catch {
            }
        }
        return SEED_STAYS.filter((s) => {
            const matchD = destinationSlug ? s.destinationId === destinationSlug : true;
            const matchP = maxPrice ? s.basePrice <= maxPrice : true;
            return matchD && matchP;
        }).slice(0, 4);
    }
    async searchExperiences(destinationSlug) {
        if (this.prisma.isAvailable()) {
            try {
                return await this.prisma.experience.findMany({
                    where: {
                        destination: destinationSlug ? { slug: destinationSlug } : undefined,
                    },
                    take: 4,
                });
            }
            catch {
            }
        }
        return SEED_EXPERIENCES.filter((e) => {
            return destinationSlug ? e.destinationId === destinationSlug : true;
        }).slice(0, 4);
    }
    getDestinationKbyg(destinationSlug) {
        const dest = SEED_DESTINATIONS.find((d) => d.slug === destinationSlug) || SEED_DESTINATIONS[0];
        return {
            destination: dest.name,
            state: dest.state,
            region: dest.region,
            bestSeason: dest.bestSeason,
            guidelines: [
                'Mandatory Government Original Photo ID check at all adventure basecamps.',
                'Zero tolerance alcohol policy 12 hours prior to water rafting and bungee jumps.',
                'Quick-dry clothing and secure footwear required for river activities.',
                'High-altitude sun protection (SPF 50+) and hydration packs recommended.',
            ],
        };
    }
};
AiToolsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AiToolsService);
export { AiToolsService };
//# sourceMappingURL=ai-tools.service.js.map