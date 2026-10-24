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
import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/guards/roles.decorator.js';
let FinanceController = class FinanceController {
    financeService;
    constructor(financeService) {
        this.financeService = financeService;
    }
    getFinancialSummary() {
        return {
            status: 'success',
            data: this.financeService.getFinancialSummary(),
            timestamp: new Date().toISOString(),
        };
    }
    getLedger(limit) {
        const numLimit = parseInt(limit || '50', 10);
        return {
            status: 'success',
            count: this.financeService.getLedgerEntries(numLimit).length,
            data: this.financeService.getLedgerEntries(numLimit),
        };
    }
    getCommissionTiers() {
        return {
            status: 'success',
            tiers: this.financeService.getCommissionTiers(),
        };
    }
    getPayouts() {
        return {
            status: 'success',
            data: this.financeService.getPayouts(),
        };
    }
    settlePayout(id) {
        const settled = this.financeService.settlePayout(id);
        return {
            status: 'success',
            message: 'Payout settlement executed successfully',
            data: settled,
        };
    }
};
__decorate([
    Get('summary'),
    UseGuards(AuthGuard, RolesGuard),
    Roles('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getFinancialSummary", null);
__decorate([
    Get('ledger'),
    UseGuards(AuthGuard, RolesGuard),
    Roles('ADMIN'),
    __param(0, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getLedger", null);
__decorate([
    Get('commissions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getCommissionTiers", null);
__decorate([
    Get('payouts'),
    UseGuards(AuthGuard, RolesGuard),
    Roles('ADMIN'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "getPayouts", null);
__decorate([
    Post('payouts/:id/settle'),
    UseGuards(AuthGuard, RolesGuard),
    Roles('ADMIN'),
    __param(0, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FinanceController.prototype, "settlePayout", null);
FinanceController = __decorate([
    Controller('finance'),
    __metadata("design:paramtypes", [FinanceService])
], FinanceController);
export { FinanceController };
//# sourceMappingURL=finance.controller.js.map