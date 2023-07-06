'use client';
import Piece from './Piece'
import Target from './Target'

const StuckBase = () => {
  const startPositions = {
    zero: { x: { start: 1, end: 1 }, y: { start: 1, end: 3 } },
    one: { x: { start: 4, end: 4 }, y: { start: 1, end: 3 } },
    two: { x: { start: 1, end: 1 }, y: { start: 3, end: 5 } },
    three: { x: { start: 2, end: 4 }, y: { start: 3, end: 3 } },
    four: { x: { start: 4, end: 4 }, y: { start: 3, end: 5 } },
    five: { x: { start: 1, end: 1 }, y: { start: 5, end: 5 } },
    six: { x: { start: 4, end: 4 }, y: { start: 5, end: 5 } },
    seven: { x: { start: 2, end: 2 }, y: { start: 4, end: 4 } },
    eight: { x: { start: 3, end: 3 }, y: { start: 4, end: 4 } },
  }
  return (
    <div className="flex flex-col">
      <div className='h-96 relative w-80 bg-yellow-400 border-double border-8 border-yellow-500 rounded-xl z-0'>
        <div className="grid h-full w-full grid-cols-4 grid-rows-5 z-40">
          <Piece position={startPositions.zero}>0</Piece>
          <Target></Target>
          <Piece position={startPositions.one}>1</Piece>
          <Piece position={startPositions.two}>2</Piece>
          <Piece position={startPositions.three}>3</Piece>
          <Piece position={startPositions.four}>4</Piece>
          <Piece position={startPositions.five}>5</Piece>
          <Piece position={startPositions.six}>6</Piece>
          <Piece position={startPositions.seven}>7</Piece>
          <Piece position={startPositions.eight}>8</Piece>
        </div>
        <div className='z-10 absolute flex flex-col items-center justify-end' style={{
          background: 'repeating-linear-gradient(45deg, red, red 10px, transparent, transparent 20px)',
          width: '152px',
          height: '147.2px',
          top: '222px',
          left:'75.5px'
        }}>
          <p className="text-red-600 font-black bg-yellow-500 border-2 border-red-600 p-0.5 rounded-md">EXIT</p>
        </div>
      </div>

      <button type="button">Reset</button>
    </div>
  )
}

export default StuckBase;