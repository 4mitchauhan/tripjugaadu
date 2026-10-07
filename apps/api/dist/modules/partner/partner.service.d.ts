import { PartnerAccount, PartnerWebhookEvent, PartnerBookingRequest } from './partner.interface.js';
export declare class PartnerService {
    private readonly logger;
    private readonly partners;
    private readonly webhookLog;
    validateKey(apiKey?: string): PartnerAccount;
    getPartnerCatalog(partner: PartnerAccount): {
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
    createPartnerBooking(partner: PartnerAccount, req: PartnerBookingRequest): {
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
    getWebhookLogs(partner: PartnerAccount): PartnerWebhookEvent[];
}
