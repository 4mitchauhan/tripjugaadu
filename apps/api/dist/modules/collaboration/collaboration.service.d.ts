import { TripCollaborator, SplitExpense, ActivityVote, CollaboratorRole } from './collaboration.interface.js';
export declare class CollaborationService {
    private collaborators;
    private expenses;
    private votes;
    getCollaborators(tripId: string): TripCollaborator[];
    addCollaborator(tripId: string, name: string, email: string, role?: CollaboratorRole): TripCollaborator;
    getExpenses(tripId: string): {
        expenses: SplitExpense[];
        totalPool: number;
    };
    addSplitExpense(tripId: string, description: string, totalAmount: number, paidBy: string, splitAmong: string[]): SplitExpense;
    getVotes(tripId: string): ActivityVote[];
    castVote(tripId: string, itemId: string, itemTitle: string, itemCategory: string, voterEmail: string, vote: 'UP' | 'DOWN'): ActivityVote;
}
