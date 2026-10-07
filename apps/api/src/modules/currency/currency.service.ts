import { Injectable, BadRequestException } from '@nestjs/common';
import { CurrencyCode, CurrencyConfig, ConvertedAmount } from './currency.interface.js';

@Injectable()
export class CurrencyService {
  private readonly currencies: Record<CurrencyCode, CurrencyConfig> = {
    INR: {
      code: 'INR',
      symbol: '₹',
      name: 'Indian Rupee',
      rateToBaseInr: 1.0,
      inrMultiplier: 1.0,
      locale: 'en-IN',
    },
    USD: {
      code: 'USD',
      symbol: '$',
      name: 'US Dollar',
      rateToBaseInr: 0.012, // approx 1 USD = 83.3 INR
      inrMultiplier: 83.33,
      locale: 'en-US',
    },
    EUR: {
      code: 'EUR',
      symbol: '€',
      name: 'Euro',
      rateToBaseInr: 0.011, // approx 1 EUR = 90.9 INR
      inrMultiplier: 90.91,
      locale: 'de-DE',
    },
    GBP: {
      code: 'GBP',
      symbol: '£',
      name: 'British Pound',
      rateToBaseInr: 0.0094, // approx 1 GBP = 106.38 INR
      inrMultiplier: 106.38,
      locale: 'en-GB',
    },
    AED: {
      code: 'AED',
      symbol: 'AED ',
      name: 'UAE Dirham',
      rateToBaseInr: 0.044, // approx 1 AED = 22.72 INR
      inrMultiplier: 22.72,
      locale: 'ar-AE',
    },
  };

  getAllCurrencies(): Record<CurrencyCode, CurrencyConfig> {
    return this.currencies;
  }

  getCurrency(code: string): CurrencyConfig {
    const upper = code.toUpperCase() as CurrencyCode;
    const config = this.currencies[upper];
    if (!config) {
      throw new BadRequestException(`Unsupported currency code: ${code}. Supported: INR, USD, EUR, GBP, AED`);
    }
    return config;
  }

  convertFromInr(amountInInr: number, targetCurrency: CurrencyCode = 'INR'): ConvertedAmount {
    const config = this.getCurrency(targetCurrency);
    let targetAmount: number;

    if (config.code === 'INR') {
      targetAmount = Math.round(amountInInr);
    } else {
      // Rounded to 2 decimal places for foreign currencies
      targetAmount = Math.round(amountInInr * config.rateToBaseInr * 100) / 100;
    }

    return {
      originalAmountInInr: amountInInr,
      targetCurrency: config.code,
      targetAmount,
      formatted: this.formatAmount(targetAmount, config.code),
      rate: config.rateToBaseInr,
      timestamp: new Date().toISOString(),
    };
  }

  formatAmount(amount: number, currencyCode: CurrencyCode): string {
    const config = this.getCurrency(currencyCode);
    if (currencyCode === 'INR') {
      return `${config.symbol}${amount.toLocaleString('en-IN')}`;
    }
    return `${config.symbol}${amount.toLocaleString(config.locale, {
      minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  }
}
