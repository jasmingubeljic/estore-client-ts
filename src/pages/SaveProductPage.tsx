import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct, getCategories, createCategory } from "../api/apiCalls";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EditProductForm from "../components/forms/EdtiProductForm/EditProductForm.tsx";
import EditCategoryForm from "../components/forms/EditCategoryForm/EditCategoryForm.tsx";

const SaveProductPage = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [categories, setCategories] = useState();

  useEffect(() => {
    getCategories(onGetCategoriesSuccess, (err) => console.log(err));
  }, []);

  const onGetCategoriesSuccess = useCallback((r) => {
    console.log(r);
    setCategories(r);
  }, []);

  const onCreateProductHandler = async (e) => {
    e.preventDefault();
    createProduct(
      e.target,
      (resData) => {
        console.log("resData: ", resData);
        navigate("/products");
      },
      (err) => {
        console.log(err);
        if (err.err?.name === "TokenExpiredError") {
          return navigate("/login");
        }
        setErrors(err.messages.errors);
      }
    );
  };

  const onCreateCategoryHandler = async (e) => {
    e.preventDefault();
    createCategory(
      e.target,
      (resData) => {
        console.log("resData: ", resData);
        navigate("/products/add");
      },
      (err) => {
        console.log(err);
        if (err.err?.name === "TokenExpiredError") {
          return navigate("/login");
        }
        setErrors(err.messages.errors);
      }
    );
  };

  if (categories && categories.length === 0) {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={6}>
            <h1 className="h4">Add your first product category</h1>
            <p>
              You must specify at least one category that the product will fall
              under before you can continue with the product upload.
            </p>
            <EditCategoryForm onSubmit={onCreateCategoryHandler} />
          </Col>
        </Row>
      </Container>
    );
  }

  if (categories) {
    return (
      <Container>
        <Row>
          <Col xs={12} sm={6}>
            <h1>Add new product</h1>
            <EditProductForm
              categories={categories}
              onSubmit={onCreateProductHandler}
            />
            {errors && errors.map((err) => <p key={err.msg}>{err.msg}</p>)}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default SaveProductPage;
