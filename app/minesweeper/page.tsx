'use client';
import { useState } from "react";
import Board from "./Board";

export default function MineSweeper() {
  const [boardSize, setBoardSize] = useState<number | null>(null);
  const [minesNumber, setMinesNumber] = useState<number | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBoardSize(((e.target as HTMLFormElement).elements['0'] as HTMLFormElement).valueAsNumber)
    setMinesNumber(((e.target as HTMLFormElement).elements['1'] as HTMLFormElement).valueAsNumber)
  }
  const inputClass ="p-1 m-2 border-2 border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-300"
  return (
    <div className="flex flex-col content-center justify-center items-center">
      <h3 className="text-2xl text-center font-bold text-slate-800 py-2">Minesweeper</h3>
      <form className="flex flex-wrap justify-center content-center items-center" onSubmit={(e) => handleSubmit(e)}>
          <input
            className={inputClass}
            type="number"
            name="boardSize"
            max={12}
            placeholder="Size of Board"
          />
          <input
            className={inputClass}
            type="number"
            name="minesNumber"
            min={1}
            placeholder="Number of Mines"
          />
        <button className="w-32 py-1 bg-slate-600 text-white border-2 border-slate-200 rounded-xl" type="submit">Start Game</button>
      </form>
      {
        boardSize && minesNumber ?
          <Board size={boardSize!} mines={minesNumber!} />
          : null
      }
    </div>
  )
}
