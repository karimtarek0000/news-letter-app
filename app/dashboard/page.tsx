import { auth } from '@clerk/nextjs/server'
import { getRssFeedsByUserId } from '@/actions/rss-feed'
import { createOrUpdateUser } from '@/actions/user/user'
import DashboardFeeds from '../_components/dashboard/DashboardFeeds'
import NewLetterGenerator from '../_components/dashboard/NewLetterGenerator'

export default async function Page() {
  const { userId, has } = await auth()

  const isPro = has({ plan: 'pro' })
  const feedLimit = isPro ? Infinity : 3

  const user = await createOrUpdateUser(userId as string)
  const feeds = await getRssFeedsByUserId(user?.id as string)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <div>
        <DashboardFeeds feeds={feeds} feedLimit={feedLimit} isPro={isPro} />
      </div>
      <div>
        <NewLetterGenerator feeds={feeds} />
      </div>
    </div>
  )
}
