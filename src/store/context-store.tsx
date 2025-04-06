import { createContext, useReducer, useMemo, ReactNode, Dispatch } from "react";

type Product = {
  id: string;
  name: string;
};

type State = {
  products: Product[];
};

type Action =
  { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "ADD_MORE_PRODUCTS"; payload: Product[] }
  | { type: "SEARCH_PRODUCTS"; payload: Product[] };

type ContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const Context = createContext<ContextType | undefined>(undefined);

const initialVal: State = {
  products: [],
};

const reducer = (state: State, action: Action) => {
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

type ProviderProps = {
  children: ReactNode;
};

const ContextProvider = ({children}: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialVal);

  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export default ContextProvider;
