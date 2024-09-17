"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CodeIcon,
  ImageIcon,
  MessageSquare,
  MusicIcon,
  VideoIcon,
} from "lucide-react";
import React from "react";
import { Heading } from "@/components/Heading";

const tools = [
  {
    label: "AI Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation",
    description: "Engage in intelligent conversations with our advanced AI.",
  },
  {
    label: "Music Generation",
    icon: MusicIcon,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    href: "/music",
    description: "Create unique melodies and compositions with AI assistance.",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    href: "/image",
    description:
      "Transform your ideas into stunning visuals with AI-powered image creation.",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    href: "/video",
    description: "Bring your stories to life with AI-generated video content.",
  },
  {
    label: "Code Generation",
    icon: CodeIcon,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    href: "/code",
    description:
      "Accelerate your development with AI-assisted code generation.",
  },
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="flex-grow flex flex-col">
        <div className="mt-8">
          <Heading
            title="AI Innovation Hub"
            description="Unleash the potential of cutting-edge AI technologies"
            icon={CodeIcon}
            iconColor="text-blue-500"
            bgColor="bg-blue-500/10"
          />
        </div>
        <div className="flex-grow flex items-center justify-center pb-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <Card
                  onClick={() => router.push(tool.href)}
                  key={tool.href}
                  className="bg-gray-800 border-2 border-gray-700 hover:border-blue-500 transition-all duration-300 rounded-xl overflow-hidden cursor-pointer group"
                >
                  <div className="p-6 flex flex-col h-full">
                    <div
                      className={cn(
                        "p-3 w-fit rounded-full mb-4",
                        tool.bgColor
                      )}
                    >
                      <tool.icon className={cn("w-8 h-8", tool.color)} />
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors">
                      {tool.label}
                    </h3>
                    <p className="text-gray-400 flex-grow mb-4">
                      {tool.description}
                    </p>
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => router.push(tool.href)}
                    >
                      Explore <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
