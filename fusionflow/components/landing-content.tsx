"use client";

import { motion } from "framer-motion";
import { FiMessageCircle, FiImage, FiCode, FiLayers } from "react-icons/fi";

const features = [
  {
    icon: FiMessageCircle,
    title: "AI-Powered Conversations",
    description: "Engage in natural language conversations with our advanced AI models.",
  },
  {
    icon: FiImage,
    title: "Image Generation",
    description: "Create stunning visuals with our state-of-the-art image generation capabilities.",
  },
  {
    icon: FiCode,
    title: "Code Assistance",
    description: "Get help with coding tasks and debugging from our intelligent code assistant.",
  },
  {
    icon: FiLayers,
    title: "Multi-Modal Integration",
    description: "Seamlessly combine text, image, and code functionalities in one platform.",
  },
];

export const LandingContent = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-20 bg-[#020617]">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-4xl sm:text-5xl font-extrabold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600"
      >
        Key Features
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#0a1128] p-6 rounded-xl shadow-lg transition-all duration-500 ease-in-out group hover:bg-[#0c1635] hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
          >
            <item.icon className="w-12 h-12 mb-6 text-blue-400 transition-all duration-500 ease-in-out group-hover:text-blue-300 group-hover:rotate-12 transform" />
            <h3 className="text-xl font-bold mb-3 text-blue-100 transition-all duration-500 ease-in-out group-hover:text-white">{item.title}</h3>
            <p className="text-sm text-blue-200 font-light transition-all duration-500 ease-in-out group-hover:text-blue-100 group-hover:font-normal">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}