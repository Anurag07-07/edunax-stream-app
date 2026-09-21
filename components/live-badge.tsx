import { cn } from "@/lib/utils"

interface LiveBadgeProps {
  className?: string
}

export const LiveBadge = ({ className }: LiveBadgeProps) => {
  return (
    <div className={cn(
      "flex items-center gap-x-1 px-1.5 py-0.5 rounded-md",
      "bg-rose-500/90 text-white font-bold text-[9px] uppercase tracking-widest",
      "shadow-[0_0_10px_rgba(244,63,94,0.60)]",
      className
    )}>
      {/* Pulsing dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-white" />
      </span>
      Live
    </div>
  )
}