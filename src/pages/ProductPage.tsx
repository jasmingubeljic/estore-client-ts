import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, deleteProduct } from "../api/apiCalls";
import { prodDir } from "../appInfo";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Badge from "react-bootstrap/Badge";
import Image from "react-bootstrap/Image";
import Breadcrumb from "react-bootstrap/Breadcrumb";

const ProductPage = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getProductById(params.id, onGetProductSuccess, (err) => console.log(err));
  }, [params]);

  const onGetProductSuccess = (product) => {
    console.log("product: ", product);
    setProduct(product);
  };

  const onProductDelete = () => {
    deleteProduct(params.id, product, navigate("/products"), (error) => {
      console.log(error);
    });
  };

  if (product) {
    return (
      <Container>
        <Row className="">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Products</Breadcrumb.Item>
            <Breadcrumb.Item active>{product.id}</Breadcrumb.Item>
          </Breadcrumb>
        </Row>
        <Row className="shadow-sm rounded-1 mb-3">
          <Col lg={10} className="py-3 mx-0 px-0">
            <Image src={prodDir + product.image} alt={product.title} className="w-100 mt-0 mx-md-3" />
            <Stack direction="vertical" className="mx-3">
              <h1 className="fs-5 mt-2 mb-1">{product.title}</h1>
              <h2>
                <Badge bg="secondary" className="me-auto p-1 rounded-0 fs-6">
                  {product.price} KM
                </Badge>
              </h2>
            </Stack>
          </Col>
        </Row>
        <Row className="shadow-sm rounded-1 mb-3">
          <Col lg={10} className="py-3 mx-0 px-0">
            <Stack direction="vertical" gap={1} className="mx-3">
              <p className="fs-6 text-uppercase text-info">{product.category}</p>
              <p>{product.description}</p>
            </Stack>
          </Col>
        </Row>
        <Row className="shadow-sm rounded-1 mb-3">
          <Col lg={10} className="py-3 mx-0 px-0">
            <Stack direction="horizontal" gap={3} className="mx-3">
              <Button
                variant="primary"
                onClick={() => {
                  navigate("/products/" + params.id + "/edit");
                }}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={onProductDelete}>
                Delete
              </Button>
            </Stack>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ProductPage;
