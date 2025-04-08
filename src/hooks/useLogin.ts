import { useState, useCallback } from "react";
import { OnSubmitEType } from "../types";

export default function useLogin() {
  const [validated, setValidated] = useState(false);

  const validateForm = useCallback((e: OnSubmitEType) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
  }, []);

  return {
    validated,
    validateForm,
  };
}
