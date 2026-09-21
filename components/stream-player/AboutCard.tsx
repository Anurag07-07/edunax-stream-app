'use client'

import React from 'react'
import { VerifiedMark } from '../verified-mark'
import { BioModel } from './bio-model'
import { Users } from 'lucide-react'

interface AboutCardProps {
  hostName: string
  hostIdentity: string
  viewerIdentity: string
  bio: string | null
  followedByCount: number
}

export const AboutCard = ({
  hostIdentity, hostName, viewerIdentity, bio, followedByCount
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`
  const isHost = viewerIdentity === hostAsViewer

  const followedByLabel = followedByCount === 1 ? "follower" : "followers"

  return (
    <div className="px-4">
      <div className="
        glass-card rounded-xl
        p-6 lg:p-8
        border border-[rgba(139,92,246,0.20)]
        relative overflow-hidden
      ">
        {/* Gradient accent top */}
        <div className="
          absolute inset-x-0 top-0 h-[2px]
          bg-gradient-to-r from-[#06B6D4] via-[#7C3AED] to-transparent
          opacity-70
        " />

        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-x-2">
            <h3 className="font-bold text-base">
              About{" "}
              <span className="gradient-text">{hostName}</span>
            </h3>
            <VerifiedMark />
          </div>
          {isHost && <BioModel intialValue={bio} />}
        </div>

        {/* Follower count */}
        <div className="
          inline-flex items-center gap-x-2 mb-4
          px-3 py-1.5 rounded-full
          bg-[rgba(139,92,246,0.12)]
          border border-[rgba(139,92,246,0.25)]
        ">
          <Users className="h-3.5 w-3.5 text-violet-400" />
          <span className="text-sm font-bold text-foreground">{followedByCount}</span>
          <span className="text-xs text-muted-foreground">{followedByLabel}</span>
        </div>

        {/* Bio text */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {bio || "This user prefers to keep an air of mystery about them."}
        </p>
      </div>
    </div>
  )
}
