import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  public isConnected = false;

  isAvailable(): boolean {
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
    } catch (_error) {
      this.isConnected = false;
      this.logger.warn('Prisma could not connect to PostgreSQL. Gracefully falling back to in-memory seed data provider.');
    }
  }

  async onModuleDestroy() {
    if (this.isConnected) {
      await this.$disconnect();
    }
  }
}
