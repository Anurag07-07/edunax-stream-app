import { UserButton } from '@clerk/nextjs'
import { Home, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'

const Actions = () => {
  return (
    <div className="flex items-center gap-x-2">

      {/* ── Home button ── */}
      <Link
        href="/"
        title="Back to Home"
        className="
          flex items-center gap-x-1.5
          h-9 px-3 rounded-full
          text-sm font-medium text-muted-foreground
          hover:text-foreground
          border border-border
          hover:border-[rgba(139,92,246,0.50)]
          bg-muted/60 hover:bg-muted
          transition-all duration-200
          hover:shadow-[0_0_12px_rgba(139,92,246,0.25)]
        "
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:block">Home</span>
      </Link>

      {/* ── Dashboard indicator ── */}
      <div className="
        hidden lg:flex items-center gap-x-1.5
        h-9 px-3 rounded-full
        text-xs font-semibold
        bg-[rgba(139,92,246,0.12)]
        border border-[rgba(139,92,246,0.25)]
        text-violet-400
      ">
        <LayoutDashboard className="h-3.5 w-3.5" />
        <span>Creator Studio</span>
      </div>

      {/* ── Theme toggle ── */}
      <ThemeToggle />

      {/* ── User button ── */}
      <UserButton
        appearance={{
          elements: {
            avatarBox: "ring-2 ring-[rgba(139,92,246,0.50)] hover:ring-[rgba(139,92,246,0.85)] transition-all duration-300",
          }
        }}
      />
    </div>
  )
}

export default Actions