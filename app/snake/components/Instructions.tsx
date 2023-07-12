
export interface IInstructionProps {
  resetBoard: () => void;
}
const Instruction = ({ resetBoard }: IInstructionProps) => (
  <div>
    <h3>
      How to Play
    </h3>
    <div>
        <span>
          Use W to Turn Up, A to Turn Left, S to Turn Down and D to Turn Right
        </span>
      <div>
        <button onClick={() => resetBoard()}>Reset game</button>
      </div>
    </div>
  </div>
);

export default Instruction;