import { Suspense } from "react"
import Link from "next/link"
import { currentUser } from "@clerk/nextjs/server"
import { SignUpButton } from "@clerk/nextjs"
import { ArrowUpRight, BookOpen, Code2, Headphones, Play, Radio, Sparkles, Stethoscope } from "lucide-react"
import { getStreams } from "@/lib/feed-service"
import { Results, ResultsSkeleton } from "./_components/Results"
import { DailyInspiration } from "@/components/DailyInspiration"
import { WelcomeMessage } from "@/components/WelcomeMessage"

const categories = [
  { label: "Engineering", icon: Code2 },
  { label: "Medicine", icon: Stethoscope },
  { label: "Finance", icon: Radio },
  { label: "Study rooms", icon: BookOpen },
]

export default async function Page() {
  const [user, streams] = await Promise.all([currentUser(), getStreams()])
  const featured = streams.find((stream) => stream.isLive) ?? streams[0]
  const backdrop = featured?.thumbnailUrl ?? featured?.user.imageUrl

  return (
    <main className="min-h-full pb-20">
      <section className="relative min-h-[580px] overflow-hidden border-b border-white/[0.08]">
        {backdrop && (
          <div className="absolute inset-0 scale-105 bg-cover bg-center opacity-35 blur-[1px]" style={{ backgroundImage: `url(${backdrop})` }} />
        )}
        <div className="hero-sheen absolute inset-0" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,10,0.08),#06070a_92%)]" />

        <div className="relative z-10 mx-auto flex max-w-screen-2xl items-end px-5 pb-16 pt-24 lg:px-12">
          <div className="max-w-3xl animate-fade-in-up">
            <div className="eyebrow mb-5 flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#67e8f9]" />Edunax live network</div>
            <h1 className="max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.04em] text-white sm:text-7xl">Learn in public.<br /><span className="gradient-text">Grow in real time.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">A focused place for students to teach, think out loud, and find the signal in the noise. Drop into a room that is happening now.</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {featured ? (
                <Link href={`/${featured.user.username}`} className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-black transition hover:bg-cyan-100 hover:shadow-[0_0_28px_rgba(103,232,249,0.28)]"><Play className="h-4 w-4 fill-current" /> Watch live</Link>
              ) : (
                <SignUpButton><button className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-bold text-black transition hover:bg-cyan-100 hover:shadow-[0_0_28px_rgba(103,232,249,0.28)]">Join Edunax <ArrowUpRight className="h-4 w-4" /></button></SignUpButton>
              )}
              <Link href="#sessions" className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/[0.06] px-5 text-sm font-semibold text-white backdrop-blur transition hover:border-cyan-200/40 hover:bg-white/[0.1]">Explore rooms <ArrowUpRight className="h-4 w-4 text-cyan-300" /></Link>
            </div>

            {featured && <div className="mt-10 flex items-center gap-4 text-sm text-slate-400"><div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-rose-400 shadow-[0_0_10px_#fb7185]" />Live now</div><span className="text-white/20">/</span><span>{featured.name}</span><span className="text-white/20">/</span><span className="text-slate-300">@{featured.user.username}</span></div>}
          </div>

          <div className="ml-auto hidden w-[300px] shrink-0 lg:block"><div className="cinematic-panel relative overflow-hidden rounded-2xl p-5">
            <div className="mb-12 flex items-center justify-between text-xs text-slate-400"><span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5 text-cyan-300" /> Signal monitor</span><span className="font-mono text-[10px] text-emerald-300">ONLINE</span></div>
            <div className="relative mx-auto flex h-36 w-36 items-center justify-center rounded-full border border-cyan-200/25 bg-cyan-300/[0.06] shadow-[0_0_80px_rgba(103,232,249,0.16)]"><div className="absolute inset-5 rounded-full border border-indigo-300/25" /><div className="absolute inset-10 rounded-full bg-gradient-to-br from-cyan-200 to-indigo-500 shadow-[0_0_35px_rgba(103,232,249,0.6)]" /><Headphones className="relative z-10 h-7 w-7 text-black" /></div>
            <div className="mt-10 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 text-xs"><div><p className="text-slate-500">Rooms active</p><p className="mt-1 text-lg font-bold text-white">{streams.filter((stream) => stream.isLive).length.toString().padStart(2, "0")}</p></div><div><p className="text-slate-500">Network</p><p className="mt-1 text-lg font-bold text-emerald-300">Stable</p></div></div>
          </div></div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-5 lg:px-12">
        {!!user && <div className="pt-8"><WelcomeMessage /><DailyInspiration /></div>}
        {!user && <div className="pt-8"><DailyInspiration /></div>}

        <section className="py-10"><div className="mb-5 flex items-end justify-between"><div><p className="eyebrow mb-2">Find your frequency</p><h2 className="text-2xl font-bold tracking-tight text-white">Browse by intent</h2></div><span className="hidden text-xs text-slate-500 sm:block">A calmer way to discover your next room</span></div><div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categories.map(({ label, icon: Icon }) => <Link key={label} href={`/search?term=${encodeURIComponent(label)}`} className="group cinematic-panel flex items-center gap-3 rounded-xl p-4 transition hover:-translate-y-1 hover:border-cyan-200/30"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-300/10 text-cyan-200"><Icon className="h-4 w-4" /></span><span className="text-sm font-semibold text-slate-200 group-hover:text-white">{label}</span></Link>)}
        </div></section>

        <section id="sessions" className="scroll-mt-24"><Suspense fallback={<ResultsSkeleton />}><Results /></Suspense></section>
      </div>
    </main>
  )
}
