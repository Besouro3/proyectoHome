import { Sun, Moon } from 'lucide-react'

export default function Skeleton({ className = '', variant = 'rect', count = 1 }) {
  const base = 'animate-pulse rounded bg-gray-200 dark:bg-gray-700'

  const variants = {
    rect: 'h-4',
    card: 'h-24 rounded-xl',
    chart: 'h-48 rounded-xl',
    table: 'h-10',
    circle: 'h-10 w-10 rounded-full',
    kpi: 'h-28 rounded-xl'
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`${base} ${variants[variant] || variants.rect}`} />
      ))}
    </div>
  )
}

export function PageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="h-7 w-48 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-4 w-64 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-28 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="h-64 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
        <div className="h-64 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
      <div className="h-48 animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
    </div>
  )
}
