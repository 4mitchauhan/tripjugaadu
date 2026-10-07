export interface ParsedTravelIntent {
  query: string;
  intentType: 'SEARCH' | 'PLAN_TRIP' | 'DESTINATION_INFO' | 'PACKING_ADVICE' | 'ITINERARY_OPTIMIZE' | 'GENERAL_QA';
  destination?: string;
  region?: string;
  budgetMax?: number;
  durationDays?: number;
  travelersCount?: number;
  travelStyle?: 'Adventure' | 'Relaxation' | 'Culture' | 'Nature' | 'Luxury' | 'Budget';
  preferredActivities?: string[];
  difficulty?: 'Easy' | 'Moderate' | 'Extreme';
  confidence: number;
}

export interface ProposedItineraryDay {
  dayNumber: number;
  dateStr?: string;
  theme: string;
  morningActivity?: {
    title: string;
    type: 'Adventure' | 'Experience' | 'Sightseeing';
    duration: string;
    estimatedCost: number;
    isAuthoritativeListing: boolean;
    listingId?: string;
  };
  afternoonActivity?: {
    title: string;
    type: 'Adventure' | 'Experience' | 'Sightseeing';
    duration: string;
    estimatedCost: number;
    isAuthoritativeListing: boolean;
    listingId?: string;
  };
  eveningActivity?: {
    title: string;
    type: 'Experience' | 'Cultural' | 'Relaxation';
    duration: string;
    estimatedCost: number;
    isAuthoritativeListing: boolean;
    listingId?: string;
  };
  suggestedStay?: {
    title: string;
    stayType: string;
    pricePerNight: number;
    stayId?: string;
  };
  dayTotalEstimatedCost: number;
}

export interface GeneratedTripProposal {
  proposalId: string;
  title: string;
  destination: string;
  durationDays: number;
  totalEstimatedBudget: number;
  travelStyle: string;
  pace: 'Relaxed' | 'Moderate' | 'High Adrenaline';
  days: ProposedItineraryDay[];
  readinessSummary: string;
  importantNotes: string[];
  disclaimer: string;
}

export interface ItineraryOptimizationResult {
  originalDaysCount: number;
  optimizedProposal: GeneratedTripProposal;
  changesApplied: string[];
  budgetAdjustment: number;
  conflictsResolved: string[];
}

export interface DestinationQaResult {
  destination: string;
  question: string;
  answer: string;
  verifiedSources: string[];
  safetyAdvisories?: string[];
}
