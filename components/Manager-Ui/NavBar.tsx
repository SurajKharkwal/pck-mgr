"use client"
import { Package, Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { useRouter } from 'nextjs-toploader/app';
import { cn } from "@/lib/utils";

export default function ManagerNavBar() {
  const router = useRouter()
  return <nav className=" flex items-center justify-center w-full p-4">
    <section className=" flex items-center justify-center max-md:hidden h-full">
      <Package size={30} strokeWidth={1.2} />
      <h1 className="font-semibold text-[1.4rem] ">Package Manager</h1>
    </section>
    <section className="flex ml-auto justify-center ">
      <DropdownMenu>
        <Link href={"#"} className={cn(buttonVariants({ variant: "link" }), "max-md:hidden")}>DashBoard</Link>
        <DropdownMenuTrigger asChild><Menu className="hover:bg-slate-800/50 rounded-lg p-1" size={40} /></DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel >Menu</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => router.push("/Manager/Profile")}>Profile</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/Manager/DashBoard")}>DashBoard</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/Manager/Notification")}>Notification</DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/Manager/qr-code")}>OR-Code</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  </nav>
}
