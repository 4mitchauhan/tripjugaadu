import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { AiService } from './ai.service.js';
import { 
  AiSearchDto, 
  AiPlanTripDto, 
  AiOptimizeItineraryDto, 
  AiDestinationQaDto, 
  AiChatDto,
  AiMonitorDto,
  AiMultimodalDto,
  AiVoiceDto,
  AiAutonomousWorkflowDto
} from './dto/ai-request.dto.js';

@Controller('ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('chat')
  async chat(@Body() dto: AiChatDto) {
    const msg = dto.message || dto.prompt || dto.query || '';
    const result = await this.aiService.chatWithCompanion(msg, dto.context);
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('search')
  async naturalLanguageSearch(@Body() dto: AiSearchDto) {
    const q = dto.query || dto.prompt || '';
    const result = await this.aiService.naturalLanguageSearch(q);
    return result;
  }

  @Post('plan-trip')
  async planTrip(@Body() dto: AiPlanTripDto) {
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

  @Post('optimize-itinerary')
  async optimizeItinerary(@Body() dto: AiOptimizeItineraryDto) {
    const result = await this.aiService.optimizeItinerary(dto.currentProposal, dto.instruction);
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('destination-qa')
  async destinationQa(@Body() dto: AiDestinationQaDto) {
    const slug = dto.destinationSlug || dto.destinationId || 'rishikesh';
    const result = await this.aiService.answerDestinationQuery(slug, dto.question);
    return {
      status: 'success',
      data: result,
    };
  }

  @Get('recommendations')
  async getRecommendations(@Query('travelStyle') travelStyle?: string) {
    return await this.aiService.getRecommendations(travelStyle);
  }

  @Post('monitor')
  async monitorTrip(@Body() dto: AiMonitorDto) {
    const result = await this.aiService.monitorTrip(dto.tripId, dto.destinationSlug || 'rishikesh');
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('multimodal')
  async analyzeMultimodal(@Body() dto: AiMultimodalDto) {
    const result = await this.aiService.analyzeMultimodal(
      dto.imageDescription || '',
      dto.taskType || 'PACKING_CHECKLIST',
      dto.destinationSlug || 'rishikesh'
    );
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('voice')
  async processVoice(@Body() dto: AiVoiceDto) {
    const result = await this.aiService.processVoice(dto.transcript, dto.context);
    return {
      status: 'success',
      data: result,
    };
  }

  @Post('autonomous-workflow')
  async executeAutonomousWorkflow(@Body() dto: AiAutonomousWorkflowDto) {
    const result = await this.aiService.executeAutonomousWorkflow(
      dto.level,
      dto.intent,
      dto.parameters,
      dto.userConfirmationToken
    );
    return {
      status: 'success',
      data: result,
    };
  }
}
