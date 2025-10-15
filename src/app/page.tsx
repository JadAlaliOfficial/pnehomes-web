// src/app/page.tsx

import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-8">
      <div className="flex flex-col gap-4 items-center">
        <Button asChild size="lg">
          <Link href="/floor-plans">Go to Floor Plans</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="/gallery">Go to Gallery</Link>
        </Button>
      </div>
    </main>
  )
}
