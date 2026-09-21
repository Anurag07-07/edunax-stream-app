import { Outfit } from "next/font/google"
import Link from "next/link"
import { Gamepad2 } from "lucide-react"
import { cn } from "@/lib/utils"

const font = Outfit({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
})

export const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-x-2.5 hover:opacity-90 transition-all duration-300 group shrink-0"
    >
      {/* Icon mark */}
      <div className="
        relative flex items-center justify-center
        w-9 h-9 rounded-xl
        bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]
        shadow-[0_0_18px_rgba(124,58,237,0.55)]
        group-hover:shadow-[0_0_26px_rgba(124,58,237,0.75)]
        transition-shadow duration-300
        shrink-0
      ">
        <Gamepad2 className="h-5 w-5 text-white" />
      </div>

      {/* Word-mark */}
      <div className={cn("hidden lg:block leading-tight", font.className)}>
        <p className="text-base font-bold gradient-text tracking-tight">
          Edunax
        </p>
        <p className="text-[10px] text-muted-foreground font-medium tracking-widest uppercase">
          GameHub
        </p>
      </div>
    </Link>
  )
}