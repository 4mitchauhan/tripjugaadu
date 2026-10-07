import { AiModelProvider } from './ai-provider.interface.js';
import { MockAiProvider } from './mock-ai.provider.js';
import { ParsedTravelIntent, GeneratedTripProposal, ItineraryOptimizationResult, DestinationQaResult } from '../ai.interface.js';
export declare class GeminiAiProvider implements AiModelProvider {
    private readonly fallbackMock;
    id: string;
    name: string;
    private readonly logger;
    private readonly apiKey;
    private readonly primaryModel;
    constructor(fallbackMock: MockAiProvider);
    private callGemini;
    extractIntent(query: string): Promise<ParsedTravelIntent>;
    generateTripPlan(intent: ParsedTravelIntent, availableAdventures: any[], availableStays: any[], availableExperiences: any[]): Promise<GeneratedTripProposal>;
    optimizeItinerary(currentProposal: GeneratedTripProposal, instruction: string): Promise<ItineraryOptimizationResult>;
    answerDestinationQuery(destination: string, question: string, kbygData: any): Promise<DestinationQaResult>;
    answerGeneralTravelQuery(query: string, travelerContext?: any): Promise<{
        response: string;
        suggestedChips?: string[];
        relevantCards?: any[];
    }>;
}
