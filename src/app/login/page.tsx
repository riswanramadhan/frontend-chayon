'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const supabase = createClient()

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    if (error) setError(error.message)
    else setSent(true)
  }

  return (
    <div className="max-w-md mx-auto mt-20">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      {sent ? <p>Check email kamu ya!</p> : (
        <form onSubmit={login} className="space-y-3">
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email" className="p-2 border w-full rounded" required />
          <button className="bg-black text-white px-4 py-2 rounded">Login</button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </form>
      )}
    </div>
  )
}
