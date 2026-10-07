export declare class AiGuardrailsService {
    private readonly BLOCKED_INJECTION_PATTERNS;
    sanitizeInput(query: string): string;
    assertUserAccess(requestedUserId: string, authenticatedUserId?: string): void;
    validateNonAutonomousAction(action: string): void;
}
