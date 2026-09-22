'use client'

import qs from 'query-string'
import { FormEvent, useState } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Search = () => {
  const router = useRouter()
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value) return
    const url = qs.stringifyUrl(
      { url: '/search', query: { term: value } },
      { skipEmptyString: true }
    )
    router.push(url)
  }

  const onClear = () => setValue("")

  return (
    <form
      onSubmit={onSubmit}
      className="relative w-full max-w-[260px] lg:max-w-[430px] flex items-center"
    >
      <div className={`
        flex items-center w-full h-10 rounded-xl
        border transition-all duration-250
        ${focused
          /* ── focused: black border + subtle shadow ── */
          ? "border-cyan-300/50 shadow-[0_0_0_3px_rgba(103,232,249,0.08)] bg-background/80"
          /* ── resting: gray border ── */
          : "border-white/10 bg-white/[0.04] hover:border-cyan-200/30 hover:bg-white/[0.07]"
        }
        backdrop-blur-sm
      `}>

        {/* Search icon */}
        <div className="pl-3.5 pr-2 flex items-center shrink-0">
          <SearchIcon className={`
            h-4 w-4 transition-colors duration-200
            ${focused ? "text-foreground" : "text-muted-foreground"}
          `} />
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Search sessions, educators…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="
            flex-1 bg-transparent text-sm text-foreground
            placeholder:text-muted-foreground
            outline-none border-none h-full
          "
        />

        {/* Clear */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="pr-2 pl-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Submit — black in light, white in dark */}
        <button
          type="submit"
          className="
            h-10 px-4 rounded-r-xl shrink-0
            bg-white text-black
            text-sm font-semibold
            hover:opacity-85 active:scale-[0.98]
            transition-all duration-200
            flex items-center gap-1.5
          "
        >
          <SearchIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:block">Search</span>
        </button>
      </div>
    </form>
  )
}

export default Search