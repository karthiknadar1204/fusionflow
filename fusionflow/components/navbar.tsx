import React from 'react'
import { Button } from './ui/button'
import {Menu} from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import MobileSidebar from './mobile-sidebar'
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const Navbar = async() => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4">
        {/* <Button variant="ghost" size="icon" className='md:hidden'  >
            <Menu/>
        </Button> */}
        <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
        <div className='flex w-full justify-end' >
            <UserButton afterSignOutUrl='/' />

        </div>
    </div>
  )
}

export default Navbar