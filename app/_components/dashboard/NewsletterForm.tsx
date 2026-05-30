'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useNewsletterGenerator } from '@/hooks/newsLetterGenerator'
import type { RssFeed } from '@/types'

interface INewsletterFormProps {
  feeds: RssFeed[]
}

export default function NewsletterForm({ feeds }: INewsletterFormProps) {
  const {
    selectedFeeds,
    isSelectedAll,
    selectedFeedsEmpty,
    remainingOf,
    handleToggleFeed,
    handleToggleSelectAndUnSelect,
    handleGenerate,
  } = useNewsletterGenerator(feeds)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Generate Newsletter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="flex items-center flex-col *:w-full justify-between">
            <div className="flex items-center justify-between grow">
              <Label className="text-base font-semibold">Select Feeds</Label>
              <Button onClick={handleToggleSelectAndUnSelect} variant="ghost">
                {isSelectedAll ? 'Unselect All' : 'Select All'}
              </Button>
            </div>

            <div className="border rounded-lg p-4 space-y-3 max-h-60 overflow-y-auto">
              {feeds.map(feed => {
                return (
                  <div key={feed.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={feed.id}
                      checked={selectedFeeds.includes(feed.id)}
                      onCheckedChange={() => handleToggleFeed(feed.id)}
                    />

                    <Label htmlFor={feed.id} className="text-sm font-normal cursor-pointer flex-1">
                      {feed.url || feed.title}
                    </Label>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-muted-foreground">{remainingOf}</p>

          <Button
            className="bg-linear-to-r  p-2 rounded-md"
            disabled={selectedFeedsEmpty}
            onClick={handleGenerate}
          >
            Generate Newsletter
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
