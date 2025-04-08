import { useEffect, useState, FC } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { queryProducts } from "../../api/apiCalls";
import ProductCard from "../product/ProductCard";
import Row from "react-bootstrap/Row";
import ProductCardPlaceholderGroup from "../product/ProductCardPlaceholderGroup";
import useFeed from "../../hooks/useFeed";
import { debounce } from "../../utils/misc";
import { ProductsResponseData, Products, ErrorResponse } from "../../types";

const FeedExpanding: FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState<Products>([]);
  const [count, setCount] = useState<number>(0);
  const [fetching, setFetching] = useState(true);
  const { limit } = useFeed();

  const onQueryProductsHandler = debounce((q: string) => {
    if (q === null) navigate("/search");
    if (q !== null) {
      queryProducts(
        q,
        null,
        null,
        null,
        (r: ProductsResponseData) => {
          setProducts(r.products.rows);
          setCount(r.products.count);
          setFetching(false);
        },
        (err: ErrorResponse) => console.log(err)
      );
    }
  }, 500);

  useEffect(() => {
    onQueryProductsHandler(searchParams.get("query"));
  }, [searchParams, onQueryProductsHandler]);

  if (count > 0) {
    return (
      <>
        {count === 1 && <p>{count} product</p>}
        {count > 1 && <p>{count} products</p>}
        <Row xs={2} sm={2} md={2} lg={3} xl={5} className="g-2">
          {products.map((p, idx) => (
            <ProductCard key={idx} product={p} />
          ))}
          {fetching && <ProductCardPlaceholderGroup cardQuantity={limit} />}
        </Row>
      </>
    );
  }
};

export default FeedExpanding;
