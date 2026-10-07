import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { SEED_ADVENTURES } from '../../common/seed-data.js';

@Injectable()
export class AdventuresService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(difficulty?: string, category?: string) {
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

  async findBySlug(slug: string) {
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
}
