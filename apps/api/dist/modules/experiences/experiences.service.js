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
import { SEED_EXPERIENCES } from '../../common/seed-data.js';
let ExperiencesService = class ExperiencesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        if (this.prisma.isConnected) {
            return this.prisma.experience.findMany({
                include: { destination: true },
            });
        }
        return SEED_EXPERIENCES;
    }
    async findBySlug(slug) {
        if (this.prisma.isConnected) {
            const experience = await this.prisma.experience.findUnique({
                where: { slug },
                include: { destination: true },
            });
            if (!experience) {
                throw new NotFoundException(`Experience with slug '${slug}' not found`);
            }
            return experience;
        }
        const experience = SEED_EXPERIENCES.find(e => e.slug === slug || e.id === slug);
        if (!experience) {
            throw new NotFoundException(`Experience with slug '${slug}' not found`);
        }
        return experience;
    }
};
ExperiencesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ExperiencesService);
export { ExperiencesService };
//# sourceMappingURL=experiences.service.js.map