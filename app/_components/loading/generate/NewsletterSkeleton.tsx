const NewsletterSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 animate-pulse p-6 border rounded-xl bg-white dark:bg-neutral-900 shadow-sm">
      <div className="h-6 w-40 bg-gray-300 dark:bg-neutral-700 rounded"></div>
      <div className="h-4 w-full bg-gray-200 dark:bg-neutral-800 rounded"></div>
      <div className="h-4 w-5/6 bg-gray-200 dark:bg-neutral-800 rounded"></div>
      <div className="h-4 w-4/6 bg-gray-200 dark:bg-neutral-800 rounded"></div>
      <div className="flex justify-center pt-6">
        <div className="h-8 w-8 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

export default NewsletterSkeleton
