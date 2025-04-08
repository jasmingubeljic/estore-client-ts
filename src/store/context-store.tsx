import { createContext, useReducer, useMemo, ReactNode } from "react";
import { GlobalState, ReducerAction } from "../types";

type ProviderProps = {
  children: ReactNode;
};

const initialVal: GlobalState = {
  products: [],
};

export const Context = createContext(initialVal);

const reducer = (state: GlobalState, action: ReducerAction) => {
  if (action.type === "SET_PRODUCTS") {
    console.log("SET_PRODUCTS", action.payload);
    return {
      products: action.payload,
    };
  }
  if (action.type === "ADD_MORE_PRODUCTS") {
    return {
      products: [...state.products, ...action.payload],
    };
  }

  if (action.type === "SEARCH_PRODUCTS") {
    console.log("action payload: ", action.payload);
    return {
      products: [...action.payload],
    };
  }
  return state;
};

const ContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialVal);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
