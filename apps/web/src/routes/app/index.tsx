import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getContext } from "@/integrations/tanstack-query/root-provider";

export const Route = createFileRoute("/app/")({
  loader: () => {
    const { trpc, queryClient } = getContext();
    return queryClient.ensureQueryData(trpc.hello.queryOptions());
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { trpc } = getContext();
  const { data } = useSuspenseQuery(trpc.hello.queryOptions());

  return <div>{data}</div>;
}
