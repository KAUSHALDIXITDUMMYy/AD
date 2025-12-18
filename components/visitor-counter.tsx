"use client"

import { useState, useEffect } from "react"
import { Users } from "lucide-react"

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Track this visit
    const trackVisit = async () => {
      try {
        const response = await fetch('/api/visitors', {
          method: 'POST',
        })
        const data = await response.json()
        if (data.success) {
          setCount(data.count)
        }
      } catch (error) {
        console.error('Error tracking visit:', error)
      } finally {
        setIsLoading(false)
      }
    }

    trackVisit()
  }, [])

  if (isLoading) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
        <Users size={16} className="text-gray-600" />
        <span className="text-sm font-semibold text-gray-600">...</span>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-full px-4 py-2 shadow-lg flex items-center gap-2 animate-fade-in">
      <Users size={16} className="text-green-600" />
      <span className="text-sm font-semibold text-gray-700">
        {count?.toLocaleString() || 0} {count === 1 ? 'visit' : 'visits'}
      </span>
    </div>
  )
}

