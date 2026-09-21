"use client"

import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { useEffect, useState } from "react"

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      className="
        relative w-9 h-9 rounded-full
        flex items-center justify-center
        border border-border
        bg-muted/60 hover:bg-muted
        transition-all duration-300
        hover:shadow-[0_0_12px_rgba(139,92,246,0.40)]
        hover:border-[rgba(139,92,246,0.50)]
        group
      "
    >
      <Sun
        className={`
          absolute h-4 w-4 text-amber-400
          transition-all duration-500
          ${isDark ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"}
        `}
      />
      <Moon
        className={`
          absolute h-4 w-4 text-violet-400
          transition-all duration-500
          ${isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"}
        `}
      />
    </button>
  )
}
