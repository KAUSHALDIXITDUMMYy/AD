"use client"

import { useState } from "react"
import WhatsAppChat from "./whatsapp-chat"

export default function GiftBox() {
  const [isOpened, setIsOpened] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleOpenGift = () => {
    setIsOpened(true)

    // Create confetti particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50,
      y: Math.random() * 100 - 50,
    }))
    setParticles(newParticles)

    // Clear particles after animation
    setTimeout(() => setParticles([]), 3000)
  }

  const handleOpenChat = () => {
    setShowChat(true)
  }

  const handleCloseChat = () => {
    setShowChat(false)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {showChat && <WhatsAppChat onClose={handleCloseChat} />}

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Special Gift for You
          </h2>
          <p className="text-muted-foreground text-lg">Click the gift box to reveal your surprise</p>
        </div>

        <div className="flex justify-center items-center">
          <button
            onClick={handleOpenGift}
            disabled={isOpened}
            className={`relative group transition-all duration-500 ${
              isOpened ? "cursor-default" : "cursor-pointer hover:scale-110"
            }`}
          >
            <div
              className={`relative w-32 h-32 md:w-48 md:h-48 ${
                !isOpened ? "animate-gift-bounce animate-gift-glow" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-lg shadow-2xl transition-all duration-700 ${
                  isOpened ? "scale-0 opacity-0" : "scale-100 opacity-100"
                }`}
                style={{
                  boxShadow: isOpened ? "none" : "0 20px 60px rgba(220, 38, 38, 0.3), 0 0 40px rgba(220, 38, 38, 0.2)",
                }}
              >
                <div
                  className={`absolute -top-6 left-1/2 transform -translate-x-1/2 w-36 md:w-56 h-12 md:h-16 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-t-lg transition-all duration-700 origin-bottom ${
                    isOpened ? "rotate-45 opacity-0" : "rotate-0 opacity-100"
                  }`}
                />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-2 h-full bg-yellow-300 opacity-80" />
                </div>

                {!isOpened && (
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-12">
                    <div className="absolute w-6 h-6 bg-yellow-300 rounded-full" style={{ left: "-10px" }} />
                    <div className="absolute w-6 h-6 bg-yellow-300 rounded-full" style={{ right: "-10px" }} />
                    <div className="w-4 h-4 bg-yellow-400 rounded-full absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                  </div>
                )}

                {!isOpened && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl md:text-5xl">🎁</span>
                  </div>
                )}
              </div>

              {isOpened && <div className="absolute inset-0 bg-white rounded-lg opacity-30 animate-pulse" />}
            </div>

            {!isOpened && (
              <div className="absolute -inset-8 bg-gradient-to-r from-red-500/20 to-yellow-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </button>

          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute animate-confetti-fall text-2xl pointer-events-none"
              style={{
                left: "50%",
                top: "40%",
                transform: `translate(${particle.x}px, ${particle.y}px)`,
              }}
            >
              {"🎉💝✨🎊💕"[particle.id % 5]}
            </div>
          ))}
        </div>

        {isOpened && (
          <div className="mt-16 max-w-2xl mx-auto animate-fade-in-up">
            <div className="bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl p-8 md:p-12 border-2 border-primary/40 backdrop-blur-sm">
              <div className="text-center mb-6">
                <p
                  className="text-2xl font-bold text-foreground mb-4"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Your Birthday Gift
                </p>
                <p className="text-muted-foreground mb-6">Read our most precious deleted conversations</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={handleOpenChat}
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
                >
                  <span className="text-2xl">💬</span>
                  Read Our Deleted Chats
                </button>

                <a
                  href="https://drive.google.com/drive/folders/1m-tLKtt6C-Rxs74ZPeqdZPE7JOJwz843"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group text-lg"
                >
                  <span className="text-2xl">📁</span>
                  Open Our Memories Drive
                </a>
              </div>

              <div className="mt-6 p-4 bg-background/50 rounded-lg border border-primary/20 text-center">
                <p className="text-sm text-muted-foreground">
                  All our precious moments, conversations, and memories preserved forever ✨
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
