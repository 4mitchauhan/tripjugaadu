import { AiService } from './ai.service.js';
import { AiSearchDto, AiPlanTripDto, AiOptimizeItineraryDto, AiDestinationQaDto, AiChatDto, AiMonitorDto, AiMultimodalDto, AiVoiceDto, AiAutonomousWorkflowDto } from './dto/ai-request.dto.js';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    chat(dto: AiChatDto): Promise<{
        status: string;
        data: {
            replyType: string;
            message: string;
            proposal: import("./ai.interface.js").GeneratedTripProposal;
            searchData?: undefined;
            verifiedSources?: undefined;
            safetyAdvisories?: undefined;
            suggestedChips?: undefined;
        } | {
            replyType: string;
            message: string;
            searchData: {
                status: string;
                parsedIntent: import("./ai.interface.js").ParsedTravelIntent;
                results: {
                    adventures: {
                        id: string;
                        slug: string;
                        destinationId: string;
                        destinationSlug: string;
                        name: string;
                        category: string;
                        difficulty: string;
                        duration: string;
                        basePrice: number;
                        capacity: number;
                        heroImage: string;
                        description: string;
                        requirements: string[];
                        whatToCarry: string[];
                        whatToWear: string[];
                        safetyGuidelines: string[];
                        rating: number;
                        reviewCount: number;
                        featured: boolean;
                    }[] | ({
                        destination: {
                            id: string;
                            createdAt: Date;
                            slug: string;
                            name: string;
                            category: string;
                            heroImage: string;
                            description: string;
                            featured: boolean;
                            region: string;
                            state: string;
                            bestSeason: string | null;
                            daysRecommend: string;
                            latitude: number | null;
                            longitude: number | null;
                            updatedAt: Date;
                        };
                    } & {
                        id: string;
                        createdAt: Date;
                        slug: string;
                        destinationId: string;
                        name: string;
                        category: string;
                        difficulty: import("@prisma/client").$Enums.Difficulty;
                        duration: string;
                        basePrice: number;
                        capacity: number;
                        heroImage: string;
                        description: string;
                        requirements: string[];
                        whatToCarry: string[];
                        whatToWear: string[];
                        safetyGuidelines: string[];
                        rating: number;
                        reviewCount: number;
                        featured: boolean;
                    })[];
                    stays: {
                        id: string;
                        slug: string;
                        destinationId: string;
                        destinationSlug: string;
                        name: string;
                        stayType: string;
                        address: string;
                        rating: number;
                        basePrice: number;
                        heroImage: string;
                        amenities: string[];
                        description: string;
                    }[] | ({
                        destination: {
                            id: string;
                            createdAt: Date;
                            slug: string;
                            name: string;
                            category: string;
                            heroImage: string;
                            description: string;
                            featured: boolean;
                            region: string;
                            state: string;
                            bestSeason: string | null;
                            daysRecommend: string;
                            latitude: number | null;
                            longitude: number | null;
                            updatedAt: Date;
                        };
                    } & {
                        id: string;
                        createdAt: Date;
                        slug: string;
                        destinationId: string;
                        name: string;
                        basePrice: number;
                        heroImage: string;
                        description: string;
                        rating: number;
                        stayType: string;
                        address: string | null;
                        amenities: string[];
                    })[];
                    destinations: {
                        id: string;
                        slug: string;
                        name: string;
                        region: string;
                        state: string;
                        category: string;
                        daysRecommend: string;
                        bestSeason: string;
                        heroImage: string;
                        description: string;
                        latitude: number;
                        longitude: number;
                        featured: boolean;
                    }[] | {
                        id: string;
                        createdAt: Date;
                        slug: string;
                        name: string;
                        category: string;
                        heroImage: string;
                        description: string;
                        featured: boolean;
                        region: string;
                        state: string;
                        bestSeason: string | null;
                        daysRecommend: string;
                        latitude: number | null;
                        longitude: number | null;
                        updatedAt: Date;
                    }[];
                };
                authoritativeSource: string;
            };
            proposal?: undefined;
            verifiedSources?: undefined;
            safetyAdvisories?: undefined;
            suggestedChips?: undefined;
        } | {
            replyType: string;
            message: string;
            verifiedSources: string[];
            safetyAdvisories: string[] | undefined;
            proposal?: undefined;
            searchData?: undefined;
            suggestedChips?: undefined;
        } | {
            replyType: string;
            message: string;
            suggestedChips: string[] | undefined;
            proposal?: undefined;
            searchData?: undefined;
            verifiedSources?: undefined;
            safetyAdvisories?: undefined;
        };
    }>;
    naturalLanguageSearch(dto: AiSearchDto): Promise<{
        status: string;
        parsedIntent: import("./ai.interface.js").ParsedTravelIntent;
        results: {
            adventures: {
                id: string;
                slug: string;
                destinationId: string;
                destinationSlug: string;
                name: string;
                category: string;
                difficulty: string;
                duration: string;
                basePrice: number;
                capacity: number;
                heroImage: string;
                description: string;
                requirements: string[];
                whatToCarry: string[];
                whatToWear: string[];
                safetyGuidelines: string[];
                rating: number;
                reviewCount: number;
                featured: boolean;
            }[] | ({
                destination: {
                    id: string;
                    createdAt: Date;
                    slug: string;
                    name: string;
                    category: string;
                    heroImage: string;
                    description: string;
                    featured: boolean;
                    region: string;
                    state: string;
                    bestSeason: string | null;
                    daysRecommend: string;
                    latitude: number | null;
                    longitude: number | null;
                    updatedAt: Date;
                };
            } & {
                id: string;
                createdAt: Date;
                slug: string;
                destinationId: string;
                name: string;
                category: string;
                difficulty: import("@prisma/client").$Enums.Difficulty;
                duration: string;
                basePrice: number;
                capacity: number;
                heroImage: string;
                description: string;
                requirements: string[];
                whatToCarry: string[];
                whatToWear: string[];
                safetyGuidelines: string[];
                rating: number;
                reviewCount: number;
                featured: boolean;
            })[];
            stays: {
                id: string;
                slug: string;
                destinationId: string;
                destinationSlug: string;
                name: string;
                stayType: string;
                address: string;
                rating: number;
                basePrice: number;
                heroImage: string;
                amenities: string[];
                description: string;
            }[] | ({
                destination: {
                    id: string;
                    createdAt: Date;
                    slug: string;
                    name: string;
                    category: string;
                    heroImage: string;
                    description: string;
                    featured: boolean;
                    region: string;
                    state: string;
                    bestSeason: string | null;
                    daysRecommend: string;
                    latitude: number | null;
                    longitude: number | null;
                    updatedAt: Date;
                };
            } & {
                id: string;
                createdAt: Date;
                slug: string;
                destinationId: string;
                name: string;
                basePrice: number;
                heroImage: string;
                description: string;
                rating: number;
                stayType: string;
                address: string | null;
                amenities: string[];
            })[];
            destinations: {
                id: string;
                slug: string;
                name: string;
                region: string;
                state: string;
                category: string;
                daysRecommend: string;
                bestSeason: string;
                heroImage: string;
                description: string;
                latitude: number;
                longitude: number;
                featured: boolean;
            }[] | {
                id: string;
                createdAt: Date;
                slug: string;
                name: string;
                category: string;
                heroImage: string;
                description: string;
                featured: boolean;
                region: string;
                state: string;
                bestSeason: string | null;
                daysRecommend: string;
                latitude: number | null;
                longitude: number | null;
                updatedAt: Date;
            }[];
        };
        authoritativeSource: string;
    }>;
    planTrip(dto: AiPlanTripDto): Promise<{
        status: string;
        data: import("./ai.interface.js").GeneratedTripProposal;
    }>;
    optimizeItinerary(dto: AiOptimizeItineraryDto): Promise<{
        status: string;
        data: import("./ai.interface.js").ItineraryOptimizationResult;
    }>;
    destinationQa(dto: AiDestinationQaDto): Promise<{
        status: string;
        data: import("./ai.interface.js").DestinationQaResult;
    }>;
    getRecommendations(travelStyle?: string): Promise<{
        status: string;
        travelStyle: string;
        sections: ({
            title: string;
            subtitle: string;
            items: {
                id: string;
                slug: string;
                destinationId: string;
                destinationSlug: string;
                name: string;
                category: string;
                difficulty: string;
                duration: string;
                basePrice: number;
                capacity: number;
                heroImage: string;
                description: string;
                requirements: string[];
                whatToCarry: string[];
                whatToWear: string[];
                safetyGuidelines: string[];
                rating: number;
                reviewCount: number;
                featured: boolean;
            }[] | ({
                destination: {
                    id: string;
                    createdAt: Date;
                    slug: string;
                    name: string;
                    category: string;
                    heroImage: string;
                    description: string;
                    featured: boolean;
                    region: string;
                    state: string;
                    bestSeason: string | null;
                    daysRecommend: string;
                    latitude: number | null;
                    longitude: number | null;
                    updatedAt: Date;
                };
            } & {
                id: string;
                createdAt: Date;
                slug: string;
                destinationId: string;
                name: string;
                category: string;
                difficulty: import("@prisma/client").$Enums.Difficulty;
                duration: string;
                basePrice: number;
                capacity: number;
                heroImage: string;
                description: string;
                requirements: string[];
                whatToCarry: string[];
                whatToWear: string[];
                safetyGuidelines: string[];
                rating: number;
                reviewCount: number;
                featured: boolean;
            })[];
        } | {
            title: string;
            subtitle: string;
            items: {
                id: string;
                slug: string;
                destinationId: string;
                destinationSlug: string;
                name: string;
                stayType: string;
                address: string;
                rating: number;
                basePrice: number;
                heroImage: string;
                amenities: string[];
                description: string;
            }[] | ({
                destination: {
                    id: string;
                    createdAt: Date;
                    slug: string;
                    name: string;
                    category: string;
                    heroImage: string;
                    description: string;
                    featured: boolean;
                    region: string;
                    state: string;
                    bestSeason: string | null;
                    daysRecommend: string;
                    latitude: number | null;
                    longitude: number | null;
                    updatedAt: Date;
                };
            } & {
                id: string;
                createdAt: Date;
                slug: string;
                destinationId: string;
                name: string;
                basePrice: number;
                heroImage: string;
                description: string;
                rating: number;
                stayType: string;
                address: string | null;
                amenities: string[];
            })[];
        })[];
    }>;
    monitorTrip(dto: AiMonitorDto): Promise<{
        status: string;
        data: {
            status: string;
            destination: string;
            tripId: string;
            monitoredAt: string;
            healthScore: number;
            readinessStatus: string;
            alerts: {
                id: string;
                severity: string;
                title: string;
                description: string;
                verifiedBy: string;
                timestamp: string;
            }[];
            emergencyContacts: {
                name: string;
                phone: string;
            }[];
        };
    }>;
    analyzeMultimodal(dto: AiMultimodalDto): Promise<{
        status: string;
        data: {
            taskType: string;
            landmarkIdentified: string;
            location: string;
            confidenceScore: number;
            description: string;
            recommendedVisitTime: string;
            safetyGuidelines: string[];
            matchedActivities: {
                name: string;
                price: number;
                slug: string;
            }[];
            destination?: undefined;
            analyzedGear?: undefined;
            equipmentReadinessScore?: undefined;
            verifiedItems?: undefined;
            missingCriticalItems?: undefined;
            verdict?: undefined;
        } | {
            taskType: string;
            destination: string;
            analyzedGear: string;
            equipmentReadinessScore: number;
            verifiedItems: {
                item: string;
                status: string;
                essential: boolean;
            }[];
            missingCriticalItems: {
                item: string;
                reason: string;
            }[];
            verdict: string;
            landmarkIdentified?: undefined;
            location?: undefined;
            confidenceScore?: undefined;
            description?: undefined;
            recommendedVisitTime?: undefined;
            safetyGuidelines?: undefined;
            matchedActivities?: undefined;
        };
    }>;
    processVoice(dto: AiVoiceDto): Promise<{
        status: string;
        data: {
            voiceInputProcessed: string;
            companionResponse: {
                replyType: string;
                message: string;
                proposal: import("./ai.interface.js").GeneratedTripProposal;
                searchData?: undefined;
                verifiedSources?: undefined;
                safetyAdvisories?: undefined;
                suggestedChips?: undefined;
            } | {
                replyType: string;
                message: string;
                searchData: {
                    status: string;
                    parsedIntent: import("./ai.interface.js").ParsedTravelIntent;
                    results: {
                        adventures: {
                            id: string;
                            slug: string;
                            destinationId: string;
                            destinationSlug: string;
                            name: string;
                            category: string;
                            difficulty: string;
                            duration: string;
                            basePrice: number;
                            capacity: number;
                            heroImage: string;
                            description: string;
                            requirements: string[];
                            whatToCarry: string[];
                            whatToWear: string[];
                            safetyGuidelines: string[];
                            rating: number;
                            reviewCount: number;
                            featured: boolean;
                        }[] | ({
                            destination: {
                                id: string;
                                createdAt: Date;
                                slug: string;
                                name: string;
                                category: string;
                                heroImage: string;
                                description: string;
                                featured: boolean;
                                region: string;
                                state: string;
                                bestSeason: string | null;
                                daysRecommend: string;
                                latitude: number | null;
                                longitude: number | null;
                                updatedAt: Date;
                            };
                        } & {
                            id: string;
                            createdAt: Date;
                            slug: string;
                            destinationId: string;
                            name: string;
                            category: string;
                            difficulty: import("@prisma/client").$Enums.Difficulty;
                            duration: string;
                            basePrice: number;
                            capacity: number;
                            heroImage: string;
                            description: string;
                            requirements: string[];
                            whatToCarry: string[];
                            whatToWear: string[];
                            safetyGuidelines: string[];
                            rating: number;
                            reviewCount: number;
                            featured: boolean;
                        })[];
                        stays: {
                            id: string;
                            slug: string;
                            destinationId: string;
                            destinationSlug: string;
                            name: string;
                            stayType: string;
                            address: string;
                            rating: number;
                            basePrice: number;
                            heroImage: string;
                            amenities: string[];
                            description: string;
                        }[] | ({
                            destination: {
                                id: string;
                                createdAt: Date;
                                slug: string;
                                name: string;
                                category: string;
                                heroImage: string;
                                description: string;
                                featured: boolean;
                                region: string;
                                state: string;
                                bestSeason: string | null;
                                daysRecommend: string;
                                latitude: number | null;
                                longitude: number | null;
                                updatedAt: Date;
                            };
                        } & {
                            id: string;
                            createdAt: Date;
                            slug: string;
                            destinationId: string;
                            name: string;
                            basePrice: number;
                            heroImage: string;
                            description: string;
                            rating: number;
                            stayType: string;
                            address: string | null;
                            amenities: string[];
                        })[];
                        destinations: {
                            id: string;
                            slug: string;
                            name: string;
                            region: string;
                            state: string;
                            category: string;
                            daysRecommend: string;
                            bestSeason: string;
                            heroImage: string;
                            description: string;
                            latitude: number;
                            longitude: number;
                            featured: boolean;
                        }[] | {
                            id: string;
                            createdAt: Date;
                            slug: string;
                            name: string;
                            category: string;
                            heroImage: string;
                            description: string;
                            featured: boolean;
                            region: string;
                            state: string;
                            bestSeason: string | null;
                            daysRecommend: string;
                            latitude: number | null;
                            longitude: number | null;
                            updatedAt: Date;
                        }[];
                    };
                    authoritativeSource: string;
                };
                proposal?: undefined;
                verifiedSources?: undefined;
                safetyAdvisories?: undefined;
                suggestedChips?: undefined;
            } | {
                replyType: string;
                message: string;
                verifiedSources: string[];
                safetyAdvisories: string[] | undefined;
                proposal?: undefined;
                searchData?: undefined;
                suggestedChips?: undefined;
            } | {
                replyType: string;
                message: string;
                suggestedChips: string[] | undefined;
                proposal?: undefined;
                searchData?: undefined;
                verifiedSources?: undefined;
                safetyAdvisories?: undefined;
            };
            suggestedVoiceFollowUps: string[];
        };
    }>;
    executeAutonomousWorkflow(dto: AiAutonomousWorkflowDto): Promise<{
        status: string;
        data: {
            level: number;
            levelName: string;
            autonomousAllowed: boolean;
            data: import("./ai.interface.js").DestinationQaResult;
            message?: undefined;
            holdToken?: undefined;
            expiresAt?: undefined;
            breakdown?: undefined;
            requiredConfirmationPrompt?: undefined;
            error?: undefined;
            userConfirmed?: undefined;
            bookingRef?: undefined;
            status?: undefined;
            executedAt?: undefined;
        } | {
            level: number;
            levelName: string;
            autonomousAllowed: boolean;
            data: {
                status: string;
                travelStyle: string;
                sections: ({
                    title: string;
                    subtitle: string;
                    items: {
                        id: string;
                        slug: string;
                        destinationId: string;
                        destinationSlug: string;
                        name: string;
                        category: string;
                        difficulty: string;
                        duration: string;
                        basePrice: number;
                        capacity: number;
                        heroImage: string;
                        description: string;
                        requirements: string[];
                        whatToCarry: string[];
                        whatToWear: string[];
                        safetyGuidelines: string[];
                        rating: number;
                        reviewCount: number;
                        featured: boolean;
                    }[] | ({
                        destination: {
                            id: string;
                            createdAt: Date;
                            slug: string;
                            name: string;
                            category: string;
                            heroImage: string;
                            description: string;
                            featured: boolean;
                            region: string;
                            state: string;
                            bestSeason: string | null;
                            daysRecommend: string;
                            latitude: number | null;
                            longitude: number | null;
                            updatedAt: Date;
                        };
                    } & {
                        id: string;
                        createdAt: Date;
                        slug: string;
                        destinationId: string;
                        name: string;
                        category: string;
                        difficulty: import("@prisma/client").$Enums.Difficulty;
                        duration: string;
                        basePrice: number;
                        capacity: number;
                        heroImage: string;
                        description: string;
                        requirements: string[];
                        whatToCarry: string[];
                        whatToWear: string[];
                        safetyGuidelines: string[];
                        rating: number;
                        reviewCount: number;
                        featured: boolean;
                    })[];
                } | {
                    title: string;
                    subtitle: string;
                    items: {
                        id: string;
                        slug: string;
                        destinationId: string;
                        destinationSlug: string;
                        name: string;
                        stayType: string;
                        address: string;
                        rating: number;
                        basePrice: number;
                        heroImage: string;
                        amenities: string[];
                        description: string;
                    }[] | ({
                        destination: {
                            id: string;
                            createdAt: Date;
                            slug: string;
                            name: string;
                            category: string;
                            heroImage: string;
                            description: string;
                            featured: boolean;
                            region: string;
                            state: string;
                            bestSeason: string | null;
                            daysRecommend: string;
                            latitude: number | null;
                            longitude: number | null;
                            updatedAt: Date;
                        };
                    } & {
                        id: string;
                        createdAt: Date;
                        slug: string;
                        destinationId: string;
                        name: string;
                        basePrice: number;
                        heroImage: string;
                        description: string;
                        rating: number;
                        stayType: string;
                        address: string | null;
                        amenities: string[];
                    })[];
                })[];
            };
            message?: undefined;
            holdToken?: undefined;
            expiresAt?: undefined;
            breakdown?: undefined;
            requiredConfirmationPrompt?: undefined;
            error?: undefined;
            userConfirmed?: undefined;
            bookingRef?: undefined;
            status?: undefined;
            executedAt?: undefined;
        } | {
            level: number;
            levelName: string;
            autonomousAllowed: boolean;
            data: import("./ai.interface.js").GeneratedTripProposal;
            message?: undefined;
            holdToken?: undefined;
            expiresAt?: undefined;
            breakdown?: undefined;
            requiredConfirmationPrompt?: undefined;
            error?: undefined;
            userConfirmed?: undefined;
            bookingRef?: undefined;
            status?: undefined;
            executedAt?: undefined;
        } | {
            level: number;
            levelName: string;
            autonomousAllowed: boolean;
            data: import("./ai.interface.js").ItineraryOptimizationResult;
            message?: undefined;
            holdToken?: undefined;
            expiresAt?: undefined;
            breakdown?: undefined;
            requiredConfirmationPrompt?: undefined;
            error?: undefined;
            userConfirmed?: undefined;
            bookingRef?: undefined;
            status?: undefined;
            executedAt?: undefined;
        } | {
            level: number;
            levelName: string;
            autonomousAllowed: boolean;
            message: string;
            holdToken: string;
            expiresAt: string;
            breakdown: {
                destination: any;
                activity: any;
                guests: any;
                unitPrice: number;
                subtotal: number;
                serviceFee: number;
                totalPayable: number;
                currency: string;
            };
            requiredConfirmationPrompt: string;
            data?: undefined;
            error?: undefined;
            userConfirmed?: undefined;
            bookingRef?: undefined;
            status?: undefined;
            executedAt?: undefined;
        } | {
            level: number;
            levelName: string;
            autonomousAllowed: boolean;
            error: string;
            data?: undefined;
            message?: undefined;
            holdToken?: undefined;
            expiresAt?: undefined;
            breakdown?: undefined;
            requiredConfirmationPrompt?: undefined;
            userConfirmed?: undefined;
            bookingRef?: undefined;
            status?: undefined;
            executedAt?: undefined;
        } | {
            level: number;
            levelName: string;
            autonomousAllowed: boolean;
            userConfirmed: boolean;
            bookingRef: string;
            status: string;
            message: string;
            executedAt: string;
            data?: undefined;
            holdToken?: undefined;
            expiresAt?: undefined;
            breakdown?: undefined;
            requiredConfirmationPrompt?: undefined;
            error?: undefined;
        } | {
            error: string;
            level?: undefined;
            levelName?: undefined;
            autonomousAllowed?: undefined;
            data?: undefined;
            message?: undefined;
            holdToken?: undefined;
            expiresAt?: undefined;
            breakdown?: undefined;
            requiredConfirmationPrompt?: undefined;
            userConfirmed?: undefined;
            bookingRef?: undefined;
            status?: undefined;
            executedAt?: undefined;
        };
    }>;
}
