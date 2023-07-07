import {
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import gameReducer from "./snake/snakeReducer";
import watcherSagas from "./snake/snakeSaga";
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    gameReducer
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watcherSagas);
export default store;