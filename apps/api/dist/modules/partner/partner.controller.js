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
import { Controller, Get, Post, Headers, Body } from '@nestjs/common';
import { PartnerService } from './partner.service.js';
import { PartnerBookingRequest } from './partner.interface.js';
let PartnerController = class PartnerController {
    partnerService;
    constructor(partnerService) {
        this.partnerService = partnerService;
    }
    getCatalog(apiKey) {
        const partner = this.partnerService.validateKey(apiKey);
        return {
            status: 'success',
            data: this.partnerService.getPartnerCatalog(partner),
        };
    }
    createBooking(apiKey, body) {
        const partner = this.partnerService.validateKey(apiKey);
        return {
            status: 'success',
            data: this.partnerService.createPartnerBooking(partner, body),
        };
    }
    getWebhooks(apiKey) {
        const partner = this.partnerService.validateKey(apiKey);
        return {
            status: 'success',
            count: this.partnerService.getWebhookLogs(partner).length,
            data: this.partnerService.getWebhookLogs(partner),
        };
    }
};
__decorate([
    Get('catalog'),
    __param(0, Headers('x-partner-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartnerController.prototype, "getCatalog", null);
__decorate([
    Post('bookings'),
    __param(0, Headers('x-partner-key')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, PartnerBookingRequest]),
    __metadata("design:returntype", void 0)
], PartnerController.prototype, "createBooking", null);
__decorate([
    Get('webhooks'),
    __param(0, Headers('x-partner-key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PartnerController.prototype, "getWebhooks", null);
PartnerController = __decorate([
    Controller('partner'),
    __metadata("design:paramtypes", [PartnerService])
], PartnerController);
export { PartnerController };
//# sourceMappingURL=partner.controller.js.map