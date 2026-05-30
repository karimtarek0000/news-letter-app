'use client'
import { useClerk } from '@clerk/nextjs'
import { History, Home, LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

function DashboardHeader() {
  const pathname = usePathname()
  const { signOut } = useClerk()

  const navItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      href: '/dashboard/history',
      label: 'History',
      icon: History,
    },
    {
      href: '/dashboard/settings',
      label: 'Settings',
      icon: Settings,
    },
    {
      href: '/dashboard/account',
      label: 'Account',
      icon: User,
    },
  ]

  return (
    <div className="border-b bg-background/95 backdrop-blur ">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <span className="text-xl font-bold bg-linear-to-r from-emerald-600 to-emerald-100 bg-clip-text text-transparent">
                Feed Dashboard
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(item => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? 'secondary' : 'ghost'}
                      size="sm"
                      className={cn(
                        'gap-2 transition-all',
                        isActive &&
                          'bg-linear-to-r from-emerald to-emrald-600 text-emerald font-medium hover:from-wite-700 hover:to-emrald-700',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Button>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div>
            <Button size="sm" onClick={() => signOut({ redirectUrl: '/' })}>
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHeader
