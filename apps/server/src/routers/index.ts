import { t } from "../lib/trpc";
import { helloRouter } from "./hello";
import { secretRouter } from "./secret";

export const appRouter = t.mergeRouters(helloRouter, secretRouter);

export type AppRouter = typeof appRouter;
