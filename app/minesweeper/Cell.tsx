'use client';
import Data from './types';

interface Cell {
  value: Data,
  onClick: (x : number, y : number) => void,
  cMenu: (e : React.MouseEvent, x : number, y : number) => void,
}

export default function Cell(props : Cell) {
     
  const getValue = () => {
    const {value} = props;
    
    if (!value.isRevealed) {
      return value.isFlagged ? "🚩" : null;
    }
    if (value.isMine) {
      return "💣";
    }
    if (value.neighbour === 0) {
      return null;
    }
    return value.neighbour;
  }
  let className = "w-6 h-6 text-xs align-middle cursor-pointer text-center " + (props.value.isRevealed ? "border-2 border-slate-600 cursor-default" : " bg-slate-600") + (props.value.isMine ? "" : "");
    return (
      <div
        onClick={() => props.onClick(props.value.x, props.value.y)}
        onContextMenu={(e) => props.cMenu(e, props.value.x, props.value.y)}
        className={className}
      >
      {getValue()}
      </div>
    );
  
}