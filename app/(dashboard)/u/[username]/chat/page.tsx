import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import React from 'react'
import {ToggleCard} from './_components/ToggleCard'

const ChatPage = async() => {

  const self = await getSelf()

  if (self instanceof Error) {
    throw new Error("Validation Failed")
  }

  const stream = await getStreamByUserId(self.id)

  if (!stream) {
    throw new Error("Stream not Found")
  }

  return (
    <div className=' p-6'>
      <div className=' mb-4'>
        <h1 className=' text-2xl font-bold'>
          Chat Settings
        </h1>
      </div>
      <div className=' space-y-4 '>
        <ToggleCard
        field="isChatEnabled"
        label="Enable Chat"
        value={stream.isChatEnabled}
        ></ToggleCard>
        <ToggleCard
        field="isChatDelayed"
        label="Delay Chat"
        value={stream.isChatDelayed}
        ></ToggleCard>
        <ToggleCard
        field="isChatFollowersOnly"
        label="Must be following to chat"
        value={stream.isChatFollowersOnly}
        ></ToggleCard>
      </div>
    </div>
  )
}

export default ChatPage