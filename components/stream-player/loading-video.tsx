import { Loader } from "lucide-react"

interface LoadingVideoProps {
    label: string;
}

export const LoadingVideo = ({
    label
}: LoadingVideoProps) => {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#07090d]">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-200/15 bg-cyan-300/[0.06]"><Loader className="h-6 w-6 animate-spin text-cyan-200" /></div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {label}
            </p>
        </div>
    )
}