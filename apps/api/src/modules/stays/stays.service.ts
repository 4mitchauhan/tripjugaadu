import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { SEED_STAYS } from '../../common/seed-data.js';

@Injectable()
export class StaysService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    if (this.prisma.isConnected) {
      return this.prisma.stay.findMany({
        include: { destination: true, rooms: true },
      });
    }
    return SEED_STAYS;
  }

  async findBySlug(slug: string) {
    if (this.prisma.isConnected) {
      const stay = await this.prisma.stay.findUnique({
        where: { slug },
        include: { destination: true, rooms: true },
      });
      if (!stay) {
        throw new NotFoundException(`Stay with slug '${slug}' not found`);
      }
      return stay;
    }

    const stay = SEED_STAYS.find(s => s.slug === slug || s.id === slug);
    if (!stay) {
      throw new NotFoundException(`Stay with slug '${slug}' not found`);
    }
    return stay;
  }
}
