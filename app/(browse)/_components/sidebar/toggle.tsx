'use client'

import { Button } from '@/components/ui/button'
import { useSidebar } from '@/store/use-sidebar'
import { ArrowLeftFromLine, ArrowRightFromLine } from 'lucide-react'
import React from 'react'
import Hint from './hint'
import { Skeleton } from '@/components/ui/skeleton'

export const Toogle = () => {
  const { collapsed, onExpand, onCollapse } = useSidebar()

  const label = collapsed ? "Expand" : "Collapse"

  return (
    <>
      {collapsed && (
        <div className="hidden lg:flex w-full items-center justify-center pt-5 mb-4">
          <Hint label={label} side="right" asChild>
            <Button
              onClick={onExpand}
              variant="ghost"
              size="sm"
              className="
                h-9 w-9 p-0 rounded-full
                hover:bg-[rgba(139,92,246,0.15)]
                hover:text-violet-400
                transition-all duration-200
              "
            >
              <ArrowRightFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}

      {!collapsed && (
        <div className="px-4 pt-4 pb-2 flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            {/* Gradient accent dot */}
            <div className="w-1.5 h-5 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#06B6D4]" />
            <p className="font-bold text-sm tracking-wide gradient-text">
              For You
            </p>
          </div>

          <Hint label={label} side="right" asChild>
            <Button
              onClick={onCollapse}
              variant="ghost"
              size="sm"
              className="
                h-8 w-8 p-0 rounded-full ml-auto
                hover:bg-[rgba(139,92,246,0.15)]
                hover:text-violet-400
                transition-all duration-200
              "
            >
              <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
          </Hint>
        </div>
      )}
    </>
  )
}

export const ToogleSkeleton = () => {
  return (
    <div className="p-4 hidden lg:flex items-center justify-between w-full gap-x-2">
      <Skeleton className="h-5 w-[80px] rounded-full" />
      <Skeleton className="h-7 w-7 rounded-full" />
    </div>
  )
}