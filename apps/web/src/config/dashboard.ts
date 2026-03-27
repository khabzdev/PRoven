import { HugeiconsIcon, Terminal } from "@hugeicons/core-free-icons";

interface MenuItem {
  title: string;
  to?: string;
  icon: typeof HugeiconsIcon;
}

export const dashboardMenuConfig: MenuItem[] = [
  {
    title: "Challenges",
    to: "/app",
    icon: Terminal,
  },
];
