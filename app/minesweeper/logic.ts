import Data from "./types";

// get mines
export const getMines = (data : Data[][]) => {
  let mineArray : Data[] = [];

  data.map(datarow => {
      datarow.map((dataitem) => {
          if (dataitem.isMine) {
              mineArray.push(dataitem);
          }
      });
  });

  return mineArray;
}

// get Flags
export const getFlags = (data : Data[][]) => {
  let mineArray : Data[] = [];

  data.map(datarow => {
      datarow.map((dataitem) => {
          if (dataitem.isFlagged) {
              mineArray.push(dataitem);
          }
      });
  });

  return mineArray;
}

// get Hidden cells
export const getHidden =(data: Data[][]) => {
  let mineArray : Data[] = [];

  data.map(datarow => {
      datarow.map((dataitem) => {
          if (!dataitem.isRevealed) {
              mineArray.push(dataitem);
          }
      });
  });

  return mineArray;
}

// get random number given a dimension
export const getRandomNumber = (dimension : number) => {
  return Math.floor((Math.random() * 1000) + 1) % dimension;
}
// plant mines on the board
export const plantMines = (data : Data[][], size : number, mines : number) => {
  let randomx, randomy, minesPlanted = 0;

  while (minesPlanted < mines) {
      randomx = getRandomNumber(size);
      randomy = getRandomNumber(size);
      if (!(data[randomx][randomy].isMine)) {
          data[randomx][randomy].isMine = true;
          minesPlanted++;
      }
  }
  return (data);
}

// get number of neighbouring mines for each board cell
export const getNeighbours = (data : Data[][], size : number) => {
  let updatedData = data;

  for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
          if (data[i][j].isMine !== true) {
              let mine = 0;
              const area = traverseBoard(data[i][j].x, data[i][j].y, data, size);
              area.map((value : Data) => {
                  if (value.isMine) {
                      mine++;
                  }
              });
              if (mine === 0) {
                  updatedData[i][j].isEmpty = true;
              }
              updatedData[i][j].neighbour = mine;
          }
      }
  }
  return (updatedData);
};
// looks for neighbouring cells and returns them
export const traverseBoard = (x : number, y : number, data : Data[][], size: number) => {
  const el = [];
  //up
  if (x > 0) {
      el.push(data[x - 1][y]);
  }
  //down
  if (x < size - 1) {
      el.push(data[x + 1][y]);
  }
  //left
  if (y > 0) {
      el.push(data[x][y - 1]);
  }
  //right
  if (y < size - 1) {
      el.push(data[x][y + 1]);
  }
  // top left
  if (x > 0 && y > 0) {
      el.push(data[x - 1][y - 1]);
  }
  // top right
  if (x > 0 && y < size - 1) {
      el.push(data[x - 1][y + 1]);
  }
  // bottom right
  if (x < size - 1 && y < size - 1) {
      el.push(data[x + 1][y + 1]);
  }
  // bottom left
  if (x < size - 1 && y > 0) {
      el.push(data[x + 1][y - 1]);
  }
  return el;
}
