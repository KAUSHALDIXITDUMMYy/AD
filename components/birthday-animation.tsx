"use client"

import { useEffect, useRef, useState } from "react"

interface Vector2 {
  x: number
  y: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  emoji: string
}

export default function BirthdayAnimation({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    let animationFrameId: number
    let sceneTime = 0
    const particles: Particle[] = []

    // Lerp function for smooth movement
    const lerp = (start: number, end: number, t: number) => start + (end - start) * Math.min(Math.max(t, 0), 1)

    // Draw speech bubble
    const drawSpeechBubble = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth = 200) => {
      const padding = 15
      const borderRadius = 15
      const lineHeight = 24

      // Calculate text dimensions
      ctx.font = "22px 'Poppins', sans-serif"
      const lines = text.split("\n")
      const textWidth = Math.max(...lines.map((line) => ctx.measureText(line).width))
      const textHeight = lines.length * lineHeight

      const bubbleWidth = Math.min(textWidth + padding * 2, maxWidth)
      const bubbleHeight = textHeight + padding * 2

      const bubbleX = x - bubbleWidth / 2
      const bubbleY = y - bubbleHeight - 20

      // Draw bubble background
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.beginPath()
      ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, borderRadius)
      ctx.fill()

      // Draw bubble border
      ctx.strokeStyle = "rgba(255, 105, 180, 0.5)"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw pointer
      ctx.fillStyle = "rgba(255, 255, 255, 0.95)"
      ctx.beginPath()
      ctx.moveTo(x - 10, bubbleY + bubbleHeight)
      ctx.lineTo(x + 10, bubbleY + bubbleHeight)
      ctx.lineTo(x, bubbleY + bubbleHeight + 15)
      ctx.fill()

      // Draw text
      ctx.fillStyle = "#333"
      ctx.font = "22px 'Poppins', sans-serif"
      ctx.textAlign = "center"
      lines.forEach((line, i) => {
        ctx.fillText(line, x, bubbleY + padding + (i + 1) * lineHeight - 5)
      })
    }

    // Draw chibi Kaushal character
    const drawKaushal = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Body
      ctx.fillStyle = "#E8D4C8"
      ctx.beginPath()
      ctx.ellipse(0, 30, 25, 35, 0, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.fillStyle = "#F5D9C0"
      ctx.beginPath()
      ctx.arc(0, -10, 30, 0, Math.PI * 2)
      ctx.fill()

      // Hair
      ctx.fillStyle = "#1a1a1a"
      ctx.beginPath()
      ctx.ellipse(0, -30, 32, 28, 0, 0, Math.PI * 2)
      ctx.fill()

      // Shirt with "KAUSHAL" text
      ctx.fillStyle = "#4A90E2"
      ctx.fillRect(-20, 15, 40, 30)

      ctx.fillStyle = "white"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.fillText("KAUSHAL", 0, 38)

      // Eyes
      ctx.fillStyle = "#000"
      ctx.beginPath()
      ctx.arc(-12, -12, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(12, -12, 4, 0, Math.PI * 2)
      ctx.fill()

      // Eyes shine
      ctx.fillStyle = "white"
      ctx.beginPath()
      ctx.arc(-11, -13, 2, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(13, -13, 2, 0, Math.PI * 2)
      ctx.fill()

      // Smile
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(0, -2, 12, 0, Math.PI)
      ctx.stroke()

      ctx.restore()
    }

    // Draw chibi Awantika (purple fairy)
    const drawAwantika = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1, blush = 0) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Purple fairy dress
      ctx.fillStyle = "#9B59B6"
      ctx.beginPath()
      ctx.ellipse(0, 35, 20, 30, 0, 0, Math.PI * 2)
      ctx.fill()

      // Body
      ctx.fillStyle = "#F5D9C0"
      ctx.beginPath()
      ctx.ellipse(0, 15, 18, 25, 0, 0, Math.PI * 2)
      ctx.fill()

      // Head
      ctx.fillStyle = "#F5D9C0"
      ctx.beginPath()
      ctx.arc(0, -15, 25, 0, Math.PI * 2)
      ctx.fill()

      // Purple hair with fairy tone
      ctx.fillStyle = "#9B59B6"
      ctx.beginPath()
      ctx.ellipse(0, -32, 28, 25, 0, 0, Math.PI * 2)
      ctx.fill()

      // Big chibi eyes
      ctx.fillStyle = "#8E44AD"
      ctx.beginPath()
      ctx.ellipse(-12, -18, 8, 12, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.ellipse(12, -18, 8, 12, 0, 0, Math.PI * 2)
      ctx.fill()

      // Eye shine
      ctx.fillStyle = "white"
      ctx.beginPath()
      ctx.arc(-10, -20, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(14, -20, 3, 0, Math.PI * 2)
      ctx.fill()

      // Cute blush
      ctx.fillStyle = `rgba(255, 182, 193, ${0.5 + blush * 0.5})`
      ctx.beginPath()
      ctx.arc(-18, -8, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.beginPath()
      ctx.arc(18, -8, 6, 0, Math.PI * 2)
      ctx.fill()

      // Smile
      ctx.strokeStyle = "#333"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(0, -5, 10, 0, Math.PI)
      ctx.stroke()

      // Tiny fairy wings (sparkles effect)
      if (blush > 0) {
        ctx.fillStyle = `rgba(255, 215, 0, ${blush * 0.7})`
        for (let i = 0; i < 5; i++) {
          const angle = (i / 5) * Math.PI * 2
          const sparkleX = Math.cos(angle) * 25
          const sparkleY = Math.sin(angle) * 25
          ctx.beginPath()
          ctx.arc(sparkleX, sparkleY - 10, 3, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      ctx.restore()
    }

    // Draw bouquet
    const drawBouquet = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Stems
      ctx.strokeStyle = "#2D5016"
      ctx.lineWidth = 4
      for (let i = 0; i < 5; i++) {
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.quadraticCurveTo(i * 8 - 16, 40, i * 8 - 16, 80)
        ctx.stroke()
      }

      // Flowers
      const colors = ["#FF6B9D", "#FFC300", "#FF0000", "#FF1493", "#FFB6C1"]
      for (let i = 0; i < 5; i++) {
        ctx.fillStyle = colors[i]
        for (let j = 0; j < 5; j++) {
          const angle = (j / 5) * Math.PI * 2
          const px = Math.cos(angle) * 12 + (i * 8 - 16)
          const py = Math.sin(angle) * 12 - 20
          ctx.beginPath()
          ctx.arc(px, py, 6, 0, Math.PI * 2)
          ctx.fill()
        }

        // Center
        ctx.fillStyle = "#FFD700"
        ctx.beginPath()
        ctx.arc(i * 8 - 16, -20, 5, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Draw cake
    const drawCake = (ctx: CanvasRenderingContext2D, x: number, y: number, scale = 1) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.scale(scale, scale)

      // Cake body
      ctx.fillStyle = "#D4A574"
      ctx.fillRect(-25, -20, 50, 40)

      // Frosting
      ctx.fillStyle = "#FFB6C1"
      ctx.beginPath()
      ctx.ellipse(0, -20, 27, 8, 0, 0, Math.PI * 2)
      ctx.fill()

      // Candles
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = "#FFD700"
        ctx.fillRect(-10 + i * 10, -35, 4, 20)

        // Flame
        ctx.fillStyle = "#FF6B00"
        ctx.beginPath()
        ctx.ellipse(-8 + i * 10, -40, 4, 6, 0, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.restore()
    }

    // Draw heart particles
    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.fillStyle = "rgba(255, 105, 180, 0.7)"

      ctx.beginPath()
      ctx.moveTo(0, size / 4)
      ctx.quadraticCurveTo(-size / 2, -size / 2, -size / 2, -size / 8)
      ctx.quadraticCurveTo(-size / 2, -size / 2, 0, 0)
      ctx.quadraticCurveTo(size / 2, -size / 2, size / 2, -size / 8)
      ctx.quadraticCurveTo(size / 2, -size / 2, 0, size / 4)
      ctx.fill()

      ctx.restore()
    }

    // Create heart particles on kiss
    const createHeartParticles = () => {
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: canvas.width / 2,
          y: canvas.height / 2 - 100,
          vx: (Math.random() - 0.5) * 4,
          vy: -2 - Math.random() * 2,
          life: 1,
          emoji: "💕",
        })
      }
    }

    // Animation loop
    const animate = () => {
      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)

      // Scene 1 & 2: Day to sunset
      if (sceneTime < 8000) {
        const dayProgress = sceneTime / 4000
        gradient.addColorStop(0, `hsl(195, 70%, ${80 - dayProgress * 30}%)`)
        gradient.addColorStop(1, `hsl(45, 100%, ${60 - dayProgress * 40}%)`)
      }
      // Scene 3: Night
      else if (sceneTime < 15000) {
        gradient.addColorStop(0, "hsl(240, 50%, 15%)")
        gradient.addColorStop(1, "hsl(260, 60%, 25%)")
      }
      // Final scene
      else {
        gradient.addColorStop(0, "hsl(240, 50%, 15%)")
        gradient.addColorStop(1, "hsl(270, 70%, 20%)")
      }

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw background scenes
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      if (sceneTime < 3000) {
        // Scene 1: House staircase
        drawStaircaseBackground(ctx, canvas.width, canvas.height)

        const progress = sceneTime / 3000
        const kaushalX = lerp(100, centerX, progress)

        // Draw Kaushal walking in with bouquet
        drawKaushal(ctx, kaushalX, centerY + 50, 1.2)

        // Bouquet in hand
        const bouquetScale = lerp(0.5, 1.2, progress)
        drawBouquet(ctx, kaushalX + 50, centerY - 20, bouquetScale)

        drawSpeechBubble(ctx, "I love you", kaushalX, centerY - 150)
      } else if (sceneTime < 8000) {
        // Scene 2: Railway station transition and cake reveal
        const transitionProgress = (sceneTime - 3000) / 2000

        // Draw railway station
        drawRailwayStationBackground(ctx, canvas.width, canvas.height)

        const kaushalX = centerX
        drawKaushal(ctx, kaushalX, centerY + 50, 1.2)

        // Cake animation
        const cakeProgress = Math.max(0, (sceneTime - 4000) / 1000)
        const cakeScale = lerp(0, 1.2, cakeProgress)
        if (cakeProgress >= 0) {
          drawCake(ctx, kaushalX + 60, centerY - 40, cakeScale)
        }

        drawSpeechBubble(ctx, "Happy Birthday", kaushalX, centerY - 150)
      } else if (sceneTime < 13000) {
        // Scene 3: Marriage hall - Kaushal kneels
        drawMarriageHallBackground(ctx, canvas.width, canvas.height)

        const kneelProgress = (sceneTime - 8000) / 2000
        const kaushalY = lerp(centerY + 50, centerY + 100, Math.min(kneelProgress, 1))

        drawKaushal(ctx, centerX, kaushalY, 1.2)

        if (sceneTime > 9000) {
          drawSpeechBubble(ctx, "I love you\nmajhi radha", centerX, centerY - 180)
        }
      } else if (sceneTime < 18000) {
        // Scene 4: Awantika enters and kiss animation
        drawMarriageHallBackground(ctx, canvas.width, canvas.height)

        const enterProgress = (sceneTime - 13000) / 2000
        const awantikaX = lerp(canvas.width, centerX + 80, Math.min(enterProgress, 1))
        const blush = Math.min(enterProgress * 2, 1)

        drawKaushal(ctx, centerX - 80, centerY + 80, 1.2)
        drawAwantika(ctx, awantikaX, centerY + 80, 1.2, blush)

        // Kiss animation and heart particles
        if (sceneTime > 15000) {
          if (particles.length === 0) {
            createHeartParticles()
          }

          // Move characters closer for kiss
          const kissProgress = (sceneTime - 15000) / 1000
          drawKaushal(ctx, centerX - 80 + kissProgress * 40, centerY + 80, 1.2)
          drawAwantika(ctx, awantikaX - kissProgress * 40, centerY + 80, 1.2, 1)

          // Draw speech bubble with cute message
          if (sceneTime < 16500) {
            drawSpeechBubble(ctx, "chu 💕", centerX, centerY - 200)
          }
        }
      } else {
        // Scene 5: Final message
        drawMarriageHallBackground(ctx, canvas.width, canvas.height)

        drawKaushal(ctx, centerX - 80, centerY + 80, 1.2)
        drawAwantika(ctx, centerX + 80, centerY + 80, 1.2, 1)

        drawSpeechBubble(
          ctx,
          "Real Awantika,\nnow it's your turn...\nGive your Kaushal a kiss 😘",
          centerX - 150,
          centerY - 150,
        )

        // Final text
        const finalProgress = Math.min((sceneTime - 18000) / 2000, 1)
        ctx.font = "bold 48px 'Playfair Display', serif"
        ctx.fillStyle = `rgba(255, 255, 255, ${finalProgress})`
        ctx.textAlign = "center"
        ctx.fillText("AWANTIKA DHUMNE", centerX, centerY - 100)
        ctx.font = "32px 'Poppins', sans-serif"
        ctx.fillText("Have the best birthday ever ❤️", centerX, centerY - 40)
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.1 // Gravity
        p.life -= 0.005

        if (p.life <= 0) {
          particles.splice(i, 1)
        } else {
          ctx.font = "30px Arial"
          ctx.fillText(p.emoji, p.x, p.y)
        }
      }

      // Floating hearts and sparkles
      if (sceneTime > 18000) {
        for (let i = 0; i < 3; i++) {
          const x = centerX + Math.sin(sceneTime / 1000 + i) * 100
          const y = centerY - 200 + Math.cos(sceneTime / 800 + i) * 50
          drawHeart(ctx, x, y, 15)
        }
      }

      sceneTime += 16
      if (sceneTime < 21000) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setIsPlaying(false)
        onComplete()
      }
    }

    // Background drawing functions
    const drawStaircaseBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.fillStyle = "#D4A574"
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(50 + i * 80, h / 2 - 100 + i * 60, 100, 20)
      }

      ctx.fillStyle = "#8B7355"
      ctx.fillRect(0, h / 2 + 100, w, 100)
    }

    const drawRailwayStationBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      ctx.fillStyle = "#E0E0E0"
      ctx.fillRect(0, h / 2, w, h / 2)

      ctx.strokeStyle = "#999"
      ctx.lineWidth = 3
      for (let i = 0; i < 10; i++) {
        ctx.beginPath()
        ctx.moveTo(i * (w / 10), h / 2 + 50)
        ctx.lineTo(i * (w / 10), h)
        ctx.stroke()
      }
    }

    const drawMarriageHallBackground = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      // Decorated background
      ctx.fillStyle = "#2D3142"
      ctx.fillRect(0, 0, w, h)

      // Decorative lights
      ctx.fillStyle = "#FFD700"
      for (let i = 0; i < 8; i++) {
        ctx.beginPath()
        ctx.arc((i + 1) * (w / 9), 50, 8, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [onComplete])

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" style={{ display: isPlaying ? "block" : "none" }} />
      {!isPlaying && (
        <button
          onClick={onComplete}
          className="absolute bottom-10 px-8 py-4 bg-white text-black rounded-full font-bold text-xl hover:bg-gray-200 transition-all"
        >
          Close Animation ✨
        </button>
      )}
    </div>
  )
}
