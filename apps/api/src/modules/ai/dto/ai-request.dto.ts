export class AiSearchDto {
  query?: string;
  prompt?: string;
}

export class AiPlanTripDto {
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

export class AiOptimizeItineraryDto {
  currentProposal!: any;
  instruction!: string;
}

export class AiDestinationQaDto {
  destinationSlug?: string;
  destinationId?: string;
  question!: string;
}

export class AiChatDto {
  message?: string;
  prompt?: string;
  query?: string;
  context?: any;
}

export class AiMonitorDto {
  tripId?: string;
  destinationSlug?: string;
}

export class AiMultimodalDto {
  imageDescription?: string;
  imageUrl?: string;
  taskType?: 'LANDMARK_IDENTIFICATION' | 'PACKING_CHECKLIST';
  destinationSlug?: string;
}

export class AiVoiceDto {
  transcript!: string;
  context?: any;
}

export class AiAutonomousWorkflowDto {
  level!: number; // 0 to 5
  intent!: string;
  parameters?: any;
  userConfirmationToken?: string;
}
