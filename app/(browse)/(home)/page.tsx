import { Suspense } from "react"
import { Results, ResultsSkeleton } from "./_components/Results"
import { currentUser } from "@clerk/nextjs/server"
import { SignUpButton } from "@clerk/nextjs"
import { Gamepad2, Zap, Users, MessageSquare, Shield, Play, ChevronDown, Star, Tv2 } from "lucide-react"

// ─── Landing Hero (shown to guests) ──────────────────────
const LandingHero = () => {
  const features = [
    {
      icon: Tv2,
      title: "HD Live Streaming",
      desc: "Crystal-clear streams with ultra-low latency powered by LiveKit.",
      color: "from-violet-500 to-purple-700",
      glow: "rgba(124,58,237,0.35)",
    },
    {
      icon: MessageSquare,
      title: "Real-Time Chat",
      desc: "Engage with creators and communities through live chat.",
      color: "from-cyan-500 to-blue-600",
      glow: "rgba(6,182,212,0.30)",
    },
    {
      icon: Users,
      title: "Follow Creators",
      desc: "Never miss a stream. Follow your favourite streamers.",
      color: "from-rose-500 to-pink-600",
      glow: "rgba(244,63,94,0.30)",
    },
    {
      icon: Shield,
      title: "Safe Community",
      desc: "Block & report tools keep the community respectful.",
      color: "from-amber-500 to-orange-500",
      glow: "rgba(245,158,11,0.30)",
    },
  ]

  const stats = [
    { value: "12K+", label: "Streamers" },
    { value: "1M+", label: "Viewers" },
    { value: "50ms", label: "Avg Latency" },
    { value: "99.9%", label: "Uptime" },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb orb-1 absolute w-[500px] h-[500px] -top-32 -left-24 opacity-60" />
        <div className="orb orb-2 absolute w-[400px] h-[400px] top-1/3 -right-20 opacity-50" />
        <div className="orb orb-3 absolute w-[300px] h-[300px] bottom-0 left-1/3 opacity-40" />
      </div>

      {/* Noise texture */}
      <div className="pointer-events-none absolute inset-0 noise-overlay opacity-40" />

      {/* Grid pattern */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.06) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Hero ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 min-h-[85vh]">
        {/* Badge */}
        <div className="
          inline-flex items-center gap-x-2 mb-6
          px-4 py-1.5 rounded-full
          border border-[rgba(139,92,246,0.40)]
          bg-[rgba(139,92,246,0.10)]
          text-xs font-semibold text-violet-400 uppercase tracking-widest
          animate-fade-in-up
        ">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
          </span>
          Now Live — 12,400 Streamers Online
        </div>

        {/* Headline */}
        <h1 className="
          animate-fade-in-up animate-delay-100
          font-extrabold tracking-tight leading-[1.05]
          text-5xl sm:text-6xl lg:text-7xl xl:text-8xl
          max-w-5xl mx-auto mb-6
        ">
          <span className="gradient-text">Stream.</span>{" "}
          <span className="text-foreground">Watch.</span>{" "}
          <span className="gradient-text-warm">Connect.</span>
        </h1>

        {/* Sub-headline */}
        <p className="
          animate-fade-in-up animate-delay-200
          text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10
          leading-relaxed
        ">
          The ultimate game streaming platform where creators thrive and
          communities grow. No ads. No friction. Just pure gaming.
        </p>

        {/* CTA buttons */}
        <div className="
          animate-fade-in-up animate-delay-300
          flex flex-col sm:flex-row items-center gap-4 mb-16
        ">
          <SignUpButton>
            <button className="
              btn-gradient
              flex items-center gap-x-2
              h-13 px-8 rounded-full
              text-base font-bold
              shadow-[0_0_30px_rgba(124,58,237,0.45)]
              cursor-pointer
            ">
              <Zap className="h-4 w-4" />
              Start Streaming Free
            </button>
          </SignUpButton>

          <a
            href="#streams"
            className="
              flex items-center gap-x-2
              h-13 px-8 rounded-full
              text-base font-semibold
              border border-border
              hover:border-[rgba(139,92,246,0.50)]
              bg-muted/40 hover:bg-muted/60
              text-foreground
              transition-all duration-300
              hover:shadow-[0_0_16px_rgba(139,92,246,0.20)]
            "
          >
            <Play className="h-4 w-4" />
            Browse Streams
          </a>
        </div>

        {/* Social proof */}
        <div className="
          animate-fade-in-up animate-delay-400
          flex items-center gap-x-3 text-sm text-muted-foreground
        ">
          <div className="flex -space-x-2">
            {["#7C3AED", "#06B6D4", "#F43F5E", "#F59E0B", "#10B981"].map((color, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-background"
                style={{ background: color }}
              />
            ))}
          </div>
          <div className="flex items-center gap-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>Loved by <strong className="text-foreground">50,000+</strong> gamers</span>
        </div>

        {/* Scroll hint */}
        <div className="animate-bounce mt-14 text-muted-foreground">
          <ChevronDown className="h-6 w-6 mx-auto" />
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="
        relative z-10
        mx-4 lg:mx-auto max-w-4xl
        grid grid-cols-2 sm:grid-cols-4 gap-px
        rounded-2xl overflow-hidden
        border border-[rgba(139,92,246,0.20)]
        mb-20
      ">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="
              flex flex-col items-center justify-center
              py-6 px-4 text-center
              glass-card
              hover:bg-[rgba(139,92,246,0.08)]
              transition-colors duration-200
            "
          >
            <p className="text-2xl sm:text-3xl font-black gradient-text mb-1">{stat.value}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* ── Features ── */}
      <div className="relative z-10 px-4 lg:px-8 mb-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black mb-3">
            Everything you need to{" "}
            <span className="gradient-text">go live</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built for serious streamers and passionate viewers alike.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card rounded-2xl p-6 flex flex-col gap-y-3"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div
                className={`
                  w-11 h-11 rounded-xl flex items-center justify-center
                  bg-gradient-to-br ${f.color}
                `}
                style={{ boxShadow: `0 0 16px ${f.glow}` }}
              >
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="font-bold text-base">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Home page ──────────────────────────────────────────
export default async function Page() {
  const user = await currentUser()

  return (
    <div className="min-h-full hero-bg">
      {/* Landing hero for guests */}
      {!user && <LandingHero />}

      {/* Stream grid */}
      <div
        id="streams"
        className="max-w-screen-2xl mx-auto px-4 lg:px-6"
      >
        {/* Section anchor title for guests */}
        {!user && (
          <div className="flex items-center gap-x-3 mb-2">
            <Gamepad2 className="h-5 w-5 text-violet-400" />
            <h2 className="text-2xl font-black gradient-text">Live Streams</h2>
          </div>
        )}

        <Suspense fallback={<ResultsSkeleton />}>
          <Results />
        </Suspense>
      </div>
    </div>
  )
}