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
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { AdminService } from './admin.service.js';
let AdminController = class AdminController {
    adminService;
    constructor(adminService) {
        this.adminService = adminService;
    }
    async getPlatformStats() {
        const stats = await this.adminService.getPlatformStats();
        return {
            status: 'success',
            data: stats,
        };
    }
    async getDashboard() {
        return this.getPlatformStats();
    }
    async getPendingProviders() {
        const providers = await this.adminService.getPendingProviders();
        return {
            status: 'success',
            count: providers.length,
            data: providers,
        };
    }
    async approveProvider(id, approved, reason) {
        const result = await this.adminService.approveProvider(id, approved, reason);
        return {
            status: 'success',
            message: `Provider ${approved ? 'approved' : 'rejected'}`,
            data: result,
        };
    }
    async getPendingListings() {
        const listings = await this.adminService.getPendingListings();
        return {
            status: 'success',
            count: listings.length,
            data: listings,
        };
    }
    async approveListing(id, approved) {
        const result = await this.adminService.approveListing(id, approved);
        return {
            status: 'success',
            message: `Listing ${approved ? 'published' : 'rejected'}`,
            data: result,
        };
    }
    async getAuditLogs() {
        const logs = await this.adminService.getAuditLogs();
        return {
            status: 'success',
            count: logs.length,
            data: logs,
        };
    }
};
__decorate([
    Get('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPlatformStats", null);
__decorate([
    Get('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getDashboard", null);
__decorate([
    Get('providers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPendingProviders", null);
__decorate([
    Post('providers/:id/approve'),
    __param(0, Param('id')),
    __param(1, Body('approved')),
    __param(2, Body('reason')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean, String]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveProvider", null);
__decorate([
    Get('listings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getPendingListings", null);
__decorate([
    Post('listings/:id/approve'),
    __param(0, Param('id')),
    __param(1, Body('approved')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "approveListing", null);
__decorate([
    Get('audit-logs'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAuditLogs", null);
AdminController = __decorate([
    Controller('admin'),
    __metadata("design:paramtypes", [AdminService])
], AdminController);
export { AdminController };
//# sourceMappingURL=admin.controller.js.map