const MOVE_RIGHT = "MOVE_RIGHT"

const moveRight = () => ({
	type: MOVE_RIGHT
});

const GlobalState = {
  data: ""
};

const gameReducer = (state = GlobalState, action) => {
  switch (action.type) {
      case "MOVE_RIGHT":
          /**
           * Perform a certain set of operations
           */
          return {
              ...state, data: action.payload
          };

      default:
          return state;
  }
}