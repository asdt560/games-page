"use client";
import { useState, useEffect, useRef } from "react";

const HangmanGame = () => {
  const alphabet = [
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
    "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
  ]
  const wordArr = [["M", "U", "L", "T", "I", "P", "L", "E"], ["T", "E", "S", "T"], ["H", "A", "N", "G", "M", "A", "N"]]
  const [word, setWord] = useState<string[] | null>(null)
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([])
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const focusRef = useRef<HTMLDivElement>(null)

  const startGame = () => {
    setWord(wordArr[Math.floor(Math.random() * wordArr.length)])
    focusRef.current?.focus()
  }

  const makeGuess = (letter: string) => {
    if (word?.includes(letter)) {
      setCorrectGuesses([...correctGuesses, letter])
    } else {
      setWrongGuesses([...wrongGuesses, letter])
    }
  }

  const alphabetRender = (wrong: string[], correct: string[]) => {
    return alphabet.map((letter, index) => {
      if (wrongGuesses.includes(letter)) return (
        <button key={index} className={wrongClass} disabled>{letter}</button>
      )
      if (correctGuesses.includes(letter)) return (
        <button key={index} className={correctClass} disabled>{letter}</button>
      )

      if (gameOver || gameWon) return (
        <button key={index} className={letterClass} disabled>{letter}</button>
      )
      return (
        <button key={index} className={letterClass} onClick={() => makeGuess(letter)}>{letter}</button>
      )
    })
  }

  const winCheck = (correct: string[], word: string[]) => {
    let won = true
    word.forEach((letter) => {
      if (!correct.includes(letter)) {
        won = false
      };
    })
    setGameWon(won)
  }

  const letterClass = "text-2xl text-blue-500 border-2 border-blue-500 rounded-md m-2 px-2 py-1"
  const wrongClass = letterClass + " disabled:border-red-500 disabled:text-red-500 disabled:cursor-not-allowed"
  const correctClass = letterClass + " disabled:border-green-500 disabled:text-green-500 disabled:cursor-not-allowed"
  useEffect(() => {
    if (!word) return
    if (wrongGuesses.length >= 6) setGameOver(true)
    winCheck(correctGuesses, word)
    focusRef.current?.focus()

  }, [correctGuesses, wrongGuesses, word])


  return (
    <div className="flex flex-col">
      <div className="h-80">
        <div className="h-80 absolute border-4 border-black rounded-full left-32"></div>
        <div className="w-72 absolute border-4 border-black rounded-full left-32"></div>
        <div className="h-14 absolute border-4 border-black left-[25.75rem] rounded-full"></div>
        <div
          className={
            "w-16 h-16 absolute top-[5.4rem] left-96 border-4 rounded-full"
            + (wrongGuesses.length >= 6 ? " border-black" : " border-slate-300")}
        ></div>
        <div
          className={
            "h-24 absolute border-4 top-[9.2rem] left-[25.75rem] rounded-full"
            + (wrongGuesses.length >= 5 ? " border-black" : " border-slate-300")}
        ></div>
        <div
          className={
            "h-20 absolute rotate-45 top-[9.2rem] left-[23.8rem] border-4 rounded-full"
            + (wrongGuesses.length >= 4 ? " border-black" : " border-slate-300")}
        ></div>
        <div
          className={
            "h-20 absolute top-[9.2rem] left-[27.75rem] border-4 rounded-full rotate-[-45deg]"
            + (wrongGuesses.length >= 3 ? " border-black" : " border-slate-300")}
        ></div>
        <div
          className={
            "h-20 top-[14.5rem] left-[24.8rem] absolute border-4 rounded-full rotate-[20deg]"
            + (wrongGuesses.length >= 2 ? " border-black" : " border-slate-300")}
        ></div>
        <div
          className={
            "h-20 absolute top-[14.5rem] left-[26.6rem] border-4 rounded-full rotate-[-20deg]"
            + (wrongGuesses.length >= 1 ? " border-black" : " border-slate-300")}
        ></div>
      </div>
      <div className="h-6">
        {
          gameWon && "You Won!"
        }
        {
          gameOver && "You Lost!"
        }
      </div>
      <div className="flex flex-col items-center">
        <div className="flex justify-around w-1/2">
          {
            word?.map((letter, index) => {
              let content = "_"
              if (correctGuesses.includes(letter)) content = letter
              return (
                <div
                  key={index}
                  className="text-xl"
                >
                  {content}
                </div>
              )
            })
          }
        </div>
        {
          word &&
          <div
            className="flex w-5/6 flex-wrap items-center justify-center"
            ref={focusRef}
            autoFocus
            tabIndex={-1}
            onKeyDown={(e) => {
              console.log("keydown", e.key)
              if (alphabet.includes(e.key.toUpperCase())) {
                makeGuess(e.key.toUpperCase())
              }
            }}
          >
            {
              alphabetRender(wrongGuesses, correctGuesses)
            }
          </div>
        }

        <button onClick={() => startGame()}>Start</button>
      </div>
    </div>

  )
}

export default HangmanGame;
