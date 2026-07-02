"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Camera, Search, Maximize, RotateCcw, MapPin, Keyboard } from "lucide-react"

type Vector3Like = {
  x: number
  y: number
  z: number
  length: () => number
}

interface UIOverlayProps {
  onResetView: () => void
  onScreenshot: () => void
  onToggleFullscreen: () => void
  cameraPosition?: Vector3Like
  cameraTarget?: Vector3Like
}

export function UIOverlay({
  onResetView,
  onScreenshot,
  onToggleFullscreen,
  cameraPosition,
  cameraTarget,
}: UIOverlayProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false)
  const [showMinimap, setShowMinimap] = useState(false)

  const distance = cameraPosition ? cameraPosition.length() : 0
  const lightYearDistance = (distance * 1000).toFixed(0)

  // Minimap calculations (UI only)
  let markerX = 0.5
  let markerY = 0.5
  let markerRotation = 0
  let rangePct = 0.35

  if (cameraPosition && cameraTarget) {
    const dx = cameraTarget.x - cameraPosition.x
    const dy = cameraTarget.y - cameraPosition.y

    const len = Math.max(1e-6, Math.hypot(dx, dy))
    const ndx = dx / len
    const ndy = dy / len

    markerX = 0.5 + ndx * 0.34
    markerY = 0.5 + ndy * 0.34
    markerRotation = (Math.atan2(ndx, ndy) * 180) / Math.PI

    const d = cameraPosition.length()
    rangePct = Math.max(0.18, Math.min(0.56, 0.6 - d / 40))
  }

  return (
    <>
      {/* Top Bar */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
        {/* Info Panel */}
        <Card className="bg-black/80 backdrop-blur-sm border-gray-700 max-w-sm">
          <CardContent className="p-4">
            <h1 className="text-xl font-bold text-white mb-2">Milky Way Galaxy Viewer</h1>
            <p className="text-sm text-gray-300 mb-2">
              Explore our galaxy in 3D space with realistic spiral structure and star distribution.
            </p>
            <div className="text-xs text-gray-400">
              <p>• Drag to rotate view</p>
              <p>• Scroll to zoom in/out</p>
              <p>• Right-click + drag to pan</p>
            </div>
          </CardContent>
        </Card>

        {/* Search and Tools */}
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search stars, systems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 bg-black/80 backdrop-blur-sm border-gray-700 text-white"
            />
          </div>

          <Button
            onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
            variant="secondary"
            size="icon"
            className="bg-black/80 backdrop-blur-sm border-gray-700"
          >
            <Keyboard className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <Button
          onClick={onResetView}
          variant="secondary"
          size="sm"
          className="bg-black/80 backdrop-blur-sm border-gray-700 text-white"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset View
        </Button>

        <Button
          onClick={onScreenshot}
          variant="secondary"
          size="sm"
          className="bg-black/80 backdrop-blur-sm border-gray-700 text-white"
        >
          <Camera className="w-4 h-4 mr-2" />
          Screenshot
        </Button>

        <Button
          onClick={onToggleFullscreen}
          variant="secondary"
          size="sm"
          className="bg-black/80 backdrop-blur-sm border-gray-700 text-white"
        >
          <Maximize className="w-4 h-4 mr-2" />
          Fullscreen
        </Button>

        <Button
          onClick={() => setShowMinimap(!showMinimap)}
          variant="secondary"
          size="sm"
          className="bg-black/80 backdrop-blur-sm border-gray-700 text-white"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Minimap
        </Button>
      </div>

      {/* Distance Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <Card className="bg-black/80 backdrop-blur-sm border-gray-700">
          <CardContent className="p-2 px-4">
            <div className="text-center text-white text-sm">
              Distance: <span className="font-mono">{lightYearDistance}</span> light years
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showKeyboardShortcuts && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <Card className="bg-black/90 backdrop-blur-sm border-gray-700 max-w-md">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg font-semibold">Keyboard Shortcuts</h3>
                <Button
                  onClick={() => setShowKeyboardShortcuts(false)}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400"
                >
                  ×
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-300">
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">R</kbd> Reset View
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">S</kbd> Screenshot
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">F</kbd> Fullscreen
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">A</kbd> Auto-rotate
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">C</kbd> Constellations
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">L</kbd> Star Labels
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">M</kbd> Minimap
                </div>
                <div>
                  <kbd className="bg-gray-700 px-1 rounded">?</kbd> This help
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Minimap */}
      {showMinimap && (
        <div className="absolute top-4 right-80 w-48 h-48">
          <Card className="bg-black/80 backdrop-blur-sm border-gray-700 h-full overflow-hidden">
            <CardContent className="p-3 h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white text-xs font-medium">Galaxy Overview</div>
                <div className="text-[10px] text-gray-400">Viewport</div>
              </div>

              <div className="relative w-full h-full rounded-xl bg-gradient-to-b from-gray-950 to-gray-900 border border-gray-700">
                {/* Contours */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full">
                    <svg viewBox="0 0 100 100" className="w-full h-full" aria-hidden="true">
                      <defs>
                        <radialGradient id="minimapGlow" cx="50%" cy="50%" r="60%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
                          <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.06" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </radialGradient>
                      </defs>
                      <circle cx="50" cy="50" r="48" fill="url(#minimapGlow)" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#60a5fa" strokeOpacity="0.15" strokeWidth="1" />
                      <circle cx="50" cy="50" r="30" fill="none" stroke="#60a5fa" strokeOpacity="0.12" strokeWidth="1" />
                      <circle cx="50" cy="50" r="20" fill="none" stroke="#60a5fa" strokeOpacity="0.10" strokeWidth="1" />

                      {/* Crosshair */}
                      <line x1="50" y1="8" x2="50" y2="92" stroke="#93c5fd" strokeOpacity="0.10" strokeWidth="1" />
                      <line x1="8" y1="50" x2="92" y2="50" stroke="#93c5fd" strokeOpacity="0.10" strokeWidth="1" />
                    </svg>
                  </div>
                </div>

                {/* Active ring (visual) */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-[transform,opacity] duration-300"
                  style={{ opacity: 0.9 }}
                >
                  <div
                    className="rounded-full border border-blue-400/20"
                    style={{
                      width: `${rangePct * 100}%`,
                      height: `${rangePct * 100}%`,
                    }}
                  />
                </div>

                {/* Center marker */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-[0_0_18px_rgba(239,68,68,0.45)]" />
                </div>

                {/* Viewport marker */}
                <div
                  className="absolute transition-all duration-200"
                  style={{
                    left: `${markerX * 100}%`,
                    top: `${markerY * 100}%`,
                    transform: `translate(-50%, -50%) rotate(${markerRotation}deg)`,
                  }}
                  aria-label="Minimap viewport marker"
                  role="img"
                >
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-blue-400/70 blur-[0.5px]" />
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[7px] border-l-blue-400/80 border-t-[4px] border-t-transparent border-b-[4px] border-b-transparent" />
                  </div>
                </div>

                {/* Outer frame */}
                <div className="absolute inset-2 rounded-lg border border-gray-600/60 pointer-events-none" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
