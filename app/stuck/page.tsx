import StuckBase from './StuckBase'

const Stuck = () => {
    return (
        <div className="flex flex-col items-center">
            <h1>Stuck</h1>
            <p>Move the Red piece to the exit.</p>
            <StuckBase></StuckBase>
        </div>
    )
}

export default Stuck;