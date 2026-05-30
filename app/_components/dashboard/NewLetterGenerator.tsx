import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import type { RssFeed } from '@/types'
import NewsletterForm from './NewsletterForm'

interface INewLetterGeneratorProps {
  feeds: RssFeed[]
}

export default async function NewLetterGenerator({ feeds }: INewLetterGeneratorProps) {
  if (!feeds.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Generate Newsletter</CardTitle>
          <CardDescription>Add RSS feeds first to generate newsletter</CardDescription>
        </CardHeader>
      </Card>
    )
  }
  return (
    <div>
      <NewsletterForm feeds={feeds} />
    </div>
  )
}
