// src/app/page.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <Button asChild size="lg">
        <Link href="/floor-plans">Go to Floor Plans</Link>
      </Button>
    </main>
  )
}
