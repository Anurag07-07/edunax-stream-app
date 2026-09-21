import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar, UserAvatarSkeleton } from '@/components/UserAvatar'
import { User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

interface ResultCardProps {
  data: {
    user: User
    isLive: boolean
    name: string
    thumbnailUrl: string | null
  }
}

export const ResultCard = ({ data }: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`} className="block">
      <div className="
        stream-card group
        rounded-xl overflow-hidden
        border border-border
        hover:border-[rgba(139,92,246,0.40)]
        bg-card
      ">
        {/* Thumbnail */}
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />

        {/* Info */}
        <div className="p-3 flex gap-x-3 items-start">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="
              font-semibold truncate
              group-hover:gradient-text
              transition-all duration-200
            ">
              {data.name}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {data.user.username}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export const ResultCardSkeleton = () => {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card">
      <ThumbnailSkeleton />
      <div className="p-3 flex gap-x-3 items-start">
        <UserAvatarSkeleton />
        <div className="flex flex-col gap-y-1.5 flex-1">
          <Skeleton className="h-4 w-3/4 rounded-full" />
          <Skeleton className="h-3 w-1/2 rounded-full" />
        </div>
      </div>
    </div>
  )
}