import { Suspense } from "react"
import { Results, ResultsSkeleton } from "./_components/Results"
import { currentUser } from "@clerk/nextjs/server"
import { SignUpButton } from "@clerk/nextjs"
import {
  BookOpen, Code2, Brain, Stethoscope, Calculator, Mic2,
  Play, ChevronDown, Zap, Users, Globe, Award,
  GraduationCap, CheckCircle2, ArrowRight, Star, TrendingUp,
} from "lucide-react"
import { DailyInspiration } from "@/components/DailyInspiration"
import { WelcomeMessage } from "@/components/WelcomeMessage"

// ─── Educational Landing Hero ─────────────────────────────
const LandingHero = () => {
  const categories = [
    { icon: Code2,       label: "Web Dev",      color: "from-zinc-800 to-zinc-950",  glow: "rgba(0,0,0,0.30)" },
    { icon: Brain,       label: "DSA & CS",     color: "from-zinc-600 to-zinc-800",  glow: "rgba(0,0,0,0.25)" },
    { icon: Stethoscope, label: "MBBS & Med",   color: "from-zinc-700 to-zinc-900",  glow: "rgba(0,0,0,0.25)" },
    { icon: Calculator,  label: "CA & Finance", color: "from-zinc-500 to-zinc-700",  glow: "rgba(0,0,0,0.20)" },
    { icon: Globe,       label: "Languages",    color: "from-zinc-600 to-zinc-800",  glow: "rgba(0,0,0,0.25)" },
    { icon: BookOpen,    label: "All Subjects", color: "from-zinc-800 to-black",     glow: "rgba(0,0,0,0.30)" },
  ]

  const howItWorks = [
    { step: "01", title: "Sign Up Free",      desc: "Create your account in 30 seconds. No credit card needed.", icon: Zap },
    { step: "02", title: "Start Streaming",   desc: "Go live and teach what you know — DSA, Dev, MBBS, CA, anything!", icon: Mic2 },
    { step: "03", title: "Grow Together",     desc: "Build followers, get feedback, and improve your communication.", icon: TrendingUp },
  ]

  const benefits = [
    "Overcome hesitation & stage fear",
    "Improve communication & language",
    "Build confidence while teaching",
    "Learn by watching expert peers",
    "Get real-time feedback via chat",
    "Grow your academic network",
  ]

  const stats = [
    { value: "5K+",  label: "Student Streamers" },
    { value: "50K+", label: "Learners Joined" },
    { value: "10+",  label: "Subjects Covered" },
    { value: "Free", label: "Always" },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Floating orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="orb orb-1 absolute w-[500px] h-[500px] -top-32 -left-24 opacity-50" />
        <div className="orb orb-2 absolute w-[400px] h-[400px] top-1/2 -right-20 opacity-40" />
        <div className="orb orb-3 absolute w-[350px] h-[350px] bottom-10 left-1/3 opacity-30" />
      </div>

      {/* Subtle grid texture */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(139,92,246,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(139,92,246,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
      }} />

      {/* ══ HERO ══ */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-20 pb-16 min-h-[90vh] justify-center">

        {/* Badge */}
        <div className="
          inline-flex items-center gap-x-2 mb-6
          px-4 py-1.5 rounded-full
          border border-border
          bg-muted/80
          text-xs font-bold text-muted-foreground uppercase tracking-widest
          animate-fade-in-up
        ">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground/40 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
          </span>
          The Student-First Live Learning Platform
        </div>

        {/* Headline */}
        <h1 className="
          animate-fade-in-up animate-delay-100
          font-extrabold tracking-tight leading-[1.05]
          text-4xl sm:text-5xl lg:text-6xl xl:text-7xl
          max-w-5xl mx-auto mb-5
        ">
          <span className="text-foreground">Teach What You Know.</span>
          <br />
          <span className="gradient-text">Learn What You Don&apos;t.</span>
        </h1>

        {/* Sub-headline */}
        <p className="
          animate-fade-in-up animate-delay-200
          text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed
        ">
          Edunax is built for <strong className="text-foreground">students</strong> who want to overcome hesitation,
          improve communication, and build confidence — by teaching live.
          Whether you&apos;re a <strong className="text-foreground">Dev student, MBBS aspirant, CA candidate</strong>,
          or any learner — this platform is for you.
        </p>

        {/* Subject tags */}
        <div className="
          animate-fade-in-up animate-delay-300
          flex flex-wrap justify-center gap-2 mb-8 max-w-lg mx-auto
        ">
          {["DSA", "Web Dev", "MBBS", "CA", "IELTS", "Design", "ML/AI", "Finance"].map((tag) => (
            <span key={tag} className="
              px-3 py-1 rounded-full text-xs font-semibold
              bg-muted border border-border
              text-muted-foreground hover:text-foreground hover:border-foreground/30
              transition-colors duration-150
            ">{tag}</span>
          ))}
        </div>

        {/* CTAs */}
        <div className="animate-fade-in-up animate-delay-400 flex flex-col sm:flex-row items-center gap-3 mb-14">
          <SignUpButton>
            <button className="
              btn-gradient flex items-center gap-x-2
              h-12 px-7 rounded-full text-base font-bold
              shadow-[0_0_28px_rgba(124,58,237,0.45)] cursor-pointer
            ">
              <GraduationCap className="h-4 w-4" /> Start Teaching Free
            </button>
          </SignUpButton>
          <a href="#sessions" className="
            flex items-center gap-x-2 h-12 px-7 rounded-full text-base font-semibold
            border border-border hover:border-[rgba(139,92,246,0.50)]
            bg-muted/40 hover:bg-muted/60 text-foreground
            transition-all duration-300 hover:shadow-[0_0_16px_rgba(139,92,246,0.20)]
          ">
            <Play className="h-4 w-4" /> Browse Sessions
          </a>
        </div>

        {/* Social proof */}
        <div className="animate-fade-in-up animate-delay-500 flex flex-wrap justify-center items-center gap-x-6 gap-y-3 text-sm text-muted-foreground mb-10">
          <div className="flex items-center gap-x-2">
            <div className="flex -space-x-2">
              {["#7C3AED","#06B6D4","#F43F5E","#F59E0B","#10B981"].map((c,i) => (
                <div key={i} className="w-7 h-7 rounded-full border-2 border-background" style={{background:c}} />
              ))}
            </div>
            <span><strong className="text-foreground">50,000+</strong> students joined</span>
          </div>
          <div className="flex items-center gap-x-1">
            {[...Array(5)].map((_,i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}
            <span className="ml-1">Loved by students</span>
          </div>
          <span>🇮🇳 Built for Indian Students</span>
        </div>

        <div className="animate-bounce text-muted-foreground">
          <ChevronDown className="h-6 w-6 mx-auto" />
        </div>
      </div>

      {/* ══ STATS BAR ══ */}
      <div className="
        relative z-10 mx-4 lg:mx-auto max-w-4xl
        grid grid-cols-2 sm:grid-cols-4 gap-px
        rounded-2xl overflow-hidden border border-[rgba(139,92,246,0.20)] mb-20
      ">
        {stats.map((s, i) => (
          <div key={i} className="
            flex flex-col items-center justify-center
            py-6 px-4 text-center glass-card
            hover:bg-[rgba(139,92,246,0.08)] transition-colors duration-200
          ">
            <p className="text-2xl sm:text-3xl font-black gradient-text mb-1">{s.value}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* ══ CATEGORIES ══ */}
      <div className="relative z-10 px-4 lg:px-8 mb-20 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            <span className="gradient-text">Every Subject.</span>{" "}
            <span className="text-foreground">One Platform.</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            No matter what you study — you can teach it, share it, and grow on Edunax.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((cat, i) => (
            <div key={i} className="feature-card rounded-xl p-4 flex flex-col items-center gap-y-2 text-center cursor-default">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${cat.color}`}
                style={{ boxShadow: `0 0 14px ${cat.glow}` }}
              >
                <cat.icon className="h-5 w-5 text-white" />
              </div>
              <p className="text-xs font-bold">{cat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ══ HOW IT WORKS ══ */}
      <div className="relative z-10 px-4 lg:px-8 mb-20 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-black mb-2">
            Start in <span className="gradient-text">3 Simple Steps</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            No fancy setup. No expensive equipment. Just your knowledge and a camera.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {howItWorks.map((s, i) => (
            <div key={i} className="relative feature-card rounded-2xl p-6">
              <div className="
                absolute -top-3 -left-3 w-8 h-8 rounded-full
                bg-gradient-to-br from-[#7C3AED] to-[#06B6D4]
                flex items-center justify-center text-white text-xs font-black
                shadow-[0_0_12px_rgba(124,58,237,0.40)]
              ">{s.step}</div>
              <s.icon className="h-7 w-7 mb-3 text-violet-400" />
              <h3 className="font-bold text-base mb-1">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              {i < 2 && <ArrowRight className="hidden sm:block absolute top-1/2 -right-4 -translate-y-1/2 h-5 w-5 text-muted-foreground/40" />}
            </div>
          ))}
        </div>
      </div>

      {/* ══ BENEFITS ══ */}
      <div className="
        relative z-10 px-4 lg:px-8 mb-20 max-w-5xl mx-auto
        glass-card rounded-2xl border border-[rgba(139,92,246,0.20)] p-8 sm:p-10
      ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Why students <span className="gradient-text">love Edunax</span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Struggling with stage fear? Can&apos;t explain topics clearly in interviews?
              Edunax helps you build confidence by doing the one thing that accelerates
              learning the most — <strong className="text-foreground">teaching others live</strong>.
            </p>
            <SignUpButton>
              <button className="
                btn-gradient flex items-center gap-x-2
                h-10 px-6 rounded-full text-sm font-bold cursor-pointer
                shadow-[0_0_16px_rgba(124,58,237,0.35)]
              ">
                Join Free Today <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </SignUpButton>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-start gap-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5 shrink-0" />
                <p className="text-sm text-foreground font-medium">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Home Page ────────────────────────────────────────────
export default async function Page() {
  const user = await currentUser()

  return (
    <div className="min-h-full hero-bg">
      {/* Landing hero only for guests */}
      {!user && <LandingHero />}

      <div id="sessions" className="max-w-screen-2xl mx-auto px-4 lg:px-6">
        {/* Logged-in: Welcome + Inspiration */}
        {!!user && (
          <div className="pt-6">
            <WelcomeMessage />
            <DailyInspiration />
          </div>
        )}

        {/* Guests: show inspiration above stream grid too */}
        {!user && (
          <div className="mt-4">
            <DailyInspiration />
          </div>
        )}

        {/* Live sessions grid */}
        <Suspense fallback={<ResultsSkeleton />}>
          <Results />
        </Suspense>
      </div>
    </div>
  )
}