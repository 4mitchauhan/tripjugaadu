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
import { SEED_ADVENTURES } from '../../common/seed-data.js';
let AdventuresService = class AdventuresService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(difficulty, category) {
        if (this.prisma.isConnected) {
            return this.prisma.adventure.findMany({
                where: {
                    ...(category ? { category } : {}),
                },
                include: { destination: true },
            });
        }
        let results = [...SEED_ADVENTURES];
        if (difficulty && difficulty !== 'All') {
            results = results.filter(a => a.difficulty.toLowerCase().includes(difficulty.toLowerCase()));
        }
        if (category && category !== 'All') {
            results = results.filter(a => a.category.toLowerCase() === category.toLowerCase());
        }
        return results;
    }
    async findBySlug(slug) {
        if (this.prisma.isConnected) {
            const adventure = await this.prisma.adventure.findUnique({
                where: { slug },
                include: { destination: true },
            });
            if (!adventure) {
                throw new NotFoundException(`Adventure with slug '${slug}' not found`);
            }
            return adventure;
        }
        const adventure = SEED_ADVENTURES.find(a => a.slug === slug || a.id === slug);
        if (!adventure) {
            throw new NotFoundException(`Adventure with slug '${slug}' not found`);
        }
        return adventure;
    }
};
AdventuresService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdventuresService);
export { AdventuresService };
//# sourceMappingURL=adventures.service.js.map