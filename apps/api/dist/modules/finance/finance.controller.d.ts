import { FinanceService } from './finance.service.js';
export declare class FinanceController {
    private readonly financeService;
    constructor(financeService: FinanceService);
    getFinancialSummary(): {
        status: string;
        data: import("./finance.interface.js").MarketplaceFinancialSummary;
        timestamp: string;
    };
    getLedger(limit: string): {
        status: string;
        count: number;
        data: import("./finance.interface.js").LedgerEntry[];
    };
    getCommissionTiers(): {
        status: string;
        tiers: import("./finance.interface.js").CommissionTier[];
    };
    getPayouts(): {
        status: string;
        data: import("./finance.interface.js").ProviderPayoutRecord[];
    };
    settlePayout(id: string): {
        status: string;
        message: string;
        data: import("./finance.interface.js").ProviderPayoutRecord;
    };
}
