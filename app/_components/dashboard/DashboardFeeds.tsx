import { Card } from '@/components/ui/card'
import type { RssFeed } from '@/types'
import AddFeedDialog from './AddFeedDialog'
import FeedHeader from './FeedHeader'
import FeedList from './FeedList'

interface IDashboardFeedsProps {
  feeds: RssFeed[]
  feedLimit: number
  isPro: boolean
}

async function DashboardFeeds({ feeds, feedLimit, isPro }: IDashboardFeedsProps) {
  return (
    <Card className="transition-all hover:shadow-lg overflow-hidden">
      <FeedHeader>
        <AddFeedDialog currentFeedCount={feeds.length} feedLimit={feedLimit} isPro={isPro} />
      </FeedHeader>
      <FeedList feeds={feeds} />
    </Card>
  )
}

export default DashboardFeeds
