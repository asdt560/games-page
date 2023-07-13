export const clearBoard = (context: CanvasRenderingContext2D | null) => {
  if (context) {
    context.clearRect(0, 0, 1000, 600);
  }
};

export interface IObjectBody {
  x: number;
  y: number;
}

export const drawObject = (
  context: CanvasRenderingContext2D | null,
  objectBody: IObjectBody[],
  fillColor: string,
  strokeStyle = "#146356"
) => {
  if (context) {
    objectBody.forEach((object: IObjectBody, i) => {
      context.fillStyle = fillColor;
      context.strokeStyle = strokeStyle;
      if(i === 0 && objectBody.length > 1) {
        console.log('form the head')
        context.fillStyle = "#71f24e";
        context.beginPath();
        context.arc(object.x + 10, object.y + 10, 12, 0, 2 * Math.PI);
        context.stroke();
        context.fill();
      } else {
        context?.fillRect(object.x, object.y, 20, 20);
        context?.strokeRect(object.x, object.y, 20, 20);
      }
    });
  }
};

function randomNumber(min: number, max: number) {
  let random = Math.random() * max;
  return random - (random % 20);
}
export const generateRandomPosition = (width: number, height: number) => {
  return {
    x: randomNumber(0, width),
    y: randomNumber(0, height),
  };
};

export const hasSnakeCollided = (
  snake: IObjectBody[],
  currentHeadPos: IObjectBody
) => {
  let flag = false;
  snake.forEach((pos: IObjectBody, index: number) => {
    if (
      pos.x === currentHeadPos.x &&
      pos.y === currentHeadPos.y &&
      index !== 0
    ) {
      flag = true;
    }
  });

  return flag;
};