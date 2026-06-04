"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Gift, RotateCcw, Trophy, AlertCircle } from "lucide-react"

// 10 segments: 9 "Try Again Next Time" and 1 "Win!"
const segments = [
  "Try Again Next Time",
  "Try Again Next Time",
  "Try Again Next Time",
  "Try Again Next Time",
  "Try Again Next Time",
  "Try Again Next Time",
  "Try Again Next Time",
  "Try Again Next Time",
  "Try Again Next Time",
  "Win!"
]

const segmentColors = [
  "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
  "#F7DC6F", "#BB8FCE", "#85C1E9", "#F8B500", "#2ECC71"
]

export default function SpinTheWheelPage() {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [canSpin, setCanSpin] = useState(true)
  const [result, setResult] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Check if we're on the client
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Check daily limit from localStorage
  useEffect(() => {
    if (!isClient) return
    
    const lastSpin = localStorage.getItem("lastSpinDate")
    const today = new Date().toDateString()
    
    if (lastSpin === today) {
      setCanSpin(false)
    }
  }, [isClient])

  // Draw the wheel
  useEffect(() => {
    if (!isClient) return
    
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = 150

    // Draw segments
    segments.forEach((segment, index) => {
      const startAngle = (index / segments.length) * 2 * Math.PI
      const endAngle = ((index + 1) / segments.length) * 2 * Math.PI

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()
      ctx.fillStyle = segmentColors[index]
      ctx.fill()
      ctx.strokeStyle = "#ffffff"
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(centerX, centerY)
      const textAngle = startAngle + (endAngle - startAngle) / 2
      ctx.rotate(textAngle)
      ctx.textAlign = "right"
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px Arial"
      ctx.fillText(segment, radius - 20, 5)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(centerX, centerY, 30, 0, 2 * Math.PI)
    ctx.fillStyle = "#ffffff"
    ctx.fill()
    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [isClient])

  const handleSpin = () => {
    if (!isClient || !canSpin || isSpinning) return

    setIsSpinning(true)
    setShowResult(false)
    setResult(null)

    // Random number of full spins (5-10)
    const fullSpins = 5 + Math.random() * 5
    const randomDegrees = Math.floor(Math.random() * 360)
    const totalRotation = rotation + (fullSpins * 360) + randomDegrees

    setRotation(totalRotation)

    // Determine the result
    const segmentAngle = 360 / segments.length
    const normalizedRotation = (totalRotation % 360 + 360) % 360
    const winningIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % segments.length

    setTimeout(() => {
      setResult(segments[winningIndex])
      setShowResult(true)
      setIsSpinning(false)
      setCanSpin(false)
      // Save today's date
      localStorage.setItem("lastSpinDate", new Date().toDateString())
    }, 4000) // Spin for 4 seconds
  }

  const resetSpin = () => {
    if (!isClient) return
    const today = new Date().toDateString()
    const lastSpin = localStorage.getItem("lastSpinDate")
    if (lastSpin !== today) {
      setCanSpin(true)
      setShowResult(false)
      setResult(null)
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-foreground flex items-center justify-center gap-2">
          <Gift className="w-6 h-6 text-primary" />
          Spin the Wheel
        </h1>
        <p className="text-muted-foreground mt-1">
          You can spin once per day! Good luck!
        </p>
      </div>

      {/* Wheel Card */}
      <Card className="bg-card border-border">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center gap-6">
            {/* Wheel */}
            {isClient && (
              <div className="relative">
                {/* Pointer */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 z-10">
                  <div className="w-0 h-0 border-l-[15px] border-r-[15px] border-t-[30px] border-l-transparent border-r-transparent border-t-primary drop-shadow-lg"></div>
                </div>
                
                <canvas
                  ref={canvasRef}
                  width={320}
                  height={320}
                  className="rounded-full shadow-2xl"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: isSpinning ? "transform 4s cubic-bezier(0.2, 0.8, 0.3, 1)" : "none"
                  }}
                />
              </div>
            )}

            {/* Spin Button */}
            <Button
              onClick={handleSpin}
              disabled={!canSpin || isSpinning}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              {isSpinning ? (
                <>
                  <RotateCcw className="w-5 h-5 mr-2 animate-spin" />
                  Spinning...
                </>
              ) : canSpin ? (
                <>
                  <Gift className="w-5 h-5 mr-2" />
                  Spin the Wheel!
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Come back tomorrow!
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Result Card */}
      {showResult && (
        <Card className={result === "Win!" ? "bg-green-950/30 border-green-500/50" : "bg-card border-border"}>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              {result === "Win!" ? (
                <>
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  Congratulations!
                </>
              ) : (
                <>
                  <AlertCircle className="w-6 h-6 text-muted-foreground" />
                  Try Again Next Time
                </>
              )}
            </CardTitle>
            <CardDescription className="text-lg">
              {result}
            </CardDescription>
          </CardHeader>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-sm">How it works</CardTitle>
          <CardDescription>
            • 9 out of 10 segments: Try Again Next Time
            <br />
            • 1 out of 10 segments: Win!
            <br />
            • You can spin once per day
          </CardDescription>
        </CardHeader>
      </Card>
    </div>
  )
}
