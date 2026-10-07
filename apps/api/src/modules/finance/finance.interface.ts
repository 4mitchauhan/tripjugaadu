export type LedgerEntryType = 'DEBIT' | 'CREDIT';

export type LedgerAccount = 
  | 'CUSTOMER_ESCROW'
  | 'MARKETPLACE_CLEARING'
  | 'PLATFORM_REVENUE'
  | 'PROVIDER_PAYABLE'
  | 'TAX_ESCROW'
  | 'BANK_OUTFLOW';

export interface LedgerEntry {
  id: string;
  transactionId: string;
  timestamp: string;
  type: LedgerEntryType;
  account: LedgerAccount;
  amount: number; // in base INR
  currency: string;
  description: string;
  referenceId: string;
}

export interface CommissionTier {
  category: string;
  standardCommissionPct: number;
  highVolumeCommissionPct: number;
  gstOnCommissionPct: number;
  notes: string;
}

export interface ProviderPayoutRecord {
  id: string;
  providerId: string;
  providerName: string;
  bankAccountMasked: string;
  amount: number;
  currency: string;
  status: 'PENDING' | 'PROCESSING' | 'SETTLED' | 'ON_HOLD';
  settlementPeriod: string;
  bookingCount: number;
  generatedAt: string;
  settledAt?: string;
  transactionRef?: string;
}

export interface MarketplaceFinancialSummary {
  grossMarketplaceValue: number;
  platformNetRevenue: number;
  providerPayableOutstanding: number;
  taxesCollectedInEscrow: number;
  totalSettledPayouts: number;
  ledgerIntegrityStatus: 'VERIFIED_BALANCED' | 'DISCREPANCY_DETECTED';
}
