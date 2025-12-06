"use client"

import { useEffect, useState } from "react"
import AnimatedTitle from "./animated-title"

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative hearts */}
        <div className="flex justify-center gap-4 mb-8">
          <span className="text-4xl animate-pulse-heart" style={{ animationDelay: "0s" }}>
            💕
          </span>
          <span className="text-4xl animate-pulse-heart" style={{ animationDelay: "0.3s" }}>
            ✨
          </span>
          <span className="text-4xl animate-pulse-heart" style={{ animationDelay: "0.6s" }}>
            💕
          </span>
        </div>

        <AnimatedTitle />

        <p
          className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Today marks the first birthday I get to celebrate with you. From that perfect moment we first saw each other,
          to today—every coincidence was fate leading us here.
        </p>

        <p
          className={`text-lg md:text-xl text-muted-foreground mb-12 font-light transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          December 7, 2025 | Forever grateful for us 💫
        </p>

        {/* Scroll indicator */}
        <div className="animate-bounce mt-12">
          <svg className="w-6 h-6 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
