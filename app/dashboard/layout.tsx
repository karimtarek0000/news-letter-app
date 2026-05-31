import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import type { ReactNode } from 'react'
import DashboardHeader from '../_components/dashboard/DashboardHeader'

async function Dashboardlayout({ children }: { children: ReactNode }) {
  const { has } = await auth()
  const hasPaidPlan = has({ plan: 'pro' }) || has({ plan: 'starter' })

  // if (!hasPaidPlan) {
  //   redirect('/#pricing')
  // }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="mx-auto mt-10 w-full md:w-300">{children}</main>
    </div>
  )
}

export default Dashboardlayout
