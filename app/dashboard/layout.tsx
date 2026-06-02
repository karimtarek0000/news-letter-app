import type { ReactNode } from 'react'
import DashboardHeader from '../_components/dashboard/DashboardHeader'

async function Dashboardlayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />
      <main className="mx-auto mt-10 w-full md:w-300">{children}</main>
    </div>
  )
}

export default Dashboardlayout
