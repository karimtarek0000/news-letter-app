import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-xl w-full text-center py-16">
        <div className="text-6xl font-extrabold text-gray-800 mb-4">404</div>
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">Page Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md shadow"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
