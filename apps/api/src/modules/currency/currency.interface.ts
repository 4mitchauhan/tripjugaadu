export type CurrencyCode = 'INR' | 'USD' | 'EUR' | 'GBP' | 'AED';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  name: string;
  rateToBaseInr: number; // 1 INR = rateToBaseInr in target currency
  inrMultiplier: number; // 1 unit in target = inrMultiplier INR
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
