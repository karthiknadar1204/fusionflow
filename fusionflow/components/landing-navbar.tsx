"use client";

import { Montserrat } from "next/font/google";
import Image from "next/image"
import Link from "next/link"
import { useAuth } from "@clerk/nextjs";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const font = Montserrat({ weight: '600', subsets: ['latin'] });

export const LandingNavbar = () => {
  const { isSignedIn } = useAuth();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-4 md:p-6 bg-[#020617] bg-opacity-90 backdrop-blur-lg flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-lg"
    >
      <Link href="/" className="flex items-center group">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
          className="relative h-12 w-12 mr-4"
        >
          {/* <Image fill alt="Logo" src="/logo.png" className="rounded-full" /> */}
        </motion.div>
        <h1 className={cn("text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 group-hover:from-blue-500 group-hover:via-indigo-600 group-hover:to-purple-700 transition-all duration-300", font.className)}>
          FusionFlow
        </h1>
      </Link>
      <div className="flex items-center gap-x-4">
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button 
            variant="premium" 
            className="rounded-full px-6 py-2 text-lg font-semibold bg-gradient-to-r from-gray-800 via-gray-900 to-black text-blue-300 hover:text-blue-200 hover:from-gray-900 hover:via-black hover:to-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 border border-blue-500 hover:border-blue-400"
          >
            Get Started
          </Button>
        </Link>
      </div>
    </motion.nav>
  )
}