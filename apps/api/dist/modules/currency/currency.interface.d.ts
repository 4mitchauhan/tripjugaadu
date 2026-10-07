export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';
export interface CurrencyConfig {
    code: CurrencyCode;
    symbol: string;
    name: string;
    rateToBaseInr: number;
    inrMultiplier: number;
    locale: string;
}
export interface ConvertedAmount {
    originalAmountInInr: number;
    targetCurrency: CurrencyCode;
    targetAmount: number;
    formatted: string;
    rate: number;
    timestamp: string;
}
