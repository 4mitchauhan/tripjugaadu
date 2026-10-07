var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Controller, Get } from '@nestjs/common';
import { ObservabilityService } from './observability.service.js';
let ObservabilityController = class ObservabilityController {
    observabilityService;
    constructor(observabilityService) {
        this.observabilityService = observabilityService;
    }
    async getHealth() {
        return await this.observabilityService.getHealth();
    }
    getMetrics() {
        return {
            status: 'success',
            data: this.observabilityService.getMetrics(),
        };
    }
};
__decorate([
    Get('health'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ObservabilityController.prototype, "getHealth", null);
__decorate([
    Get('metrics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ObservabilityController.prototype, "getMetrics", null);
ObservabilityController = __decorate([
    Controller(),
    __metadata("design:paramtypes", [ObservabilityService])
], ObservabilityController);
export { ObservabilityController };
//# sourceMappingURL=observability.controller.js.map