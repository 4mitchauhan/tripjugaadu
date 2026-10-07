import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { SEED_DESTINATIONS, SEED_ADVENTURES, SEED_STAYS, SEED_EXPERIENCES } from '../../common/seed-data.js';

@Injectable()
export class DestinationsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(featured?: boolean) {
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

  async findBySlug(slug: string) {
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
}
