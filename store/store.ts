import {
  configureStore,
} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import snakeReducer from "./snake/snakeReducer";
import watcherSagas from "./snake/snakeSaga";
import { snakeState } from "./snake/snakeReducer";
export interface IGlobalState {
  snakeReducer: snakeState;
}

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    snakeReducer
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watcherSagas);
export default store;