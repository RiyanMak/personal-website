'use client'
import { useEffect, useRef } from 'react'

interface River {
  y: number
  x: number
  speed: number
  chars: string[]
  opacity: number
  fontSize: number
  amplitude: number  // wave height in px
  frequency: number  // wave cycles per px
  phase: number      // current phase offset (animates)
  phaseSpeed: number // how fast the wave moves
}

export default function BinaryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const CHAR_W = 12
    const FRAME_MS = 40

    const setSize = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth
      canvas.height = canvas.offsetHeight || window.innerHeight
    }
    setSize()

    const makeRiver = (y: number): River => {
      const fontSize = Math.floor(Math.random() * 3) + 10
      const count = Math.ceil(canvas.width / CHAR_W) + 40
      return {
        y,
        x: -(Math.random() * canvas.width),
        speed: Math.random() * 0.35 + 0.12,
        chars: Array.from({ length: count }, () => (Math.random() > 0.5 ? '1' : '0')),
        opacity: Math.random() * 0.07 + 0.03,
        fontSize,
        amplitude: Math.random() * 14 + 8,   // 8–22px wave height
        frequency: Math.random() * 0.008 + 0.006, // wave density
        phase: Math.random() * Math.PI * 2,   // random starting phase
        phaseSpeed: Math.random() * 0.012 + 0.006, // wave animation speed
      }
    }

    let rivers: River[] = []

    const initRivers = () => {
      const count = 12
      rivers = Array.from({ length: count }, (_, i) => {
        const y = ((canvas.height - 80) / (count - 1)) * i + 40
        return makeRiver(y)
      })
    }
    initRivers()

    const ro = new ResizeObserver(() => { setSize(); initRivers() })
    ro.observe(canvas)

    let lastTime = 0
    let animId: number

    const draw = (ts: number) => {
      animId = requestAnimationFrame(draw)
      if (ts - lastTime < FRAME_MS) return
      lastTime = ts

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const r of rivers) {
        r.x -= r.speed
        r.phase += r.phaseSpeed // animate the wave forward

        // Flicker a random char occasionally
        if (Math.random() > 0.96) {
          const idx = Math.floor(Math.random() * r.chars.length)
          r.chars[idx] = r.chars[idx] === '0' ? '1' : '0'
        }

        if (r.x <= -CHAR_W) {
          r.x += CHAR_W
          r.chars.shift()
          r.chars.push(Math.random() > 0.5 ? '1' : '0')
        }

        ctx.font = `${r.fontSize}px monospace`
        ctx.fillStyle = `rgba(166, 227, 161, ${r.opacity})`

        for (let i = 0; i < r.chars.length; i++) {
          const x = r.x + i * CHAR_W
          if (x < -CHAR_W || x > canvas.width + CHAR_W) continue

          // Sine wave vertical offset per character
          const waveY = r.y + r.amplitude * Math.sin(r.frequency * x + r.phase)
          ctx.fillText(r.chars[i], x, waveY)
        }
      }
    }

    animId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animId)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  )
}
