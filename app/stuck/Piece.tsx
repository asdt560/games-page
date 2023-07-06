'use client';
import { useRef, useState } from 'react';
interface PieceProps {
    children: React.ReactNode,
    position: {
      x: {
        start: number,
        end: number
      }, y: {
        start: number,
        end: number
      }
    }
}

const Piece = (props : PieceProps) => {
  const [position, setPosition] = useState(props.position);
  const pieceRef = useRef(null);

  const handleDrag = (e : MouseEvent) => {
    setPosition({
      x: {
        start: Math.min(Math.max(0, position.x.start + Math.floor(e.movementX/70)), 5),
        end: Math.min(Math.max(0, position.x.end + Math.floor(e.movementX/70)), 5)
      },
      y: {
        start: Math.min(Math.max(0, position.y.start + Math.floor(e.movementY/70)), 5),
        end: Math.min(Math.max(0, position.y.end + Math.floor(e.movementY/70)), 5)
      }
    });
  };

    return (
        <div 
          className="bg-green-500 rounded-md border-2 border-green-700 z-30"
          style={{
            gridColumn: `${position.x.start}/${position.x.end}`,
            gridRow: `${position.y.start}/${position.y.end}`,
          }}
          ref={pieceRef}
        >
          {position.x.start},{position.x.end},{position.y.start},{position.y.end}
        </div>
    )
}

export default Piece;
