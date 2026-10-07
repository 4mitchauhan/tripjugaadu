export declare class AiSearchDto {
    query?: string;
    prompt?: string;
}
export declare class AiPlanTripDto {
    query?: string;
    prompt?: string;
    destination?: string;
    durationDays?: number;
    travelerPace?: string;
    budgetCategory?: string;
    preferences?: {
        budgetMax?: number;
        travelStyle?: string;
        durationDays?: number;
        travelersCount?: number;
    };
}
export declare class AiOptimizeItineraryDto {
    currentProposal: any;
    instruction: string;
}
export declare class AiDestinationQaDto {
    destinationSlug?: string;
    destinationId?: string;
    question: string;
}
export declare class AiChatDto {
    message?: string;
    prompt?: string;
    query?: string;
    context?: any;
}
export declare class AiMonitorDto {
    tripId?: string;
    destinationSlug?: string;
}
export declare class AiMultimodalDto {
    imageDescription?: string;
    imageUrl?: string;
    taskType?: 'LANDMARK_IDENTIFICATION' | 'PACKING_CHECKLIST';
    destinationSlug?: string;
}
export declare class AiVoiceDto {
    transcript: string;
    context?: any;
}
export declare class AiAutonomousWorkflowDto {
    level: number;
    intent: string;
    parameters?: any;
    userConfirmationToken?: string;
}
