import { db } from "@proven/db";
import { challenges } from "@proven/db/schema";
import { and, count, desc, eq, ilike, or, sql } from "drizzle-orm";
import type { SQL } from "drizzle-orm";
import type {
  Challenge,
  ChallengesQuery,
  CreateChallengeInput,
  IChallengesRepository,
  PaginatedChallenges,
} from "./challenges.repository.interface";

export class ChallengesRepository implements IChallengesRepository {
  async findAll(query: ChallengesQuery): Promise<PaginatedChallenges> {
    const { page, limit, search, difficulty, language, framework } = query;
    const offset = (page - 1) * limit;

    const conditions: Array<SQL<unknown>> = [];

    if (search) {
      const searchCondition = or(
        ilike(challenges.title, `%${search}%`),
        ilike(challenges.description, `%${search}%`),
      );
      if (searchCondition) conditions.push(searchCondition);
    }

    if (difficulty) {
      conditions.push(eq(challenges.difficulty, difficulty));
    }

    if (language) {
      conditions.push(sql`${challenges.languages}::jsonb @> ${JSON.stringify([language])}::jsonb`);
    }

    if (framework) {
      conditions.push(
        sql`${challenges.frameworks}::jsonb @> ${JSON.stringify([framework])}::jsonb`,
      );
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [data, totals] = await Promise.all([
      db
        .select()
        .from(challenges)
        .where(where)
        .orderBy(desc(challenges.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ total: count() }).from(challenges).where(where),
    ]);

    const total = totals[0]?.total ?? 0;

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findById(id: string): Promise<Challenge | null> {
    const rows = await db.select().from(challenges).where(eq(challenges.id, id)).limit(1);

    return rows[0] ?? null;
  }

  async create(input: CreateChallengeInput): Promise<Challenge> {
    const rows = await db.insert(challenges).values(input).returning();
    return rows[0];
  }

  async deleteById(id: string): Promise<void> {
    await db.delete(challenges).where(eq(challenges.id, id));
  }
}
