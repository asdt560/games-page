import HangmanGame from "./HangmanGame"

export default function Hangman() {
  return (
    <div className="w-screen h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold">Hangman</h1>
      <HangmanGame />
    </div>
  )
}
