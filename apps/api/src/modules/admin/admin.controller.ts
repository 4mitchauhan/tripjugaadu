import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service.js';
import { AuthGuard } from '../../common/guards/auth.guard.js';
import { RolesGuard } from '../../common/guards/roles.guard.js';
import { Roles } from '../../common/guards/roles.decorator.js';

@Controller('admin')
@UseGuards(AuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getPlatformStats() {
    const stats = await this.adminService.getPlatformStats();
    return {
      status: 'success',
      data: stats,
    };
  }

  @Get('dashboard')
  async getDashboard() {
    return this.getPlatformStats();
  }

  @Get('providers')
  async getPendingProviders() {
    const providers = await this.adminService.getPendingProviders();
    return {
      status: 'success',
      count: providers.length,
      data: providers,
    };
  }

  @Post('providers/:id/approve')
  async approveProvider(
    @Param('id') id: string,
    @Body('approved') approved: boolean,
    @Body('reason') reason?: string,
  ) {
    const result = await this.adminService.approveProvider(id, approved, reason);
    return {
      status: 'success',
      message: `Provider ${approved ? 'approved' : 'rejected'}`,
      data: result,
    };
  }

  @Get('listings')
  async getPendingListings() {
    const listings = await this.adminService.getPendingListings();
    return {
      status: 'success',
      count: listings.length,
      data: listings,
    };
  }

  @Post('listings/:id/approve')
  async approveListing(
    @Param('id') id: string,
    @Body('approved') approved: boolean,
  ) {
    const result = await this.adminService.approveListing(id, approved);
    return {
      status: 'success',
      message: `Listing ${approved ? 'published' : 'rejected'}`,
      data: result,
    };
  }

  @Get('audit-logs')
  async getAuditLogs() {
    const logs = await this.adminService.getAuditLogs();
    return {
      status: 'success',
      count: logs.length,
      data: logs,
    };
  }
}
