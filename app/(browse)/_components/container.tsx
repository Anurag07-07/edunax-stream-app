'use client'
import { cn } from '@/lib/utils'
import { useSidebar } from '@/store/use-sidebar'
import React, { ReactNode, useEffect } from 'react'
import { useMediaQuery } from 'usehooks-ts'

const Container = ({children}:{
  children:ReactNode
}) => {
  const matches = useMediaQuery("(max-width:1024px)")
  
  const {collapsed,onCollapse,onExpand} = useSidebar()

  useEffect(()=>{
    if (matches) {
      onCollapse()
    }else{
      onExpand()
    }
  },[matches,onCollapse,onExpand])

    return (
      <div className={cn("flex-1", collapsed ? "ml-[72px]" : "ml-[72px] lg:ml-60")}>
        {children}
      </div>
  )
}

export default Container