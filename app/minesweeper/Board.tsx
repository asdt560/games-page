'use client';
import { useEffect, useState } from 'react';
import Cell from './Cell';
import Data from './types';
import { getFlags, getHidden, getMines, plantMines, traverseBoard, getNeighbours } from './logic';

interface BoardProps {
  size: number,
  mines: number,
}

export default function Board (props : BoardProps) {
  const {size, mines} = props;
  /* Helper Functions */

  // reveals the whole board
  const revealBoard = () => {
      let updatedData = state.boardData;
      updatedData.map((datarow) => {
          datarow.map((dataitem) => {
              dataitem.isRevealed = true;
          });
      });
      setState({
          ...state,
          boardData: updatedData
      });
  }
  /* reveal logic for empty cell */
  const revealEmpty = (x : number, y : number, data : Data[][]) => {
      let area = traverseBoard(x, y, data, size);
      area.map(value => {
          if (!value.isRevealed && (value.isEmpty || !value.isMine)) {
              data[value.x][value.y].isRevealed = true;
              if (value.isEmpty) {
                  revealEmpty(value.x, value.y, data);
              }
          }
      });
      return data;
  }
  // Gets initial board data
  const initBoardData = (size : number, mines : number) => {
    let data : Data[][] = [];

    for (let i = 0; i < size; i++) {
      data.push([]);
      for (let j = 0; j < size; j++) {
        data[i][j] = {
          x: i,
          y: j,
          isMine: false,
          neighbour: 0,
          isRevealed: false,
          isEmpty: false,
          isFlagged: false,
        };
      }
    }
    data = plantMines(data, size, mines);
    data = getNeighbours(data, size);
    console.log(data);
    return data;
  }
  const [state, setState] = useState({
      boardData: initBoardData(size, mines),
      gameWon: false,
      mineCount: mines,
  });
    // Handle User Events
    const handleCellClick = (x : number, y : number) => {
        let win = false;
        // check if revealed. return if true.
        if (state.boardData[x][y].isRevealed) return null;
        // check if mine. game over if true
        if (state.boardData[x][y].isMine) {
            revealBoard();
            alert("game over");
        }
        let updatedData = state.boardData;
        updatedData[x][y].isFlagged = false;
        updatedData[x][y].isRevealed = true;

        if (updatedData[x][y].isEmpty) {
            updatedData = revealEmpty(x, y, updatedData);
        }
        if (getHidden(updatedData).length === mines) {
            win = true;
            revealBoard();
            alert("You Win");
        }
        setState({
            boardData: updatedData,
            mineCount: mines - getFlags(updatedData).length,
            gameWon: win,
        });
    }
    const _handleContextMenu = (e : React.MouseEvent, x : number, y : number) => {
        e.preventDefault();
        let updatedData = state.boardData;
        let mines = state.mineCount;
        let win = false;

        // check if already revealed
        if (updatedData[x][y].isRevealed) return;

        if (updatedData[x][y].isFlagged) {
            updatedData[x][y].isFlagged = false;
            mines++;
        } else {
            updatedData[x][y].isFlagged = true;
            mines--;
        }

        if (mines === 0) {
            const mineArray = getMines(updatedData);
            const FlagArray = getFlags(updatedData);
            win = (JSON.stringify(mineArray) === JSON.stringify(FlagArray));
            if (win) {
                revealBoard();
                alert("You Win");
            }
        }

        setState({
            boardData: updatedData,
            mineCount: mines,
            gameWon: win,
        });
    }

    const renderBoard = (data : Data[][]) => {
        return data.map((datarow) => {
            return datarow.map((dataitem) => {
                return (
                    <div className="h-10 w-10" key={dataitem.x * datarow.length + dataitem.y}>
                        <Cell
                            onClick={() => handleCellClick(dataitem.x, dataitem.y)}
                            cMenu={(e : React.MouseEvent) => _handleContextMenu(e, dataitem.x, dataitem.y)}
                            value={dataitem}
                        />
                        {(datarow[datarow.length - 1] === dataitem) ? <div className="clear" /> : ""}
                    </div>);
            })
        });
    }
    useEffect(() => {
      console.log('hook fires')
        setState({
            boardData: initBoardData(props.size, props.mines),
            gameWon: false,
            mineCount: props.mines,
        });
    }, [props])

  return (
    <div className="content-center justify-center flex flex-col">
      <div className="self-center">
        <span className="info">mines: {state.mineCount}</span><br />
        <span className="info">{state.gameWon ? "You Win" : ""}</span>
      </div>
      <div
        className="w-fit h-fit self-center bg-slate-200"
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${size}, 1fr)`,
          gridTemplateRows: `repeat(${size}, 1fr)`,
        }}
      >
        {
          renderBoard(state.boardData)
        }
      </div>
    </div>
  );
}
