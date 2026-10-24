import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-order')
  async createOrder(
    @Body('bookingRef') bookingRef: string,
    @Body('amount') amount: number,
  ) {
    const order = await this.paymentsService.createPaymentOrder(bookingRef, amount);
    return {
      status: 'success',
      data: order,
    };
  }

  @Post('verify')
  async verifyPayment(
    @Body('orderId') orderId: string,
    @Body('paymentId') paymentId: string,
    @Body('signature') signature: string,
    @Body('bookingRef') bookingRef?: string,
  ) {
    const result = await this.paymentsService.verifyPayment(orderId, paymentId, signature, bookingRef);
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('webhook')
  async handleWebhook(
    @Body() payload: any,
    @Headers('x-razorpay-signature') signature?: string,
  ) {
    const result = await this.paymentsService.processWebhook(payload, signature);
    return {
      status: 'success',
      data: result,
    };
  }
}
