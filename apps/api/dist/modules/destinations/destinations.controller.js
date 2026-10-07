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
import { Controller, Get, Param, Query } from '@nestjs/common';
import { DestinationsService } from './destinations.service.js';
let DestinationsController = class DestinationsController {
    destinationsService;
    constructor(destinationsService) {
        this.destinationsService = destinationsService;
    }
    async getAllDestinations(featured) {
        const isFeatured = featured === 'true' ? true : featured === 'false' ? false : undefined;
        const destinations = await this.destinationsService.findAll(isFeatured);
        return {
            status: 'success',
            count: destinations.length,
            data: destinations,
        };
    }
    async getDestinationBySlug(slug) {
        const destination = await this.destinationsService.findBySlug(slug);
        return {
            status: 'success',
            data: destination,
        };
    }
};
__decorate([
    Get(),
    __param(0, Query('featured')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "getAllDestinations", null);
__decorate([
    Get(':slug'),
    __param(0, Param('slug')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DestinationsController.prototype, "getDestinationBySlug", null);
DestinationsController = __decorate([
    Controller('destinations'),
    __metadata("design:paramtypes", [DestinationsService])
], DestinationsController);
export { DestinationsController };
//# sourceMappingURL=destinations.controller.js.map