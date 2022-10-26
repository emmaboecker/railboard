// src/server/router/_app.ts
import { router } from "../trpc";

import { vendoRouter } from "./vendo";

export const appRouter = router({
  vendo: vendoRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
