// src/app/auth/callback/route.ts
import { NextResponse } from 'next/server'
import { createRouteClient } from '@/lib/supabase/route'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  if (code) {
    const supabase = createRouteClient()
    await supabase.auth.exchangeCodeForSession(code) // di sini boleh set cookie
  }
  return NextResponse.redirect(new URL('/', req.url))
}
