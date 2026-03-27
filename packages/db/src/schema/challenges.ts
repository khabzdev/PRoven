import { json, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "@proven/utils/custom-nanoid";

export const challenges = pgTable("challenges", {
  id: text("id")
    .primaryKey()
    .$default(() => `clg_${nanoid()}`)
    .notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  languages: json("languages").$type<string[]>().notNull(),
  frameworks: json("frameworks").$type<string[]>().notNull(),
  difficulty: text("difficulty").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
