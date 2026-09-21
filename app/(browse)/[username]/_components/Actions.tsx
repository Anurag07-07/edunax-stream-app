'use client'
import { onBlock, onUnBlock } from '@/actions/block'
import { onFollow, onUnfollow } from '@/actions/follow'
import { Button } from '@/components/ui/button'
import React, { useTransition } from 'react'
import { toast } from 'sonner'

interface ActionProps{
  isFollowing:boolean
  userId:string
  isBlocked:boolean
}

export const Actions = ({isFollowing,userId,isBlocked}:ActionProps) => {

  const [isPending,startTransition] = useTransition()

  console.log(isBlocked);
  

  const handleFollow = ()=>{
    startTransition(()=>{
      onFollow(userId)
      .then((data)=>toast.success(`You are now following ${data.following.username}`))
      .catch(()=>toast.error("Something went Wrong"))
    })
  }

  const handleUnfollow = ()=>{
    startTransition(()=>{
      onUnfollow(userId)
      .then((data)=>toast.success(`You are unfollow ${data.following.username}`))
      .catch(()=>toast.error("Something went Wrong"))
    })
  }

  const onClick = ()=>{
    if (isFollowing) {
      handleUnfollow()
    }else{
      handleFollow()
    }
  }

  const handleUnBlock = ()=>{
    startTransition(()=>{
      onUnBlock(userId)
      .then((data)=>toast.success(`Unblock the ${data.blocked.username}`))
      .catch(()=>toast.error(`Something Went Wrong`))
    }) 
  }

  const handleBlock = ()=>{
    startTransition(()=>{
      onBlock(userId)
      .then((data)=>toast.success(`Blocked the ${data?.blocked.username}`))
      .catch(()=>toast.error(`Something Went Wrong`))
    }) 
  }

  return (
    <>
    <Button disabled={isPending} variant='primary' onClick={onClick}>
      {
        isFollowing ? "Unfollow" : "Follow"
      }
    </Button>

    {/*  Show UNBLOCK if isBlocked is TRUE, otherwise show BLOCK */}
        <Button 
            onClick={isBlocked ? handleUnBlock : handleBlock} 
            disabled={isPending}
        >
            {isBlocked ? "Unblock User" : "Block User"}
        </Button>
    </>
  )
}