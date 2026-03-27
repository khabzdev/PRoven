import { auth } from "@proven/auth/auth";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./routers";
import { createContext } from "./lib/context";
import { logger } from "hono/logger";
import "dotenv/config";

export const app = new Hono().basePath("/api");

app.use(logger());

app.use(
  "/*",
  cors({
    origin: [process.env.BETTER_AUTH_URL as string],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

app.on(["get", "post", "put", "delete"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.use(
  "/trpc/*",
  trpcServer({
    router: appRouter,
    createContext: async (_, hono) => {
      return createContext({ hono });
    },
  }),
);

export default app;
