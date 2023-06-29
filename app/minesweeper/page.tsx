'use client';
import React from "react";
import Board from "./Board";

export default function MineSweeper() {
  const [boardSize, setBoardSize] = React.useState<number | null>(null);
  const [minesNumber, setMinesNumber] = React.useState<number | null>(null);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBoardSize(((e.target as HTMLFormElement).elements['0'] as HTMLFormElement).valueAsNumber)
    setMinesNumber(((e.target as HTMLFormElement).elements['1'] as HTMLFormElement).valueAsNumber)
  }
  return (
    <div className="game">
      <h3 className="title">Minesweeper</h3>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="number"
          name="boardSize"
          max={12}
          placeholder="Size of Board"
        />
        <input
          type="number"
          name="minesNumber"
          min={1}
          placeholder="Number of Mines"
        />
        <button type="submit">Start Game</button>
      </form>
      {
        boardSize && minesNumber ?
        <Board size={boardSize!} mines={minesNumber!} />
        : null
      }
    </div>
  )
}
