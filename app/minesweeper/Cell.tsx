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
  let className = "w-10 h-10 border-4 border-slate-400 " + (props.value.isRevealed ? "" : "bg-slate-600 ") + (props.value.isMine ? "bg-red" : "") + (props.value.isFlagged ? "bg-slate-400" : "");
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