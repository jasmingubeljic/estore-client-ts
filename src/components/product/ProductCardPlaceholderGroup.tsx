import { FC } from "react";
import ProductCardPlaceholder from "./ProductCardPlaceholder";

interface Props {
  cardQuantity: number;
}

const ProductCardPlaceholderGroup: FC<Props> = ({ cardQuantity }) => {
  const array = [];
  for (let i = 1; i <= cardQuantity; i++) {
    array.push(i);
  }

  return array.map((i) => <ProductCardPlaceholder key={i} />);
};

export default ProductCardPlaceholderGroup;
