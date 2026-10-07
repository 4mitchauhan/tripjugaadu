import { Controller, Get, Post, Param, Query } from '@nestjs/common';
import { FinanceService } from './finance.service.js';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('summary')
  getFinancialSummary() {
    return {
      status: 'success',
      data: this.financeService.getFinancialSummary(),
      timestamp: new Date().toISOString(),
    };
  }

  @Get('ledger')
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
  getPayouts() {
    return {
      status: 'success',
      data: this.financeService.getPayouts(),
    };
  }

  @Post('payouts/:id/settle')
  settlePayout(@Param('id') id: string) {
    const settled = this.financeService.settlePayout(id);
    return {
      status: 'success',
      message: 'Payout settlement executed successfully',
      data: settled,
    };
  }
}
