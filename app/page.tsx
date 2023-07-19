import Image from 'next/image'
import Link from 'next/link';

export default function Home() {
  const linkClass = "border-4 rounded-md border-slate-500 hover:bg-slate-500 hover:text-white transition-colors duration-300 ease-in-out"
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Games</h1>
      <div className="flex">
        <Link className={linkClass} href="/minesweeper">Minesweeper</Link>
        <Link className={linkClass} href="/snake">Snake</Link>
        <Link className={linkClass} href="/hangman">Hangman</Link>
      </div>
    </main>
  )
}
