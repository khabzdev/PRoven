import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";

export const t = initTRPC.context<Context>().create();

export const router = t.router;

export const publicProcedure = t.procedure;

export const protectedProcedure = t.procedure.use(({ ctx, next }) => {
  if (!ctx.user && !ctx.activeOrganizationId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Not authenticated",
      cause: new Error("User is not authenticated"),
    });
  }

  return next({
    ctx: {
      ...ctx,
    },
  });
});
