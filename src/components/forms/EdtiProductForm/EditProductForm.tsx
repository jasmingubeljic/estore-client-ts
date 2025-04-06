import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import styles from "./EditProductForm.module.scss";
import useProductForm from "../../../hooks/useProductForm";
import PropTypes from "prop-types";

const EditProductForm = (props) => {
  const { imgSrc, validated, navigate, product, onImageSelect, onSubmit } = useProductForm(props);

  return (
    <>
      <Form noValidate validated={validated} onSubmit={onSubmit} method="POST">
        <Form.Group className="mb-4" controlId="formProductTitle">
          <Form.Label>Product name</Form.Label>
          <Form.Control size="lg" name="title" type="title" required defaultValue={product.title} maxLength="150" />
        </Form.Group>
        <Image src={imgSrc} className={styles.imgPreview} />
        <Form.Group className="mb-4" controlId="formProductImage">
          <Form.Label>Product image</Form.Label>
          <Form.Control name="image" type="file" accept="image/*" required={!product.title} onChange={onImageSelect} />
          <Form.Text>The image formats that can be uploaded include JPG, PNG, and GIF.</Form.Text>
        </Form.Group>
        <Form.Group className="mb-4" controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" as="textarea" defaultValue={product.description} style={{ height: "100px" }} maxLength="500" />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control name="price" type="number" defaultValue={product.price} size="lg" />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Condition</Form.Label>
          <Form.Check aria-label="isUsed" label="Used" name="isUsed" type="switch" defaultChecked={product.isUsed} />
        </Form.Group>
        <Form.Group className="mb-4" controlId="formProductCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select name="categoryId" defaultValue={product.categoryId} size="lg">
            <option key="alkjsdf" value={""}></option>
            {props.categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-4">
          {/* <Form.Label>Hidden</Form.Label> */}
          <Form.Check aria-label="isHidden" label="Hidden" name="isHidden" type="switch" defaultChecked={product.isHidden} />
          <Form.Text className="text-muted">The hidden product will not be visible to users on the page.</Form.Text>
        </Form.Group>

        <Stack direction="horizontal" gap={3}>
          <Button variant="primary" type="submit">
            Save
          </Button>
          <Button variant="outline-warning" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </Stack>
      </Form>
    </>
  );
};

export default EditProductForm;

EditProductForm.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    categoryId: PropTypes.number,
    isUsed: PropTypes.bool,
    isHidden: PropTypes.bool,
    image: PropTypes.string,
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
