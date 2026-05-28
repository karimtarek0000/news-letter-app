import { createOrUpdateUser } from '@/actions/createOrUpdateUser'
import { getRssFeedsByUserId } from '@/actions/rss-feed'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { auth } from '@clerk/nextjs/server'
import { ExternalLink } from 'lucide-react'
import AddFeedDialog from './AddFeedDialog'

async function DashboardFeeds() {
  const { userId, has } = await auth()

  const isPro = await has({ plan: 'pro' })
  const feedLimit = isPro ? Infinity : 3

  const user = await createOrUpdateUser(userId as string)
  const feeds = await getRssFeedsByUserId(user.id)

  return (
    <Card className="transition-all hover:shadow-lg overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <CardTitle className="text-2xl">RSS Feeds</CardTitle>

            <CardDescription>Manage your RSS feed sources</CardDescription>
          </div>

          <AddFeedDialog currentFeedCount={feeds.length} feedLimit={feedLimit} isPro={isPro} />
        </div>
      </CardHeader>
      <CardContent>
        {feeds.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-muted-foreground">No RSS feeds added yet</div>
          </div>
        ) : (
          <div className="grid gap-4">
            {feeds?.map(feed => (
              <div
                className="border rounded-lg p-4 hover:bg-accent/50 hover:shadow-md transition-all overflow-hidden"
                key={feed.id}
              >
                <div className="flex items-start justify-between gap-2 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold truncate">{feed.title || 'Untitled Feed'}</h3>
                    </div>

                    <a
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-green -600 dark:hover:text-green-400 inline-flex items-center gap-1 mb-2 transition-colors max-w-full"
                      target="_blank"
                      href={feed.url}
                    >
                      <span className="truncate break-all">{feed.url}</span>
                      <ExternalLink className="h-3 w-3 shrink-0" />
                    </a>

                    {feed?.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2 ">
                        {feed.description}
                      </p>
                    )}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                      <span className="whitespace-nowrap">
                        {feed._count?.articles ?? 0} articles
                        {feed._count?.articles !== 1 ? 's' : ''}
                      </span>

                      {feed?.lastFetched && (
                        <span className="whitespace-nowrap">
                          Last fetched: {new Date(feed.lastFetched).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <DeleteFeedButton feedId={feed.id} feedTitle={feed.title || feed.url} />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default DashboardFeeds
