import type { PropsWithChildren } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FeedFormProps extends PropsWithChildren {
  newFeedUrl: string
  setNewFeedUrl: (url: string) => void
  handleAddFeed: () => void
}

const FeedInput = ({ newFeedUrl, setNewFeedUrl, handleAddFeed, children }: FeedFormProps) => {
  return (
    <form action={handleAddFeed} className="grid gap-4 py-4">
      <div className="grid gap-2">
        <Label htmlFor="feed-url">RSS Feed URL</Label>
        <Input
          id="feed-url"
          type="text"
          placeholder="example.com/feed.xml or https://example.com/feed.xml"
          value={newFeedUrl}
          onChange={e => setNewFeedUrl(e.target.value)}
        />
      </div>

      {/* Footer */}
      {children}
    </form>
  )
}

export default FeedInput
