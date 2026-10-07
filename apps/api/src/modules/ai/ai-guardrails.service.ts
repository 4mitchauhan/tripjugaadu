import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common';

@Injectable()
export class AiGuardrailsService {
  private readonly BLOCKED_INJECTION_PATTERNS = [
    /ignore (?:all )?previous instructions/i,
    /override (?:system )?prompt/i,
    /reveal (?:system )?prompt/i,
    /show (?:api|secret) key/i,
    /drop (?:table|database)/i,
    /grant (?:admin|root)/i,
    /bypass authorization/i,
  ];

  sanitizeInput(query: string): string {
    if (!query || typeof query !== 'string') {
      throw new BadRequestException('Query must be a non-empty string');
    }

    const trimmed = query.trim();

    // Check for prompt injection attempts
    for (const pattern of this.BLOCKED_INJECTION_PATTERNS) {
      if (pattern.test(trimmed)) {
        throw new BadRequestException('Security Alert: Query contains prohibited instructional patterns.');
      }
    }

    // Mask obvious credit card patterns
    const sanitized = trimmed.replace(/\b(?:\d{4}[ -]?){3}\d{4}\b/g, '[CARD_MASKED]');

    return sanitized;
  }

  assertUserAccess(requestedUserId: string, authenticatedUserId?: string) {
    if (!authenticatedUserId || requestedUserId !== authenticatedUserId) {
      throw new ForbiddenException('Security Policy: You are not authorized to query private data of another user.');
    }
  }

  validateNonAutonomousAction(action: string) {
    const HIGH_RISK_ACTIONS = ['PAY', 'REFUND', 'CANCEL_BOOKING', 'CAPTURE_PAYMENT', 'DELETE_ACCOUNT'];
    if (HIGH_RISK_ACTIONS.includes(action.toUpperCase())) {
      throw new ForbiddenException(`Security Policy: Action '${action}' cannot be executed autonomously by AI. Explicit human user confirmation required.`);
    }
  }
}
