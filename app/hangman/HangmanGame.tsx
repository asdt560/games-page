"use client";
import { useState, useEffect } from "react";

const HangmanGame = () => {
  const alphabet = [
    "A","B","C","D","E","F","G","H","I","J","K","L","M",
    "N","O","P","Q","R","S","T","U","V","W","X","Y","Z"
  ]
  const wordArr = [["W","O","R","D"]]
  const [word, setWord] = useState<string[] | null>(null)
  const [wrongGuesses, setWrongGuesses] = useState<string[]>([])
  const [correctGuesses, setCorrectGuesses] = useState<string[]>([])
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)

  const startGame = () => {
    setWord(wordArr[Math.floor(Math.random() * wordArr.length)])
  }

  const makeGuess = (letter: string) => () => {
    if(word?.includes(letter)) {
      setCorrectGuesses([...correctGuesses, letter])
    } else {
      setWrongGuesses([...wrongGuesses, letter])
    }
  }

  const alphabetRender = (wrong : string[], correct : string[]) => {
    return alphabet.map((letter, index) => {
      if(wrongGuesses.includes(letter)) return (
        <button key={index} className={wrongClass} disabled>{letter}</button>
      )
      if(correctGuesses.includes(letter)) return (
        <button key={index} className={correctClass} disabled>{letter}</button>
      )
      
      if(gameOver || gameWon) return (
        <button key={index} className={letterClass} disabled>{letter}</button>
      )
      return (
        <button key={index} className={letterClass} onClick={makeGuess(letter)}>{letter}</button>
      )
    })
  }

  const letterClass = "text-2xl text-blue-500 border-2 border-blue-500 rounded-md m-2 p-4"
  const wrongClass = letterClass + " disabled:border-red-500 disabled:text-red-500 disabled:cursor-not-allowed"
  const correctClass = letterClass + " disabled:border-green-500 disabled:text-green-500 disabled:cursor-not-allowed"
  useEffect(() => {
    if(!word) return
    if(wrongGuesses.length >= 6) setGameOver(true)
    if(correctGuesses.length === word.length) setGameWon(true)

  }, [correctGuesses, wrongGuesses, word])
  
  return (
    <div className="flex flex-col items-center">
      {
        gameWon && <div>You Won!</div>
      }
      <div>{wrongGuesses.length > 0 ? wrongGuesses.length : ""}</div>
      <div>
        {/*
        <div className="w-24 h-24 absolute left-16 border-4 border-black rounded-full"></div>
        <div
          className="w-2 h-40 absolute border-4 border-black rounded-full"
          style={
            {
              left: "6.75rem",
              top: "7.4rem",
            }
          }
        ></div>
        <div
          className="w-2 h-36 absolute rotate-45 border-4 border-black rounded-full"
          style={
            {
              left: "3.4rem",
              top: "7.5rem",
            }
          }
        ></div>
        <div
          className="w-2 h-36 absolute border-4 border-black rounded-full rotate-[-45deg]"
          style={
            {
              left: "10rem",
              top: "7.5rem",
            }
          }
        ></div>
        <div
          className="w-2 h-40 absolute border-4 border-black rounded-full rotate-[20deg]"
          style={
            {
              left: "5rem",
              top: "16.8rem",
            }
          }
        ></div>
        <div
          className="w-2 h-40 absolute border-4 border-black rounded-full rotate-[-20deg]"
          style={
            {
              left: "8.5rem",
              top: "16.8rem",
            }
          }
        ></div>
        */}
      </div>
      <div className="flex justify-around w-1/2">
        {
          word?.map((letter, index) => {
            let content = "_"
            if(correctGuesses.includes(letter)) content = letter
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
      <div className="flex w-5/6 flex-wrap items-center justify-center">
        {
          word && alphabetRender(wrongGuesses, correctGuesses)
        }
      </div>
      <button onClick={() => startGame()}>Start</button>
    </div>

  )
}

export default HangmanGame;
