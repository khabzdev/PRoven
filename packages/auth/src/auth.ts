import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@proven/db";
import { members, organizations } from "@proven/db/schema";
import { betterAuth } from "better-auth";
import { organization } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import * as schema from "@proven/db/schema";
import { nanoid } from "@proven/utils/custom-nanoid";
import { and, eq } from "drizzle-orm";

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL as string,
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
  plugins: [
    organization({
      schema: {
        organization: {
          additionalFields: {
            isPersonal: {
              type: "boolean",
              defaultValue: false,
              input: false,
            },
          },
        },
      },
    }),
    tanstackStartCookies(),
  ],
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
              isPersonal: true,
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
    session: {
      create: {
        before: async (session) => {
          if (session.activeOrganizationId) return { data: session };

          const personalOrg = await db
            .select({ id: organizations.id })
            .from(organizations)
            .innerJoin(members, eq(members.organizationId, organizations.id))
            .where(and(eq(members.userId, session.userId), eq(organizations.isPersonal, true)))
            .limit(1)
            .then((rows) => rows[0] ?? null);

          return {
            data: {
              ...session,
              activeOrganizationId: personalOrg?.id ?? null,
            },
          };
        },
      },
    },
  },
  experimental: {
    joins: true,
  },
});
