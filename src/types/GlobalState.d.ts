import { Products } from "./Products";

export type GlobalState = {
  products: Products;
};

export type ReducerAction =
  | { type: "SET_PRODUCTS"; payload: Products }
  | { type: "ADD_MORE_PRODUCTS"; payload: Products }
  | { type: "SEARCH_PRODUCTS"; payload: Products };
