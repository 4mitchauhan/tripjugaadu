import { ObservabilityService } from './observability.service.js';
export declare class ObservabilityController {
    private readonly observabilityService;
    constructor(observabilityService: ObservabilityService);
    getHealth(): Promise<{
        status: string;
        timestamp: string;
        uptimeSeconds: number;
        environment: string;
        services: {
            database: {
                status: string;
                engine: string;
            };
            aiInference: {
                status: string;
                provider: string;
                guardrails: string;
            };
            paymentGateway: {
                status: string;
                providers: string[];
            };
            cache: {
                status: string;
                hitRatioPct: number;
            };
        };
        system: {
            nodeVersion: string;
            platform: NodeJS.Platform;
            rssMb: number;
            heapUsedMb: number;
            heapTotalMb: number;
        };
    }>;
    getMetrics(): {
        status: string;
        data: {
            timestamp: string;
            platform: string;
            throughputRps: number;
            latency: {
                p50Ms: number;
                p95Ms: number;
                p99Ms: number;
            };
            errorRatePct: number;
            activeTravelersOnline: number;
            verifiedOperatorsActive: number;
            inventorySlotsTracked: number;
            dailyBookingsCount: number;
            dailyGmvInr: number;
            aiRequestsProcessedToday: number;
            aiGroundingAccuracyPct: number;
        };
    };
}
