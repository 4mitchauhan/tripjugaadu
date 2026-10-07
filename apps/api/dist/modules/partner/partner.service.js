var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PartnerService_1;
import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { createHmac } from 'crypto';
import { SEED_DESTINATIONS, SEED_ADVENTURES, SEED_STAYS } from '../../common/seed-data.js';
let PartnerService = PartnerService_1 = class PartnerService {
    logger = new Logger(PartnerService_1.name);
    partners = [
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
    webhookLog = [
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
    validateKey(apiKey) {
        if (!apiKey) {
            return this.partners[0];
        }
        const found = this.partners.find(p => p.apiKey === apiKey && p.active);
        if (!found) {
            throw new UnauthorizedException('Invalid or inactive Partner API Key (X-Partner-Key)');
        }
        return found;
    }
    getPartnerCatalog(partner) {
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
                    b2bContractRate: Math.round(a.basePrice * 0.88),
                    retailPrice: a.basePrice,
                    capacity: a.capacity,
                })),
            },
        };
    }
    createPartnerBooking(partner, req) {
        if (!req.partnerRef || !req.customerName || !req.itemId) {
            throw new BadRequestException('partnerRef, customerName, and itemId are required');
        }
        const bookingRef = `TJ-B2B-${Date.now().toString(36).toUpperCase()}`;
        const now = new Date().toISOString();
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
        const webhookSecret = 'tj_secret_partner_webhook_production';
        const signature = createHmac('sha256', webhookSecret)
            .update(JSON.stringify(payload))
            .digest('hex');
        const webhookEvent = {
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
    getWebhookLogs(partner) {
        return this.webhookLog.filter(w => w.partnerId === partner.id || partner.tier === 'ENTERPRISE');
    }
};
PartnerService = PartnerService_1 = __decorate([
    Injectable()
], PartnerService);
export { PartnerService };
//# sourceMappingURL=partner.service.js.map