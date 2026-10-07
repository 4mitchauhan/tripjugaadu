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
import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CollaborationService } from './collaboration.service.js';
import { AddCollaboratorDto, AddSplitExpenseDto, CastVoteDto } from './collaboration.interface.js';
let CollaborationController = class CollaborationController {
    collaborationService;
    constructor(collaborationService) {
        this.collaborationService = collaborationService;
    }
    getMembers(tripId) {
        return {
            status: 'success',
            data: this.collaborationService.getCollaborators(tripId),
        };
    }
    addMember(tripId, body) {
        const member = this.collaborationService.addCollaborator(tripId, body.name, body.email, body.role || 'EDITOR');
        return {
            status: 'success',
            message: `Travel collaborator ${body.name} invited successfully`,
            data: member,
        };
    }
    getExpenses(tripId) {
        return {
            status: 'success',
            data: this.collaborationService.getExpenses(tripId),
        };
    }
    addExpense(tripId, body) {
        const expense = this.collaborationService.addSplitExpense(tripId, body.description, body.totalAmount, body.paidBy, body.splitAmong);
        return {
            status: 'success',
            message: 'Group expense added and split calculated',
            data: expense,
        };
    }
    getVotes(tripId) {
        return {
            status: 'success',
            data: this.collaborationService.getVotes(tripId),
        };
    }
    castVote(tripId, itemId, body) {
        const updated = this.collaborationService.castVote(tripId, itemId, body.itemTitle, body.itemCategory, body.voterEmail, body.vote);
        return {
            status: 'success',
            data: updated,
        };
    }
};
__decorate([
    Get(':tripId/members'),
    __param(0, Param('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollaborationController.prototype, "getMembers", null);
__decorate([
    Post(':tripId/members'),
    __param(0, Param('tripId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AddCollaboratorDto]),
    __metadata("design:returntype", void 0)
], CollaborationController.prototype, "addMember", null);
__decorate([
    Get(':tripId/expenses'),
    __param(0, Param('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollaborationController.prototype, "getExpenses", null);
__decorate([
    Post(':tripId/expenses/split'),
    __param(0, Param('tripId')),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, AddSplitExpenseDto]),
    __metadata("design:returntype", void 0)
], CollaborationController.prototype, "addExpense", null);
__decorate([
    Get(':tripId/votes'),
    __param(0, Param('tripId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CollaborationController.prototype, "getVotes", null);
__decorate([
    Post(':tripId/votes/:itemId'),
    __param(0, Param('tripId')),
    __param(1, Param('itemId')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, CastVoteDto]),
    __metadata("design:returntype", void 0)
], CollaborationController.prototype, "castVote", null);
CollaborationController = __decorate([
    Controller('collaboration'),
    __metadata("design:paramtypes", [CollaborationService])
], CollaborationController);
export { CollaborationController };
//# sourceMappingURL=collaboration.controller.js.map