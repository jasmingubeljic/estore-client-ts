import { useState, useContext, useEffect, useCallback } from "react";
import { Context } from "../store/context-store";
import { detectScreen } from "../utils/devices";
import { getProducts } from "../api/apiCalls";

export default function useFeed() {
  const { state, dispatch } = useContext(Context);
  const [totalProductCount, setTotalProductCount] = useState();
  const [fetching, setFetching] = useState(true);

  let limit = 2;
  if (detectScreen() === "lg") {
    limit = 3 * 1; // limit = product cards * number of rows
  }
  if (["xl", "xxl"].includes(detectScreen())) {
    limit = 5 * 1; // limit = product cards * number of rows
  }

  const onGetProductsSuccess = useCallback(
    ({ products }) => {
      setTotalProductCount(products.count);
      setFetching(false);
      dispatch({ type: "SET_PRODUCTS", payload: products.rows });
    },
    [dispatch]
  );

  const onGetMoreProductsSuccess = useCallback(
    ({ products }) => {
      setTotalProductCount(products.count);
      dispatch({ type: "ADD_MORE_PRODUCTS", payload: products.rows });
      setFetching(false);
    },
    [dispatch]
  );

  const getMoreProductsHandler = useCallback(() => {
    if (state.products.length === totalProductCount) {
      return;
    }
    setFetching(true);
    getProducts(state.products.length, limit, onGetMoreProductsSuccess, (err) => console.log(err));
  }, [state, onGetMoreProductsSuccess, totalProductCount, limit]);

  useEffect(() => {
    setFetching(true);
    getProducts(null, limit, onGetProductsSuccess, (err) => console.log(err));
  }, [limit, onGetProductsSuccess]);

  return {
    fetching,
    state,
    limit,
    totalProductCount,
    getMoreProductsHandler,
  };
}
