var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';
let AiGuardrailsService = class AiGuardrailsService {
    BLOCKED_INJECTION_PATTERNS = [
        /ignore (?:all )?previous instructions/i,
        /override (?:system )?prompt/i,
        /reveal (?:system )?prompt/i,
        /show (?:api|secret) key/i,
        /drop (?:table|database)/i,
        /grant (?:admin|root)/i,
        /bypass authorization/i,
    ];
    sanitizeInput(query) {
        if (!query || typeof query !== 'string') {
            throw new BadRequestException('Query must be a non-empty string');
        }
        const trimmed = query.trim();
        for (const pattern of this.BLOCKED_INJECTION_PATTERNS) {
            if (pattern.test(trimmed)) {
                throw new BadRequestException('Security Alert: Query contains prohibited instructional patterns.');
            }
        }
        const sanitized = trimmed.replace(/\b(?:\d{4}[ -]?){3}\d{4}\b/g, '[CARD_MASKED]');
        return sanitized;
    }
    assertUserAccess(requestedUserId, authenticatedUserId) {
        if (!authenticatedUserId || requestedUserId !== authenticatedUserId) {
            throw new ForbiddenException('Security Policy: You are not authorized to query private data of another user.');
        }
    }
    validateNonAutonomousAction(action) {
        const HIGH_RISK_ACTIONS = ['PAY', 'REFUND', 'CANCEL_BOOKING', 'CAPTURE_PAYMENT', 'DELETE_ACCOUNT'];
        if (HIGH_RISK_ACTIONS.includes(action.toUpperCase())) {
            throw new ForbiddenException(`Security Policy: Action '${action}' cannot be executed autonomously by AI. Explicit human user confirmation required.`);
        }
    }
};
AiGuardrailsService = __decorate([
    Injectable()
], AiGuardrailsService);
export { AiGuardrailsService };
//# sourceMappingURL=ai-guardrails.service.js.map