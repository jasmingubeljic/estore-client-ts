import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { prodDir } from "../appInfo";
import { Product, Categories, OnSubmit, OnSubmitEType, OnChangeEType, ProductForm } from "../types";

interface Props {
  product: Product;
  categories: Categories;
  onSubmit: OnSubmit;
}

export default function useProductForm(props: Props) {
  const [imgSrc, setImgSrc] = useState("");
  const [validated, setValidated] = useState(false);

  const navigate = useNavigate();

  const product = props.product || {
    title: "",
    description: "",
    price: "",
    categoryId: "",
    isUsed: false,
    isHidden: false,
  };

  useEffect(() => {
    if (props.product) {
      setImgSrc(prodDir + props.product.image);
    }
  }, [props.product]);

  const onImageSelect = async (e: OnChangeEType) => {
    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files?.[0];
    if (files) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(files);
      fileReader.addEventListener("load", function () {
        setImgSrc(this.result);
      });
    }
  };

  const onSubmit = useCallback(
    (event: OnSubmitEType) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      }

      setValidated(true);

      if (form) {
        if (form.title.value && form.description.value && form.price.value && form.categoryId.value) {
          if (props.product?.image || form.image.files.length !== 0) {
            props.onSubmit(event);
          } else {
            console.info("product update/creation stopped");
          }
        }
      }
    },
    [props]
  );

  return {
    imgSrc,
    validated,
    navigate,
    product,
    onImageSelect,
    onSubmit,
  };
}
