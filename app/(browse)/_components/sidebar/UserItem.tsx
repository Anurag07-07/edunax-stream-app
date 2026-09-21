import { LiveBadge } from "@/components/live-badge"
import { Skeleton } from "@/components/ui/skeleton"
import { UserAvatar } from "@/components/UserAvatar"
import { cn } from "@/lib/utils"
import { useSidebar } from "@/store/use-sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface UserItemProps {
  username: string
  imageUrl: string
  isLive: boolean | undefined
}

export const UserItem = ({ username, imageUrl, isLive }: UserItemProps) => {
  const pathname = usePathname()
  const { collapsed } = useSidebar()

  const href = `/${username}`
  const isActive = pathname === href

  return (
    <li className="list-none">
      <Link href={href}>
        <div className={cn(
          "flex items-center gap-x-3 px-3 py-2 rounded-xl",
          "transition-all duration-200 group cursor-pointer",
          "hover:bg-[rgba(139,92,246,0.12)]",
          collapsed ? "justify-center" : "justify-start",
          isActive && "bg-[rgba(139,92,246,0.15)] border border-[rgba(139,92,246,0.25)]"
        )}>
          {/* Avatar */}
          <div className={cn(
            "relative shrink-0",
            isActive && "drop-shadow-[0_0_8px_rgba(139,92,246,0.60)]"
          )}>
            <UserAvatar
              imageUrl={imageUrl}
              username={username}
              isLive={isLive}
            />
          </div>

          {/* Username + Live badge */}
          {!collapsed && (
            <>
              <p className={cn(
                "text-sm font-medium truncate flex-1 transition-colors duration-200",
                isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
              )}>
                {username}
              </p>
              {isLive && (
                <LiveBadge className="ml-auto shrink-0" />
              )}
            </>
          )}
        </div>
      </Link>
    </li>
  )
}

export const UserItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-3 px-3 py-2">
      <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
      <div className="flex-1">
        <Skeleton className="h-4 w-full rounded-full" />
      </div>
    </li>
  )
}