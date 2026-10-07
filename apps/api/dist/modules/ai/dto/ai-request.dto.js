export class AiSearchDto {
    query;
    prompt;
}
export class AiPlanTripDto {
    query;
    prompt;
    destination;
    durationDays;
    travelerPace;
    budgetCategory;
    preferences;
}
export class AiOptimizeItineraryDto {
    currentProposal;
    instruction;
}
export class AiDestinationQaDto {
    destinationSlug;
    destinationId;
    question;
}
export class AiChatDto {
    message;
    prompt;
    query;
    context;
}
export class AiMonitorDto {
    tripId;
    destinationSlug;
}
export class AiMultimodalDto {
    imageDescription;
    imageUrl;
    taskType;
    destinationSlug;
}
export class AiVoiceDto {
    transcript;
    context;
}
export class AiAutonomousWorkflowDto {
    level;
    intent;
    parameters;
    userConfirmationToken;
}
//# sourceMappingURL=ai-request.dto.js.map