import { cn, stringToColor } from '@/lib/utils'
import React, { startTransition, useTransition } from 'react'
import { Hint } from '../hint'
import { Button } from '../ui/button'
import { MinusCircle } from 'lucide-react'
import { onBlock } from '@/actions/block'
import { toast } from 'sonner'

interface CommunityItemProps{
  hostName:string,
  viewerName:string,
  participantName:string | undefined,
  participantIdentity:string
}

export const CommunityItem = ({hostName,viewerName,participantIdentity,participantName}:CommunityItemProps) => {
  const color = stringToColor(participantName || "")
  const isSelf = participantName === viewerName
  const isHost = viewerName === hostName

  const [isPending,startTransition] = useTransition()
  
  const handleBlock = ()=>{
    if (!participantName || isSelf || !isHost) {
      return;
    }

    startTransition(()=>{
      onBlock(participantIdentity)
      .then(()=>toast.success(`Blocked ${participantName}`))
      .catch(()=>toast.error(`Something went Wrong`)) 
    })
  }
  
  return (
    <div className={cn(
      "group flex items-center justify-between w-full p-2 rounded-md text-sm hover:bg-white/5",isPending
    )}>
      <p style={{color:color}}>
        {participantName}
      </p>
      {
        isHost && !isSelf && (
          <Hint label='Block'>
            <Button variant={'ghost'} disabled={isPending} onClick={handleBlock} className=' h-auto w-auto p-1 opacity-0 group-hover:opacity-100 transition'>
              <MinusCircle className=' h-4 w-4 text-muted-foreground'></MinusCircle>
            </Button>
          </Hint>
        )
      }
    </div>
  )
}
