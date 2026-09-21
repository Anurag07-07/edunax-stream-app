"use server"

import {v4} from 'uuid'
import { AccessToken } from 'livekit-server-sdk'

import { getSelf } from '@/lib/auth-service'
import { getUserById } from '@/lib/user-service'
import { isBlockedByUser } from '@/lib/block-service'

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!



export const createViewerToken = async(hostIdentity:string)=>{
  let self;
  try {
    self = await getSelf();
  } catch {
    // Create a guest user if not authenticated
    const id = v4();
    const username = `guest#${Math.floor(Math.random()*1000)}`;
    self = { id, username };
  }

  const host = await getUserById(hostIdentity);

  if (!host) {
    throw new Error(`User not found`);
  }

  const isBlocked = await isBlockedByUser(host.id);

  if (isBlocked) {
    throw new Error(`User is blocked`);
  }

  // Handle both authenticated users and guests
  const userId = self instanceof Error ? v4() : self.externalUserId;
  const username = self instanceof Error ? `guest#${Math.floor(Math.random()*1000)}` : self.username;
  const isHost = !self || self instanceof Error ? false : self.externalUserId === host.externalUserId;

  const token = new AccessToken(
    LIVEKIT_API_KEY,
    LIVEKIT_API_SECRET,
    {
      identity: isHost ? `host-${userId}` : userId,
      name: username
    }
  );

  token.addGrant({ 
    room: hostIdentity,
    roomJoin: true,
    canPublish: false,
    canSubscribe: true,
  });

  return token.toJwt();
}