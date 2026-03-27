import type { challenges } from "@proven/db/schema";

export type Challenge = typeof challenges.$inferSelect;

export type CreateChallengeInput = Omit<Challenge, "id" | "createdAt">;

export type ChallengesQuery = {
  page: number;
  limit: number;
  search?: string;
  difficulty?: string;
  language?: string;
  framework?: string;
};

export type PaginatedChallenges = {
  data: Challenge[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export interface IChallengesRepository {
  findAll(query: ChallengesQuery): Promise<PaginatedChallenges>;
  findById(id: string): Promise<Challenge | null>;
  create(input: CreateChallengeInput): Promise<Challenge>;
  deleteById(id: string): Promise<void>;
}
