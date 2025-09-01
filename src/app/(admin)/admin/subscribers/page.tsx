'use client'
import { useEffect, useState } from 'react'
import { AdminGuard } from '@/components/AdminGuard'
import { createClient } from '@/lib/supabase/client'
import { Card } from '@/components/ui/Card'

type Subscriber = {
  id: string
  email: string
  created_at: string | null
}

export default function AdminCourses() {
  const supabase = createClient()
  const [items, setItems] = useState<Subscriber[]>([])

  const load = async () => {
    const { data } = await supabase
      .from('newsletter_subscribers')
      .select('id,email,created_at')
      .order('created_at', { ascending: false })

    setItems(data || [])
  }

  useEffect(() => {
    load()
  }, []) // load sekali saat mount

  return (
    <AdminGuard>
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-semibold">Newsletter Subscribers</h1>
          <p className="text-white/60 text-sm">Daftar email yang berlangganan newsletter Chayon</p>
        </div>

        <Card>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="min-w-full text-sm">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="text-left p-3">Email</th>
                </tr>
              </thead>
              <tbody>
                {items.map((r) => (
                  <tr key={r.id} className="border-b border-white/10">
                    <td className="p-3">{r.email}</td>
                  </tr>
                ))}

                {items.length === 0 && (
                  <tr>
                    {/* hanya 1 kolom → colSpan=1 */}
                    <td className="p-4 text-white/70" colSpan={1}>
                      Belum ada email yang berlangganan.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>

        <p className="text-white/60 text-xs">
          Data email ini dapat digunakan untuk promosi Chayon melalui email atau platform lain.
          Mohon gunakan secara bijak dan jangan menyalahgunakan privasi pengguna.
        </p>
      </div>
    </AdminGuard>
  )
}
