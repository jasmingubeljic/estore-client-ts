import LoginForm from "../components/forms/LoginForm/LoginForm.tsx";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useState } from "react";
import { useNavigate, useRevalidator } from "react-router-dom";
import { apiUrl } from "../appInfo";
import { OnSubmitEType } from "../types";

const LoginPage = () => {
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const submitHandler = async (e: OnSubmitEType) => {
    e.preventDefault();
    const email = (e.target as HTMLFormElement).email.value;
    const password = (e.target as HTMLFormElement).password.value;
    const data = {
      email: email.trim(),
      password: password.trim(),
    };
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    if (!res.ok) {
      console.log("failed");
      return setErrors(resData.messages);
    }
    localStorage.setItem("userAndToken", JSON.stringify(resData));
    revalidator.revalidate();
    setErrors([]);
    navigate("/products");
  };

  return (
    <Container>
      <Row>
        <Col xs={12} sm={6} md={4}>
          {" "}
          <LoginForm onSubmit={submitHandler} />
          {errors.map((e) => e)}
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
