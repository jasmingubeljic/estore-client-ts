import ProductCardPlaceholder from "./ProductCardPlaceholder";

const ProductCardPlaceholderGroup = ({ cardQuantity }) => {
  let array = [];
  for (let i = 1; i <= cardQuantity; i++) {
    array.push(i);
  }

  return array.map((i) => <ProductCardPlaceholder key={i} />);
};

export default ProductCardPlaceholderGroup;
