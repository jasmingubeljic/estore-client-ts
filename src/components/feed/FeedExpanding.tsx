import ProductCard from "../product/ProductCard";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { BiSolidChevronDown } from "react-icons/bi";
import ProductCardPlaceholderGroup from "../product/ProductCardPlaceholderGroup";
import useFeed from "../../hooks/useFeed";

const FeedExpanding = () => {
  const { fetching, state, limit, totalProductCount, getMoreProductsHandler } = useFeed();

  if (!state) return;

  return (
    <>
      <Row xs={2} sm={2} md={2} lg={3} xl={5} className="g-2">
        {state.products.map((p, idx) => (
          <ProductCard key={idx} product={p} />
        ))}
        {fetching && <ProductCardPlaceholderGroup cardQuantity={limit} />}
      </Row>
      <Stack>
        <Button
          hidden={totalProductCount <= limit || state.products.length === totalProductCount}
          className="mx-auto mt-4"
          variant="outline-info rounded-1"
          onClick={getMoreProductsHandler}
        >
          <BiSolidChevronDown className="fs-1" />
        </Button>
      </Stack>
      {state.products.length === 0 && (
        // <p>
        //   Upload your product first to attract potential buyers quickly—an
        //   excellent opportunity!
        // </p>
        <p>Be the first to showcase your product and connect with your potential customers.</p>
      )}
    </>
  );
};

export default FeedExpanding;
