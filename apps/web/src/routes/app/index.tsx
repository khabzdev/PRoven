import { createFileRoute } from "@tanstack/react-router";
import { $getSession } from "@/lib/functions/auth.functions";

export const Route = createFileRoute("/app/")({
  loader: () => $getSession(),
  component: RouteComponent,
});

function RouteComponent() {
  const session = Route.useLoaderData();

  return <pre>{JSON.stringify(session, null, 2)}</pre>;
}
