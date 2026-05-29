import { CardContent } from '@/components/ui/card'
import type { RssFeed } from '@/types'
import DeleteFeedButton from './DeleteFeedButton'
import FeedCard from './FeedCard'

const FeedsNotFound = () => {
  return (
    <div className="text-center py-12">
      <div className="text-muted-foreground">No RSS feeds added yet</div>
    </div>
  )
}

const FeedList = ({ feeds }: { feeds: RssFeed[] }) => {
  if (!feeds.length) {
    return <FeedsNotFound />
  }

  return (
    <CardContent>
      <section className="grid gap-4">
        {feeds.map(feed => (
          <FeedCard key={feed.id} feed={feed}>
            <DeleteFeedButton feedId={feed.id} feedTitle={feed.title || feed.url} />
          </FeedCard>
        ))}
      </section>
    </CardContent>
  )
}

export default FeedList
