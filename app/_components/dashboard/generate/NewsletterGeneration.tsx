'use client'

import { experimental_useObject as useObject } from '@ai-sdk/react'
import { Sparkles } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'sonner'
import { saveGeneratedNewsletter } from '@/actions/saveGeneratedNewsletter'
import { type GeneratedNewsletter, newsLetterSchema } from '@/validations'
import NewsletterDisplay from './NewsletterDisplay'

const NewsletterGeneration = () => {
  const searchParams = useSearchParams()
  const feedIds = searchParams.get('feedIds')
  const [articleCounts, setArticleCounts] = useState(0)
  const hasStartedRef = useRef(false)

  let params: { feedIds: string[] } = null

  if (feedIds) {
    params = { feedIds: JSON.parse(feedIds) }
  }

  const { object, submit, isLoading } = useObject({
    api: '/api/newsletter/generate-stream',
    schema: newsLetterSchema,
  })

  const newsletter = object as Partial<GeneratedNewsletter> | undefined

  const handleSave = async () => {
    if (!params || !newsletter) return

    try {
      await saveGeneratedNewsletter({
        newsletter: newsletter as GeneratedNewsletter,
        feedIds: params.feedIds,
      })

      toast.success('Newsletter saved to history')
    } catch (error) {
      console.log(error)
      toast.error('Failed to save newsletter')
    }
  }

  useEffect(() => {
    if (!params || hasStartedRef.current) return

    hasStartedRef.current = true

    const startGeneration = async () => {
      try {
        const res = await fetch('/api/newsletter/prepare', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        })

        if (!res.ok) {
          throw new Error('Error....')
        }

        // submit(params)
      } catch (error) {
        console.log(error)
      }
    }

    startGeneration()
  }, [params, submit])

  useEffect(() => {
    if (!isLoading && newsletter?.body && articleCounts > 0) {
      toast.success(`Newsletter generated from ${articleCounts} articles`)
    }
  }, [isLoading, newsletter?.body, articleCounts])

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-gray-50">
      <div className="mx-auto py-12 px-6 lg:px-8 space-y-8">
        <header className="p-3 capitalize">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            newsletter generation
          </h1>

          {isLoading && (
            <div className="flex items-center gap-2 text-base">
              <div className="inline-flex size-8 items-center justify-center rounded-md bg-linear-to-br from-emerald-600 to-emerald-600 text-white animate-pulse">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-medium">generate newsletter...</span>
            </div>
          )}

          {isLoading && !newsletter?.body && (
            <div className="flex flex-col gap-4 animate-pulse p-6 border rounded-xl bg-white dark:bg-neutral-900 shadow-sm">
              <div className="h-6 w-40 bg-gray-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-neutral-800 rounded"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-neutral-800 rounded"></div>
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-neutral-800 rounded"></div>

              <div className="flex justify-center pt-6">
                <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              </div>
            </div>
          )}

          {newsletter?.body && (
            <NewsletterDisplay
              newsletter={newsletter}
              onSave={handleSave}
              isGenerating={isLoading}
            />
          )}
        </header>
      </div>
    </div>
  )
}

export default NewsletterGeneration
