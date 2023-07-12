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
    (event: React.KeyboardEvent<HTMLCanvasElement>) => {
      if(gameEnded) {
        return;
      }
      if (disallowedDirection) {
        switch (event.key) {
          case "w":
          case "ArrowUp":
            event.preventDefault();
            moveSnake(0, -20, disallowedDirection);
            break;
          case "s":
          case "ArrowDown":
            event.preventDefault();
            moveSnake(0, 20, disallowedDirection);
            break;
          case "a":
          case "ArrowLeft":
          event.preventDefault();
            moveSnake(-20, 0, disallowedDirection);
            break;
          case "d":
          case "ArrowRight":
            event.preventDefault();
            moveSnake(20, 0, disallowedDirection);
            break;
        }
      } else if (
          disallowedDirection !== "LEFT" &&
          disallowedDirection !== "UP" &&
          disallowedDirection !== "DOWN"
        ) {
          if(event.key === "d" || event.key === "ArrowRight") {
            moveSnake(20, 0, disallowedDirection); //Move RIGHT at start
          } else if(event.key === "w" || event.key === "ArrowUp") {
            moveSnake(0, -20, disallowedDirection); //Move UP at start
          } else if(event.key === "s" || event.key === "ArrowDown") {
            moveSnake(0, 20, disallowedDirection); //Move DOWN at start
          }
      }
    },
    [disallowedDirection, gameEnded, moveSnake]
  );

  const resetBoard = useCallback(() => {
    dispatch(resetGame());
    dispatch(scoreUpdates(RESET_SCORE));
    clearBoard(context);
    drawObject(context, snake1, "#91C483");
    drawObject(
      context,
      [generateRandomPosition(width - 20, height - 20)],
      "#676FA3"
    );
    canvasRef.current?.focus();
  }, [context, dispatch, height, snake1, width]);

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
  }, [isConsumed, pos, height, width, dispatch]);

  useEffect(() => {
    //Draw on canvas each time
    setContext(canvasRef.current && canvasRef.current.getContext("2d"));
    clearBoard(context);
    drawObject(context, snake1, "#91C483");
    drawObject(context, [pos], "#676FA3"); //Draws object randomly

    //When the object is consumed
    if (snake1[0].x === pos?.x && snake1[0].y === pos?.y && !isConsumed) {
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
    } else setGameEnded(false);
  }, [context, pos, snake1, height, width, dispatch, handleKeyEvents, isConsumed]);

  return (
    <>
      {
        gameEnded && (
          <div className="absolute top-48 py-24 bg-opacity-50 w-96 h-56 bg-black flex justify-center">
            <p className="text-center text-2xl bg-black text-green-500 w-max font-black px-1">Game Over</p>
          </div>
        )
      }
      <canvas
        autoFocus
        ref={canvasRef}
        className="border-2 outline-green-500 outline-dashed border-green-600 bg-green-100"
        width={width}
        height={height}
        tabIndex={0}
        onKeyDown={(e) => handleKeyEvents(e)}
      />
      <Instruction resetBoard={resetBoard} />
    </>
  );
};

export default CanvasBoard;