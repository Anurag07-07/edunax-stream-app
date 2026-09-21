import * as React from "react"
import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        // Base
        "h-9 w-full min-w-0 rounded-full border px-4 py-1 text-sm",
        "bg-background/80 dark:bg-[rgba(255,255,255,0.06)]",
        "border-border dark:border-white/10",
        "text-foreground placeholder:text-muted-foreground",
        "shadow-[inset_0_1px_3px_rgba(0,0,0,0.08)] dark:shadow-[inset_0_1px_3px_rgba(0,0,0,0.30)]",
        // Transition
        "transition-all duration-200 outline-none",
        // Focus — purple glow
        "focus-visible:border-[rgba(139,92,246,0.60)] focus-visible:shadow-[0_0_0_3px_rgba(139,92,246,0.15),inset_0_1px_3px_rgba(0,0,0,0.08)]",
        // Disabled
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        // File input
        "file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
        // Invalid
        "aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }
