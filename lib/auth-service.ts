import { currentUser } from "@clerk/nextjs/server"
import { db } from "./db"

/**
 * Gets the currently logged-in user from DB.
 * Auto-creates the user + stream if they signed up but webhook didn't fire yet.
 * This is the safety net for both local dev and production.
 */
export const getSelf = async () => {
  const self = await currentUser()

  if (!self || !self.username) {
    throw new Error("Unauthorized")
  }

  // Upsert: create user in DB if not exists, update profile if already exists
  const user = await db.user.upsert({
    where: {
      externalUserId: self.id,
    },
    update: {
      username: self.username,
      imageUrl: self.imageUrl,
    },
    create: {
      externalUserId: self.id,
      username: self.username,
      imageUrl: self.imageUrl,
      stream: {
        create: {
          name: `${self.username}'s stream`,
        },
      },
    },
  })

  return user
}

/**
 * Gets a user by their username (used by the creator dashboard layout).
 * Also verifies the logged-in user owns this profile.
 */
export const getSelfByUsername = async (username: string) => {
  const self = await currentUser()

  if (!self || !self.username) {
    throw new Error("Unauthorized")
  }

  // Auto-sync the logged-in user's own data first
  await getSelf()

  // Now find the user by username
  const user = await db.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    throw new Error("User Not Found")
  }

  // Make sure the logged-in user is the owner of this profile
  if (self.username !== user.username) {
    throw new Error("Unauthorized")
  }

  return user
}