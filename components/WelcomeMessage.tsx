import { currentUser } from '@clerk/nextjs/server'
import { BookOpen, GraduationCap, Mic } from 'lucide-react'

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 17) return 'Good afternoon'
  if (hour < 21) return 'Good evening'
  return 'Good night'
}

export const WelcomeMessage = async () => {
  const user = await currentUser()
  if (!user) return null

  const greeting = getGreeting()
  const firstName = user.firstName || user.username || 'Learner'

  const tips = [
    { icon: Mic, text: "Start a stream today — teaching is the fastest way to master a topic!", color: "text-violet-400" },
    { icon: BookOpen, text: "Watch a live session to discover new concepts explained simply.", color: "text-cyan-400" },
    { icon: GraduationCap, text: "Every expert was once a beginner. Your knowledge matters.", color: "text-amber-400" },
  ]

  // Pick tip based on hour so it rotates 3x a day
  const tip = tips[new Date().getHours() % 3]

  return (
    <div className="
      rounded-2xl border border-[rgba(139,92,246,0.20)]
      glass-card px-5 py-4
      flex flex-col sm:flex-row sm:items-center gap-3
      mb-4
    ">
      {/* Avatar initial */}
      <div className="
        w-11 h-11 rounded-xl shrink-0
        bg-foreground
        flex items-center justify-center
        text-background font-black text-lg
        shadow-[0_2px_8px_rgba(0,0,0,0.15)]
        dark:shadow-[0_2px_8px_rgba(255,255,255,0.08)]
      ">
        {firstName[0].toUpperCase()}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="font-bold text-base text-foreground">
          {greeting},{' '}
          <span className="gradient-text">{firstName}!</span>{' '}
          <span className="text-lg">👋</span>
        </p>
        <div className="flex items-start gap-x-1.5 mt-0.5">
          <tip.icon className={`h-3.5 w-3.5 mt-0.5 shrink-0 ${tip.color}`} />
          <p className="text-xs text-muted-foreground leading-relaxed">
            {tip.text}
          </p>
        </div>
      </div>
    </div>
  )
}
