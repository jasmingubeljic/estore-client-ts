import QueryFeed from "../components/feed/QueryFeed";
import Container from "react-bootstrap/Container";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Row from "react-bootstrap/Row";

const Products = () => {
  return (
    <Container>
      <Row className="mx-1 py-1">
        <Breadcrumb>
          <Breadcrumb.Item active>Products</Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <QueryFeed />
    </Container>
  );
};

export default Products;
