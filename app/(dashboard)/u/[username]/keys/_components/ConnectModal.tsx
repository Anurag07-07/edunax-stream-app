'use client'
import React, { ElementRef, useRef, useState, useTransition } from 'react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger 
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertTriangle } from 'lucide-react'
import { Select, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SelectContent } from '@radix-ui/react-select'
import { IngressInput } from 'livekit-server-sdk'
import { createIngress } from '@/actions/ingress'
import { toast } from 'sonner'

const RTMP = String(IngressInput.RTMP_INPUT)
const WHIP = String(IngressInput.WHIP_INPUT)

type IngressType = typeof RTMP | typeof WHIP;

export const ConnectModal = () => {
  const closeRef = useRef<ElementRef<"button">>(null)  
  const [isPending,startTransition] = useTransition()
  const [ingressType,setIngressType] = useState<IngressType>(RTMP)
  
  const onSubmit = ()=>{
    startTransition(()=>{
      createIngress(parseInt(ingressType))
      .then(()=>{
        toast.success('Ingress Created');
        closeRef.current?.click()
      })
      .catch(()=>toast.error("Something Went Wrong"))
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'primary'}>
          Generate Connection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Generate Connection
          </DialogTitle>
        </DialogHeader>
        <Select
        value={ingressType}
        onValueChange={(value)=>setIngressType(value)}
        disabled={isPending}
        >
          <SelectTrigger className=' w-full'>
            <SelectValue placeholder={'Ingress Type'}></SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={RTMP}>RTMP</SelectItem>
            <SelectItem value={WHIP}>WHIP</SelectItem>
          </SelectContent>
        </Select>
        <Alert>
          <AlertTriangle className=' h-4 w-4'></AlertTriangle>
          <AlertTitle>Warning !!</AlertTitle>
          <AlertDescription>
            This action will reset all active streams using the current connection
          </AlertDescription>
        </Alert>
        <div className=' flex justify-between'>
          <DialogClose ref={closeRef} asChild>
            <Button variant={'ghost'} >
              Cancel
            </Button>
          </DialogClose>
          <Button
          disabled={isPending}
          onClick={onSubmit}
          variant={'primary'}
          >
            Generate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
