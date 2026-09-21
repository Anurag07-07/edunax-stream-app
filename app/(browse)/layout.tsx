import React, { ReactNode, Suspense } from 'react'
import Navbar from './_components/navbar'
import { Sidebar, SidebarSkeleton } from './_components/sidebar'
import Container from './_components/container'

const BrowseLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {/* pt-[68px] = navbar height */}
      <div className="pt-[68px] flex h-full">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>
          {children}
        </Container>
      </div>
    </>
  )
}

export default BrowseLayout