import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module.js';
import { validateEnvironment } from './common/env.validator.js';
async function bootstrap() {
    validateEnvironment();
    const app = await NestFactory.create(AppModule);
    app.use((_req, res, next) => {
        res.setHeader('X-Content-Type-Options', 'nosniff');
        res.setHeader('X-Frame-Options', 'SAMEORIGIN');
        res.setHeader('X-XSS-Protection', '1; mode=block');
        res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
        res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
        next();
    });
    const configuredOrigins = process.env.CORS_ORIGIN
        ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
        : ['http://localhost:3000', 'http://127.0.0.1:3000'];
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || configuredOrigins.includes(origin) || origin.startsWith('http://localhost:')) {
                callback(null, true);
            }
            else {
                callback(new Error(`Origin '${origin}' not allowed by CORS policy`));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Partner-Key', 'x-correlation-id'],
    });
    app.useGlobalPipes(new ValidationPipe({
        whitelist: false,
        forbidNonWhitelisted: false,
        transform: true,
    }));
    app.setGlobalPrefix('api/v1');
    const port = process.env.PORT ?? 4000;
    await app.listen(port);
    console.log(`🚀 TripJugaadu Hardened API server running at http://localhost:${port}/api/v1`);
}
await bootstrap();
//# sourceMappingURL=main.js.map