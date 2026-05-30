import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import type { RssFeed } from '@/types'

export const useNewsletterGenerator = (feeds: RssFeed[]) => {
  const router = useRouter()
  const [selectedFeeds, setSelectedFeeds] = useState<string[]>([])
  const isSelectedAll = feeds.length === selectedFeeds.length
  const selectedFeedsEmpty = !selectedFeeds.length
  const remainingOf = `${selectedFeeds.length} of ${feeds.length} feeds selected`

  const handleSelectAllFeeds = () => {
    setSelectedFeeds(feeds.map(feed => feed.id))
  }

  const handleUnSelectAll = () => {
    setSelectedFeeds([])
  }

  const handleToggleFeed = (feedId: string) => {
    const fn = (prev: string[]) =>
      prev.includes(feedId) ? prev.filter(id => id !== feedId) : [...prev, feedId]
    setSelectedFeeds(fn)
  }

  const handleToggleSelectAndUnSelect = () => {
    if (isSelectedAll) {
      return handleUnSelectAll()
    }
    return handleSelectAllFeeds()
  }

  const handleGenerate = () => {
    if (!selectedFeeds.length) {
      toast.error('Please select at least one RSS feed')
    }

    const params = new URLSearchParams({
      feedIds: JSON.stringify(selectedFeeds),
    })

    router.push(`/dashboard/generate?${params.toString()}`)
  }

  useEffect(() => {
    setSelectedFeeds(feeds.map(feed => feed.id))
  }, [feeds])

  return {
    selectedFeeds,
    isSelectedAll,
    selectedFeedsEmpty,
    remainingOf,
    handleToggleFeed,
    handleToggleSelectAndUnSelect,
    handleGenerate,
  }
}
