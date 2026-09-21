import { getStreams } from '@/lib/feed-service'
import React from 'react'
import { ResultCard, ResultCardSkeleton } from './ResultCard'
import { Skeleton } from '@/components/ui/skeleton'
import { GraduationCap, Flame } from 'lucide-react'

export const Results = async () => {
  const data = await getStreams()

  return (
    <div className="py-6">
      {/* Section header */}
      <div className="flex items-center gap-x-3 mb-6">
        <div className="
          flex items-center justify-center
          w-8 h-8 rounded-lg
          bg-gradient-to-br from-violet-500 to-cyan-500
          shadow-[0_0_12px_rgba(139,92,246,0.40)]
        ">
          <GraduationCap className="h-4 w-4 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold gradient-text">
            Live Sessions
          </h2>
          <p className="text-xs text-muted-foreground">
            Join a class happening right now
          </p>
        </div>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="
          flex flex-col items-center justify-center py-20 gap-y-4
          text-center
        ">
          <div className="
            w-16 h-16 rounded-2xl
            bg-gradient-to-br from-[#7C3AED]/20 to-[#06B6D4]/20
            border border-[rgba(139,92,246,0.25)]
            flex items-center justify-center
          ">
            <Flame className="h-7 w-7 text-muted-foreground" />
          </div>
          <div>
            <p className="font-semibold text-foreground">No streams yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Be the first to go live today!
            </p>
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