import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { Results, ResultsSkeleton } from './_components/Results'

interface SearchPageParams{
  searchParams:{
    term?:string
  }
}

export default function SearchPage({searchParams}:SearchPageParams){
  if (!searchParams.term) {
    redirect("/")
  }
  return (
    <div className=' h-full p-8 max-w-screen-2xl mx-auto'>
      <Suspense fallback={<ResultsSkeleton></ResultsSkeleton>}>
      <Results term={searchParams.term}></Results>
      </Suspense>
    </div>
  )
}
