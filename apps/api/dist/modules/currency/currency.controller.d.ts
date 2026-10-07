import { CurrencyService } from './currency.service.js';
import { CurrencyCode } from './currency.interface.js';
export declare class CurrencyController {
    private readonly currencyService;
    constructor(currencyService: CurrencyService);
    getRates(): {
        status: string;
        baseCurrency: string;
        currencies: Record<CurrencyCode, import("./currency.interface.js").CurrencyConfig>;
        updatedAt: string;
    };
    convert(amount: string, to: string): {
        originalAmountInInr: number;
        targetCurrency: CurrencyCode;
        targetAmount: number;
        formatted: string;
        rate: number;
        timestamp: string;
        status: string;
    };
}
