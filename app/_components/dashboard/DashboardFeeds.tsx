import { auth } from '@clerk/nextjs/server'
import { createOrUpdateUser } from '@/actions/createOrUpdateUser'
import { getRssFeedsByUserId } from '@/actions/rss-feed'
import { Card } from '@/components/ui/card'
import AddFeedDialog from './AddFeedDialog'
import FeedHeader from './FeedHeader'
import FeedList from './FeedList'

async function DashboardFeeds() {
  const { userId, has } = await auth()

  const isPro = has({ plan: 'pro' })
  const feedLimit = isPro ? Infinity : 3

  const user = await createOrUpdateUser(userId as string)
  const feeds = await getRssFeedsByUserId(user?.id as string)

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
