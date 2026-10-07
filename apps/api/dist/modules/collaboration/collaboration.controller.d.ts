import { CollaborationService } from './collaboration.service.js';
import { AddCollaboratorDto, AddSplitExpenseDto, CastVoteDto } from './collaboration.interface.js';
export declare class CollaborationController {
    private readonly collaborationService;
    constructor(collaborationService: CollaborationService);
    getMembers(tripId: string): {
        status: string;
        data: import("./collaboration.interface.js").TripCollaborator[];
    };
    addMember(tripId: string, body: AddCollaboratorDto): {
        status: string;
        message: string;
        data: import("./collaboration.interface.js").TripCollaborator;
    };
    getExpenses(tripId: string): {
        status: string;
        data: {
            expenses: import("./collaboration.interface.js").SplitExpense[];
            totalPool: number;
        };
    };
    addExpense(tripId: string, body: AddSplitExpenseDto): {
        status: string;
        message: string;
        data: import("./collaboration.interface.js").SplitExpense;
    };
    getVotes(tripId: string): {
        status: string;
        data: import("./collaboration.interface.js").ActivityVote[];
    };
    castVote(tripId: string, itemId: string, body: CastVoteDto): {
        status: string;
        data: import("./collaboration.interface.js").ActivityVote;
    };
}
