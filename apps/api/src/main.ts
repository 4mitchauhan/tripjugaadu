import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for web frontend
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Set global API prefix
  app.setGlobalPrefix('api/v1');

  const port = process.env.PORT ?? 4000;
  await app.listen(port);
  console.log(`🚀 TripJugaadu API server running at http://localhost:${port}/api/v1`);
}

await bootstrap();
