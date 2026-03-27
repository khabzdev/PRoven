import { router, publicProcedure } from "../lib/trpc";

export const helloRouter = router({
  hello: publicProcedure.query(() => {
    return "Hello, world!";
  }),
});
