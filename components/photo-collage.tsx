"use client"

import { useState, useEffect } from "react"

const photos = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/527329529_1491583078795343_1066919040650556249_n_1542662943364485-IELKwKmmmvsDs2QadyUQAElsnp0HQQ.mp4",
    type: "video",
    title: "Our Random Moments",
  },
  {
    src: "/images/img20250908193733.jpg",
    type: "image",
    title: "Smiles & Love",
  },
  {
    src: "/images/522407160-772052902142236-1414598557830135874-n-772052898808903.jpg",
    type: "image",
    title: "Beautiful Moments",
  },
  {
    src: "/images/514806063-1322382462812574-1197999321882382433-n-1322382459479241.jpg",
    type: "image",
    title: "Us Together",
  },
  {
    src: "/images/img-20250725-wa0003.jpg",
    type: "image",
    title: "With Friends",
  },
  {
    src: "/images/img-20250911-043923.jpg",
    type: "image",
    title: "Perfect Moment",
  },
]

export default function PhotoCollage() {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const interval = setInterval(() => {
      setSelectedIndex((prev) => (prev + 1) % photos.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [autoPlay])

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Our Beautiful Memories
        </h2>

        {/* Featured photo */}
        <div
          className="mb-12 rounded-2xl overflow-hidden shadow-2xl bg-card border border-primary/10"
          onMouseEnter={() => setAutoPlay(false)}
          onMouseLeave={() => setAutoPlay(true)}
        >
          {photos[selectedIndex].type === "video" ? (
            <video
              src={photos[selectedIndex].src}
              className="w-full h-96 md:h-[500px] object-cover"
              controls
              autoPlay
              muted
            />
          ) : (
            <img
              src={photos[selectedIndex].src || "/placeholder.svg"}
              alt={photos[selectedIndex].title}
              className="w-full h-96 md:h-[500px] object-cover"
            />
          )}
        </div>

        {/* Photo title and description */}
        <div className="text-center mb-12">
          <h3
            className="text-2xl md:text-3xl font-bold text-foreground mb-2"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {photos[selectedIndex].title}
          </h3>
        </div>

        {/* Thumbnail carousel */}
        <div className="flex gap-3 overflow-x-auto pb-4 justify-center flex-wrap">
          {photos.map((photo, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedIndex(index)
                setAutoPlay(false)
              }}
              className={`relative rounded-lg overflow-hidden transition-all ${
                index === selectedIndex ? "ring-2 ring-primary scale-105" : "opacity-70 hover:opacity-100"
              }`}
            >
              {photo.type === "video" ? (
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center">
                  <span className="text-2xl">▶️</span>
                </div>
              ) : (
                <img
                  src={photo.src || "/placeholder.svg"}
                  alt={photo.title}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
