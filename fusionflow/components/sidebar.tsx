"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Montserrat } from "next/font/google";
import {
  Code,
  ImageIcon,
  LayoutDashboard,
  MessageSquare,
  Music,
  Settings,
  VideoIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";

const montserrat = Montserrat({ weight: "600", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-blue-400",
  },
  {
    label: "Chat",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-purple-400",
  },
  {
    label: "Image Creator",
    icon: ImageIcon,
    color: "text-pink-400",
    href: "/image",
  },
  {
    label: "Video Maker",
    icon: VideoIcon,
    color: "text-orange-400",
    href: "/video",
  },
  {
    label: "Music Studio",
    icon: Music,
    color: "text-green-400",
    href: "/music",
  },
  {
    label: "Code Assistant",
    icon: Code,
    color: "text-yellow-400",
    href: "/code",
  },
  {
    label: "Preferences",
    icon: Settings,
    href: "/settings",
    color: "text-gray-400",
  },
];

const Sidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: {
  apiLimitCount: number;
  isPro: boolean;
}) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-800 to-gray-900">
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center mb-8">
          <h1 className={cn("text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600", montserrat.className)}>
            FusionFlow
          </h1>
        </Link>
        <nav className="space-y-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center p-3 rounded-xl transition-all duration-200 ease-in-out",
                pathname === route.href
                  ? "bg-white/10 shadow-lg"
                  : "hover:bg-white/5"
              )}
            >
              <route.icon className={cn("h-6 w-6 mr-4", route.color)} />
              <span className={cn("text-sm font-medium", pathname === route.href ? "text-white" : "text-gray-300")}>
                {route.label}
              </span>
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto">
        <FreeCounter apiLimitCount={apiLimitCount} isPro={isPro} />
      </div>
    </div>
  );
};

export default Sidebar;
