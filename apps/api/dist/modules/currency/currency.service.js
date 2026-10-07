var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, BadRequestException } from '@nestjs/common';
let CurrencyService = class CurrencyService {
    currencies = {
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
            rateToBaseInr: 0.012,
            inrMultiplier: 83.33,
            locale: 'en-US',
        },
        EUR: {
            code: 'EUR',
            symbol: '€',
            name: 'Euro',
            rateToBaseInr: 0.011,
            inrMultiplier: 90.91,
            locale: 'de-DE',
        },
        GBP: {
            code: 'GBP',
            symbol: '£',
            name: 'British Pound',
            rateToBaseInr: 0.0094,
            inrMultiplier: 106.38,
            locale: 'en-GB',
        },
        AED: {
            code: 'AED',
            symbol: 'AED ',
            name: 'UAE Dirham',
            rateToBaseInr: 0.044,
            inrMultiplier: 22.72,
            locale: 'ar-AE',
        },
    };
    getAllCurrencies() {
        return this.currencies;
    }
    getCurrency(code) {
        const upper = code.toUpperCase();
        const config = this.currencies[upper];
        if (!config) {
            throw new BadRequestException(`Unsupported currency code: ${code}. Supported: INR, USD, EUR, GBP, AED`);
        }
        return config;
    }
    convertFromInr(amountInInr, targetCurrency = 'INR') {
        const config = this.getCurrency(targetCurrency);
        let targetAmount;
        if (config.code === 'INR') {
            targetAmount = Math.round(amountInInr);
        }
        else {
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
    formatAmount(amount, currencyCode) {
        const config = this.getCurrency(currencyCode);
        if (currencyCode === 'INR') {
            return `${config.symbol}${amount.toLocaleString('en-IN')}`;
        }
        return `${config.symbol}${amount.toLocaleString(config.locale, {
            minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
            maximumFractionDigits: 2,
        })}`;
    }
};
CurrencyService = __decorate([
    Injectable()
], CurrencyService);
export { CurrencyService };
//# sourceMappingURL=currency.service.js.map