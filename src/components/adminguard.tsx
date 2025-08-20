'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const supabase = createClient()
  const router = useRouter()
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    const run = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return router.replace('/login')
      const { data: profile } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', user.id)
        .single()
      if (!profile?.is_admin) return router.replace('/')
      setOk(true)
    }
    run()
  }, [router, supabase])

  if (ok === null) {
    return <div className="p-6 text-white/70">Memeriksa akses…</div>
  }
  return <>{children}</>
}
