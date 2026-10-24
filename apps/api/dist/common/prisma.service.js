var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PrismaService_1;
import { Injectable, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
let PrismaService = PrismaService_1 = class PrismaService extends PrismaClient {
    logger = new Logger(PrismaService_1.name);
    isConnected = false;
    isAvailable() {
        return this.isConnected;
    }
    async onModuleInit() {
        if (process.env.NODE_ENV === 'test' || !process.env.DATABASE_URL) {
            this.isConnected = false;
            return;
        }
        try {
            await Promise.race([
                this.$connect(),
                new Promise((_, reject) => setTimeout(() => reject(new Error('Connection timeout')), 2000)),
            ]);
            this.isConnected = true;
            this.logger.log('Prisma connected to database successfully.');
        }
        catch (_error) {
            this.isConnected = false;
            this.logger.warn('Prisma could not connect to PostgreSQL. Gracefully falling back to in-memory seed data provider.');
        }
    }
    async onModuleDestroy() {
        if (this.isConnected) {
            await this.$disconnect();
        }
    }
};
PrismaService = PrismaService_1 = __decorate([
    Injectable()
], PrismaService);
export { PrismaService };
//# sourceMappingURL=prisma.service.js.map