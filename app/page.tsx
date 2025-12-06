"use client"

import { useState, useEffect } from "react"
import Hero from "@/components/hero"
import PhotoCollage from "@/components/photo-collage"
import Timeline from "@/components/timeline"
import Message from "@/components/message"
import Countdown from "@/components/countdown"
import GiftBox from "@/components/gift-box"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      <Hero />
      <Countdown />
      <PhotoCollage />
      <GiftBox />
      <Timeline />
      <Message />
    </main>
  )
}
