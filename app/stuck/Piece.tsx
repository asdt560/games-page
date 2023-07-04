
interface PieceProps {
    form: string
}

const Piece = (props : PieceProps) => {
  let pieceShape = "span 1/span 1";
  if(props.form === "col") {
    pieceShape = "span 2/span 1";
  } else if(props.form === "bar") {
    pieceShape = "span 1/span 2";
  }
    
    return (
        <div 
          className="bg-green-500 rounded-md border-2 border-green-700"
          style={{
            gridArea: pieceShape,
          }}
        >
        </div>
    )
}

export default Piece;
