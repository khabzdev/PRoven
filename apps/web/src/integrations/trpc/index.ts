import { createTRPCContext } from "@trpc/tanstack-react-query";
import type { AppRouter } from "@proven/server/appRouter";

export const { TRPCProvider, useTRPC } = createTRPCContext<AppRouter>();
