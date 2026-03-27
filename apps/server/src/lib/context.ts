import type { Context as HonoContext } from "hono";
import { auth } from "@proven/auth/auth";

export type CreateContextOptions = {
  hono: HonoContext;
};

export const createContext = async (options: CreateContextOptions) => {
  const session = await auth.api.getSession({
    headers: options.hono.req.raw.headers,
  });

  return {
    user: session?.user,
    activeOrganizationId: session?.session.activeOrganizationId,
  };
};

export type Context = Awaited<ReturnType<typeof createContext>>;
