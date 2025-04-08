import { useState, useEffect, useCallback, FormEvent } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProductById, getCategories } from "../api/apiCalls";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditProductForm from "../components/forms/EdtiProductForm/EditProductForm.jsx";
import Loader from "../components/loader/Loader";
import { Product, Categories, ErrorResponse } from "../types";

const EditProductPage = () => {
  const params = useParams();
  const paramsId = params.id ? Number(params.id) : NaN;
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Categories>([]);

  const onGetCategoriesSuccess = useCallback((r: Categories) => {
    console.log(r);
    setCategories(r);
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProductById(
      paramsId,
      e.target,
      (success) => {
        navigate(`/products/${(success as { id: number }).id}`);
      },
      (err) => {
        console.log(err);
        if (err.err.name === "TokenExpiredError") {
          return navigate("/login");
        }
      }
    );
  };

  useEffect(() => {
    getCategories(onGetCategoriesSuccess, (err: ErrorResponse) => console.log(err));
  }, [onGetCategoriesSuccess]);

  useEffect(() => {
    getProductById(
      params.id,
      (r: Product) => {
        setProduct(r);
        console.log("product: ", r);
      },
      (err: ErrorResponse) => {
        console.log(err);
      }
    );
  }, [params]);

  if (product) {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={6}>
            <h1>{product.title}</h1>
            <EditProductForm onSubmit={submitHandler} product={product} categories={categories} />
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Loader />;
  }
};

export default EditProductPage;
