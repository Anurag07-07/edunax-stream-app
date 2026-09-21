import React, { FormEvent, useRef, useState, useTransition } from 'react'

import { Dialog,DialogClose,DialogContent,DialogHeader,DialogTitle,DialogTrigger } from '../ui/dialog'

import { Button } from '../ui/button'
import { Textarea } from '../ui/textarea'
import { updateUser } from '@/actions/user'
import { toast } from 'sonner'

interface BioModalProps{
  intialValue:string | null
}

export const BioModel = ({intialValue}:BioModalProps) => {
  const [isPending,startTransition] = useTransition()
  const [value,setValue] = useState(intialValue || "")
  const closeRef = useRef<HTMLButtonElement | null>(null)

  const onSubmit = (e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    startTransition(()=>{
      updateUser({bio:value})
      .then(()=>{
        toast.success("User bio updated")
        closeRef.current?.click()
      })
      .catch(()=>toast.error("Something went wrong"))
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={'link'} size={'sm'} className=' ml-auto'>
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user bio</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className=' space-y-4'>
          <Textarea
           placeholder=' User bio'
           onChange={(e)=>setValue(e.target.value)}
           value={value}
           disabled={isPending}
           className=' resize-none'
          ></Textarea>
          <div className=' flex justify-between'>
            <DialogClose ref={closeRef} asChild>
              <Button type='button' variant={'ghost'}>
                Cancel
              </Button>
            </DialogClose>
            <Button
            disabled={isPending}
            type='submit'
            variant={'primary'}
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
