'use server'

import { getSelf } from "@/lib/auth-service"
import { BlockUser, unBlockUser } from "@/lib/block-service"
import { RoomServiceClient } from "livekit-server-sdk"
import { revalidatePath } from "next/cache"

/**
 * 
 * Handles blocking a user.
 * 
 * 1. Calls the BlockUser service to create a block record.
 * 2. Revalidates relevant pages to reflect the change.
 * 3. Gracefully handles all possible errors.
 *
 * @param id - The ID of the user to block
 */

const LIVEKIT_API_URL = process.env.LIVEKIT_API_URL || process.env.LIVEKIT_URL!
const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY!
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET!

const roomService = new RoomServiceClient(
   LIVEKIT_API_URL,
  LIVEKIT_API_KEY,
  LIVEKIT_API_SECRET
)


export const onBlock = async (id: string) => {
    const self = await getSelf()

    if (self instanceof Error) {
      throw new Error(`User is not validated`)
    }

    let blockedUser;
    try {
      blockedUser = await BlockUser(id)
    } catch {
      //This means user is a guest      
    }

    try{
      await roomService.removeParticipant(self.id,id)
    }catch{
      //This means user is not in the room
    }

    revalidatePath(`/u/${self.username}/community`)

    return blockedUser
}

/**
 * ✅ Handles unblocking a user.
 *
 * 1. Calls the unBlockUser service to remove a block record.
 * 2. Revalidates affected pages to refresh the state.
 * 3. Includes robust error handling for reliability.
 *
 * @param id - The ID of the user to unblock
 */
export const onUnBlock = async (id: string) => {
  try {
    if (!id) throw new Error("Invalid user ID")

    // Call service to remove the block record
    const unblockedUser = await unBlockUser(id)
    if (!unblockedUser) throw new Error("Failed to unblock user")

    // 🔄 Revalidate both the homepage and the unblocked user’s profile
    revalidatePath("/")
    revalidatePath(`/${unblockedUser.blocked.username}`)

    return unblockedUser
  } catch (error) {
    console.error("❌ onUnBlock error:", error)
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong while unblocking the user"
    )
  }
}
