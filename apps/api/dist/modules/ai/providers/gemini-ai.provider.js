var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var GeminiAiProvider_1;
import { Injectable, Logger } from '@nestjs/common';
import { MockAiProvider } from './mock-ai.provider.js';
let GeminiAiProvider = GeminiAiProvider_1 = class GeminiAiProvider {
    fallbackMock;
    id = 'google-gemini-v1';
    name = 'Google Gemini Intelligence';
    logger = new Logger(GeminiAiProvider_1.name);
    apiKey = process.env.GEMINI_API_KEY || 'AQ.Ab8RN6JOY8b3YJXaH7vzqHH64YXSJaLw0PIUJhGbOU9868Y-5g';
    primaryModel = process.env.GEMINI_MODEL || 'gemini-3.1-flash-lite';
    constructor(fallbackMock) {
        this.fallbackMock = fallbackMock;
    }
    async callGemini(prompt, systemInstruction) {
        const modelsToTry = ['gemini-1.5-flash', 'gemini-2.0-flash', this.primaryModel];
        for (const model of modelsToTry) {
            try {
                const body = {
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
            }
            catch (err) {
                this.logger.warn(`Gemini model ${model} attempt failed: ${err.message}`);
            }
        }
        throw new Error('All Gemini model calls failed or returned empty.');
    }
    async extractIntent(query) {
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
        }
        catch {
            return await this.fallbackMock.extractIntent(query);
        }
    }
    async generateTripPlan(intent, availableAdventures, availableStays, availableExperiences) {
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
        }
        catch {
            return await this.fallbackMock.generateTripPlan(intent, availableAdventures, availableStays, availableExperiences);
        }
    }
    async optimizeItinerary(currentProposal, instruction) {
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
        }
        catch {
            return await this.fallbackMock.optimizeItinerary(currentProposal, instruction);
        }
    }
    async answerDestinationQuery(destination, question, kbygData) {
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
        }
        catch {
            return await this.fallbackMock.answerDestinationQuery(destination, question, kbygData);
        }
    }
    async answerGeneralTravelQuery(query, travelerContext) {
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
        }
        catch {
            return await this.fallbackMock.answerGeneralTravelQuery(query, travelerContext);
        }
    }
};
GeminiAiProvider = GeminiAiProvider_1 = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [MockAiProvider])
], GeminiAiProvider);
export { GeminiAiProvider };
//# sourceMappingURL=gemini-ai.provider.js.map