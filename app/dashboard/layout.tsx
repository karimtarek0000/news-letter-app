import type { ReactNode } from 'react'
import DashboardHeader from '../_components/dashboard/DashboardHeader'

async function Dashboardlayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen container mx-auto max-sm:px-5 flex flex-col">
      <DashboardHeader />
      <main className="mx-auto w-full mt-10">{children}</main>
    </div>
  )
}

export default Dashboardlayout
