import { defineConfig } from "vite-plus";
import devServer from "@hono/vite-dev-server";
import nodeAdapter from "@hono/vite-dev-server/node";

export default defineConfig({
  plugins: [
    devServer({
      adapter: nodeAdapter,
      entry: "src/index.ts",
    }),
  ],
});
