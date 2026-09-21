'use client'

import { ConnectionState, Track } from "livekit-client"
import { useConnectionState, useRemoteParticipant, useTracks } from "@livekit/components-react"
import { OfflineVideo } from "./offline-video"
import { LoadingVideo } from "./loading-video"
import { LiveVideo } from "./live-video"
import { Skeleton } from "../ui/skeleton"

interface VideoProps {
  hostname: string,
  hostIdentity: string
}

export const Video = ({
  hostname,
  hostIdentity
}: VideoProps) => {
  const connectionState = useConnectionState();
  const participant = useRemoteParticipant(hostIdentity)

  // Include Camera, Microphone AND ScreenShare so RTMP/OBS ingress tracks are captured.
  // Also do NOT filter by identity here — ingress participants have a different identity.
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
    Track.Source.ScreenShare,
  ])

  let content;

  // Still connecting to LiveKit room — show spinner
  if (connectionState === ConnectionState.Connecting) {
    content = <LoadingVideo label={connectionState} />
  // Connected, but no participant and no tracks → truly offline
  } else if (connectionState === ConnectionState.Connected && !participant && tracks.length === 0) {
    content = <OfflineVideo username={hostname} />
  // We have a participant OR tracks → show live video
  } else if (participant) {
    content = <LiveVideo participant={participant} />
  // Disconnected from room
  } else {
    content = <LoadingVideo label={connectionState} />
  }

  return (
    <div className=" aspect-video border-b group relative">
      {content}
    </div>
  )
}

export const VideoSkeleton = () => {
  return (
    <div className="aspect-video border-x border-background">
      <Skeleton className="h-full w-full rounded-none" />
    </div>
  );
};