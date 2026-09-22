"use server"

import { db } from "@/lib/db"

export type PersistedChatMessage = {
  id: string
  message: string
  timestamp: number
  from: {
    identity: string
    name: string
  }
}

export const getChatMessages = async (streamId: string): Promise<PersistedChatMessage[]> => {
  const messages = await db.chatMessage.findMany({
    where: { streamId },
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  return messages.reverse().map((message) => ({
    id: message.id,
    message: message.content,
    timestamp: message.createdAt.getTime(),
    from: {
      identity: message.authorIdentity,
      name: message.authorName,
    },
  }))
}

export const saveChatMessage = async (values: {
  streamId: string
  content: string
  authorIdentity: string
  authorName: string
}) => {
  const content = values.content.trim()
  if (!content || content.length > 500) return null

  const message = await db.chatMessage.create({
    data: {
      streamId: values.streamId,
      content,
      authorIdentity: values.authorIdentity,
      authorName: values.authorName,
    },
  })

  return {
    id: message.id,
    message: message.content,
    timestamp: message.createdAt.getTime(),
    from: {
      identity: message.authorIdentity,
      name: message.authorName,
    },
  }
}