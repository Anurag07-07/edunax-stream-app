import { StreamPlayerSkeleton } from '@/components/stream-player'
import React from 'react'

const UserLoading = () => {
  return (
    <div className=' h-full'>
      <StreamPlayerSkeleton></StreamPlayerSkeleton>
    </div>
  )
}

export default UserLoading