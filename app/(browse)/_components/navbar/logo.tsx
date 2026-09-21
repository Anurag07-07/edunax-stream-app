import { Outfit } from "next/font/google"
import Link from "next/link"
import { cn } from "@/lib/utils"

const font = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
})

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-x-2.5 hover:opacity-75 transition-all duration-200 group shrink-0"
    >
      {/* Icon — clean black/white square */}
      <div className="
        relative flex items-center justify-center
        w-9 h-9 rounded-xl
        bg-foreground
        shadow-[0_2px_8px_rgba(0,0,0,0.20)]
        dark:shadow-[0_2px_12px_rgba(255,255,255,0.08)]
        group-hover:shadow-[0_4px_16px_rgba(0,0,0,0.30)]
        dark:group-hover:shadow-[0_4px_16px_rgba(255,255,255,0.14)]
        transition-shadow duration-300
        shrink-0
      ">
        {/* E letter mark */}
        <span className="text-background font-black text-lg leading-none select-none">E</span>
      </div>

      {/* Wordmark */}
      <div className={cn("hidden lg:block leading-tight", font.className)}>
        <p className="text-base font-bold gradient-text tracking-tight">
          Edunax
        </p>
        <p className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
          EduStream
        </p>
      </div>
    </Link>
  )
}