import { Radio, WifiOff } from "lucide-react"

interface OfflineVideoProps{
    username:string;
}

export const OfflineVideo=({
    username
}:OfflineVideoProps)=>{
    return (
        <div className="relative flex h-full flex-col items-center justify-center gap-4 overflow-hidden bg-[#07090d] text-center">
            <div className="absolute h-48 w-48 rounded-full border border-cyan-200/10 shadow-[0_0_80px_rgba(103,232,249,0.08)]" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-slate-400"><WifiOff className="h-6 w-6" /></div>
            <div className="relative"><p className="text-sm font-semibold text-slate-200">{username} is offline</p><p className="mt-1 text-xs text-slate-500">This room will appear here when the signal returns.</p></div>
            <div className="relative mt-1 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-600"><Radio className="h-3 w-3" /> Signal paused</div>
        </div>
    )
}