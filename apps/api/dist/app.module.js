var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaService } from './common/prisma.service.js';
import { DestinationsModule } from './modules/destinations/destinations.module.js';
import { AdventuresModule } from './modules/adventures/adventures.module.js';
import { StaysModule } from './modules/stays/stays.module.js';
import { ExperiencesModule } from './modules/experiences/experiences.module.js';
import { SearchModule } from './modules/search/search.module.js';
import { TripsModule } from './modules/trips/trips.module.js';
import { BookingsModule } from './modules/bookings/bookings.module.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { ProvidersModule } from './modules/providers/providers.module.js';
import { AdminModule } from './modules/admin/admin.module.js';
import { CouponsModule } from './modules/coupons/coupons.module.js';
import { PaymentsModule } from './modules/payments/payments.module.js';
import { AiModule } from './modules/ai/ai.module.js';
import { CurrencyModule } from './modules/currency/currency.module.js';
import { FinanceModule } from './modules/finance/finance.module.js';
import { PartnerModule } from './modules/partner/partner.module.js';
import { CollaborationModule } from './modules/collaboration/collaboration.module.js';
import { ObservabilityModule } from './modules/observability/observability.module.js';
import { CorrelationMiddleware } from './modules/observability/correlation.middleware.js';
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(CorrelationMiddleware).forRoutes('*');
    }
};
AppModule = __decorate([
    Module({
        imports: [
            DestinationsModule,
            AdventuresModule,
            StaysModule,
            ExperiencesModule,
            SearchModule,
            TripsModule,
            BookingsModule,
            AuthModule,
            ProvidersModule,
            AdminModule,
            CouponsModule,
            PaymentsModule,
            AiModule,
            CurrencyModule,
            FinanceModule,
            PartnerModule,
            CollaborationModule,
            ObservabilityModule,
        ],
        controllers: [AppController],
        providers: [AppService, PrismaService],
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map