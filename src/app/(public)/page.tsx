import Home from '@/components/Home';

export default function IndexPage() {
  return <Home />;

}

console.log("SUPABASE URL =", process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log("SUPABASE KEY =", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
