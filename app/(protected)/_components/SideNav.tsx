"use client";

import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, ShieldPlusIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export function SideNav() {
  const pathname = usePathname();
  const menuOptions = [
    {
      id: 1,
      label: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      id: 2,
      label: "Create New",
      path: "/create-new",
      icon: VideoIcon,
    },
    {
      id: 3,
      label: "Upgrade",
      path: "/upgrade",
      icon: ShieldPlusIcon,
    },
  ];
  return (
    <div className="hidden md:flex min-h-screen border-r bg-muted/40 flex-col px-5 pt-5 gap-3">
      {menuOptions.map((menu) => (
        <Link
          key={menu.id}
          href={menu.path}
          className={cn(
            pathname === menu.path
              ? "text-primary bg-primary/10"
              : "text-muted-foreground hover:text-foreground",
            "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary"
          )}
        >
          <menu.icon className="size-4" />
          {menu.label}
        </Link>
      ))}
    </div>
  );
}
