"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function DotGrid() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1]"
      style={{
        backgroundImage: `radial-gradient(${theme === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)"} 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
      }}
    />
  )
}
