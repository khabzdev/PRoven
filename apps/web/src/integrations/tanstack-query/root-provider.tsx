import type { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppRouter } from "@proven/server/appRouter";
import { createTRPCClient, httpBatchStreamLink } from "@trpc/client";
import superjson from "superjson";
import { createTRPCOptionsProxy } from "@trpc/tanstack-react-query";
import { TRPCProvider } from "../trpc";

const serverUrl = `${import.meta.env.VITE_SERVER_URL}/api/trpc`;

export const trpcClient = createTRPCClient<AppRouter>({
  links: [
    httpBatchStreamLink({
      transformer: superjson,
      url: serverUrl,
    }),
  ],
});

let context:
  | {
      queryClient: QueryClient;
      trpc: ReturnType<typeof createTRPCOptionsProxy<AppRouter>>;
    }
  | undefined;

export function getContext() {
  if (context) {
    return context;
  }

  const queryClient = new QueryClient({
    defaultOptions: {
      dehydrate: { serializeData: superjson.serialize },
      hydrate: { deserializeData: superjson.deserialize },
    },
  });

  const serverHelpers = createTRPCOptionsProxy({
    client: trpcClient,
    queryClient,
  });

  context = {
    queryClient,
    trpc: serverHelpers,
  };

  return context;
}

export default function TanStackQueryProvider({ children }: { children: ReactNode }) {
  const { queryClient } = getContext();

  return (
    <QueryClientProvider client={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        {children}
      </TRPCProvider>
    </QueryClientProvider>
  );
}
