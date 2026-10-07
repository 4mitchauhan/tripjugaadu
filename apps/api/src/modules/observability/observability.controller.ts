import { Controller, Get } from '@nestjs/common';
import { ObservabilityService } from './observability.service.js';

@Controller()
export class ObservabilityController {
  constructor(private readonly observabilityService: ObservabilityService) {}

  @Get('health')
  async getHealth() {
    return await this.observabilityService.getHealth();
  }

  @Get('metrics')
  getMetrics() {
    return {
      status: 'success',
      data: this.observabilityService.getMetrics(),
    };
  }
}
