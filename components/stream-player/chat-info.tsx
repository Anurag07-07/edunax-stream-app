'use client'
import React, { useMemo } from 'react'
import { Hint } from '../hint'
import { Info } from 'lucide-react'

interface ChatInfoProps{
  isDelayed:boolean
  isFollowerOnly:boolean
}

export const ChatInfo = ({
  isDelayed,
  isFollowerOnly
}:ChatInfoProps) => {

  const hint = useMemo(()=>{
    if (isFollowerOnly && !isDelayed) {
      return `Only follwers can chat`
    }
    if (isDelayed && !isFollowerOnly) {
      return `Messages are delayed by 3 seconds`
    }
    if (isDelayed && isFollowerOnly) {
      return `Only follwers can chat. Messages are delayed by 3 seconds`
    }

    return "";
  },[isDelayed,isFollowerOnly])
  
  const label = useMemo(()=>{
    if (isFollowerOnly && !isDelayed) {
      return `Followers Only`
    }
    if (isDelayed && !isFollowerOnly) {
      return `Slow Mode`
    }
    if (isDelayed && isFollowerOnly) {
      return `Followers only and slow mode`
    }

    return "";
  },[isDelayed,isFollowerOnly])

  if (!isDelayed || !isFollowerOnly) {
    return null;
  }

  return (
    <div className=' p-2 text-muted-foreground bg-white/5 border border-white/10 rounded-t-md items-center gap-x-2'>
      <Hint label={label}>
        <Info className=' h-4 w-4'></Info>
      </Hint>
      <p className=' text-xs font-semibold'></p>
    </div>
  )
}
