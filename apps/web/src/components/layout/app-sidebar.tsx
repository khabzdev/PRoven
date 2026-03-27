import type React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
import { HugeiconsIcon } from "@hugeicons/react";
import { Terminal } from "@hugeicons/core-free-icons";
import { Link } from "@tanstack/react-router";
import { UserNav } from "./user-nav";
import { MainNav } from "./main-nav";

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    id: string;
    email: string;
    name: string;
    avatar: string | null | undefined;
  };
}

export const AppSidebar = ({ user, ...props }: AppSidebarProps) => {
  const { state } = useSidebar();
  return (
    <Sidebar variant="floating" collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center">
            <SidebarMenuButton
              size="lg"
              render={
                state === "expanded" ? (
                  <Link to="/app">
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <HugeiconsIcon icon={Terminal} className="size-4" />
                    </div>
                    <div className="flex flex-col gap-0.5 leading-none">
                      <span className="font-medium">PRoven</span>
                    </div>
                  </Link>
                ) : (
                  <SidebarTrigger />
                )
              }
            />
            {state === "expanded" && <SidebarTrigger />}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNav />
      </SidebarContent>
      <SidebarFooter>
        <UserNav user={user} />
      </SidebarFooter>
    </Sidebar>
  );
};
