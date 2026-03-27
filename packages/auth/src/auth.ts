import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@proven/db";
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import * as schema from "@proven/db/schema";

export const auth = betterAuth({
  baseURL: process.env.VITE_BASE_URL as string,
  secret: process.env.BETTER_AUTH_SECRET as string,
  database: drizzleAdapter(db, {
    usePlural: true,
    provider: "pg",
    schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [organization(), tanstackStartCookies()],
  experimental: {
    joins: true,
  },
});
