import Piece from './Piece'
import Target from './Target'

const StuckBase = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-4 grid-rows-5 h-96 w-80 bg-yellow-400 border-double border-8 border-yellow-500 rounded-xl">
        <Target></Target>
        <Piece form="col"></Piece>
        <Piece form="col"></Piece>
        <Piece form="col"></Piece>
        <Piece form="col"></Piece>
        <Piece form="bar"></Piece>
        <Piece form="square"></Piece>
        <Piece form="square"></Piece>
        <Piece form="square"></Piece>
        <Piece form="square"></Piece>
      </div>
      <button type="button">Reset</button>
    </div>
  )
}

export default StuckBase;