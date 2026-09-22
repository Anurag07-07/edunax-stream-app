import { Thumbnail, ThumbnailSkeleton } from '@/components/thumbnail'
import { Skeleton } from '@/components/ui/skeleton'
import { UserAvatar, UserAvatarSkeleton } from '@/components/UserAvatar'
import { User } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import { ArrowUpRight, Radio } from 'lucide-react'

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
      <div className="stream-card group overflow-hidden rounded-2xl">
        {/* Thumbnail */}
        <Thumbnail
          src={data.thumbnailUrl}
          fallback={data.user.imageUrl}
          isLive={data.isLive}
          username={data.user.username}
        />

        {/* Info */}
        <div className="flex items-start gap-x-3 p-4">
          <UserAvatar
            username={data.user.username}
            imageUrl={data.user.imageUrl}
            isLive={data.isLive}
          />
          <div className="flex flex-col text-sm overflow-hidden">
            <p className="truncate text-sm font-semibold text-slate-100 transition-all duration-200 group-hover:text-cyan-100">
              {data.name}
            </p>
            <p className="mt-1 truncate text-xs text-slate-500">
              {data.user.username}
            </p>
            <div className="mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              {data.isLive ? <><Radio className="h-3 w-3 text-rose-400" /> Live room</> : <>Replay ready</>}
            </div>
          </div>
          <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-200" />
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