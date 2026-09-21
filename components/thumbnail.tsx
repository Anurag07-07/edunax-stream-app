import React from 'react'
import { UserAvatar } from './UserAvatar'
import Image from 'next/image'
import { Skeleton } from './ui/skeleton'
import { LiveBadge } from './live-badge'

interface ThumbnailProps {
  src: string | null
  fallback: string
  isLive: boolean
  username: string
}

export const Thumbnail = ({ src, fallback, isLive, username }: ThumbnailProps) => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer overflow-hidden">
      {/* Gradient hover overlay */}
      <div className="
        absolute inset-0 z-10 rounded-xl
        bg-gradient-to-tr from-[#7C3AED]/60 via-transparent to-[#06B6D4]/40
        opacity-0 group-hover:opacity-100
        transition-opacity duration-300
      " />

      {/* Content */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        {src ? (
          <Image
            src={src}
            fill
            alt="Stream thumbnail"
            className="
              object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />
        ) : (
          <div className="
            h-full w-full
            bg-gradient-to-br from-[#13131A] to-[#1E1B4B]
            flex flex-col items-center justify-center gap-y-4
          ">
            <UserAvatar
              size="lg"
              showBadge
              username={username}
              imageUrl={fallback}
              isLive={isLive}
            />
          </div>
        )}
      </div>

      {/* Live badge */}
      {isLive && src && (
        <div className="
          absolute top-2 left-2 z-20
          transition-transform duration-300
          group-hover:translate-x-1 group-hover:-translate-y-1
        ">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

export const ThumbnailSkeleton = () => {
  return (
    <div className="group aspect-video relative rounded-xl cursor-pointer overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  )
}