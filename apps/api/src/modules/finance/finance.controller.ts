import { Controller, Get, Post, Param, Query, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/guards/roles.decorator.js';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('summary')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  getFinancialSummary() {
    return {
      status: 'success',
      data: this.financeService.getFinancialSummary(),
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ledger')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  getLedger(@Query('limit') limit: string) {
    const numLimit = parseInt(limit || '50', 10);
    return {
      status: 'success',
      count: this.financeService.getLedgerEntries(numLimit).length,
      data: this.financeService.getLedgerEntries(numLimit),
    };
  }

  @Get('commissions')
  getCommissionTiers() {
    return {
      status: 'success',
      tiers: this.financeService.getCommissionTiers(),
    };
  }

  @Get('payouts')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  getPayouts() {
    return {
      status: 'success',
      data: this.financeService.getPayouts(),
    };
  }

  @Post('payouts/:id/settle')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('ADMIN')
  settlePayout(@Param('id') id: string) {
    const settled = this.financeService.settlePayout(id);
    return {
      status: 'success',
      message: 'Payout settlement executed successfully',
      data: settled,
    };
  }
}
