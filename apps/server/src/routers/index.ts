import { router, publicProcedure, protectedProcedure } from "../lib/trpc";

export const appRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello, world!";
  }),
  secret: protectedProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
    };
  }),
});

export type AppRouter = typeof appRouter;
