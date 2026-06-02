'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: VoidFunction
}) {
  return (
    <html>
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="flex min-h-screen flex-col items-center justify-center px-6 py-12">
          <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-md">
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-sky-400">
              Something went wrong
            </p>
            <h2 className="mb-6 text-3xl font-semibold text-white">{error.message}</h2>
            <p className="mb-8 text-sm leading-6 text-slate-400">
              Please refresh the page or try again. If the problem persists, check the console for
              more details.
            </p>
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-medium text-white transition-colors duration-200 hover:bg-sky-400"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
