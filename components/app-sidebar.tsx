"use client"

import {
  BookOpen,
  Bot,
  SquareTerminal,
} from "lucide-react"

import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import { useEffect, useState } from "react"
import { userInfo } from "@/lib/actions/Manager/DashBoard"
import { Skeleton } from "./ui/skeleton"


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "DashBoard",
      url: "/Manager/Dashboard",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Colleagues",
      url: "/Manager/Colleagues",
      icon: Bot,
    },
    {
      title: "Notifications",
      url: "/Manager/Notifications",
      icon: BookOpen,
    },
  ],
}
const Loading = () => (
  <div className=" flex gap-2">
    <Skeleton className="rounded-xl aspect-square w-8" />
    <div className="flex flex-col gap-2 justify-center">
      <Skeleton className="rounded-xl w-10 h-2" />
      <Skeleton className="rounded-xl w-16 h-2" />
    </div>
  </ div>
)


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [user, setUser] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | undefined>();

  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await userInfo();
      setUser(() => ({
        name: result?.name ?? "",
        email: result?.email ?? "",
        avatar: result?.image_url ?? "",
      }));
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <Loading />
        ) : user ? (
          <NavUser user={user} />
        ) : (
          <div>No user data available</div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
