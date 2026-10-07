import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { TripCollaborator, SplitExpense, ActivityVote, CollaboratorRole } from './collaboration.interface.js';

@Injectable()
export class CollaborationService {
  private collaborators: Record<string, TripCollaborator[]> = {
    'sample-trip': [
      {
        id: 'collab-1',
        tripId: 'sample-trip',
        name: 'Arjun Verma',
        email: 'arjun@tripjugaadu.com',
        role: 'OWNER',
        joinedAt: '2026-10-01T10:00:00Z',
      },
      {
        id: 'collab-2',
        tripId: 'sample-trip',
        name: 'Pooja Hegde',
        email: 'pooja@gmail.com',
        role: 'EDITOR',
        joinedAt: '2026-10-02T12:00:00Z',
      },
      {
        id: 'collab-3',
        tripId: 'sample-trip',
        name: 'Karan Mehra',
        email: 'karan@outlook.com',
        role: 'VIEWER',
        joinedAt: '2026-10-03T15:30:00Z',
      },
    ],
  };

  private expenses: Record<string, SplitExpense[]> = {
    'sample-trip': [
      {
        id: 'exp-1',
        tripId: 'sample-trip',
        description: 'White Water Rafting Batch (4 Persons)',
        totalAmount: 15996,
        paidBy: 'Arjun Verma',
        splitAmong: ['Arjun Verma', 'Pooja Hegde', 'Karan Mehra', 'Sneha Roy'],
        perPersonShare: 3999,
        settled: false,
        createdAt: '2026-10-03T18:00:00Z',
      },
      {
        id: 'exp-2',
        tripId: 'sample-trip',
        description: 'Riverside Glamping Stay (2 Nights)',
        totalAmount: 24000,
        paidBy: 'Pooja Hegde',
        splitAmong: ['Arjun Verma', 'Pooja Hegde', 'Karan Mehra', 'Sneha Roy'],
        perPersonShare: 6000,
        settled: false,
        createdAt: '2026-10-04T09:00:00Z',
      },
    ],
  };

  private votes: Record<string, ActivityVote[]> = {
    'sample-trip': [
      {
        itemId: 'rafting',
        itemTitle: 'White Water Rafting (Grade IV)',
        itemCategory: 'Adventure',
        upvotes: 3,
        downvotes: 0,
        votedBy: {
          'arjun@tripjugaadu.com': 'UP',
          'pooja@gmail.com': 'UP',
          'karan@outlook.com': 'UP',
        },
      },
      {
        itemId: 'bungee',
        itemTitle: 'Mohan Chatti 83m Bungee Jumping',
        itemCategory: 'Extreme',
        upvotes: 1,
        downvotes: 1,
        votedBy: {
          'arjun@tripjugaadu.com': 'UP',
          'karan@outlook.com': 'DOWN',
        },
      },
    ],
  };

  getCollaborators(tripId: string): TripCollaborator[] {
    return this.collaborators[tripId] || [];
  }

  addCollaborator(tripId: string, name: string, email: string, role: CollaboratorRole = 'EDITOR'): TripCollaborator {
    if (!name || !email) {
      throw new BadRequestException('Name and email are required');
    }
    if (!this.collaborators[tripId]) {
      this.collaborators[tripId] = [];
    }

    const existing = this.collaborators[tripId].find(c => c.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      existing.role = role;
      return existing;
    }

    const newCollab: TripCollaborator = {
      id: `collab_${Date.now()}`,
      tripId,
      name,
      email,
      role,
      joinedAt: new Date().toISOString(),
    };

    this.collaborators[tripId].push(newCollab);
    return newCollab;
  }

  getExpenses(tripId: string): { expenses: SplitExpense[]; totalPool: number } {
    const list = this.expenses[tripId] || [];
    const totalPool = list.reduce((acc, curr) => acc + curr.totalAmount, 0);
    return { expenses: list, totalPool };
  }

  addSplitExpense(tripId: string, description: string, totalAmount: number, paidBy: string, splitAmong: string[]): SplitExpense {
    if (!description || !totalAmount || !splitAmong.length) {
      throw new BadRequestException('Description, totalAmount, and splitAmong are required');
    }
    if (!this.expenses[tripId]) {
      this.expenses[tripId] = [];
    }

    const perPerson = Math.round((totalAmount / splitAmong.length) * 100) / 100;
    const expense: SplitExpense = {
      id: `exp_${Date.now()}`,
      tripId,
      description,
      totalAmount,
      paidBy,
      splitAmong,
      perPersonShare: perPerson,
      settled: false,
      createdAt: new Date().toISOString(),
    };

    this.expenses[tripId].push(expense);
    return expense;
  }

  getVotes(tripId: string): ActivityVote[] {
    return this.votes[tripId] || [];
  }

  castVote(tripId: string, itemId: string, itemTitle: string, itemCategory: string, voterEmail: string, vote: 'UP' | 'DOWN'): ActivityVote {
    if (!this.votes[tripId]) {
      this.votes[tripId] = [];
    }

    let existing = this.votes[tripId].find(v => v.itemId === itemId);
    if (!existing) {
      existing = {
        itemId,
        itemTitle,
        itemCategory,
        upvotes: 0,
        downvotes: 0,
        votedBy: {},
      };
      this.votes[tripId].push(existing);
    }

    const previousVote = existing.votedBy[voterEmail];
    if (previousVote === vote) {
      return existing; // already cast
    }

    if (previousVote === 'UP') existing.upvotes--;
    if (previousVote === 'DOWN') existing.downvotes--;

    if (vote === 'UP') existing.upvotes++;
    if (vote === 'DOWN') existing.downvotes++;

    existing.votedBy[voterEmail] = vote;
    return existing;
  }
}
