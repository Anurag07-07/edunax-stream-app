import {create} from 'zustand'

interface CraetorSidebarStore{
  collapsed:boolean,
  onExpand:()=>void
  onCollapse:()=>void
}

export const useCreatorSidebar = create<CraetorSidebarStore>((set)=>({
  collapsed:false,
  onExpand:()=>{
    set(()=>({collapsed:false}))
  },
  onCollapse:()=>{
      set(()=>({collapsed:true}))
  },
}))