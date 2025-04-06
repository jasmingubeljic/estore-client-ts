import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { queryProducts } from "../../api/apiCalls";
import ProductCard from "../product/ProductCard";
import Row from "react-bootstrap/Row";
import { debounce } from "../../utils/misc";
import ProductCardPlaceholderGroup from "../product/ProductCardPlaceholderGroup";

const FeedExpanding = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    onQueryProductsHandler(searchParams.get("query"));
  }, [searchParams, onQueryProductsHandler]);

  const onQueryProductsHandler = useCallback(
    debounce((q) => {
      if (q === null) navigate("/search");
      if (q !== null) {
        queryProducts(
          q,
          null,
          null,
          null,
          (r) => {
            setProducts(r.products);
            setFetching(false);
          },
          (err) => console.log(err)
        );
      }
    }, 500),
    []
  );

  if (products.count > 0) {
    return (
      <>
        {products.count === 1 && <p>{products.count} product</p>}
        {products.count > 1 && <p>{products.count} products</p>}
        <Row xs={2} sm={2} md={2} lg={3} xl={5} className="g-2">
          {products.rows.map((p, idx) => (
            <ProductCard key={idx} product={p} />
          ))}
          {fetching && <ProductCardPlaceholderGroup cardQuantity={limit} />}
        </Row>
      </>
    );
  }
};

export default FeedExpanding;
