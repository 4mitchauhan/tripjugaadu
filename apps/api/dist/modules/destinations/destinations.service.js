var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { SEED_DESTINATIONS, SEED_ADVENTURES, SEED_STAYS, SEED_EXPERIENCES } from '../../common/seed-data.js';
let DestinationsService = class DestinationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(featured) {
        if (this.prisma.isConnected) {
            return this.prisma.destination.findMany({
                where: featured !== undefined ? { featured } : undefined,
                orderBy: { name: 'asc' },
            });
        }
        if (featured !== undefined) {
            return SEED_DESTINATIONS.filter(d => d.featured === featured);
        }
        return SEED_DESTINATIONS;
    }
    async findBySlug(slug) {
        if (this.prisma.isConnected) {
            const destination = await this.prisma.destination.findUnique({
                where: { slug },
                include: {
                    adventures: true,
                    stays: true,
                    experiences: true,
                },
            });
            if (!destination) {
                throw new NotFoundException(`Destination with slug '${slug}' not found`);
            }
            return destination;
        }
        const destination = SEED_DESTINATIONS.find(d => d.slug === slug || d.id === slug);
        if (!destination) {
            throw new NotFoundException(`Destination with slug '${slug}' not found`);
        }
        const adventures = SEED_ADVENTURES.filter(a => a.destinationSlug === destination.slug || a.destinationId === destination.id);
        const stays = SEED_STAYS.filter(s => s.destinationSlug === destination.slug || s.destinationId === destination.id);
        const experiences = SEED_EXPERIENCES.filter(e => e.destinationSlug === destination.slug || e.destinationId === destination.id);
        return {
            ...destination,
            adventures,
            stays,
            experiences,
        };
    }
};
DestinationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], DestinationsService);
export { DestinationsService };
//# sourceMappingURL=destinations.service.js.map