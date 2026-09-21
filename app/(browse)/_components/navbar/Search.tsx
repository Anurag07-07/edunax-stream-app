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
      className="relative w-full max-w-[340px] lg:max-w-[420px] flex items-center"
    >
      <div className={`
        flex items-center w-full h-10 rounded-full
        border transition-all duration-300
        bg-muted/60 backdrop-blur-sm
        ${focused
          ? "border-[rgba(139,92,246,0.70)] shadow-[0_0_0_3px_rgba(139,92,246,0.15)]"
          : "border-border hover:border-[rgba(139,92,246,0.35)]"
        }
      `}>
        {/* Search icon */}
        <div className="pl-3.5 pr-2 flex items-center shrink-0">
          <SearchIcon className={`h-4 w-4 transition-colors duration-200 ${focused ? "text-violet-400" : "text-muted-foreground"}`} />
        </div>

        <input
          type="text"
          placeholder="Search streamers or games…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="
            flex-1 bg-transparent text-sm text-foreground
            placeholder:text-muted-foreground
            outline-none border-none
            h-full
          "
        />

        {/* Clear button */}
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="pr-2 pl-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Search submit */}
        <button
          type="submit"
          className="
            h-10 px-4 rounded-r-full shrink-0
            bg-gradient-to-r from-[#7C3AED] to-[#06B6D4]
            text-white text-sm font-medium
            hover:opacity-90 transition-opacity
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