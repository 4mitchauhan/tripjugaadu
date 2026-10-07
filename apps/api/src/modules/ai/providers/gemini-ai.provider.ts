import { Injectable, Logger } from '@nestjs/common';
import { AiModelProvider } from './ai-provider.interface.js';
import { MockAiProvider } from './mock-ai.provider.js';
import { ParsedTravelIntent, GeneratedTripProposal, ItineraryOptimizationResult, DestinationQaResult } from '../ai.interface.js';

@Injectable()
export class GeminiAiProvider implements AiModelProvider {
  id = 'google-gemini-v1';
  name = 'Google Gemini Intelligence';
  private readonly logger = new Logger(GeminiAiProvider.name);

  private readonly apiKey = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6JOY8b3YJXaH7vzqHH64YXSJaLw0PIUJhGbOU9868Y-5g';
  private readonly primaryModel = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';

  constructor(private readonly fallbackMock: MockAiProvider) {}

  private async callGemini(prompt: string, systemInstruction?: string): Promise<string> {
    const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', this.primaryModel];

    for (const model of modelsToTry) {
      try {
        const body: any = {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.4,
            maxOutputTokens: 1000,
          },
        };

        if (systemInstruction) {
          body.systemInstruction = {
            parts: [{ text: systemInstruction }],
          };
        }

        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${this.apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
          signal: AbortSignal.timeout(3000),
        });

        if (res.ok) {
          const json = await res.json();
          const candidate = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (candidate) {
            return candidate.trim();
          }
        }
      } catch (err: any) {
        this.logger.warn(`Gemini model ${model} attempt failed: ${err.message}`);
      }
    }

    throw new Error('All Gemini model calls failed or returned empty.');
  }

  async extractIntent(query: string): Promise<ParsedTravelIntent> {
    try {
      const prompt = `You are a travel intent classifier for TripJugaadu, an Indian adventure travel marketplace.
Extract travel parameters from this user query: "${query}"

Return ONLY valid JSON matching this schema:
{
  "query": "${query}",
  "intentType": "SEARCH" | "PLAN_TRIP" | "DESTINATION_INFO" | "PACKING_ADVICE" | "ITINERARY_OPTIMIZE" | "GENERAL_QA",
  "destination": string (e.g. "Rishikesh", "Manali", "Ladakh", "Goa", "Kasol", "Meghalaya"),
  "region": string (e.g. "Uttarakhand", "Himachal Pradesh"),
  "budgetMax": number in INR,
  "durationDays": number,
  "travelersCount": number,
  "travelStyle": "Adventure" | "Relaxation" | "Culture" | "Nature" | "Luxury" | "Budget",
  "preferredActivities": string[],
  "difficulty": "Easy" | "Moderate" | "Extreme",
  "confidence": 0.95
}`;

      const raw = await this.callGemini(prompt, 'You are an exact JSON extractor. Output valid JSON with no markdown backticks.');
      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch {
      return await this.fallbackMock.extractIntent(query);
    }
  }

  async generateTripPlan(
    intent: ParsedTravelIntent,
    availableAdventures: any[],
    availableStays: any[],
    availableExperiences: any[]
  ): Promise<GeneratedTripProposal> {
    try {
      const inventorySnippet = JSON.stringify({
        adventures: availableAdventures.map((a) => ({ id: a.id, name: a.name, price: a.basePrice, duration: a.duration })),
        stays: availableStays.map((s) => ({ id: s.id, name: s.name, price: s.basePrice, type: s.stayType })),
        experiences: availableExperiences.map((e) => ({ id: e.id, name: e.name, price: e.price, duration: e.duration })),
      });

      const prompt = `You are the lead trip architect for TripJugaadu.
Create a ${intent.durationDays || 3}-day ${intent.travelStyle || 'Adventure'} expedition plan for ${intent.destination || 'Rishikesh'}.
Available verified inventory to select from:
${inventorySnippet}

Return ONLY valid JSON matching this schema:
{
  "proposalId": "prop-gemini-${Date.now()}",
  "title": "${intent.durationDays || 3}-Day ${intent.travelStyle || 'Adventure'} Odyssey in ${intent.destination || 'Rishikesh'}",
  "destination": "${intent.destination || 'Rishikesh'}",
  "durationDays": ${intent.durationDays || 3},
  "totalEstimatedBudget": number,
  "travelStyle": "${intent.travelStyle || 'Adventure'}",
  "pace": "Moderate",
  "days": [
    {
      "dayNumber": 1,
      "theme": "Theme description",
      "morningActivity": { "title": string, "type": "Adventure" | "Sightseeing", "duration": string, "estimatedCost": number, "isAuthoritativeListing": boolean, "listingId": string },
      "afternoonActivity": { "title": string, "type": "Adventure" | "Experience", "duration": string, "estimatedCost": number, "isAuthoritativeListing": boolean, "listingId": string },
      "eveningActivity": { "title": string, "type": "Cultural" | "Relaxation", "duration": string, "estimatedCost": number, "isAuthoritativeListing": boolean },
      "suggestedStay": { "title": string, "stayType": string, "pricePerNight": number, "stayId": string },
      "dayTotalEstimatedCost": number
    }
  ],
  "readinessSummary": "string describing fitness and documents required",
  "importantNotes": ["string note 1", "string note 2"],
  "disclaimer": "Authoritative prices and availability are guaranteed only upon proceeding to checkout and verified by server transaction engine."
}`;

      const raw = await this.callGemini(prompt, 'You are an exact JSON extractor. Output valid JSON without markdown wrapping.');
      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch {
      return await this.fallbackMock.generateTripPlan(intent, availableAdventures, availableStays, availableExperiences);
    }
  }

  async optimizeItinerary(
    currentProposal: GeneratedTripProposal,
    instruction: string
  ): Promise<ItineraryOptimizationResult> {
    try {
      const prompt = `Current Trip Plan:
${JSON.stringify(currentProposal)}

User optimization request: "${instruction}"

Modify the itinerary according to user instructions, adjust budgets and note changes applied.
Return ONLY valid JSON:
{
  "originalDaysCount": ${currentProposal.durationDays},
  "optimizedProposal": { ...updated proposal matching original schema... },
  "changesApplied": ["string description of change 1"],
  "budgetAdjustment": number,
  "conflictsResolved": ["string conflict resolved"]
}`;

      const raw = await this.callGemini(prompt, 'Output valid JSON only.');
      const cleaned = raw.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      return parsed;
    } catch {
      return await this.fallbackMock.optimizeItinerary(currentProposal, instruction);
    }
  }

  async answerDestinationQuery(
    destination: string,
    question: string,
    kbygData: any
  ): Promise<DestinationQaResult> {
    try {
      const prompt = `You are TripJugaadu's Destination AI Specialist for ${destination}, India.
Verified Guidelines for this destination:
${JSON.stringify(kbygData)}

User question: "${question}"

Provide a concise, helpful, expert answer (2-4 sentences). State verified safety rules, permit needs, and equipment recommendations.
Do NOT guarantee weather or medical suitability. Reference official guidelines.`;

      const answer = await this.callGemini(prompt);
      return {
        destination,
        question,
        answer,
        verifiedSources: [
          'Google Gemini Live Intelligence',
          'TripJugaadu Verified Operator Guidelines',
          'State Tourism Development Board Advisories',
        ],
        safetyAdvisories: ['Certified helmets and PFDs mandatory on all water expeditions.'],
      };
    } catch {
      return await this.fallbackMock.answerDestinationQuery(destination, question, kbygData);
    }
  }

  async answerGeneralTravelQuery(
    query: string,
    travelerContext?: any
  ): Promise<{ response: string; suggestedChips?: string[]; relevantCards?: any[] }> {
    try {
      const prompt = `You are Jugaadu AI, the charismatic, adventurous, and authoritative AI Travel Companion for TripJugaadu (India's premier travel and adventure platform).
User says: "${query}"

Respond in 2-3 engaging, expert sentences. Be helpful, inspiring, and culturally authentic. Mention top Indian adventure hubs (Rishikesh, Manali, Ladakh, Goa, Kasol) where appropriate.`;

      const response = await this.callGemini(prompt);
      return {
        response,
        suggestedChips: [
          'Plan 3-day Rishikesh trip under ₹15,000',
          'What should I pack for Grade IV rafting?',
          'Weekend adventure near Delhi for 4 friends',
          'Best mountain stays in Manali',
        ],
      };
    } catch {
      return await this.fallbackMock.answerGeneralTravelQuery(query, travelerContext);
    }
  }
}
