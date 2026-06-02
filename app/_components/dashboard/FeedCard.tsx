import type { RssFeed } from '@/types'
import { ExternalLink } from 'lucide-react'
import { type PropsWithChildren } from 'react'
import DeleteFeedButton from './DeleteFeedButton'

const Description = ({ description }: { description: string | null }) => {
  return (
    description && <p className="text-sm text-muted-foreground line-clamp-2 mb-2 ">{description}</p>
  )
}

const LastFetched = ({ lastFetched }: { lastFetched: Date | null }) => {
  return (
    lastFetched && (
      <span className="whitespace-nowrap">
        Last fetched: {new Date(lastFetched).toLocaleDateString()}
      </span>
    )
  )
}

const ArticleCount = ({ count }: { count: number | undefined }) => {
  return (
    <span className="whitespace-nowrap">
      {count ?? 0} article
      {count !== 1 ? 's' : ''}
    </span>
  )
}

interface FeedCardProps extends PropsWithChildren {
  feed: RssFeed
}

const FeedCard = ({ feed }: FeedCardProps) => {
  return (
    <section
      className="border rounded-lg p-4 hover:bg-accent/50 hover:shadow-md transition-all overflow-hidden"
      key={feed.id}
    >
      <div className="flex items-start justify-between gap-2 sm:gap-4">
        <div className="flex-1 min-w-0">
          {/* Feed Title */}
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">{feed.title || 'Untitled Feed'}</h3>
          </div>
          {/* Feed Link */}
          <a
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-green -600 dark:hover:text-green-400 inline-flex items-center gap-1 mb-2 transition-colors max-w-full"
            target="_blank"
            href={feed.url}
          >
            <span className="truncate break-all">{feed.url}</span>
            <ExternalLink className="h-3 w-3 shrink-0" />
          </a>

          {/* Feed Description */}
          <Description description={feed.description} />
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            {/* Count of articles */}
            <ArticleCount count={feed._count?.articles} />

            {/* Feed Last fetched */}
            <LastFetched lastFetched={feed.lastFetched} />
          </div>
        </div>

        {/* Delete card */}
        <DeleteFeedButton feedId={feed.id} />
      </div>
    </section>
  )
}

export default FeedCard
