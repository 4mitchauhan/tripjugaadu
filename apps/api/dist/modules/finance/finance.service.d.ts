import { LedgerEntry, CommissionTier, ProviderPayoutRecord, MarketplaceFinancialSummary } from './finance.interface.js';
export declare class FinanceService {
    private readonly logger;
    private readonly commissionTiers;
    private ledgerEntries;
    private providerPayouts;
    recordBookingFinancials(bookingRef: string, grossAmount: number, providerId?: string): {
        transactionId: string;
        entriesRecorded: number;
        providerShare: number;
        grossCommission: number;
        gstOnCommission: number;
    };
    getLedgerEntries(limit?: number): LedgerEntry[];
    getCommissionTiers(): CommissionTier[];
    getPayouts(): ProviderPayoutRecord[];
    settlePayout(payoutId: string): ProviderPayoutRecord;
    getFinancialSummary(): MarketplaceFinancialSummary;
}
