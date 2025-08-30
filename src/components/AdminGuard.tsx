'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import BackButton from './BackButton'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const router = useRouter()
  const [ok, setOk] = useState<boolean | null>(null)

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/')
  }

  useEffect(() => {
    const run = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.replace('/login')
        return
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()
      if (error || !data?.is_admin) {
        router.replace('/')
        return
      }
      setOk(true)
    }
    run()
  }, [router, supabase])

  if (ok === null) return <div className="p-6">Memeriksa akses…</div>
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
      <BackButton />
        <button onClick={logout} className="text-sm underline">Logout</button>
      </div>
      {children}
    </div>
  )
}
