import { router, protectedProcedure } from "../lib/trpc";

export const secretRouter = router({
  secret: protectedProcedure.query(({ ctx }) => {
    return {
      user: ctx.user,
    };
  }),
});
