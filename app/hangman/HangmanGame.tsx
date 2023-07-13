import { useState } from "react";

const HangmanGame = () => {
  const wordArr = ["word"]
  const [word, setWord] = useState(null)
  const [guess, setGuess] = useState(null)
  const [wrongGuesses, setWrongGuesses] = useState(null)
  const [correctGuesses, setCorrectGuesses] = useState(null)
  const [gameOver, setGameOver] = useState(null)
  const [gameWon, setGameWon] = useState(null)
  
  return (
    <div>
      <div>
        <div className="w-24 h-24 absolute left-16 border-4 border-black rounded-full">d</div>
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
      </div>
      <div>
          {

          }
      </div>
    </div>

  )
}

export default HangmanGame;
