// src/app/page.tsx

import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Link href="/floor-plans" className="underline text-lg">Go to Floor Plans</Link>
    </main>
  )
}
