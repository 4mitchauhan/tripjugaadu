var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { AiSearchDto, AiPlanTripDto, AiOptimizeItineraryDto, AiDestinationQaDto, AiChatDto, AiMonitorDto, AiMultimodalDto, AiVoiceDto, AiAutonomousWorkflowDto } from './dto/ai-request.dto.js';
let AiController = class AiController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    async chat(dto) {
        const msg = dto.message || dto.prompt || dto.query || '';
        const result = await this.aiService.chatWithCompanion(msg, dto.context);
        return {
            status: 'success',
            data: result,
        };
    }
    async naturalLanguageSearch(dto) {
        const q = dto.query || dto.prompt || '';
        const result = await this.aiService.naturalLanguageSearch(q);
        return result;
    }
    async planTrip(dto) {
        const q = dto.query || dto.prompt || (dto.destination ? `${dto.durationDays || 3} days in ${dto.destination}` : 'Travel itinerary in India');
        const prefs = dto.preferences || {
            budgetMax: dto.budgetCategory === 'luxury' ? 50000 : dto.budgetCategory === 'budget' ? 10000 : 25000,
            travelStyle: dto.travelerPace || 'Adventure',
            durationDays: dto.durationDays || 3,
        };
        const proposal = await this.aiService.planTrip(q, prefs);
        return {
            status: 'success',
            data: proposal,
        };
    }
    async optimizeItinerary(dto) {
        const result = await this.aiService.optimizeItinerary(dto.currentProposal, dto.instruction);
        return {
            status: 'success',
            data: result,
        };
    }
    async destinationQa(dto) {
        const slug = dto.destinationSlug || dto.destinationId || 'rishikesh';
        const result = await this.aiService.answerDestinationQuery(slug, dto.question);
        return {
            status: 'success',
            data: result,
        };
    }
    async getRecommendations(travelStyle) {
        return await this.aiService.getRecommendations(travelStyle);
    }
    async monitorTrip(dto) {
        const result = await this.aiService.monitorTrip(dto.tripId, dto.destinationSlug || 'rishikesh');
        return {
            status: 'success',
            data: result,
        };
    }
    async analyzeMultimodal(dto) {
        const result = await this.aiService.analyzeMultimodal(dto.imageDescription || '', dto.taskType || 'PACKING_CHECKLIST', dto.destinationSlug || 'rishikesh');
        return {
            status: 'success',
            data: result,
        };
    }
    async processVoice(dto) {
        const result = await this.aiService.processVoice(dto.transcript, dto.context);
        return {
            status: 'success',
            data: result,
        };
    }
    async executeAutonomousWorkflow(dto) {
        const result = await this.aiService.executeAutonomousWorkflow(dto.level, dto.intent, dto.parameters, dto.userConfirmationToken);
        return {
            status: 'success',
            data: result,
        };
    }
};
__decorate([
    Post('chat'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiChatDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "chat", null);
__decorate([
    Post('search'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiSearchDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "naturalLanguageSearch", null);
__decorate([
    Post('plan-trip'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiPlanTripDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "planTrip", null);
__decorate([
    Post('optimize-itinerary'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiOptimizeItineraryDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "optimizeItinerary", null);
__decorate([
    Post('destination-qa'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiDestinationQaDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "destinationQa", null);
__decorate([
    Get('recommendations'),
    __param(0, Query('travelStyle')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "getRecommendations", null);
__decorate([
    Post('monitor'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiMonitorDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "monitorTrip", null);
__decorate([
    Post('multimodal'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiMultimodalDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "analyzeMultimodal", null);
__decorate([
    Post('voice'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiVoiceDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "processVoice", null);
__decorate([
    Post('autonomous-workflow'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [AiAutonomousWorkflowDto]),
    __metadata("design:returntype", Promise)
], AiController.prototype, "executeAutonomousWorkflow", null);
AiController = __decorate([
    Controller('ai'),
    __metadata("design:paramtypes", [AiService])
], AiController);
export { AiController };
//# sourceMappingURL=ai.controller.js.map