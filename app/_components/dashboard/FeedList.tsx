import { CardContent } from '@/components/ui/card'
import type { RssFeed } from '@/types'
import FeedCard from './FeedCard'

const FeedsNotFound = () => {
  return (
    <div className="text-center py-12">
      <div className="text-muted-foreground">No RSS feeds added yet</div>
    </div>
  )
}

interface FeedListProps {
  feeds: RssFeed[]
}

const FeedList = ({ feeds }: FeedListProps) => {
  if (!feeds.length) {
    return <FeedsNotFound />
  }

  return (
    <CardContent>
      <section className="grid gap-4">
        {feeds.map(feed => (
          <FeedCard key={feed.id} feed={feed} />
        ))}
      </section>
    </CardContent>
  )
}

export default FeedList
