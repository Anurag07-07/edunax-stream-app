import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Skeleton } from "./ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { LiveBadge } from "@/components/live-badge"

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
  username: string
  imageUrl: string
  isLive?: boolean
  showBadge?: boolean
}

const avatarSizes = cva("", {
  variants: {
    size: {
      default: "h-8 w-8",
      lg: "h-14 w-14",
    },
  },
  defaultVariants: {
    size: "default",
  },
})

export const UserAvatar = ({ username, imageUrl, isLive, showBadge, size }: UserAvatarProps) => {
  const canShowBadge = showBadge && isLive

  return (
    <div className="relative shrink-0">
      <Avatar
        className={cn(
          avatarSizes({ size }),
          "transition-all duration-300",
          isLive
            ? "ring-2 ring-rose-500 ring-offset-1 ring-offset-background live-ring"
            : "ring-1 ring-border"
        )}
      >
        <AvatarImage src={imageUrl} className="object-cover" />
        <AvatarFallback className="bg-gradient-to-br from-[#7C3AED] to-[#06B6D4] text-white font-bold text-xs">
          {username[0].toUpperCase()}
          {username[username.length - 1].toUpperCase()}
        </AvatarFallback>
      </Avatar>

      {canShowBadge && (
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
          <LiveBadge />
        </div>
      )}
    </div>
  )
}

type UserAvatarSkeletonProps = VariantProps<typeof avatarSizes>

export const UserAvatarSkeleton = ({ size }: UserAvatarSkeletonProps) => {
  return (
    <Skeleton className={cn("rounded-full", avatarSizes({ size }))} />
  )
}