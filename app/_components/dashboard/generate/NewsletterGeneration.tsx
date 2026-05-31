'use client'

import { useNewsLetterGeneration } from '@/hooks/newsLetterGeneration'
import NewletterGenerateSkeleton from '../../loading/generate/NewletterGenerateSkeleton'
import NewsletterSkeleton from '../../loading/generate/NewsletterSkeleton'
import LoadingRender from '../../loading/LoadingRender'
import Newsletter from './Newsletter'

const NewsletterGeneration = () => {
  const { newsletter, isLoading, handleSaveNewsLetter } = useNewsLetterGeneration()

  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50 dark:from-black dark:to-gray-50">
      <div className="mx-auto py-12 px-6 lg:px-8 space-y-8">
        <header className="p-3 capitalize">
          <h1 className="text-3xl font-bold mb-3 tracking-tight text-gray-900 dark:text-white">
            newsletter generation
          </h1>

          <LoadingRender isLoading={isLoading} loadingComponent={NewletterGenerateSkeleton} />

          <LoadingRender
            isLoading={isLoading && !newsletter?.body}
            loadingComponent={NewsletterSkeleton}
          >
            {newsletter?.body && (
              <Newsletter
                newsletter={newsletter}
                onSave={handleSaveNewsLetter}
                isGenerating={isLoading}
              />
            )}
          </LoadingRender>
        </header>
      </div>
    </div>
  )
}

export default NewsletterGeneration
