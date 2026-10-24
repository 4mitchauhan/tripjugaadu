import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { createHmac, timingSafeEqual } from 'crypto';
import { PartnerAccount, PartnerWebhookEvent, PartnerBookingRequest } from './partner.interface.js';
import { SEED_DESTINATIONS, SEED_ADVENTURES, SEED_STAYS } from '../../common/seed-data.js';

@Injectable()
export class PartnerService {
  private readonly logger = new Logger(PartnerService.name);

  private readonly partners: PartnerAccount[] = [
    {
      id: 'ptnr-01',
      name: 'Global Hikes & Expeditions UK',
      apiKey: 'tj_live_ghuk_984128471204',
      tier: 'ENTERPRISE',
      scopes: ['catalog:read', 'bookings:write', 'inventory:realtime'],
      active: true,
      rateLimitPerMin: 120,
    },
    {
      id: 'ptnr-02',
      name: 'Corporate Offsites Hub India',
      apiKey: 'tj_live_cohi_129481928471',
      tier: 'AGENCY',
      scopes: ['catalog:read', 'bookings:write'],
      active: true,
      rateLimitPerMin: 60,
    },
  ];

  private readonly webhookLog: PartnerWebhookEvent[] = [
    {
      id: 'wh-evt-01',
      eventType: 'booking.confirmed',
      timestamp: '2026-10-02T14:32:00.000Z',
      partnerId: 'ptnr-01',
      payload: { bookingRef: 'TJ-784219', status: 'CONFIRMED', amount: 20998 },
      hmacSignature: 'sha256=98f12a48bc900f1284a1e941ba2',
      status: 'DELIVERED',
    },
  ];

  validateKey(apiKey?: string): PartnerAccount {
    if (!apiKey || typeof apiKey !== 'string' || apiKey.trim().length === 0) {
      throw new UnauthorizedException('Valid X-Partner-Key header is required to access Partner APIs');
    }
    const cleanKey = apiKey.trim();
    const keyBuf = Buffer.from(cleanKey);

    const found = this.partners.find(p => {
      const pBuf = Buffer.from(p.apiKey);
      return p.active && keyBuf.length === pBuf.length && timingSafeEqual(keyBuf, pBuf);
    });

    if (!found) {
      throw new UnauthorizedException('Invalid or inactive Partner API Key (X-Partner-Key)');
    }
    return found;
  }

  getPartnerCatalog(partner: PartnerAccount) {
    this.logger.log(`Serving B2B partner catalog to ${partner.name} [Tier: ${partner.tier}]`);
    return {
      partner: partner.name,
      tier: partner.tier,
      destinationsCount: SEED_DESTINATIONS.length,
      adventuresCount: SEED_ADVENTURES.length,
      staysCount: SEED_STAYS.length,
      catalog: {
        destinations: SEED_DESTINATIONS.map(d => ({
          id: d.id,
          name: d.name,
          region: d.region,
          bestSeason: d.bestSeason,
          heroImage: d.heroImage,
        })),
        adventures: SEED_ADVENTURES.map(a => ({
          id: a.id,
          name: a.name,
          category: a.category,
          difficulty: a.difficulty,
          duration: a.duration,
          b2bContractRate: Math.round(a.basePrice * 0.88), // 12% B2B wholesale discount
          retailPrice: a.basePrice,
          capacity: a.capacity,
        })),
      },
    };
  }

  createPartnerBooking(partner: PartnerAccount, req: PartnerBookingRequest) {
    if (!req.partnerRef || !req.customerName || !req.itemId) {
      throw new BadRequestException('partnerRef, customerName, and itemId are required');
    }

    const bookingRef = `TJ-B2B-${Date.now().toString(36).toUpperCase()}`;
    const now = new Date().toISOString();

    // Trigger webhook event dispatch
    const payload = {
      bookingRef,
      partnerRef: req.partnerRef,
      customerName: req.customerName,
      itemId: req.itemId,
      guestCount: req.guestCount || 1,
      scheduledDate: req.scheduledDate,
      status: 'CONFIRMED',
      issuedAt: now,
    };

    const webhookSecret = process.env.PARTNER_WEBHOOK_SECRET || process.env.PARTNER_SECRET_KEY || 'tj_secret_partner_webhook_production';
    const signature = createHmac('sha256', webhookSecret)
      .update(JSON.stringify(payload))
      .digest('hex');

    const webhookEvent: PartnerWebhookEvent = {
      id: `wh-evt-${Date.now()}`,
      eventType: 'booking.confirmed',
      timestamp: now,
      partnerId: partner.id,
      payload,
      hmacSignature: `sha256=${signature}`,
      status: 'DELIVERED',
    };

    this.webhookLog.unshift(webhookEvent);

    return {
      success: true,
      bookingRef,
      partnerRef: req.partnerRef,
      status: 'CONFIRMED',
      partner: partner.name,
      webhookDispatched: {
        id: webhookEvent.id,
        eventType: webhookEvent.eventType,
        signature: webhookEvent.hmacSignature,
      },
    };
  }

  getWebhookLogs(partner: PartnerAccount) {
    return this.webhookLog.filter(w => w.partnerId === partner.id || partner.tier === 'ENTERPRISE');
  }
}
