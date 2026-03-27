import { TRPCError } from "@trpc/server";
import type {
  Challenge,
  ChallengesQuery,
  CreateChallengeInput,
  IChallengesRepository,
  PaginatedChallenges,
} from "../repositories/challenges.repository.interface";

export class ChallengesService {
  constructor(private readonly repository: IChallengesRepository) {}

  async getAll(query: ChallengesQuery): Promise<PaginatedChallenges> {
    return this.repository.findAll(query);
  }

  async getById(id: string): Promise<Challenge> {
    const challenge = await this.repository.findById(id);

    if (!challenge) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Challenge with id "${id}" not found`,
      });
    }

    return challenge;
  }

  async create(input: CreateChallengeInput): Promise<Challenge> {
    return this.repository.create(input);
  }

  async delete(id: string): Promise<void> {
    await this.getById(id); // ensures it exists before deleting
    await this.repository.deleteById(id);
  }
}
