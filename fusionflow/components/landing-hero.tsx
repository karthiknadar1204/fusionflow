"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FiCode, FiImage, FiMessageCircle, FiEdit } from "react-icons/fi";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ['latin'] });

export const LandingHero = () => {
  const { isSignedIn } = useAuth();

  return (
    <div className={`bg-[#020617] text-white min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden ${montserrat.className}`}>
      <div className="absolute inset-0 bg-[url('/nebula.svg')] opacity-20"></div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto text-center space-y-12 relative z-10"
      >
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight tracking-tighter">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 hover:from-blue-500 hover:via-indigo-600 hover:to-purple-700 transition-all duration-300">
            Fusion<span className="text-white hover:text-blue-200 transition-colors duration-300">Flow</span>
          </span>
        </h1>
        <p className="mt-6 text-2xl sm:text-3xl text-blue-200 font-light hover:text-blue-100 transition-colors duration-300">
          Seamlessly blend AI with your workflow
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {[
            { icon: FiMessageCircle, text: "AI Chat" },
            { icon: FiImage, text: "Image Gen" },
            { icon: FiCode, text: "Code Assist" },
            { icon: FiEdit, text: "Content Create" }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#0a1128] p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-[#0c1635] hover:-translate-y-2 group"
            >
              <feature.icon className="w-10 h-10 mb-4 mx-auto text-blue-400 group-hover:text-blue-300 group-hover:scale-110 transition-all duration-300" />
              <p className="text-lg font-medium text-blue-100 group-hover:text-white transition-colors duration-300">{feature.text}</p>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16"
        >
          <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
            <Button 
              variant="premium" 
              className="px-10 py-6 text-xl font-bold rounded-full bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
            >
              Explore FusionFlow
            </Button>
          </Link>
        </motion.div>
      </motion.div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#020617] to-transparent"></div>
    </div>
  );
};