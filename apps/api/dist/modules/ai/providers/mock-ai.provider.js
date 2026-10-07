var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '@nestjs/common';
let MockAiProvider = class MockAiProvider {
    id = 'jugaadu-deterministic-v1';
    name = 'TripJugaadu Intelligence Engine';
    async extractIntent(query) {
        const qLower = query.toLowerCase();
        let destination;
        let region;
        if (qLower.includes('rishikesh')) {
            destination = 'Rishikesh';
            region = 'Uttarakhand';
        }
        else if (qLower.includes('manali')) {
            destination = 'Manali';
            region = 'Himachal Pradesh';
        }
        else if (qLower.includes('ladakh') || qLower.includes('leh')) {
            destination = 'Ladakh';
            region = 'Jammu & Kashmir';
        }
        else if (qLower.includes('goa')) {
            destination = 'Goa';
            region = 'Western India';
        }
        else if (qLower.includes('kasol') || qLower.includes('parvati')) {
            destination = 'Kasol';
            region = 'Himachal Pradesh';
        }
        else if (qLower.includes('meghalaya') || qLower.includes('shillong')) {
            destination = 'Meghalaya';
            region = 'Northeast India';
        }
        else if (qLower.includes('delhi')) {
            destination = 'Rishikesh';
            region = 'Uttarakhand';
        }
        else {
            destination = 'Rishikesh';
            region = 'Uttarakhand';
        }
        let durationDays = 3;
        const dayMatch = qLower.match(/(\d+)\s*(day|days|d)/i);
        if (dayMatch && dayMatch[1]) {
            durationDays = Math.min(Math.max(parseInt(dayMatch[1], 10), 1), 7);
        }
        else if (qLower.includes('weekend')) {
            durationDays = 2;
        }
        else if (qLower.includes('week')) {
            durationDays = 7;
        }
        let budgetMax;
        const budgetMatch = qLower.match(/(?:under|below|budget|within|₹|rs\.?)\s*(\d+)(?:k|\s*thousand|\s*000)?/i);
        if (budgetMatch && budgetMatch[1]) {
            let val = parseInt(budgetMatch[1], 10);
            if (qLower.includes('k') && val < 100)
                val *= 1000;
            budgetMax = val < 1000 ? val * 1000 : val;
        }
        else {
            budgetMax = 18000;
        }
        let travelersCount = 2;
        const travelerMatch = qLower.match(/(\d+)\s*(people|travelers|pax|friends|persons)/i);
        if (travelerMatch && travelerMatch[1]) {
            travelersCount = parseInt(travelerMatch[1], 10);
        }
        else if (qLower.includes('solo')) {
            travelersCount = 1;
        }
        else if (qLower.includes('couple')) {
            travelersCount = 2;
        }
        else if (qLower.includes('family')) {
            travelersCount = 4;
        }
        const preferredActivities = [];
        if (qLower.includes('rafting') || qLower.includes('river'))
            preferredActivities.push('Rafting');
        if (qLower.includes('bungee') || qLower.includes('jump'))
            preferredActivities.push('Bungee Jumping');
        if (qLower.includes('camp') || qLower.includes('bonfire'))
            preferredActivities.push('Camping');
        if (qLower.includes('trek') || qLower.includes('hike'))
            preferredActivities.push('Trekking');
        if (qLower.includes('paragliding'))
            preferredActivities.push('Paragliding');
        if (qLower.includes('kayak'))
            preferredActivities.push('Kayaking');
        let travelStyle = 'Adventure';
        if (qLower.includes('relax') || qLower.includes('peaceful') || qLower.includes('calm'))
            travelStyle = 'Relaxation';
        if (qLower.includes('luxury') || qLower.includes('resort'))
            travelStyle = 'Luxury';
        if (qLower.includes('culture') || qLower.includes('spiritual') || qLower.includes('aarti'))
            travelStyle = 'Culture';
        let intentType = 'PLAN_TRIP';
        if (qLower.includes('pack') || qLower.includes('carry') || qLower.includes('wear') || qLower.includes('checklist')) {
            intentType = 'PACKING_ADVICE';
        }
        else if (qLower.includes('search') || qLower.includes('find') || qLower.includes('show me')) {
            intentType = 'SEARCH';
        }
        else if (qLower.includes('make it') || qLower.includes('modify') || qLower.includes('optimize') || qLower.includes('cheaper')) {
            intentType = 'ITINERARY_OPTIMIZE';
        }
        else if (qLower.includes('how to reach') || qLower.includes('best time') || qLower.includes('weather') || qLower.includes('permit')) {
            intentType = 'DESTINATION_INFO';
        }
        return {
            query,
            intentType,
            destination,
            region,
            budgetMax,
            durationDays,
            travelersCount,
            travelStyle,
            preferredActivities,
            difficulty: qLower.includes('extreme') || qLower.includes('hard') ? 'Extreme' : 'Moderate',
            confidence: 0.94,
        };
    }
    async generateTripPlan(intent, availableAdventures, availableStays, availableExperiences) {
        const dest = intent.destination || 'Rishikesh';
        const daysCount = intent.durationDays || 3;
        const days = [];
        let runningBudget = 0;
        const primaryStay = availableStays.length > 0 ? availableStays[0] : {
            id: 'stay-default',
            name: `${dest} Riverside Wilderness Camp`,
            stayType: 'Eco Resort / Camp',
            basePrice: 4500,
        };
        for (let i = 1; i <= daysCount; i++) {
            let morningAct;
            let afternoonAct;
            let eveningAct;
            if (i === 1) {
                morningAct = {
                    title: `Arrival at ${dest} & Check-in at ${primaryStay.name}`,
                    type: 'Sightseeing',
                    duration: '2 Hours',
                    estimatedCost: 0,
                    isAuthoritativeListing: false,
                };
                afternoonAct = availableExperiences[0] ? {
                    title: availableExperiences[0].name,
                    type: 'Experience',
                    duration: availableExperiences[0].duration || '3 Hours',
                    estimatedCost: availableExperiences[0].price || 1500,
                    isAuthoritativeListing: true,
                    listingId: availableExperiences[0].id,
                } : {
                    title: `Local Heritage Walk & Riverside Cafe Exploration`,
                    type: 'Experience',
                    duration: '3 Hours',
                    estimatedCost: 800,
                    isAuthoritativeListing: false,
                };
                eveningAct = {
                    title: 'Sunset Riverside Gathering & Bonfire Dinner',
                    type: 'Cultural',
                    duration: '2 Hours',
                    estimatedCost: 500,
                    isAuthoritativeListing: false,
                };
            }
            else if (i === 2) {
                const adv = availableAdventures[0] || {
                    id: 'adv-primary',
                    name: `${dest} Signature White Water Rafting`,
                    duration: '4 Hours',
                    basePrice: 3999,
                };
                morningAct = {
                    title: adv.name,
                    type: 'Adventure',
                    duration: adv.duration || '4 Hours',
                    estimatedCost: adv.basePrice || 3999,
                    isAuthoritativeListing: true,
                    listingId: adv.id,
                };
                const secAdv = availableAdventures[1];
                afternoonAct = secAdv ? {
                    title: secAdv.name,
                    type: 'Adventure',
                    duration: secAdv.duration || '2 Hours',
                    estimatedCost: secAdv.basePrice || 3750,
                    isAuthoritativeListing: true,
                    listingId: secAdv.id,
                } : {
                    title: 'Valley Trek & Natural Waterfall Dip',
                    type: 'Adventure',
                    duration: '3 Hours',
                    estimatedCost: 1200,
                    isAuthoritativeListing: false,
                };
                eveningAct = {
                    title: 'Evening Ganga Aarti at Sacred Ghats',
                    type: 'Cultural',
                    duration: '1.5 Hours',
                    estimatedCost: 0,
                    isAuthoritativeListing: false,
                };
            }
            else {
                morningAct = {
                    title: 'Sunrise Yoga or Forest Nature Trail',
                    type: 'Sightseeing',
                    duration: '2 Hours',
                    estimatedCost: 600,
                    isAuthoritativeListing: false,
                };
                afternoonAct = {
                    title: 'Souvenir Hunting & Local Pahadi Cuisine Tasting',
                    type: 'Experience',
                    duration: '2 Hours',
                    estimatedCost: 800,
                    isAuthoritativeListing: false,
                };
                eveningAct = {
                    title: `Departure from ${dest} / Return Transit`,
                    type: 'Sightseeing',
                    duration: 'Transit',
                    estimatedCost: 0,
                    isAuthoritativeListing: false,
                };
            }
            const dayTotal = (morningAct.estimatedCost || 0) + (afternoonAct.estimatedCost || 0) + (eveningAct.estimatedCost || 0) + (primaryStay.basePrice || 3500);
            runningBudget += dayTotal;
            days.push({
                dayNumber: i,
                theme: i === 1 ? 'Arrival & Orientation' : i === 2 ? 'Peak Adrenaline & Adventure' : 'Culture, Scenic Views & Departure',
                morningActivity: morningAct,
                afternoonActivity: afternoonAct,
                eveningActivity: eveningAct,
                suggestedStay: {
                    title: primaryStay.name,
                    stayType: primaryStay.stayType || 'Lodge',
                    pricePerNight: primaryStay.basePrice || 4500,
                    stayId: primaryStay.id,
                },
                dayTotalEstimatedCost: dayTotal,
            });
        }
        return {
            proposalId: `prop-${Date.now()}`,
            title: `${daysCount}-Day ${intent.travelStyle || 'Adventure'} Odyssey in ${dest}`,
            destination: dest,
            durationDays: daysCount,
            totalEstimatedBudget: runningBudget,
            travelStyle: intent.travelStyle || 'Adventure',
            pace: daysCount <= 2 ? 'High Adrenaline' : 'Moderate',
            days,
            readinessSummary: `Requires moderate physical endurance. Government Original Photo ID mandatory for permit checks and adventure activity disclaimers.`,
            importantNotes: [
                `Prices for activities with 'Authoritative Listing' tag are pulled directly from TripJugaadu verified operators.`,
                `Activity slots should be booked at least 48 hours in advance during peak season.`,
                `Alcohol and smoking strictly prohibited before water and airborne adventure sports.`,
            ],
            disclaimer: `Authoritative prices and availability are guaranteed only upon proceeding to checkout and verified by server transaction engine.`,
        };
    }
    async optimizeItinerary(currentProposal, instruction) {
        const instLower = instruction.toLowerCase();
        const modifiedDays = JSON.parse(JSON.stringify(currentProposal.days));
        const changesApplied = [];
        let budgetAdjustment = 0;
        const conflictsResolved = [];
        if (instLower.includes('cheaper') || instLower.includes('reduce budget') || instLower.includes('less expensive')) {
            modifiedDays.forEach((day) => {
                if (day.afternoonActivity && day.afternoonActivity.estimatedCost > 2000) {
                    changesApplied.push(`Replaced high-cost activity on Day ${day.dayNumber} with scenic valley exploration`);
                    budgetAdjustment -= 1800;
                    day.afternoonActivity.title = 'Self-Guided River Trail & Waterfall Dip';
                    day.afternoonActivity.estimatedCost = 400;
                    day.afternoonActivity.isAuthoritativeListing = false;
                }
            });
        }
        else if (instLower.includes('less tiring') || instLower.includes('relax') || instLower.includes('free time')) {
            modifiedDays.forEach((day) => {
                if (day.dayNumber >= 2 && day.afternoonActivity) {
                    changesApplied.push(`Cleared afternoon on Day ${day.dayNumber} for leisure and riverside cafe relaxation`);
                    day.afternoonActivity = {
                        title: 'Unwind at Riverside Cafe & Hammock Relaxation',
                        type: 'Relaxation',
                        duration: '3 Hours',
                        estimatedCost: 350,
                        isAuthoritativeListing: false,
                    };
                    conflictsResolved.push(`Eliminated physical exhaustion overlap between morning rafting and afternoon trek on Day ${day.dayNumber}`);
                }
            });
        }
        else if (instLower.includes('more adventure') || instLower.includes('adrenaline')) {
            changesApplied.push('Upgraded Day 1 afternoon to include High Tandem Kayaking session');
            budgetAdjustment += 2000;
            if (modifiedDays[0]) {
                modifiedDays[0].afternoonActivity = {
                    title: 'Rapid Water Tandem Kayaking Training',
                    type: 'Adventure',
                    duration: '2.5 Hours',
                    estimatedCost: 2000,
                    isAuthoritativeListing: true,
                };
            }
        }
        else {
            changesApplied.push('Rebalanced transit schedules and buffer windows for smoother pacing.');
        }
        const newTotalBudget = Math.max(currentProposal.totalEstimatedBudget + budgetAdjustment, 5000);
        return {
            originalDaysCount: currentProposal.durationDays,
            optimizedProposal: {
                ...currentProposal,
                proposalId: `prop-opt-${Date.now()}`,
                totalEstimatedBudget: newTotalBudget,
                days: modifiedDays,
            },
            changesApplied,
            budgetAdjustment,
            conflictsResolved,
        };
    }
    async answerDestinationQuery(destination, question, kbygData) {
        const qLower = question.toLowerCase();
        const dest = destination || 'Rishikesh';
        let answer = '';
        const safetyAdvisories = [];
        if (qLower.includes('best time') || qLower.includes('when to visit') || qLower.includes('season')) {
            answer = `The best time to visit ${dest} is from September to June. October through March offers pleasant weather for trekking and camping, while March to May provides prime white-water rafting conditions as Himalayan snowmelt swells the river. Monsoon months (July–August) see river adventure closures due to high water discharge.`;
        }
        else if (qLower.includes('pack') || qLower.includes('wear') || qLower.includes('carry')) {
            answer = `For an expedition in ${dest}, pack quick-dry synthetic t-shirts and nylon shorts (cotton absorbs water and stays cold). Carry waterproof footwear with grippy soles or neoprene booties for river rapids. Don't forget an original Government Photo ID (mandatory at launch points), SPF 50+ sunscreen, a 10L dry bag for phones/wallets, and a light fleece jacket for cooler mountain evenings.`;
        }
        else if (qLower.includes('permit') || qLower.includes('rules') || qLower.includes('documents')) {
            answer = `Domestic Indian travelers require a valid Government Photo ID (Aadhaar, Passport, or Voter ID). Adventure activities like bungee jumping and Grade IV rafting mandate a physical fitness self-declaration at check-in. Foreign nationals must carry their original passport and valid Indian visa.`;
            safetyAdvisories.push('Strict alcohol prohibition applies 12 hours prior to airborne and water-based adventure sports.');
        }
        else if (qLower.includes('safe') || qLower.includes('beginner') || qLower.includes('first time')) {
            answer = `All adventure operators listed on TripJugaadu adhere to Uttarakhand Tourism Board and Indian Mountaineering Foundation (IMF) safety mandates. For first-timers, the 12km or 16km rafting stretches (Marine Drive to Shivpuri) feature certified river guides and rescue safety kayakers. Ensure you wear your US Coast Guard approved Type V PFD lifejacket properly fastened at all times.`;
            safetyAdvisories.push('Certified helmets and PFDs are compulsory on all water expeditions.');
        }
        else {
            answer = `${dest} is one of India's premier adventure and cultural corridors. Whether you're navigating Grade IV Ganges rapids, jumping from Mohan Chatti's 83m cantilever platform, or camping under cedar forest skies, TripJugaadu verified operators offer pre-vetted slots and transparent pricing.`;
        }
        return {
            destination: dest,
            question,
            answer,
            verifiedSources: [
                'TripJugaadu Verified Operator Guidelines',
                'State Tourism Development Board Advisories',
                'Indian Mountaineering Foundation (IMF) Protocols'
            ],
            safetyAdvisories,
        };
    }
    async answerGeneralTravelQuery(query, travelerContext) {
        const qLower = query.toLowerCase();
        if (qLower.includes('plan') || qLower.includes('itinerary') || qLower.includes('trip')) {
            return {
                response: `I can craft a personalized, constraint-aware itinerary for you. I will pull real, verified slots from our adventure operators and eco-lodges so you get realistic timings and transparent pricing without any guesswork.`,
                suggestedChips: [
                    'Plan 3-day Rishikesh trip under ₹15,000',
                    'Weekend getaway near Delhi for 4 friends',
                    'Scenic stay with river view in Manali',
                    'Beginner friendly rafting & camping',
                ],
            };
        }
        if (qLower.includes('rafting') || qLower.includes('water')) {
            return {
                response: `Our most popular water adventure is the Ganga Rapid White-Water Rafting (Grade IV) in Rishikesh. It features thrilling rapids like The Wall, Roller Coaster, and Golf Course. Certified lifejackets and rescue kayakers are included.`,
                suggestedChips: [
                    'What should I pack for rafting?',
                    'Is rafting suitable for non-swimmers?',
                    'Book Rishikesh Rafting (₹3,999)',
                ],
            };
        }
        return {
            response: `Namaste! I am your TripJugaadu AI Travel Companion. I help you discover India's best adventure trails, create day-by-day itineraries with real operator inventory, check travel readiness, and answer questions about local permits and conditions. How can I assist your next journey?`,
            suggestedChips: [
                'Plan a 3-day adventure under ₹15,000',
                'Best Himalayan treks for beginners',
                'What to pack for Rishikesh?',
                'Find riverside luxury camps',
            ],
        };
    }
};
MockAiProvider = __decorate([
    Injectable()
], MockAiProvider);
export { MockAiProvider };
//# sourceMappingURL=mock-ai.provider.js.map