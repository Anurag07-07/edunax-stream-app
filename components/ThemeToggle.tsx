'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="w-9 h-9 rounded-full bg-muted animate-pulse" />

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        relative w-9 h-9 rounded-full
        border border-border
        bg-muted/60 hover:bg-muted
        text-muted-foreground hover:text-foreground
        flex items-center justify-center
        transition-all duration-200
        hover:border-foreground/30
        active:scale-95
        overflow-hidden
      "
    >
      {/* Sun */}
      <Sun
        className={`
          h-4 w-4 absolute transition-all duration-300
          ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-75'}
        `}
      />
      {/* Moon */}
      <Moon
        className={`
          h-4 w-4 absolute transition-all duration-300
          ${!isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-75'}
        `}
      />
    </button>
  )
}
