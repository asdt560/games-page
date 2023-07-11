import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Games</h1>
      <Link href="/minesweeper">Minesweeper</Link>
      <Link href="/snake">Snake</Link>
    </main>
  )
}
