import Link from 'next/link'

const Logo = () => {
  return (
    <Link href="/dashboard" className="flex items-center gap-2">
      <span className="text-3xl font-bold bg-linear-to-r from-emerald-600 to-emerald-100 bg-clip-text text-transparent">
        Feed Dashboard
      </span>
    </Link>
  )
}

export default Logo
