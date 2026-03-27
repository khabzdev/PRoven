import { AppSidebar } from "#/components/layout/app-sidebar";
import { SidebarInset, SidebarProvider } from "#/components/ui/sidebar";
import { $getSession } from "#/lib/functions/auth.functions";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/app")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await $getSession();
    if (!session) {
      throw redirect({ to: "/auth" });
    }
    return { user: session.user };
  },
});

function RouteComponent() {
  const { user } = Route.useRouteContext();
  return (
    <SidebarProvider>
      <AppSidebar
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.image,
        }}
      />
      <SidebarInset>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
