import { getStreams } from '@/lib/feed-service'
import React from 'react'
import { ResultCard, ResultCardSkeleton } from './ResultCard'
import { Skeleton } from '@/components/ui/skeleton'
import { Radio, Sparkles } from 'lucide-react'

export const Results = async () => {
  const data = await getStreams()

  return (
    <div className="py-8">
      {/* Section header */}
      <div className="mb-6 flex items-center gap-x-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-rose-300/20 bg-rose-300/10 text-rose-300">
          <Radio className="h-4 w-4" />
        </div>
        <div>
          <p className="eyebrow">Live right now</p>
          <h2 className="text-xl font-bold tracking-tight text-white">Open rooms</h2>
        </div>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="
          flex flex-col items-center justify-center py-20 gap-y-4
          text-center
        ">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.06]">
            <Sparkles className="h-7 w-7 text-cyan-200" />
          </div>
          <div>
            <p className="font-semibold text-white">The network is quiet</p>
            <p className="mt-1 text-sm text-slate-500">Be the first signal in the room.</p>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5
        gap-4
      ">
        {data.map((result) => (
          <ResultCard key={result.id} data={result} />
        ))}
      </div>
    </div>
  )
}

export const ResultsSkeleton = () => {
  return (
    <div className="py-6">
      <div className="flex items-center gap-x-3 mb-6">
        <Skeleton className="h-8 w-8 rounded-lg" />
        <div className="space-y-1">
          <Skeleton className="h-5 w-32 rounded-full" />
          <Skeleton className="h-3 w-48 rounded-full" />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {[...Array(8)].map((_, i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    </div>
  )
}