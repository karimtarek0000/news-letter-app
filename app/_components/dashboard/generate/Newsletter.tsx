'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { GeneratedNewsletter } from '@/validations'
import { useAuth } from '@clerk/nextjs'
import { Save } from 'lucide-react'
import { use, useEffect, useState } from 'react'

interface NewsletterDisplayProps {
  newsletter: Partial<GeneratedNewsletter>
  onSave: () => Promise<void>
  isGenerating?: boolean
}

const RenderList = ({
  title,
  items,
  isGenerating = false,
}: {
  title: string
  items?: string[]
  isGenerating: boolean
}) => (
  <div className="space-y-3">
    <h2 className="font-semibold text-lg">{title}</h2>

    <div className="border rounded-md p-4 space-y-3 min-h-30">
      {!items || items.length === 0 ? (
        <p className="text-sm italic text-muted-foreground">
          {isGenerating ? 'Loading…' : 'No data available'}
        </p>
      ) : (
        items.map((item, i) => (
          <div key={`${i + 1}`} className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">{i + 1}.</span>
            <p className="flex-1">{item}</p>
          </div>
        ))
      )}
    </div>
  </div>
)

const Newsletter = ({ newsletter, onSave, isGenerating = false }: NewsletterDisplayProps) => {
  const { has } = useAuth()
  const [isPro, setIsPro] = useState(false)
  const proStatus = has({ plan: 'pro' })

  useEffect(() => {
    const checkPlan = () => {
      if (has) {
        const proStatus = has({ plan: 'pro' })
        setIsPro(proStatus)
        console.log('Pro status: ', proStatus)
      }
    }

    checkPlan()
  }, [has])

  return (
    <Card>
      <CardHeader>
        <div>
          {isPro && (
            <Button
              variant="outline"
              size="sm"
              onClick={onSave}
              disabled={isGenerating}
              className="hover:bg-blue-50 dark:hover:bg-blue-950 transition-all"
            >
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <RenderList
            title="Newsletter Title Options"
            items={newsletter?.suggestedTitles}
            isGenerating={isGenerating}
          />
          <RenderList
            title="Email Subject Line Options"
            items={newsletter?.suggestedSubjectLines}
            isGenerating={isGenerating}
          />
        </div>

        {/* Newsletter Body */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Newsletter Body</h2>
          <div className="border rounded-md p-6 prose dark:prose-invert min-h-50">
            {newsletter?.body ? (
              <p>{newsletter?.body}</p>
            ) : (
              <p className="italic text-muted-foreground">
                {isGenerating ? 'Generating body…' : 'No content available'}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default Newsletter
