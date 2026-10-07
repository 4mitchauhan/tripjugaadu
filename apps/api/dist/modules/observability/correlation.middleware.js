var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
let CorrelationMiddleware = class CorrelationMiddleware {
    use(req, res, next) {
        const correlationId = req.headers['x-correlation-id'] || randomUUID();
        req.headers['x-correlation-id'] = correlationId;
        res.setHeader('X-Correlation-Id', correlationId);
        next();
    }
};
CorrelationMiddleware = __decorate([
    Injectable()
], CorrelationMiddleware);
export { CorrelationMiddleware };
//# sourceMappingURL=correlation.middleware.js.map