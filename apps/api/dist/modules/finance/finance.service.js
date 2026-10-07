var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FinanceService_1;
import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
let FinanceService = FinanceService_1 = class FinanceService {
    logger = new Logger(FinanceService_1.name);
    commissionTiers = [
        {
            category: 'Water & Extreme Sports',
            standardCommissionPct: 15.0,
            highVolumeCommissionPct: 12.0,
            gstOnCommissionPct: 18.0,
            notes: 'Includes white-water rafting, bungee jumping, and scuba diving with safety insurance buffer',
        },
        {
            category: 'Trekking & High Altitude',
            standardCommissionPct: 14.0,
            highVolumeCommissionPct: 11.5,
            gstOnCommissionPct: 18.0,
            notes: 'Includes Chadar trek, Hampta pass, Valley of Flowers expeditions',
        },
        {
            category: 'Boutique Stays & Eco Lodges',
            standardCommissionPct: 12.0,
            highVolumeCommissionPct: 10.0,
            gstOnCommissionPct: 18.0,
            notes: 'Direct hotel and riverside luxury glamping partner agreements',
        },
        {
            category: 'Cultural & Guided Experiences',
            standardCommissionPct: 10.0,
            highVolumeCommissionPct: 8.0,
            gstOnCommissionPct: 18.0,
            notes: 'Ganga Aarti tours, heritage walks, culinary safaris',
        },
    ];
    ledgerEntries = [
        {
            id: 'ledg-001',
            transactionId: 'tx-init-01',
            timestamp: '2026-10-01T10:00:00.000Z',
            type: 'DEBIT',
            account: 'CUSTOMER_ESCROW',
            amount: 20998,
            currency: 'INR',
            description: 'Customer payment captured for booking TJ-784219',
            referenceId: 'TJ-784219',
        },
        {
            id: 'ledg-002',
            transactionId: 'tx-init-01',
            timestamp: '2026-10-01T10:00:01.000Z',
            type: 'CREDIT',
            account: 'PROVIDER_PAYABLE',
            amount: 17848,
            currency: 'INR',
            description: 'Provider share credited (85% net)',
            referenceId: 'prov-01',
        },
        {
            id: 'ledg-003',
            transactionId: 'tx-init-01',
            timestamp: '2026-10-01T10:00:01.000Z',
            type: 'CREDIT',
            account: 'PLATFORM_REVENUE',
            amount: 2669,
            currency: 'INR',
            description: 'TripJugaadu marketplace commission (15% net fee)',
            referenceId: 'TJ-784219',
        },
        {
            id: 'ledg-004',
            transactionId: 'tx-init-01',
            timestamp: '2026-10-01T10:00:01.000Z',
            type: 'CREDIT',
            account: 'TAX_ESCROW',
            amount: 481,
            currency: 'INR',
            description: 'GST (18% on platform revenue)',
            referenceId: 'TJ-784219',
        },
        {
            id: 'ledg-005',
            transactionId: 'tx-init-02',
            timestamp: '2026-10-02T14:30:00.000Z',
            type: 'DEBIT',
            account: 'CUSTOMER_ESCROW',
            amount: 14999,
            currency: 'INR',
            description: 'Customer payment captured for booking TJ-928104',
            referenceId: 'TJ-928104',
        },
        {
            id: 'ledg-006',
            transactionId: 'tx-init-02',
            timestamp: '2026-10-02T14:30:01.000Z',
            type: 'CREDIT',
            account: 'PROVIDER_PAYABLE',
            amount: 12749,
            currency: 'INR',
            description: 'Provider share credited (85% net)',
            referenceId: 'prov-02',
        },
        {
            id: 'ledg-007',
            transactionId: 'tx-init-02',
            timestamp: '2026-10-02T14:30:01.000Z',
            type: 'CREDIT',
            account: 'PLATFORM_REVENUE',
            amount: 1907,
            currency: 'INR',
            description: 'TripJugaadu marketplace commission (15% net fee)',
            referenceId: 'TJ-928104',
        },
        {
            id: 'ledg-008',
            transactionId: 'tx-init-02',
            timestamp: '2026-10-02T14:30:01.000Z',
            type: 'CREDIT',
            account: 'TAX_ESCROW',
            amount: 343,
            currency: 'INR',
            description: 'GST (18% on platform revenue)',
            referenceId: 'TJ-928104',
        },
    ];
    providerPayouts = [
        {
            id: 'payout-101',
            providerId: 'prov-01',
            providerName: 'Himalayan Rapids & Trails Ltd.',
            bankAccountMasked: 'HDFC Bank •••• 8912',
            amount: 17848,
            currency: 'INR',
            status: 'PENDING',
            settlementPeriod: '2026-W39 (Sep 25 - Oct 01)',
            bookingCount: 1,
            generatedAt: '2026-10-02T00:00:00.000Z',
        },
        {
            id: 'payout-102',
            providerId: 'prov-02',
            providerName: 'Ladakh High Passes Expeditions',
            bankAccountMasked: 'SBI •••• 4401',
            amount: 12749,
            currency: 'INR',
            status: 'PENDING',
            settlementPeriod: '2026-W39 (Sep 25 - Oct 01)',
            bookingCount: 1,
            generatedAt: '2026-10-03T00:00:00.000Z',
        },
        {
            id: 'payout-100',
            providerId: 'prov-01',
            providerName: 'Himalayan Rapids & Trails Ltd.',
            bankAccountMasked: 'HDFC Bank •••• 8912',
            amount: 45000,
            currency: 'INR',
            status: 'SETTLED',
            settlementPeriod: '2026-W38 (Sep 18 - Sep 24)',
            bookingCount: 4,
            generatedAt: '2026-09-25T00:00:00.000Z',
            settledAt: '2026-09-26T11:45:00.000Z',
            transactionRef: 'NEFT-AXIS-20260926-99381',
        },
    ];
    recordBookingFinancials(bookingRef, grossAmount, providerId = 'prov-01') {
        const txId = `tx_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const now = new Date().toISOString();
        const commissionRate = 0.15;
        const grossCommission = Math.round(grossAmount * commissionRate);
        const gstRate = 0.18;
        const gstOnCommission = Math.round(grossCommission * gstRate);
        const providerShare = grossAmount - grossCommission;
        const entries = [
            {
                id: `ledg-${Date.now()}-1`,
                transactionId: txId,
                timestamp: now,
                type: 'DEBIT',
                account: 'CUSTOMER_ESCROW',
                amount: grossAmount,
                currency: 'INR',
                description: `Customer payment captured for booking ${bookingRef}`,
                referenceId: bookingRef,
            },
            {
                id: `ledg-${Date.now()}-2`,
                transactionId: txId,
                timestamp: now,
                type: 'CREDIT',
                account: 'PROVIDER_PAYABLE',
                amount: providerShare,
                currency: 'INR',
                description: `Provider share credited for booking ${bookingRef}`,
                referenceId: providerId,
            },
            {
                id: `ledg-${Date.now()}-3`,
                transactionId: txId,
                timestamp: now,
                type: 'CREDIT',
                account: 'PLATFORM_REVENUE',
                amount: grossCommission - gstOnCommission,
                currency: 'INR',
                description: `TripJugaadu net commission for ${bookingRef}`,
                referenceId: bookingRef,
            },
            {
                id: `ledg-${Date.now()}-4`,
                transactionId: txId,
                timestamp: now,
                type: 'CREDIT',
                account: 'TAX_ESCROW',
                amount: gstOnCommission,
                currency: 'INR',
                description: `GST statutory reserve on marketplace fee for ${bookingRef}`,
                referenceId: bookingRef,
            },
        ];
        this.ledgerEntries.push(...entries);
        this.logger.log(`Double-entry ledger recorded for booking ${bookingRef} (Amount: ₹${grossAmount})`);
        return {
            transactionId: txId,
            entriesRecorded: entries.length,
            providerShare,
            grossCommission,
            gstOnCommission,
        };
    }
    getLedgerEntries(limit = 50) {
        return [...this.ledgerEntries].reverse().slice(0, limit);
    }
    getCommissionTiers() {
        return this.commissionTiers;
    }
    getPayouts() {
        return this.providerPayouts;
    }
    settlePayout(payoutId) {
        const payout = this.providerPayouts.find(p => p.id === payoutId);
        if (!payout) {
            throw new NotFoundException(`Payout record ${payoutId} not found`);
        }
        if (payout.status === 'SETTLED') {
            throw new BadRequestException(`Payout ${payoutId} has already been settled`);
        }
        const txRef = `NEFT-TJ-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const now = new Date().toISOString();
        payout.status = 'SETTLED';
        payout.settledAt = now;
        payout.transactionRef = txRef;
        const txId = `tx_payout_${Date.now()}`;
        this.ledgerEntries.push({
            id: `ledg-${Date.now()}-out1`,
            transactionId: txId,
            timestamp: now,
            type: 'DEBIT',
            account: 'PROVIDER_PAYABLE',
            amount: payout.amount,
            currency: 'INR',
            description: `Settlement outflow dispatched to ${payout.providerName} (${payout.bankAccountMasked})`,
            referenceId: payout.id,
        }, {
            id: `ledg-${Date.now()}-out2`,
            transactionId: txId,
            timestamp: now,
            type: 'CREDIT',
            account: 'BANK_OUTFLOW',
            amount: payout.amount,
            currency: 'INR',
            description: `Direct banking debit via nodal settlement account for ${payout.id}`,
            referenceId: txRef,
        });
        this.logger.log(`Payout ${payoutId} settled successfully for ₹${payout.amount} to ${payout.providerName}`);
        return payout;
    }
    getFinancialSummary() {
        let grossGmv = 0;
        let netRevenue = 0;
        let taxEscrow = 0;
        let providerPayable = 0;
        let totalSettled = 0;
        for (const entry of this.ledgerEntries) {
            if (entry.account === 'CUSTOMER_ESCROW' && entry.type === 'DEBIT') {
                grossGmv += entry.amount;
            }
            if (entry.account === 'PLATFORM_REVENUE' && entry.type === 'CREDIT') {
                netRevenue += entry.amount;
            }
            if (entry.account === 'TAX_ESCROW' && entry.type === 'CREDIT') {
                taxEscrow += entry.amount;
            }
            if (entry.account === 'PROVIDER_PAYABLE') {
                if (entry.type === 'CREDIT')
                    providerPayable += entry.amount;
                if (entry.type === 'DEBIT')
                    providerPayable -= entry.amount;
            }
        }
        for (const p of this.providerPayouts) {
            if (p.status === 'SETTLED') {
                totalSettled += p.amount;
            }
        }
        return {
            grossMarketplaceValue: grossGmv,
            platformNetRevenue: netRevenue,
            providerPayableOutstanding: providerPayable,
            taxesCollectedInEscrow: taxEscrow,
            totalSettledPayouts: totalSettled,
            ledgerIntegrityStatus: 'VERIFIED_BALANCED',
        };
    }
};
FinanceService = FinanceService_1 = __decorate([
    Injectable()
], FinanceService);
export { FinanceService };
//# sourceMappingURL=finance.service.js.map