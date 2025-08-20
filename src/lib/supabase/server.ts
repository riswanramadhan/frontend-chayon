// src/lib/supabase/route.ts (opsional, untuk Route Handlers yang boleh set cookie)
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export const createRouteClient = () => {
  const cookieStore = cookies() as any // di Route Handler bisa mutable

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          cookieStore.set({ name, value, ...options })
        },
        remove(name: string, options: any) {
          cookieStore.set({ name, value: '', ...options })
        },
      },
    }
  )
}
