var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Query } from '@nestjs/common';
import { CurrencyService } from './currency.service.js';
let CurrencyController = class CurrencyController {
    currencyService;
    constructor(currencyService) {
        this.currencyService = currencyService;
    }
    getRates() {
        return {
            status: 'success',
            baseCurrency: 'INR',
            currencies: this.currencyService.getAllCurrencies(),
            updatedAt: new Date().toISOString(),
        };
    }
    convert(amount, to) {
        const numericAmount = parseFloat(amount || '0');
        const targetCurrency = (to?.toUpperCase() || 'INR');
        const conversion = this.currencyService.convertFromInr(numericAmount, targetCurrency);
        return {
            status: 'success',
            ...conversion,
        };
    }
};
__decorate([
    Get('rates'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CurrencyController.prototype, "getRates", null);
__decorate([
    Get('convert'),
    __param(0, Query('amount')),
    __param(1, Query('to')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], CurrencyController.prototype, "convert", null);
CurrencyController = __decorate([
    Controller('currency'),
    __metadata("design:paramtypes", [CurrencyService])
], CurrencyController);
export { CurrencyController };
//# sourceMappingURL=currency.controller.js.map