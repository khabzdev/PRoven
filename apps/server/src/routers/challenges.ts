import {
  challengeIdSchema,
  createChallengeSchema,
  getChallengesSchema,
} from "@proven/contracts/schemas/challenges";
import { ChallengesRepository } from "../repositories/challenges.repository";
import { ChallengesService } from "../services/challenges.service";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";

const service = new ChallengesService(new ChallengesRepository());

export const challengesRouter = router({
  getAll: publicProcedure.input(getChallengesSchema).query(({ input }) => {
    return service.getAll(input);
  }),

  getById: publicProcedure.input(challengeIdSchema).query(({ input }) => {
    return service.getById(input.id);
  }),

  create: protectedProcedure.input(createChallengeSchema).mutation(({ input }) => {
    return service.create(input);
  }),

  delete: protectedProcedure.input(challengeIdSchema).mutation(({ input }) => {
    return service.delete(input.id);
  }),
});
