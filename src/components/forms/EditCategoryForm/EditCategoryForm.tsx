import { useState, useCallback, FC, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Stack from "react-bootstrap/Stack";
import styles from "./EditCategoryForm.module.scss";

interface Props {
  category: {
    id: number;
    title: string;
    description: string;
    isHidden: boolean;
  };
}

const EditCategoryForm: FC<Props> = (props) => {
  const [imgSrc, setImgSrc] = useState("");
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();

  const category = props.category || {
    title: "",
    description: "",
    isHidden: false,
  };

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      setValidated(true);

      if (form) {
        if (form.title.value && form.description.value) {
          if (props.category?.image || form.image.files.length !== 0) {
            props.onSubmit(event);
          } else {
            console.info("category update/creation stopped");
          }
        }
      }
    },
    [props]
  );

  const onImageSelect = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    const files = e.target.files[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        setImgSrc(this.result);
      });
    }
  }, []);

  return (
    <Form noValidate validated={validated} onSubmit={onSubmit} method="POST">
      <Form.Group className="mb-4" controlId="formProductTitle">
        <Form.Label>Category name</Form.Label>
        <Form.Control
          name="title"
          type="title"
          // placeholder="Category name"
          required
          defaultValue={category.title}
        />
      </Form.Group>
      <Image src={imgSrc} className={styles.imgPreview} />
      <Form.Group className="mb-4" controlId="formProductImage">
        <Form.Label>Category image</Form.Label>
        <Form.Control name="image" type="file" accept="image/*" required={!category.title} onChange={onImageSelect} />
        <Form.Text className="text-muted">The image formats that can be uploaded include JPG, PNG, and GIF.</Form.Text>
      </Form.Group>
      <Form.Group className="mb-4" controlId="formProductDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          as="textarea"
          // placeholder="Product description"
          defaultValue={category.description}
          style={{ height: "100px" }}
        />
      </Form.Group>
      <Form.Group className="mb-4">
        {/* <Form.Label>Published</Form.Label> */}
        <Form.Check aria-label="isHidden" label="Hidden" name="isHidden" type="checkbox" defaultChecked={category.isHidden} />
        <Form.Text className="text-muted">Users will not be able to see the hidden category and its associated products on the page.</Form.Text>
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
  );
};

EditCategoryForm.propTypes = {
  category: PropTypes.shape({
    title: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    isHidden: PropTypes.bool.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default EditCategoryForm;
