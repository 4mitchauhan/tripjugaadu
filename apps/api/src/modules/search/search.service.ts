import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma.service.js';
import { SEED_DESTINATIONS, SEED_ADVENTURES, SEED_STAYS, SEED_EXPERIENCES } from '../../common/seed-data.js';

@Injectable()
export class SearchService {
  constructor(private readonly prisma: PrismaService) {}

  async search(params: {
    q?: string;
    category?: string;
    difficulty?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
  }) {
    const q = params.q?.toLowerCase() || '';
    const category = params.category || 'All';
    const difficulty = params.difficulty;
    const maxPrice = params.maxPrice;
    const sortBy = params.sortBy;

    const allResults: any[] = [];

    // Destinations
    if (category === 'All' || category.toLowerCase() === 'destinations') {
      const matchedDests = SEED_DESTINATIONS.filter(d => 
        !q || d.name.toLowerCase().includes(q) || d.region.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      ).map(d => ({
        id: d.id,
        slug: d.slug,
        name: d.name,
        type: 'Destination',
        location: d.region,
        image: d.heroImage,
        price: 'Explore',
        numericPrice: 0,
        difficulty: d.category,
        duration: d.daysRecommend,
        rating: 4.9,
      }));
      allResults.push(...matchedDests);
    }

    // Adventures
    if (category === 'All' || category.toLowerCase() === 'adventures') {
      let matchedAdv = SEED_ADVENTURES.filter(a => 
        !q || a.name.toLowerCase().includes(q) || a.destinationSlug.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
      );

      if (difficulty && difficulty !== 'All') {
        matchedAdv = matchedAdv.filter(a => a.difficulty.toLowerCase().includes(difficulty.toLowerCase()));
      }
      if (maxPrice) {
        matchedAdv = matchedAdv.filter(a => a.basePrice <= maxPrice);
      }

      allResults.push(...matchedAdv.map(a => ({
        id: a.id,
        slug: a.slug,
        name: a.name,
        type: 'Adventure',
        location: a.destinationSlug,
        image: a.heroImage,
        price: `₹${a.basePrice.toLocaleString()}`,
        numericPrice: a.basePrice,
        difficulty: a.difficulty,
        duration: a.duration,
        rating: a.rating,
      })));
    }

    // Stays
    if (category === 'All' || category.toLowerCase() === 'stays') {
      let matchedStays = SEED_STAYS.filter(s => 
        !q || s.name.toLowerCase().includes(q) || s.destinationSlug.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );

      if (maxPrice) {
        matchedStays = matchedStays.filter(s => s.basePrice <= maxPrice);
      }

      allResults.push(...matchedStays.map(s => ({
        id: s.id,
        slug: s.slug,
        name: s.name,
        type: 'Stay',
        location: s.destinationSlug,
        image: s.heroImage,
        price: `₹${s.basePrice.toLocaleString()}/night`,
        numericPrice: s.basePrice,
        difficulty: s.stayType,
        duration: 'Per Night',
        rating: s.rating,
      })));
    }

    // Experiences
    if (category === 'All' || category.toLowerCase() === 'experiences') {
      let matchedExp = SEED_EXPERIENCES.filter(e => 
        !q || e.name.toLowerCase().includes(q) || e.destinationSlug.toLowerCase().includes(q) || e.description.toLowerCase().includes(q)
      );

      if (maxPrice) {
        matchedExp = matchedExp.filter(e => e.price <= maxPrice);
      }

      allResults.push(...matchedExp.map(e => ({
        id: e.id,
        slug: e.slug,
        name: e.name,
        type: 'Experience',
        location: e.destinationSlug,
        image: e.heroImage,
        price: `₹${e.price.toLocaleString()}`,
        numericPrice: e.price,
        difficulty: e.category,
        duration: e.duration,
        rating: 4.8,
      })));
    }

    // Sorting
    if (sortBy === 'priceAsc') {
      allResults.sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortBy === 'priceDesc') {
      allResults.sort((a, b) => b.numericPrice - a.numericPrice);
    } else if (sortBy === 'rating') {
      allResults.sort((a, b) => b.rating - a.rating);
    }

    return allResults;
  }
}
