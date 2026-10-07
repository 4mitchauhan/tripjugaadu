import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CollaborationService } from './collaboration.service.js';
import { AddCollaboratorDto, AddSplitExpenseDto, CastVoteDto } from './collaboration.interface.js';

@Controller('collaboration')
export class CollaborationController {
  constructor(private readonly collaborationService: CollaborationService) {}

  @Get(':tripId/members')
  getMembers(@Param('tripId') tripId: string) {
    return {
      status: 'success',
      data: this.collaborationService.getCollaborators(tripId),
    };
  }

  @Post(':tripId/members')
  addMember(
    @Param('tripId') tripId: string,
    @Body() body: AddCollaboratorDto,
  ) {
    const member = this.collaborationService.addCollaborator(
      tripId,
      body.name,
      body.email,
      body.role || 'EDITOR',
    );
    return {
      status: 'success',
      message: `Travel collaborator ${body.name} invited successfully`,
      data: member,
    };
  }

  @Get(':tripId/expenses')
  getExpenses(@Param('tripId') tripId: string) {
    return {
      status: 'success',
      data: this.collaborationService.getExpenses(tripId),
    };
  }

  @Post(':tripId/expenses/split')
  addExpense(
    @Param('tripId') tripId: string,
    @Body() body: AddSplitExpenseDto,
  ) {
    const expense = this.collaborationService.addSplitExpense(
      tripId,
      body.description,
      body.totalAmount,
      body.paidBy,
      body.splitAmong,
    );
    return {
      status: 'success',
      message: 'Group expense added and split calculated',
      data: expense,
    };
  }

  @Get(':tripId/votes')
  getVotes(@Param('tripId') tripId: string) {
    return {
      status: 'success',
      data: this.collaborationService.getVotes(tripId),
    };
  }

  @Post(':tripId/votes/:itemId')
  castVote(
    @Param('tripId') tripId: string,
    @Param('itemId') itemId: string,
    @Body() body: CastVoteDto,
  ) {
    const updated = this.collaborationService.castVote(
      tripId,
      itemId,
      body.itemTitle,
      body.itemCategory,
      body.voterEmail,
      body.vote,
    );
    return {
      status: 'success',
      data: updated,
    };
  }
}
