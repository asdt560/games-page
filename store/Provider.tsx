"use client";

import  store  from "./store";
import { Provider } from "react-redux";

const ReduxProvider = ({children}: {children : React.ReactNode}) => {
  console.log(store)
  return <Provider store={store}> {children} </Provider>;
};

export default ReduxProvider;
