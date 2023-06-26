'use client';
import React from "react";

function Cell (status : string) {
  
  return (
    <div className="cell"></div>
  )
}
export default function MineSweeper() {
  const [boardSize, setBoardSize] = React.useState<number | null>(null);
  const [minesNumber, setMinesNumber] = React.useState<number | null>(null);

  const createBoard = (boardSize : number, minesNumber : number) => {
    const board = []
    const TILE_STATUSES = {
      HIDDEN: 'hidden',
      MINE: 'mine',
      NUMBER: 'number',
      MARKED: 'marked',
    }
    for(let i = 0; i < boardSize; i++) {
      const row = []
      for(let j = 0; j < boardSize; j++) {
        const element = Cell(TILE_STATUSES.HIDDEN)
        row.push({ element, i, j })
      }
      board.push(row)
    }
    return board;
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBoardSize(((e.target as HTMLFormElement).elements['0'] as HTMLFormElement).valueAsNumber)
    setMinesNumber(((e.target as HTMLFormElement).elements['1'] as HTMLFormElement).valueAsNumber)
  }
  return (
    <div>
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
      <div className="subtext">
        Mines Left: {minesNumber}
      </div>
      <div 
        className={boardSize ? `gap-px w-fit grid p-2` : "board"}
        style={{
          gridTemplateColumns : boardSize ? `repeat(${boardSize}, 60px)` : undefined,
          gridTemplateRows : boardSize ? `repeat(${boardSize}, 60px)` : undefined,
        }}
      >
        {boardSize && minesNumber ?
          createBoard(boardSize, minesNumber).map((row, i) => {
                return (row.map((cell, j) => {
                  return (
                    <div className="h-12 w-12 bg-slate-500 border-white border-2" key={j}>
                      {cell.element}
                    </div>
                  )
                }))
          })
        : null}
      </div>
    </div>
  )
}
