'use client'

import React, { useTransition } from 'react'
import { useAuth } from '@clerk/nextjs'
import { Heart, ShieldOff } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { onFollow, onUnfollow } from '@/actions/follow'
import { onBlock } from '@/actions/block'
import { toast } from 'sonner'
import { Skeleton } from '../ui/skeleton'

interface ActionsProps {
  hostIdentity: string
  isFollowing: boolean
  isHost: boolean
}

export const Action = ({ hostIdentity, isFollowing, isHost }: ActionsProps) => {
  const [isPending, startTransition] = useTransition()
  const [isBlockPending, startBlockTransition] = useTransition()
  const router = useRouter()
  const { userId } = useAuth()

  // ── Follow ──────────────────────────────────────────────
  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) => {
          toast.success(`✅ Now following ${data.following.username}!`)
        })
        .catch((err: Error) => {
          // Show the real reason (e.g. "Already following")
          const msg = err?.message || "Something went wrong"
          if (msg === "Already following") {
            toast.info("You are already following this user")
          } else {
            toast.error(msg)
          }
        })
    })
  }

  // ── Unfollow ────────────────────────────────────────────
  const handleUnFollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) => {
          toast.success(`Unfollowed ${data.following.username}`)
        })
        .catch((err: Error) => {
          const msg = err?.message || "Something went wrong"
          if (msg === "Not Following") {
            toast.info("You were not following this user")
          } else {
            toast.error(msg)
          }
        })
    })
  }

  const toggleFollow = () => {
    if (!userId) {
      router.push("/sign-in")
      return
    }
    if (isHost) return

    if (isFollowing) {
      handleUnFollow()
    } else {
      handleFollow()
    }
  }

  // ── Block ───────────────────────────────────────────────
  const handleBlock = () => {
    if (!userId) {
      router.push("/sign-in")
      return
    }
    if (isHost) return

    startBlockTransition(() => {
      onBlock(hostIdentity)
        .then(() => toast.success("🚫 User blocked"))
        .catch((err: Error) => toast.error(err?.message || "Something went wrong"))
    })
  }

  return (
    <div className="flex items-center gap-x-2">
      {/* ── Follow / Unfollow button ── */}
      <button
        disabled={isPending || isHost}
        onClick={toggleFollow}
        className={cn(
          "flex items-center gap-x-2 px-5 h-9 rounded-full text-sm font-semibold transition-all duration-200",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          isFollowing
            ? "bg-muted border border-border text-foreground hover:bg-rose-500/10 hover:border-rose-500/40 hover:text-rose-400"
            : "btn-follow shadow-[0_0_16px_rgba(139,92,246,0.35)]"
        )}
      >
        <Heart
          className={cn(
            "h-4 w-4 transition-all duration-200",
            isFollowing ? "fill-rose-400 text-rose-400" : "fill-none text-white"
          )}
        />
        <span>{isFollowing ? "Unfollow" : "Follow"}</span>
      </button>

      {/* ── Block button (hidden for host) ── */}
      {!isHost && (
        <button
          disabled={isBlockPending}
          onClick={handleBlock}
          title="Block this user"
          className="
            flex items-center gap-x-1.5 px-4 h-9 rounded-full
            text-sm font-semibold
            btn-block
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          <ShieldOff className="h-4 w-4" />
          <span className="hidden sm:block">Block</span>
        </button>
      )}
    </div>
  )
}

export const ActionsSkeleton = () => {
  return (
    <div className="flex items-center gap-x-2">
      <Skeleton className="h-9 w-28 rounded-full" />
      <Skeleton className="h-9 w-20 rounded-full" />
    </div>
  )
}