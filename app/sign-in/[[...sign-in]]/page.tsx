import Logo from '@/app/_components/logo/Logo'
import { SignIn } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default async function Page() {
  const { userId } = await auth()

  if (userId) {
    redirect('/dashboard')
  }

  return (
    <div className="flex flex-col justify-center space-y-5 mx-auto h-screen w-full items-center">
      <Logo />

      <div className="min-h-125">
        <SignIn />
      </div>
    </div>
  )
}
