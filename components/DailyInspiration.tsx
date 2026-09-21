'use client'

import { useEffect, useState } from 'react'
import { Sparkles, RefreshCw } from 'lucide-react'

// ── 30 curated quotes for students & teachers ──────────────
const QUOTES = [
  { text: "The best way to learn is to teach.", author: "Frank Oppenheimer" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
  { text: "Tell me and I forget, teach me and I may remember, involve me and I learn.", author: "Benjamin Franklin" },
  { text: "In learning you will teach, and in teaching you will learn.", author: "Phil Collins" },
  { text: "The art of teaching is the art of assisting discovery.", author: "Mark Van Doren" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "An investment in knowledge pays the best interest.", author: "Benjamin Franklin" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Strive for progress, not perfection.", author: "Unknown" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
  { text: "Great things never come from comfort zones.", author: "Unknown" },
  { text: "Dream it. Wish it. Do it.", author: "Unknown" },
  { text: "Success doesn't just find you. You have to go out and get it.", author: "Unknown" },
  { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Unknown" },
  { text: "Don't stop when you're tired. Stop when you're done.", author: "Unknown" },
  { text: "Wake up with determination. Go to bed with satisfaction.", author: "Unknown" },
  { text: "Do something today that your future self will thank you for.", author: "Sean Patrick Flanery" },
  { text: "Little things make big days.", author: "Unknown" },
  { text: "It's going to be hard, but hard does not mean impossible.", author: "Unknown" },
  { text: "Don't wait for opportunity. Create it.", author: "Unknown" },
  { text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.", author: "Unknown" },
  { text: "The key to success is to focus on goals, not obstacles.", author: "Unknown" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
]

// Pick a quote that changes every day (consistent within same day)
const getDailyQuote = () => {
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  )
  return QUOTES[dayOfYear % QUOTES.length]
}

// Format date nicely
const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// Format time
const formatTime = (date: Date) => {
  return date.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  })
}

export const DailyInspiration = () => {
  const [now, setNow] = useState<Date | null>(null)
  const [quote] = useState(getDailyQuote)

  // Live clock — update every second
  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="
      relative rounded-2xl overflow-hidden
      border border-[rgba(139,92,246,0.25)]
      glass-card p-5 sm:p-6
      mb-6
    ">
      {/* Gradient accent bar — black/gray */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-foreground via-foreground/40 to-transparent" />

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Quote section */}
        <div className="flex-1">
          <div className="flex items-center gap-x-2 mb-3">
            <div className="
              w-7 h-7 rounded-lg flex items-center justify-center
              bg-foreground
              shrink-0
            ">
              <Sparkles className="h-3.5 w-3.5 text-background" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
              Daily Inspiration
            </span>
          </div>

          <blockquote className="text-sm sm:text-base font-medium text-foreground leading-relaxed mb-1 italic">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <p className="text-xs text-muted-foreground flex items-center gap-x-1">
            <span>—</span>
            <span className="gradient-text font-semibold">{quote.author}</span>
          </p>
        </div>

        {/* Divider */}
        <div className="hidden sm:block w-px h-16 bg-border shrink-0" />

        {/* Date & Time section */}
        <div className="sm:text-right shrink-0 sm:min-w-[180px]">
          {now ? (
            <>
              {/* Live clock */}
              <div className="
                font-mono text-2xl font-bold gradient-text mb-1
                tabular-nums tracking-tight
              ">
                {formatTime(now)}
              </div>
              {/* Date */}
              <div className="text-xs text-muted-foreground leading-relaxed">
                {formatDate(now)}
              </div>
              {/* Live indicator */}
              <div className="flex sm:justify-end items-center gap-x-1.5 mt-2">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                <span className="text-[10px] text-green-500 font-semibold uppercase tracking-wider">Live</span>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <div className="h-7 w-32 bg-muted rounded-lg animate-pulse sm:ml-auto" />
              <div className="h-4 w-44 bg-muted rounded-lg animate-pulse sm:ml-auto" />
            </div>
          )}
        </div>
      </div>

      {/* Refresh hint */}
      <div className="absolute bottom-3 right-3 sm:hidden">
        <RefreshCw className="h-3 w-3 text-muted-foreground opacity-40" />
      </div>
    </div>
  )
}
