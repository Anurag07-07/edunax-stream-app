'use client'

import { useSidebar } from '@/store/use-sidebar'
import { User } from '@prisma/client'
import React from 'react'
import { UserItem, UserItemSkeleton } from './UserItem'

interface RecommendedProps {
  data: (User & {
    stream: { isLive: boolean } | null
  })[]
}

export const Recommended = ({ data }: RecommendedProps) => {
  const { collapsed } = useSidebar()

  const showLabel = !collapsed && data.length > 0

  return (
    <div className="pb-2">
      {showLabel && (
        <div className="px-4 mb-2 flex items-center gap-x-2">
          <div className="w-1 h-3.5 rounded-full bg-gradient-to-b from-[#7C3AED] to-[#06B6D4]" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Recommended
          </p>
        </div>
      )}
      <ul className="space-y-0.5 px-2">
        {data.map((user) => (
          <UserItem
            key={user.id}
            username={user.username}
            imageUrl={user.imageUrl}
            isLive={user.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  )
}

export const RecommandedSkeleton = () => {
  return (
    <ul className="px-2 space-y-0.5">
      {[...Array(4)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}