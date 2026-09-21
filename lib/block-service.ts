import { getSelf } from "./auth-service"
import { db } from "./db"

/**
 * ✅ Checks if the current user (self) is blocked by another user (otherUser)
 * @param id - The id of the other user (the one who might have blocked the current user)
 */
export const isBlockedByUser = async (id: string) => {
  try {
    // Get the currently logged-in user's information
    const self = await getSelf()
    if (!self || self instanceof Error) {
      // If there's no authenticated user, they're a guest - return false
      return false
    }

    // Find the other user by their id
    const otherUser = await db.user.findUnique({ where: { id } })
    if (!otherUser) throw new Error("User Not Found")

    // A user cannot block themselves
    if (self.id === otherUser.id) return false

    // ✅ Check if there is a block record where:
    // blockedId = current user (self)
    // blockerId = other user
    const existingBlock = await db.block.findUnique({
      where: {
        blockedId_blockerId: {
          blockedId: self.id,
          blockerId: otherUser.id,
        },
      },
    })

    // Return true if block record exists
    return !!existingBlock
  } catch (error) {
    console.error("isBlockedByUser error:", error)
    // Return false if any error occurs (safe default)
    return false
  }
}

/**
 * ✅ Blocks another user (current user becomes the blocker)
 * @param id - The id of the user you want to block
 */
export const BlockUser = async (id: string) => {
  // Get the current logged-in user
  const self = await getSelf()
  if (!self || self instanceof Error) throw new Error("Could not retrieve current user")

  // Prevent blocking yourself
  if (self.id === id) throw new Error("Cannot block yourself")

  // Find the user you want to block
  const otherUser = await db.user.findUnique({ where: { id } })
  if (!otherUser) throw new Error("User Not Found")

  // Check if a block already exists between current user and the other user
  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: otherUser.id, // user being blocked
        blockerId: self.id,      // current user (blocker)
      },
    },
  })

  // Prevent duplicate blocks
  if (existingBlock) throw new Error("Already Blocked")

  // ✅ Create a new block record
  const block = await db.block.create({
    data: {
      blockerId: self.id,      // who is blocking
      blockedId: otherUser.id, // who is being blocked
    },
    include: {
      blocked: true,           // include the blocked user's info in the result
    },
  })

  // Return the block record
  return block
}

/**
 * ✅ Unblocks another user (current user removes their block)
 * @param id - The id of the user you want to unblock
 */
export const unBlockUser = async (id: string) => {
  // Get the current logged-in user
  const self = await getSelf()
  if (!self || self instanceof Error) throw new Error("Could not retrieve current user")

  // Find the other user
  const otherUser = await db.user.findUnique({ where: { id } })
  if (!otherUser) throw new Error("User Not Found")

  // Check if a block record exists between current user and other user
  const existingBlock = await db.block.findUnique({
    where: {
      blockedId_blockerId: {
        blockedId: otherUser.id, // user who was blocked
        blockerId: self.id,      // current user who blocked them
      },
    },
  })

  // If there’s no existing block, we can’t unblock
  if (!existingBlock) throw new Error("Not Blocked")

  // ✅ Delete the block record to unblock the user
  const unblock = await db.block.delete({
    where: {
      id: existingBlock.id, // delete by the unique block record id
    },
    include: {
      blocked: true,        // include info of the unblocked user
    },
  })

  // Return the unblocked record
  return unblock
}


// lib/block-service.ts

// ... (your existing functions)

/**
 * ✅ Checks if the current user (self) has blocked another user.
 * @param id - The id of the user being viewed/checked (the one who might be blocked)
 */
export const isBlockingUser = async (id: string) => {
    try {
        const self = await getSelf();
        if (!self || self instanceof Error) return false;

        if (self.id === id) return false;

        // Check if there is a block record where:
        // blockedId = other user (id)
        // blockerId = current user (self)
        const existingBlock = await db.block.findUnique({
            where: {
                blockedId_blockerId: {
                    blockedId: id,       // Profile Owner is the BLOCKED user
                    blockerId: self.id,  // Current Viewer is the BLOCKER
                },
            },
        });

        return !!existingBlock;
    } catch (error) {
        console.error("isBlockingUser error:", error);
        return false;
    }
};

export const getBlockedUsers=async()=>{
    const self=await getSelf();

    if (self instanceof Error) {
      throw new Error(`Not Retriving the data`)
    }

    const blockedUsers=await db.block.findMany({
        where:{
            blockerId:self.id
        },
        include:{
            blocked:true
        }
    })
    return blockedUsers;
}