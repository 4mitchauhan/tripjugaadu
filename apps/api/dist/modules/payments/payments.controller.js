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
import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
let PaymentsController = class PaymentsController {
    paymentsService;
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async createOrder(bookingRef, amount) {
        const order = await this.paymentsService.createPaymentOrder(bookingRef, amount);
        return {
            status: 'success',
            data: order,
        };
    }
    async verifyPayment(orderId, paymentId, signature) {
        const result = await this.paymentsService.verifyPayment(orderId, paymentId, signature);
        return {
            status: 'success',
            data: result,
        };
    }
    async handleWebhook(payload, signature) {
        const result = await this.paymentsService.processWebhook(payload, signature);
        return {
            status: 'success',
            data: result,
        };
    }
};
__decorate([
    Post('create-order'),
    __param(0, Body('bookingRef')),
    __param(1, Body('amount')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "createOrder", null);
__decorate([
    Post('verify'),
    __param(0, Body('orderId')),
    __param(1, Body('paymentId')),
    __param(2, Body('signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "verifyPayment", null);
__decorate([
    Post('webhook'),
    __param(0, Body()),
    __param(1, Headers('x-razorpay-signature')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], PaymentsController.prototype, "handleWebhook", null);
PaymentsController = __decorate([
    Controller('payments'),
    __metadata("design:paramtypes", [PaymentsService])
], PaymentsController);
export { PaymentsController };
//# sourceMappingURL=payments.controller.js.map