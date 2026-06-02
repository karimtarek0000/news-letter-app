'use client'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useClerk } from '@clerk/nextjs'
import { History, Home, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from '../logo/Logo'

function DashboardHeader() {
  const pathname = usePathname()
  const { signOut } = useClerk()

  return (
    <div className="border-b bg-background/95 backdrop-blur">
      <div className="mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Logo />
          </div>

          <Button size="sm" onClick={() => signOut({ redirectUrl: '/sign-in' })}>
            <LogOut className="h-4 w-4" />
            <span className="sm:inline">Sign Out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
