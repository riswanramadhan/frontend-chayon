'use client'

import { useEffect, useRef } from 'react'

interface Props {
  value: string
  onChange: (v: string) => void
}

export default function RichTextEditor({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || ''
    }
  }, [value])

  const exec = (command: string) => {
    document.execCommand(command)
    ref.current?.focus()
  }

  const handleInput = () => {
    if (!ref.current) return
    onChange(ref.current.innerHTML)
  }

  return (
    <div>
      <div className="mb-2 flex gap-1">
        <button
          type="button"
          onClick={() => exec('bold')}
          className="rounded border border-white/20 px-2 py-1 text-sm font-semibold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => exec('italic')}
          className="rounded border border-white/20 px-2 py-1 text-sm italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => exec('underline')}
          className="rounded border border-white/20 px-2 py-1 text-sm underline"
        >
          U
        </button>
        <button
          type="button"
          onClick={() => exec('insertUnorderedList')}
          className="rounded border border-white/20 px-2 py-1 text-sm"
        >
          - List
        </button>
        <button
          type="button"
          onClick={() => exec('insertOrderedList')}
          className="rounded border border-white/20 px-2 py-1 text-sm"
        >
          1. List
        </button>
      </div>
      <div
        ref={ref}
        contentEditable
        className="min-h-[200px] w-full rounded-xl border border-white/20 bg-transparent p-3"
        onInput={handleInput}
      />
      <p className="mt-1 text-xs text-white/50">
        Enter = paragraf baru 
      </p>
    </div>
  )
}
