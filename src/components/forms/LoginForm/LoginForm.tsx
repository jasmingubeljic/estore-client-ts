import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useLogin from "../../../hooks/useLogin";
import PropTypes from "prop-types";

const LoginForm = (props) => {
  const { validated, validateForm } = useLogin();

  return (
    <Form onChange={validateForm} onSubmit={props.onSubmit} validated={validated} method="POST">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="Enter email" required />
        {/* <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text> */}
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Password" required />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;
