import { SignInButton, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { Home, Radio } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { ThemeToggle } from '@/components/ThemeToggle'

const Actions = async () => {
  const user = await currentUser()

  return (
    <div className="flex items-center gap-x-2 ml-4 lg:ml-0 shrink-0">
      {/* ── Home button — always visible ── */}
      <Link
        href="/"
        title="Go to Home"
        className="
          flex items-center justify-center
          w-9 h-9 rounded-xl
          border border-white/10
          bg-white/[0.04] hover:bg-white/[0.10]
          text-muted-foreground hover:text-foreground
          transition-all duration-200
          hover:shadow-[0_0_12px_rgba(139,92,246,0.35)]
          hover:border-[rgba(139,92,246,0.50)]
        "
      >
        <Home className="h-4 w-4" />
      </Link>

      {/* ── Theme toggle ── */}
      <ThemeToggle />

      {/* ── Unauthenticated ── */}
      {!user && (
        <SignInButton>
          <button className="
            btn-gradient
            h-9 px-4 rounded-xl
            text-sm font-semibold
            flex items-center gap-x-1.5
            shadow-[0_0_16px_rgba(124,58,237,0.35)]
            cursor-pointer
          ">
            Sign In
          </button>
        </SignInButton>
      )}

      {/* ── Authenticated ── */}
      {!!user && (
        <div className="flex items-center gap-x-3">
          <Link
            href={`/u/${user.username}`}
            className="
              flex items-center gap-x-1.5
              text-sm font-medium text-muted-foreground
              hover:text-foreground
              transition-colors duration-200
              border border-border hover:border-[rgba(139,92,246,0.50)]
              rounded-full px-3 h-9
              hover:shadow-[0_0_10px_rgba(139,92,246,0.25)]
            "
          >
              <Radio className="h-4 w-4 text-cyan-300" />
            <span className="hidden lg:block">Dashboard</span>
          </Link>

          <UserButton
            appearance={{
              elements: {
                avatarBox: "ring-2 ring-[rgba(139,92,246,0.50)] hover:ring-[rgba(139,92,246,0.85)] transition-all duration-300",
              }
            }}
          />
        </div>
      )}
    </div>
  )
}

export default Actions