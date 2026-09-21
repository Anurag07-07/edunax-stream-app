'use client'

import { useSidebar } from "@/store/use-sidebar"
import { Follow, User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./UserItem"

interface FollowingProps {
  data: (Follow & {
    following: User & {
      stream: { isLive: boolean } | null
    }
  })[]
}

export const Following = ({ data }: FollowingProps) => {
  const { collapsed } = useSidebar()

  if (!data.length) return null

  return (
    <div className="pb-2">
      {!collapsed && (
        <div className="px-4 mb-2 flex items-center gap-x-2">
          <div className="w-1 h-3.5 rounded-full bg-gradient-to-b from-[#06B6D4] to-[#10B981]" />
          <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            Following
          </p>
        </div>
      )}
      <ul className="space-y-0.5 px-2">
        {data.map((follow) => (
          <UserItem
            key={follow.following.id}
            username={follow.following.username}
            imageUrl={follow.following.imageUrl}
            isLive={follow.following.stream?.isLive}
          />
        ))}
      </ul>
    </div>
  )
}

export const FollowingSkeleton = () => {
  return (
    <ul className="px-2 pt-2 space-y-0.5">
      {[...Array(3)].map((_, i) => (
        <UserItemSkeleton key={i} />
      ))}
    </ul>
  )
}