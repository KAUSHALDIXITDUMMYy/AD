"use client"

import { useState, useEffect } from "react"

export default function AnimatedTitle() {
  const [showMorphed, setShowMorphed] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMorphed((prev) => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative h-24 flex items-center justify-center">
      {/* Happy Birthday text */}
      <div
        className={`absolute text-5xl md:text-6xl font-bold text-primary transition-all duration-500 ${
          !showMorphed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          fontFamily: "'Playfair Display', serif",
          transformStyle: "preserve-3d",
        }}
      >
        Happy Birthday
      </div>

      {/* I Love You text */}
      <div
        className={`absolute text-5xl md:text-6xl font-bold text-primary transition-all duration-500 ${
          showMorphed ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
        style={{
          fontFamily: "'Playfair Display', serif",
          transformStyle: "preserve-3d",
        }}
      >
        I Love You
      </div>
    </div>
  )
}
