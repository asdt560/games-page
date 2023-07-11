
export interface IInstructionProps {
  resetBoard: () => void;
}
const Instruction = ({ resetBoard }: IInstructionProps) => (
  <div>
    <h3>
      How to Play
    </h3>
    <h3>
    NOTE: Start the game by pressing d
    </h3>
    <div>
      <div>
        <span>
          w Move Up
        </span>
        <span>
          a Move Left
        </span>
        <span>
          s Move Down
        </span>
        <span>
          d Move Right
        </span>
      </div>
      <div>
        <button onClick={() => resetBoard()}>Reset game</button>
      </div>
    </div>
  </div>
);

export default Instruction;