import React from 'react'
import { UserAvatar, UserAvatarSkeleton } from '../UserAvatar'
import { VerifiedMark } from '../verified-mark'
import { useParticipants, useTracks } from '@livekit/components-react'
import { Track } from 'livekit-client'
import { Users } from 'lucide-react'
import { Action, ActionsSkeleton } from './Action'
import { Skeleton } from '../ui/skeleton'

interface HeaderProps {
  imageUrl: string
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  isFollowing: boolean
  name: string
}

export const Header = ({
  imageUrl, hostName, hostIdentity, viewerIdentity, isFollowing, name
}: HeaderProps) => {
  const participants = useParticipants()
  // Also detect RTMP/OBS ingress streams (ingress identity ≠ hostIdentity)
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
    Track.Source.ScreenShare,
  ])
  const ingressParticipant = tracks.length > 0 ? tracks[0].participant : null;

  const isLive = tracks.length > 0
  const participantCount = participants.length - 1

  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  return (
    <div className="
      relative px-4 py-4
      rounded-xl mx-4
      cinematic-panel
      border border-white/10
    ">
      {/* Gradient top band */}
      <div className="
        absolute inset-x-0 top-0 h-[2px] rounded-t-xl
        bg-gradient-to-r from-cyan-300 via-indigo-400 to-rose-400
        opacity-80
      " />

      <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start lg:items-center justify-between">
        {/* Left: Avatar + info */}
        <div className="flex items-center gap-x-4">
          <UserAvatar
            imageUrl={imageUrl}
            username={hostName}
            size="lg"
            isLive={isLive}
            showBadge
          />

          <div className="space-y-1">
            {/* Name + verified */}
            <div className="flex items-center gap-x-2">
              <h2 className="text-xl font-bold gradient-text">{hostName}</h2>
              <VerifiedMark />
            </div>

            {/* Stream title */}
            <p className="text-sm text-muted-foreground font-medium">{name}</p>

            {/* Viewer count or offline */}
            {isLive ? (
              <div className="
                inline-flex items-center gap-x-1.5
                px-2.5 py-0.5 rounded-full
                bg-rose-400/10 border border-rose-300/20
                text-rose-300 text-xs font-semibold
              ">
                <Users className="h-3 w-3" />
                <span>
                  {participantCount} {participantCount === 1 ? "viewer" : "viewers"}
                </span>
              </div>
            ) : (
              <div className="
                inline-flex items-center gap-x-1.5
                px-2.5 py-0.5 rounded-full
                bg-muted border border-border
                text-muted-foreground text-xs font-semibold
              ">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                Offline
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions */}
        <Action
          isFollowing={isFollowing}
          hostIdentity={hostIdentity}
          isHost={isHost}
        />
      </div>
    </div>
  )
}

export const HeaderSkeleton = () => {
  return (
    <div className="px-4 py-4 mx-4 rounded-xl glass-card border border-[rgba(139,92,246,0.20)]">
      <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between">
        <div className="flex items-center gap-x-4">
          <UserAvatarSkeleton size="lg" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-36 rounded-full" />
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-4 w-20 rounded-full" />
          </div>
        </div>
        <ActionsSkeleton />
      </div>
    </div>
  )
}