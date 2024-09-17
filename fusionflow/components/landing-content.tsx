"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    title: "AI-Powered Conversations",
    description: "Engage in natural language conversations with our advanced AI models.",
  },
  {
    title: "Image Generation",
    description: "Create stunning visuals with our state-of-the-art image generation capabilities.",
  },
  {
    title: "Code Assistance",
    description: "Get help with coding tasks and debugging from our intelligent code assistant.",
  },
  {
    title: "Multi-Modal Integration",
    description: "Seamlessly combine text, image, and code functionalities in one platform.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Key Features</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {features.map((item) => (
          <Card key={item.title} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="text-lg mb-2">{item.title}</CardTitle>
              <CardContent className="pt-2 px-0 text-sm text-zinc-400">
                {item.description}
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}