import { PartnerService } from './partner.service.js';
import { PartnerBookingRequest } from './partner.interface.js';
export declare class PartnerController {
    private readonly partnerService;
    constructor(partnerService: PartnerService);
    getCatalog(apiKey?: string): {
        status: string;
        data: {
            partner: string;
            tier: "ENTERPRISE" | "AGENCY" | "OPERATOR";
            destinationsCount: number;
            adventuresCount: number;
            staysCount: number;
            catalog: {
                destinations: {
                    id: string;
                    name: string;
                    region: string;
                    bestSeason: string;
                    heroImage: string;
                }[];
                adventures: {
                    id: string;
                    name: string;
                    category: string;
                    difficulty: string;
                    duration: string;
                    b2bContractRate: number;
                    retailPrice: number;
                    capacity: number;
                }[];
            };
        };
    };
    createBooking(apiKey: string | undefined, body: PartnerBookingRequest): {
        status: string;
        data: {
            success: boolean;
            bookingRef: string;
            partnerRef: string;
            status: string;
            partner: string;
            webhookDispatched: {
                id: string;
                eventType: "booking.created" | "booking.confirmed" | "booking.cancelled" | "inventory.alert";
                signature: string;
            };
        };
    };
    getWebhooks(apiKey?: string): {
        status: string;
        count: number;
        data: import("./partner.interface.js").PartnerWebhookEvent[];
    };
}
