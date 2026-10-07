import { Module } from '@nestjs/common';
import { CollaborationService } from './collaboration.service.js';
import { CollaborationController } from './collaboration.controller.js';

@Module({
  controllers: [CollaborationController],
  providers: [CollaborationService],
  exports: [CollaborationService],
})
export class CollaborationModule {}
