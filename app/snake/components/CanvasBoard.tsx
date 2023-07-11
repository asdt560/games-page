"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseSnake,
  INCREMENT_SCORE,
  makeMove,
  MOVE_DOWN,
  MOVE_LEFT,
  MOVE_RIGHT,
  MOVE_UP,
  resetGame,
  RESET_SCORE,
  scoreUpdates,
  stopGame,
} from "../../../store/snake/snakeActions";
import { IGlobalState } from "../../../store/store";
import {
  clearBoard,
  drawObject,
  generateRandomPosition,
  hasSnakeCollided,
  IObjectBody,
} from "../utils";
import Instruction from "./Instructions";

export interface ICanvasBoard {
  height: number;
  width: number;
}
const CanvasBoard = ({ height, width }: ICanvasBoard) => {
  const dispatch = useDispatch();
  const snake1 = useSelector((state: IGlobalState) => state.snakeReducer.snake);
  const disallowedDirection = useSelector(
    (state: IGlobalState) => state.snakeReducer.disallowedDirection
  );
  const [gameEnded, setGameEnded] = useState<boolean>(false);
  const [pos, setPos] = useState<IObjectBody>(
    generateRandomPosition(width - 20, height - 20)
  );
  const [isConsumed, setIsConsumed] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  const moveSnake = useCallback(
    (dx = 0, dy = 0, ds: string) => {
      if (dx > 0 && dy === 0 && ds !== "RIGHT") {
        dispatch(makeMove(dx, dy, MOVE_RIGHT));
      }

      if (dx < 0 && dy === 0 && ds !== "LEFT") {
        dispatch(makeMove(dx, dy, MOVE_LEFT));
      }

      if (dx === 0 && dy < 0 && ds !== "UP") {
        dispatch(makeMove(dx, dy, MOVE_UP));
      }

      if (dx === 0 && dy > 0 && ds !== "DOWN") {
        dispatch(makeMove(dx, dy, MOVE_DOWN));
      }
    },
    [dispatch]
  );

  const handleKeyEvents = useCallback(
    (event: KeyboardEvent) => {
      if (disallowedDirection) {
        switch (event.key) {
          case "w":
            moveSnake(0, -20, disallowedDirection);
            break;
          case "s":
            moveSnake(0, 20, disallowedDirection);
            break;
          case "a":
            moveSnake(-20, 0, disallowedDirection);
            break;
          case "d":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN"
        ) {
          if(event.key === "d") {
            moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
          } else if(event.key === "w") {
            moveSnake(0, -20, disallowedDirection); //Move UP at start
          } else if(event.key === "s") {
            moveSnake(0, 20, disallowedDirection); //Move DOWN at start
          }
      }
    },
    [disallowedDirection, moveSnake]
  );

  const resetBoard = useCallback(() => {
    window.removeEventListener("keypress", handleKeyEvents);
    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    clearBoard(context);
    drawObject(context, snake1, "#91C483");
    drawObject(
      context,
      [generateRandomPosition(width - 20, height - 20)],
      "#676FA3"
    ); //Draws object randomly
    window.addEventListener("keypress", handleKeyEvents);
  }, [context, dispatch, handleKeyEvents, height, snake1, width]);

  useEffect(() => {
    //Generate new object
    if (isConsumed) {
      const posi = generateRandomPosition(width - 20, height - 20);
      
      setIsConsumed(false);

      setPos(posi);
      //Increase snake size when object is consumed successfully
      dispatch(increaseSnake());
      //Increment the score
      dispatch(scoreUpdates(INCREMENT_SCORE));
    }
    console.log(isConsumed, pos)
  }, [isConsumed, pos, height, width, dispatch]);

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearBoard(context);
    drawObject(context, snake1, "#91C483");
    drawObject(context, [pos], "#676FA3"); //Draws object randomly

    //When the object is consumed
    if (snake1[0].x === pos?.x && snake1[0].y === pos?.y) {
      setIsConsumed(true);
    }

    if (
      hasSnakeCollided(snake1, snake1[0]) ||
      snake1[0].x >= width ||
      snake1[0].x <= -20 ||
      snake1[0].y <= -20 ||
      snake1[0].y >= height
    ) {
      setGameEnded(true);
      dispatch(stopGame());
      window.removeEventListener("keypress", handleKeyEvents);
    } else setGameEnded(false);
  }, [isConsumed, context, pos, snake1, height, width, dispatch, handleKeyEvents]);

  useEffect(() => {
    window.addEventListener("keypress", handleKeyEvents);
    return () => {
      window.removeEventListener("keypress", handleKeyEvents);
    };
  }, [disallowedDirection, handleKeyEvents]);

  return (
    <>
      {
        gameEnded && (
          <div className="absolute top-60 py-24 bg-opacity-50 w-96 h-56 bg-black flex justify-center">
            <p className="text-center text-2xl bg-black text-green-500 w-max font-black px-1">Game Over</p>
          </div>
        )
      }
      <canvas
        ref={canvasRef}
        className="border-2 border-black"
        width={width}
        height={height}
      />
      <Instruction resetBoard={resetBoard} />
    </>
  );
};

export default CanvasBoard;