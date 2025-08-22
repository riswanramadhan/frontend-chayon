'use client'

import { ChangeEvent } from 'react'

type Props = {
  value: string
  onChange: (v: string) => void
  options: readonly string[]
  label?: string
  required?: boolean
}

export default function CategorySelect({
  value,
  onChange,
  options,
  label,
  required,
}: Props) {
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    onChange(e.target.value)
  }

  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium">{label}</label>}
      <select
        value={value}
        onChange={handleChange}
        required={required}
        className="w-full rounded-xl border border-white/20 bg-transparent p-3 text-black dark:text-white"
      >
        <option value="" disabled>
          Pilih kategori
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  )
}

