import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@proven/db";
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import * as schema from "@proven/db/schema";
import { nanoid } from "@proven/utils/custom-nanoid";

export const auth = betterAuth({
  baseURL: process.env.VITE_BASE_URL as string,
  secret: process.env.BETTER_AUTH_SECRET as string,
  database: drizzleAdapter(db, {
    usePlural: true,
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
  //   },
  // },
  plugins: [organization(), tanstackStartCookies()],
  databaseHooks: {
    user: {
      create: {
        after: async (user, context) => {
          if (!context) return;
          const { adapter } = context.context;

          const id = nanoid();

          const org = await adapter.create<{ id: string }>({
            model: "organization",
            data: {
              name: "Personal",
              slug: id,
              createdAt: new Date(),
            },
          });

          await adapter.create({
            model: "member",
            data: {
              userId: user.id,
              organizationId: org.id,
              role: "owner",
              createdAt: new Date(),
            },
          });
        },
      },
    },
  },
  experimental: {
    joins: true,
  },
});
