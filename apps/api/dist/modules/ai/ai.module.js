var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AiController } from './ai.controller.js';
import { AiService } from './ai.service.js';
import { AiToolsService } from './ai-tools.service.js';
import { AiGuardrailsService } from './ai-guardrails.service.js';
import { MockAiProvider } from './providers/mock-ai.provider.js';
import { GeminiAiProvider } from './providers/gemini-ai.provider.js';
import { PrismaService } from '../../common/prisma.service.js';
let AiModule = class AiModule {
};
AiModule = __decorate([
    Module({
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
], AiModule);
export { AiModule };
//# sourceMappingURL=ai.module.js.map