import React from 'react'
import { Button } from './ui/button'
import { Menu, Search, Bell } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-800 to-gray-900 text-white shadow-md">
      <div className="flex items-center">
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        <h1 className="text-xl font-bold ml-4">FusionFlow</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Search className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        <UserButton afterSignOutUrl='/' />
      </div>
    </div>
  )
}

export default Navbar