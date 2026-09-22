'use client'

import { ConnectionState, Track } from "livekit-client"
import { useConnectionState, useParticipants, useRemoteParticipant, useTracks } from "@livekit/components-react"
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
  const participants = useParticipants();

  // Named participant (browser-streamer). Will be null for OBS/RTMP ingress.
  const participant = useRemoteParticipant(hostIdentity)

  // Capture ALL remote tracks (camera, mic, screenshare).
  // For RTMP/OBS ingress the ingress participant identity ≠ hostIdentity,
  // so we must not filter by identity here.
  const tracks = useTracks([
    Track.Source.Camera,
    Track.Source.Microphone,
    Track.Source.ScreenShare,
  ])

  // For RTMP ingress: no named participant, but tracks exist —
  // grab the participant from the first available track.
  const ingressParticipant = tracks.length > 0 ? tracks[0].participant : null;

  // Use named participant first, fall back to ingress participant
  const remoteParticipant = participants.find((currentParticipant) => !currentParticipant.isLocal);
  const activeParticipant = participant ?? remoteParticipant ?? ingressParticipant;

  let content;

  if (connectionState === ConnectionState.Connecting) {
    // Still joining the LiveKit room
    content = <LoadingVideo label={connectionState} />
  } else if (connectionState === ConnectionState.Connected && !activeParticipant) {
    // Connected but nobody is streaming → truly offline
    content = <OfflineVideo username={hostname} />
  } else if (activeParticipant) {
    // Either a named host or an ingress participant
    content = <LiveVideo participant={activeParticipant} />
  } else {
    content = <LoadingVideo label={connectionState} />
  }

  return (
    <div className="aspect-video border-b group relative">
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