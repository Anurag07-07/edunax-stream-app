import { getSelf } from '@/lib/auth-service'
import { getStreamByUserId } from '@/lib/stream-service'
import React from 'react'
import { UrlCard } from './_components/url-card'
import { KeyCard } from './_components/KeyCard'
import { ConnectModal } from './_components/ConnectModal'

const KeysPage = async() => {

  const self = await getSelf()

  if (self instanceof Error) {
    throw new Error("Data is not present")
  }

  const stream = await getStreamByUserId(self.id)

  if (!stream) {
    throw new Error("Stream not found")
  }
  
  return (
    <div className=' p-6'>
      <div className=' flex items-center justify-between mb-4'>
        <h1 className=' text-2xl font-bold'>
          Key & Urls
        </h1>
        <ConnectModal></ConnectModal>
      </div>
      <div className=' space-y-4'>
        <UrlCard value={stream.serverUrl}></UrlCard>
        <KeyCard value={stream.streamKey}></KeyCard>
      </div>
    </div>
  )
}

export default KeysPage