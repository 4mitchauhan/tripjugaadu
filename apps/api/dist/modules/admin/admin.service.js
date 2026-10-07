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
let AdminService = class AdminService {
    prisma;
    auditLogs = [
        {
            id: 'audit-01',
            actor: 'admin@tripjugaadu.com',
            action: 'PROVIDER_APPROVED',
            resource: 'Himalayan Rapids & Trails Ltd. (prov-01)',
            ipAddress: '103.21.244.12',
            timestamp: new Date('2026-09-28T10:14:00Z').toISOString()
        },
        {
            id: 'audit-02',
            actor: 'admin@tripjugaadu.com',
            action: 'LISTING_PUBLISHED',
            resource: 'White Water Rafting (list-01)',
            ipAddress: '103.21.244.12',
            timestamp: new Date('2026-09-29T14:30:00Z').toISOString()
        },
        {
            id: 'audit-03',
            actor: 'system_webhook',
            action: 'PAYMENT_CAPTURED',
            resource: 'Booking TJ-784219 (₹20,998)',
            ipAddress: '125.18.20.90',
            timestamp: new Date('2026-10-01T18:22:15Z').toISOString()
        }
    ];
    pendingProviders = [
        {
            id: 'prov-pending-01',
            businessName: 'Zanskar Glacier Guides',
            ownerName: 'Stanzin Dorje',
            email: 'stanzin@zanskarguides.in',
            phone: '+91 94191 23456',
            region: 'Leh Ladakh',
            gstNumber: '01AAACZ1234F1Z5',
            submittedAt: new Date('2026-10-02').toISOString(),
            status: 'PENDING'
        },
        {
            id: 'prov-pending-02',
            businessName: 'Parvati Valley High Camps',
            ownerName: 'Vikas Thakur',
            email: 'vikas@parvaticamps.com',
            phone: '+91 98055 77665',
            region: 'Kasol & Manali',
            gstNumber: '02AAAFP5678G2Z9',
            submittedAt: new Date('2026-10-04').toISOString(),
            status: 'PENDING'
        }
    ];
    pendingListings = [
        {
            id: 'list-pending-01',
            providerName: 'Zanskar Glacier Guides',
            title: 'Chadar Frozen River Trek (9 Days)',
            category: 'Extreme',
            difficulty: 'Extreme',
            destination: 'Ladakh',
            basePrice: 28500,
            capacity: 12,
            submittedAt: new Date('2026-10-03').toISOString(),
            status: 'UNDER_REVIEW'
        }
    ];
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getPlatformStats() {
        return {
            grossMerchandiseValue: '₹14,82,600',
            totalBookings: 148,
            verifiedProviders: 18,
            pendingApprovals: this.pendingProviders.length + this.pendingListings.length,
            activeTravelers: 1240,
            systemHealth: '100% Operational'
        };
    }
    async getPendingProviders() {
        return this.pendingProviders;
    }
    async approveProvider(id, approved, reason) {
        const prov = this.pendingProviders.find(p => p.id === id);
        if (!prov) {
            throw new NotFoundException(`Provider ${id} not found in review queue`);
        }
        prov.status = approved ? 'APPROVED' : 'REJECTED';
        this.auditLogs.unshift({
            id: `audit-${Date.now()}`,
            actor: 'admin@tripjugaadu.com',
            action: approved ? 'PROVIDER_APPROVED' : 'PROVIDER_REJECTED',
            resource: `${prov.businessName} (${prov.id})`,
            ipAddress: '103.21.244.12',
            timestamp: new Date().toISOString()
        });
        return {
            provider: prov,
            action: prov.status,
            note: reason || (approved ? 'All regulatory documents and insurance verified' : 'Incomplete documentation')
        };
    }
    async getPendingListings() {
        return this.pendingListings;
    }
    async approveListing(id, approved) {
        const list = this.pendingListings.find(l => l.id === id);
        if (!list) {
            throw new NotFoundException(`Listing ${id} not found in review queue`);
        }
        list.status = approved ? 'PUBLISHED' : 'REJECTED';
        this.auditLogs.unshift({
            id: `audit-${Date.now()}`,
            actor: 'admin@tripjugaadu.com',
            action: approved ? 'LISTING_PUBLISHED' : 'LISTING_REJECTED',
            resource: `${list.title} (${list.id})`,
            ipAddress: '103.21.244.12',
            timestamp: new Date().toISOString()
        });
        return {
            listing: list,
            status: list.status
        };
    }
    async getAuditLogs() {
        return this.auditLogs;
    }
};
AdminService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminService);
export { AdminService };
//# sourceMappingURL=admin.service.js.map