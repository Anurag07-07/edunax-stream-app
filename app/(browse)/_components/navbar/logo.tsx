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
      className="flex items-center gap-x-3 hover:opacity-85 transition-all duration-200 group shrink-0"
    >
      {/* Icon — clean black/white square */}
      <div className="
        relative flex items-center justify-center
        w-9 h-9 rounded-xl
        bg-gradient-to-br from-[#dff7ff] via-[#8ba7ff] to-[#7258ff]
        shadow-[0_0_22px_rgba(103,232,249,0.28)]
        group-hover:shadow-[0_0_30px_rgba(103,232,249,0.45)]
        transition-shadow duration-300
        shrink-0
      ">
        {/* E letter mark */}
        <span className="text-[#07090d] font-black text-lg leading-none select-none">E</span>
      </div>

      {/* Wordmark */}
      <div className={cn("hidden lg:block leading-tight", font.className)}>
        <p className="text-base font-bold gradient-text tracking-tight">
          EDUNAX
        </p>
        <p className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
          LIVE LEARNING
        </p>
      </div>
    </Link>
  )
}