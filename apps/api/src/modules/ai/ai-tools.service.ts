import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { SEED_DESTINATIONS, SEED_ADVENTURES, SEED_STAYS, SEED_EXPERIENCES } from '../../common/seed-data.js';

@Injectable()
export class AiToolsService {
  constructor(private readonly prisma: PrismaService) {}

  async searchDestinations(query?: string, region?: string) {
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
      } catch {
        // Fallback
      }
    }

    return SEED_DESTINATIONS.filter((d) => {
      const matchQ = query ? d.name.toLowerCase().includes(query.toLowerCase()) || d.region.toLowerCase().includes(query.toLowerCase()) : true;
      const matchR = region ? d.region.toLowerCase().includes(region.toLowerCase()) : true;
      return matchQ && matchR;
    }).slice(0, 5);
  }

  async searchAdventures(destinationSlug?: string, difficulty?: string, maxPrice?: number) {
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
      } catch {
        // Fallback
      }
    }

    return SEED_ADVENTURES.filter((a) => {
      const matchD = destinationSlug ? a.destinationId === destinationSlug : true;
      const matchP = maxPrice ? a.basePrice <= maxPrice : true;
      return matchD && matchP;
    }).slice(0, 6);
  }

  async searchStays(destinationSlug?: string, maxPrice?: number) {
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
      } catch {
        // Fallback
      }
    }

    return SEED_STAYS.filter((s) => {
      const matchD = destinationSlug ? s.destinationId === destinationSlug : true;
      const matchP = maxPrice ? s.basePrice <= maxPrice : true;
      return matchD && matchP;
    }).slice(0, 4);
  }

  async searchExperiences(destinationSlug?: string) {
    if (this.prisma.isAvailable()) {
      try {
        return await this.prisma.experience.findMany({
          where: {
            destination: destinationSlug ? { slug: destinationSlug } : undefined,
          },
          take: 4,
        });
      } catch {
        // Fallback
      }
    }

    return SEED_EXPERIENCES.filter((e) => {
      return destinationSlug ? e.destinationId === destinationSlug : true;
    }).slice(0, 4);
  }

  getDestinationKbyg(destinationSlug: string) {
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
}
