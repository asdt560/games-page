'use client';
import React from "react";

function Cell (status : string) {
  
  return (
    <div className={status}></div>
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
        let tile = { 
          element,
          i,
          j,
          mine: minePositions.some(p => p.i === i && p.j === j),
          get status () {
            return element.props.className;
          },
          set status (value) {
            element.props.className = value;
          }
        }
        row.push(tile)
      }
      board.push(row)
    }
    console.log(board)
    return board;
  }
  const getMinePositions = (boardSize : number, minesNumber : number) => {
    interface position {
      i: number,
      j: number
    }
    const minePositions : position[] = []
    while(minePositions.length < minesNumber) {
      const position = {
        i: Math.floor(Math.random() * boardSize),
        j: Math.floor(Math.random() * boardSize)
      }
      if(!minePositions.some(p => p.i === position.i && p.j === position.j)) {
        minePositions.push(position)
      }
    }
    return minePositions;
  }
  const minePositions = getMinePositions(boardSize!, minesNumber!)
  console.log(minePositions)
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
        className={boardSize ? `w-fit grid bg-gray-600` : "board"}
        style={{
          gridTemplateColumns : boardSize ? `repeat(${boardSize}, 45px)` : undefined,
          gridTemplateRows : boardSize ? `repeat(${boardSize}, 45px)` : undefined,
        }}
      >
        {boardSize && minesNumber ?
          createBoard(boardSize, minesNumber).map((row, i) => {
                return (row.map((cell, j) => {
                  return (
                    <div className="justify-self-center self-center h-10 w-10 bg-slate-500 border-white border-2" key={j}>
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
