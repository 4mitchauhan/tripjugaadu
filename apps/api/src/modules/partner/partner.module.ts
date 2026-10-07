import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service.js';
import { PartnerController } from './partner.controller.js';

@Module({
  controllers: [PartnerController],
  providers: [PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}
