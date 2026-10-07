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
import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ProvidersService, ProviderRegistrationDto, CreateListingDto } from './providers.service.js';
let ProvidersController = class ProvidersController {
    providersService;
    constructor(providersService) {
        this.providersService = providersService;
    }
    async register(body) {
        const provider = await this.providersService.register(body);
        return {
            status: 'success',
            message: 'Provider registration submitted for verification',
            data: provider,
        };
    }
    async getDashboardSummary() {
        const data = await this.providersService.getDashboardSummary();
        return {
            status: 'success',
            data,
        };
    }
    async getListings() {
        const listings = await this.providersService.getListings();
        return {
            status: 'success',
            count: listings.length,
            data: listings,
        };
    }
    async createListing(body) {
        const listing = await this.providersService.createListing(body);
        return {
            status: 'success',
            message: 'Listing submitted for admin moderation',
            data: listing,
        };
    }
    async getBookings() {
        const bookings = await this.providersService.getBookings();
        return {
            status: 'success',
            count: bookings.length,
            data: bookings,
        };
    }
    async updateCheckIn(id, checkedIn) {
        const booking = await this.providersService.updateBookingCheckIn(id, checkedIn);
        return {
            status: 'success',
            message: 'Check-in status updated',
            data: booking,
        };
    }
};
__decorate([
    Post('register'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ProviderRegistrationDto]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "register", null);
__decorate([
    Get('dashboard'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "getDashboardSummary", null);
__decorate([
    Get('listings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "getListings", null);
__decorate([
    Post('listings'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateListingDto]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "createListing", null);
__decorate([
    Get('bookings'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "getBookings", null);
__decorate([
    Patch('bookings/:id/checkin'),
    __param(0, Param('id')),
    __param(1, Body('checkedIn')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", Promise)
], ProvidersController.prototype, "updateCheckIn", null);
ProvidersController = __decorate([
    Controller('providers'),
    __metadata("design:paramtypes", [ProvidersService])
], ProvidersController);
export { ProvidersController };
//# sourceMappingURL=providers.controller.js.map