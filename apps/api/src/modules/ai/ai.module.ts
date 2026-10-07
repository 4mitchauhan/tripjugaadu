import { Module } from '@nestjs/common';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';
import { AiToolsService } from './ai-tools.service.js';
import { AiGuardrailsService } from './ai-guardrails.service.js';
import { MockAiProvider } from './providers/mock-ai.provider.js';
import { GeminiAiProvider } from './providers/gemini-ai.provider.js';
import { PrismaService } from '../../common/prisma.service.js';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    AiToolsService,
    AiGuardrailsService,
    MockAiProvider,
    GeminiAiProvider,
    PrismaService,
  ],
  exports: [AiService],
})
export class AiModule {}
