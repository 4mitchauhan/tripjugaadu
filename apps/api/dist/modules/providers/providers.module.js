var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { ProvidersController } from './providers.controller.js';
import { ProvidersService } from './providers.service.js';
import { PrismaService } from '../../common/prisma.service.js';
let ProvidersModule = class ProvidersModule {
};
ProvidersModule = __decorate([
    Module({
        controllers: [ProvidersController],
        providers: [ProvidersService, PrismaService],
        exports: [ProvidersService],
    })
], ProvidersModule);
export { ProvidersModule };
//# sourceMappingURL=providers.module.js.map