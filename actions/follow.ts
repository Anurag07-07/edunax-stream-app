"use server"

import { followUser, unfollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache"

/**
 * Follow a user by their ID.
 * Revalidates the home page and user profile.
 */
export const onFollow = async (id: string) => {
  try {
    const followedUser = await followUser(id)

    revalidatePath("/")
    if (followedUser) {
      revalidatePath(`/${followedUser.following.username}`)
    }

    return followedUser
  } catch (error) {
    // Surface the real error message to the client instead of a generic one
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    )
  }
}

/**
 * Unfollow a user by their ID.
 * Revalidates the home page and user profile.
 */
export const onUnfollow = async (id: string) => {
  try {
    const unFollowedUser = await unfollowUser(id)

    revalidatePath("/")
    if (unFollowedUser) {
      revalidatePath(`/${unFollowedUser.following.username}`)
    }

    return unFollowedUser
  } catch (error) {
    // Surface the real error message (e.g. "Not Following") to the client
    throw new Error(
      error instanceof Error ? error.message : "Something went wrong"
    )
  }
}