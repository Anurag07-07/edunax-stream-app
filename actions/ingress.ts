"use server"

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
  TrackSource,
  IngressVideoOptions,
  IngressAudioOptions,
} from 'livekit-server-sdk'

import { db } from '@/lib/db'
import { getSelf } from '@/lib/auth-service'
import { revalidatePath } from 'next/cache'

const LIVEKIT_API_URL = process.env.LIVEKIT_API_URL || process.env.LIVEKIT_URL!
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!

const roomService = new RoomServiceClient(
   LIVEKIT_API_URL,
  LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET
)

const ingressClient = new IngressClient(LIVEKIT_API_URL)

export const resetIngress = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  })

  const rooms = await roomService.listRooms([hostIdentity])

  for (const room of rooms) {
    await roomService.deleteRoom(room.name)
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId)
    }
  }
}
export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf()

  if (self instanceof Error) {
    throw new Error(`Could not retrieve current user`)
  }

  await resetIngress(self.externalUserId)

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.externalUserId,
    participantName: self.username,
    participantIdentity: self.externalUserId,
  }

  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true
  } else {
    options.video = new IngressVideoOptions( {
      source: TrackSource.CAMERA,
      encodingOptions:{
        case:'preset',
        value:IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
      }
    })
    options.audio = new IngressAudioOptions( {
      source: TrackSource.MICROPHONE,
      encodingOptions:{
        case:'preset',
        value:IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
      }
    })
  }

  const ingress = await ingressClient.createIngress(ingressType, options)

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error('Failed to create ingress')
  }

  await db.stream.update({
    where: {
      userId: self.id, // DB primary key (uuid) — correct here
    },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  })

  revalidatePath(`/u/${self.username}/keys`)
  return {
    ingressId: ingress.ingressId,
    url: ingress.url,
    streamKey: ingress.streamKey,
  }
}

