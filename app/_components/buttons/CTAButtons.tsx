import { Button } from '@/components/ui/button'
import { Show, SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

async function CTAButtons() {
  const { has, userId } = await auth()
  const hasPaidPlan = has({ plan: 'pro' }) || has({ plan: 'starter' })

  return (
    <>
      <Show when="signed-in">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/dashboard" className="flex items-center justify-center">
            Go to Dashboard <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </Show>

      <Show when="signed-out">
        <Button size="lg" className="w-full sm:w-auto" asChild>
          <Link href="/sign-in" className="flex items-center justify-center">
            Get started <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </Show>
    </>
  )
}

export default CTAButtons
