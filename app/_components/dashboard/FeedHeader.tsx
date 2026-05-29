import type { ReactNode } from 'react'
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const FeedHeader = ({ children }: { children: ReactNode }) => {
  return (
    <CardHeader>
      <div className="flex flex-row items-center justify-between">
        <div className="min-w-0 flex-1">
          <CardTitle className="text-2xl">RSS Feeds</CardTitle>
          <CardDescription>Manage your RSS feed sources</CardDescription>
        </div>

        {children}
      </div>
    </CardHeader>
  )
}

export default FeedHeader
