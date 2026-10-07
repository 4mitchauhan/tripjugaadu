export type CollaboratorRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface TripCollaborator {
  id: string;
  tripId: string;
  name: string;
  email: string;
  role: CollaboratorRole;
  avatar?: string;
  joinedAt: string;
}

export interface SplitExpense {
  id: string;
  tripId: string;
  description: string;
  totalAmount: number;
  paidBy: string;
  splitAmong: string[]; // array of names or emails
  perPersonShare: number;
  settled: boolean;
  createdAt: string;
}

export interface ActivityVote {
  itemId: string;
  itemTitle: string;
  itemCategory: string;
  upvotes: number;
  downvotes: number;
  votedBy: Record<string, 'UP' | 'DOWN'>;
}

export class AddCollaboratorDto {
  name!: string;
  email!: string;
  role?: CollaboratorRole;
}

export class AddSplitExpenseDto {
  description!: string;
  totalAmount!: number;
  paidBy!: string;
  splitAmong!: string[];
}

export class CastVoteDto {
  itemTitle!: string;
  itemCategory!: string;
  voterEmail!: string;
  vote!: 'UP' | 'DOWN';
}
