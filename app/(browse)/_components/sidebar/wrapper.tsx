'use client'

import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"
import { ReactNode } from "react"
import { ToogleSkeleton } from "./toggle"
import { RecommandedSkeleton } from "./Recommended"
import { useIsClient } from "usehooks-ts"
import { FollowingSkeleton } from "./following"

interface WrapperProps {
  children: ReactNode
}

const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient()
  const { collapsed } = useSidebar()

  const baseClass = `
    fixed left-0 flex flex-col h-full z-50
    sidebar-glass
    transition-all duration-300 ease-in-out
    top-[68px]
  `

  if (!isClient) {
    return (
      <aside className={cn(baseClass, "w-60")}>
        <ToogleSkeleton />
        <FollowingSkeleton />
        <RecommandedSkeleton />
      </aside>
    )
  }

  return (
    <aside className={cn(baseClass, collapsed ? "w-[72px]" : "w-60")}>
      {/* Gradient accent line on left edge */}
      <div className="
        absolute left-0 top-0 bottom-0 w-[2px]
        bg-gradient-to-b from-[#7C3AED] via-[#06B6D4] to-transparent
        opacity-60
      " />
      {children}
    </aside>
  )
}

export default Wrapper