import { Product } from "./Product";

export type Products = Product[];

export type ProductsResponseData = {
  products: {
    rows: Products;
    count: number;
  };
};
