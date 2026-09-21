import { StreamPlayerSkeleton } from '@/components/stream-player'
import React from 'react'

const CreatorLoading = () => {
  return (
    <div className=' h-full'>
      <StreamPlayerSkeleton></StreamPlayerSkeleton>
    </div>
  )
}

export default CreatorLoading