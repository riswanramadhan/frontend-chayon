'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Input } from './Input'
import { Button } from './Button'

export function Newsletter() {
  const supabase = createClient()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const isValidEmail = (e: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.trim())

  const handleSubscribe = async () => {
    const trimmed = email.trim().toLowerCase();
    setError(null);
  
    if (!isValidEmail(trimmed)) {
      setError('Email tidak valid. Coba periksa lagi ya.');
      return;
    }
  
    try {
      setLoading(true);
  
      // INSERT satu baris + kembalikan id biar pasti nulis
      const { data, error: insertError } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: trimmed })
        .select('id')
        .single();
  
      if (insertError) {
        // Deteksi duplicate (email sudah ada) → anggap sukses
        const code = (insertError as any)?.code as string | undefined;
        if (code === '23505' || /duplicate key value/i.test((insertError as any)?.message ?? '')) {
          // Sudah tersimpan sebelumnya → sukses juga
          setSuccess(true);
          setEmail('');
          setTimeout(() => setSuccess(false), 4000);
          setLoading(false);
          return;
        }
  
        // Log detail error supaya kelihatan di console dev
        console.error('Subscribe error detail:', {
          message: (insertError as any)?.message,
          details: (insertError as any)?.details,
          hint: (insertError as any)?.hint,
          code,
        });
        setError('Maaf, terjadi kendala. Coba lagi sebentar ya.');
        setLoading(false);
        return;
      }
  
      // Berhasil insert pertama kali
      if (data?.id) {
        setSuccess(true);
        setEmail('');
        setTimeout(() => setSuccess(false), 4000);
      } else {
        // Edge: tidak ada data balik (harusnya ada karena .select('id').single())
        setError('Maaf, terjadi kendala saat menyimpan. Coba lagi sebentar ya.');
      }
    } catch (e) {
      console.error('Unexpected subscribe error:', e);
      setError('Maaf, terjadi kendala. Coba lagi sebentar ya.');
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (!loading) handleSubscribe()
    }
  }

  return (
    <div className="bg-white py-16 px-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold mb-2">Stay up to date!</h2>
            <p className="text-gray-600">Subscribe to our newsletter to get inbox notifications.</p>
          </div>
          <div className="mt-6 md:mt-0 flex w-full md:w-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="rounded-r-none border-r-0 focus:ring-blue-600 w-full md:w-64"
              value={email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
              onKeyDown={onKeyDown}
              aria-invalid={!!error}
              aria-describedby={error ? 'newsletter-error' : undefined}
              disabled={loading || success}
            />
            <Button
              className="rounded-l-none bg-blue-600 hover:bg-blue-700"
              onClick={handleSubscribe}
              disabled={loading}
              aria-busy={loading}
            >
              {success ? '✓ Kamu sudah berlangganan. Chayon akan menghubungi kamu via email.' : (loading ? 'Memproses…' : 'Subscribe')}
            </Button>
          </div>
        </div>

        {/* Pesan error sederhana (tidak mengubah layout utama) */}
        {error && (
          <p id="newsletter-error" className="mt-3 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}
