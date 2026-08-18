import { useState, useEffect, useRef } from 'react'

export default function KpiCard({ icon: Icon, label, value, sub, color = 'brand', index = 0 }) {
  const [displayValue, setDisplayValue] = useState(0)
  const [isString, setIsString] = useState(false)
  const [prefix, setPrefix] = useState('')
  const [suffix, setSuffix] = useState('')
  const animRef = useRef(null)

  const colors = {
    brand: 'bg-brand-50 text-brand-600',
    success: 'bg-success-50 text-success-600',
    danger: 'bg-danger-50 text-danger-600',
    warning: 'bg-warning-50 text-warning-600'
  }

  useEffect(() => {
    const raw = String(value)

    if (typeof value === 'string') {
      const matchNum = raw.match(/^([^0-9]*)([0-9.]+)(.*)$/)
      if (matchNum) {
        setIsString(true)
        setPrefix(matchNum[1])
        setSuffix(matchNum[3])
        animateNumber(parseFloat(matchNum[2]))
      } else {
        setIsString(true)
        setDisplayValue(raw)
      }
    } else {
      setIsString(false)
      animateNumber(Number(value) || 0)
    }

    return () => { if (animRef.current) cancelAnimationFrame(animRef.current) }
  }, [value])

  function animateNumber(target) {
    const duration = 600
    const start = performance.now()
    const from = 0

    function tick(now) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (target - from) * eased

      setDisplayValue(Number.isInteger(target) ? Math.round(current) : current.toFixed(1))

      if (progress < 1) {
        animRef.current = requestAnimationFrame(tick)
      }
    }

    animRef.current = requestAnimationFrame(tick)
  }

  const rendered = isString ? `${prefix}${displayValue}${suffix}` : displayValue

  return (
    <div
      className={`bg-surface-card rounded-xl border border-border p-4 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 animate-slide-up stagger-${Math.min(index + 1, 8)}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-text-secondary font-medium">{label}</p>
          <p className="text-2xl font-bold mt-1">{rendered}</p>
          {sub && <p className="text-xs text-text-secondary mt-1">{sub}</p>}
        </div>
        <div className={`p-2.5 rounded-lg ${colors[color]}`}>
          <Icon size={20} />
        </div>
      </div>
    </div>
  )
}
