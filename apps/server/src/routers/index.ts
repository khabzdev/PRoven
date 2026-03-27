import { t } from "../lib/trpc";
import { challengesRouter } from "./challenges";
import { helloRouter } from "./hello";
import { secretRouter } from "./secret";

export const appRouter = t.mergeRouters(helloRouter, secretRouter, challengesRouter);

export type AppRouter = typeof appRouter;
