import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-1 cursor-pointer select-none",
  {
    variants: {
      variant: {
        /* ── Black/white gradient — main CTA ── */
        default:
          "bg-gradient-to-b from-foreground to-foreground/85 text-background shadow-[0_2px_8px_rgba(0,0,0,0.25)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.35)] hover:opacity-90 active:scale-[0.97]",

        /* ── Branded purple gradient (generate connection, save etc.) ── */
        primary:
          "bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white shadow-[0_0_16px_rgba(124,58,237,0.35)] hover:shadow-[0_0_24px_rgba(124,58,237,0.50)] hover:opacity-90 active:scale-[0.97]",

        /* ── Destructive ── */
        destructive:
          "bg-gradient-to-b from-rose-500 to-rose-600 text-white shadow-[0_2px_8px_rgba(244,63,94,0.30)] hover:opacity-90 active:scale-[0.97]",

        /* ── Outlined — glass border ── */
        outline:
          "border border-border bg-background/80 backdrop-blur-sm text-foreground hover:bg-muted hover:border-[rgba(139,92,246,0.45)] shadow-xs hover:shadow-[0_0_10px_rgba(139,92,246,0.15)] active:scale-[0.97]",

        /* ── Secondary — subtle muted ── */
        secondary:
          "bg-muted text-foreground border border-border hover:bg-muted/70 hover:border-[rgba(139,92,246,0.40)] active:scale-[0.97]",

        /* ── Ghost — invisible until hover ── */
        ghost:
          "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground active:scale-[0.97]",

        /* ── Link ── */
        link:
          "text-primary underline-offset-4 hover:underline bg-transparent px-0 h-auto rounded-none font-medium",
      },
      size: {
        default: "h-9 px-5 py-2",
        sm: "h-8 px-4 text-xs",
        lg: "h-11 px-7 text-base",
        icon: "size-9 rounded-full p-0",
        "icon-sm": "size-8 rounded-full p-0",
        "icon-lg": "size-11 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
