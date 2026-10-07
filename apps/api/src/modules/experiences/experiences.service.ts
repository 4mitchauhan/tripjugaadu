import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { SEED_EXPERIENCES } from '../../common/seed-data.js';

@Injectable()
export class ExperiencesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    if (this.prisma.isConnected) {
      return this.prisma.experience.findMany({
        include: { destination: true },
      });
    }
    return SEED_EXPERIENCES;
  }

  async findBySlug(slug: string) {
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
}
