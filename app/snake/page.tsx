import CanvasBoard from "./components/CanvasBoard";
import ScoreCard from "./components/ScoreCard";
const Snake = () => {
  return (
    <div className="flex flex-col items-center">
      <h1>Snake</h1>
      <ScoreCard />
      <CanvasBoard height={500} width={1000} />
    </div>
  )
}

export default Snake;