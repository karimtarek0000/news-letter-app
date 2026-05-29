import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import CTAButtons from '../buttons/CTAButtons'

function Hero() {
  return (
    <header className=" overflow-hidden bg-linear-to-b from-white to-emerald-50 dark:from-black dark:to-gray-950 ">
      {/* Background decoration */}

      <div className=" inset-0 bg-[radial-gradient(circle_at_top_left,#00b8940f,transparent_60%),radial-gradient(circle_at_bottom_right,#00cec90f,transparent_60%)] p-7">
        <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mx-auto max-w-3xl text-center">
            {/* Badge */}
            <Badge
              variant="secondary"
              className="mb-6 px-4 py-1.5 bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
            >
              <Sparkles className="mr-2 size-4 text-emerald-600 dark:text-emerald-300" />
              Smart AI Newsletter Builder
            </Badge>

            {/* Headline */}
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl leading-tight">
              Build Your Newsletters in{' '}
              <span className="bg-linear-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent">
                With AI Immediately
              </span>
            </h1>

            {/* Subheading */}
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400 sm:text-xl ">
              AI automatically turns your RSS feeds into polished newsletters with refined titles,
              summaries, and full content structure.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButtons />
            </div>

            {/* Social Proof */}
            <p className="mt-8 text-sm text-gray-500 dark:text-gray-400">
              Trusted by 1,000+ creators · Save up to 5 hours weekly · Starting at $9/mo
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Hero
