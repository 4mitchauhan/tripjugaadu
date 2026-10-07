import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
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

@Module({
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorrelationMiddleware).forRoutes('*');
  }
}
