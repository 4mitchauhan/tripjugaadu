export interface PartnerAccount {
    id: string;
    name: string;
    apiKey: string;
    tier: 'ENTERPRISE' | 'AGENCY' | 'OPERATOR';
    scopes: string[];
    active: boolean;
    rateLimitPerMin: number;
}
export interface PartnerWebhookEvent {
    id: string;
    eventType: 'booking.created' | 'booking.confirmed' | 'booking.cancelled' | 'inventory.alert';
    timestamp: string;
    partnerId: string;
    payload: any;
    hmacSignature: string;
    status: 'DELIVERED' | 'RETRYING' | 'FAILED';
}
export declare class PartnerBookingRequest {
    partnerRef: string;
    customerName: string;
    customerEmail: string;
    itemType: 'ADVENTURE' | 'STAY' | 'EXPERIENCE';
    itemId: string;
    guestCount?: number;
    scheduledDate: string;
}
