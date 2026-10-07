import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service.js';
import { CurrencyCode } from './currency.interface.js';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('rates')
  getRates() {
    return {
      status: 'success',
      baseCurrency: 'INR',
      currencies: this.currencyService.getAllCurrencies(),
      updatedAt: new Date().toISOString(),
    };
  }

  @Get('convert')
  convert(
    @Query('amount') amount: string,
    @Query('to') to: string,
  ) {
    const numericAmount = parseFloat(amount || '0');
    const targetCurrency = (to?.toUpperCase() || 'INR') as CurrencyCode;
    const conversion = this.currencyService.convertFromInr(numericAmount, targetCurrency);

    return {
      status: 'success',
      ...conversion,
    };
  }
}
