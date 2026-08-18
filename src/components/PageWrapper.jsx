import { useState, useEffect } from 'react'
import { PageSkeleton } from './Skeleton'

export default function PageWrapper({ children, delay = 500 }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (loading) return <PageSkeleton />
  return <div className="animate-fade-in">{children}</div>
}
