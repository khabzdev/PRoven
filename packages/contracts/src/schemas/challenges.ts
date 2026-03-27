import * as z from "zod/v3";

export const challengesDifficultySchema = z.enum(["beginner", "intermediate", "advanced"]);

export const getChallengesSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  search: z.string().trim().min(1).optional(),
  difficulty: challengesDifficultySchema.optional(),
  language: z.string().optional(),
  framework: z.string().optional(),
});

export const createChallengeSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  languages: z.array(z.string()),
  frameworks: z.array(z.string()),
  difficulty: challengesDifficultySchema,
});

export const challengeIdSchema = z.object({
  id: z.string(),
});

export type GetChallengesInput = z.infer<typeof getChallengesSchema>;
export type CreateChallengeInput = z.infer<typeof createChallengeSchema>;
export type ChallengeIdInput = z.infer<typeof challengeIdSchema>;
