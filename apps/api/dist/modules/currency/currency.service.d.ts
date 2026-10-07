import { CurrencyCode, CurrencyConfig, ConvertedAmount } from './currency.interface.js';
export declare class CurrencyService {
    private readonly currencies;
    getAllCurrencies(): Record<CurrencyCode, CurrencyConfig>;
    getCurrency(code: string): CurrencyConfig;
    convertFromInr(amountInInr: number, targetCurrency?: CurrencyCode): ConvertedAmount;
    formatAmount(amount: number, currencyCode: CurrencyCode): string;
}
