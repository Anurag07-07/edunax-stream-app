import React, { ReactNode } from 'react'
import { Logo } from './_components/logo'

const Auth = ({children}:{
  children:ReactNode
}) => {
  return (
    <div className="min-h-screen bg-[#06070a] px-4 py-6 text-white lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0e14] shadow-[0_30px_100px_rgba(0,0,0,0.45)] lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative hidden overflow-hidden border-r border-white/10 p-12 lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_22%_18%,rgba(103,232,249,0.18),transparent_28%),radial-gradient(circle_at_80%_74%,rgba(99,102,241,0.18),transparent_34%)]" />
          <div className="relative"><Logo /></div>
          <div className="relative max-w-lg">
            <p className="eyebrow mb-5">The live learning network</p>
            <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.04em]">Your next idea is better <span className="gradient-text">out loud.</span></h1>
            <p className="mt-6 max-w-md text-sm leading-6 text-slate-400">Join focused rooms, share what you know, and build the confidence to make your thinking visible.</p>
          </div>
          <div className="relative flex items-center gap-3 text-xs text-slate-500"><span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_#6ee7b7]" /> Network status: operational <span className="text-white/20">/</span> EDUNAX 2026</div>
        </section>
        <section className="flex flex-col items-center justify-center px-5 py-10 sm:px-12">
          <div className="mb-8 lg:hidden"><Logo /></div>
          {children}
        </section>
      </div>
    </div>
  )
}

export default Auth