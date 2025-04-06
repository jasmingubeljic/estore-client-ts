import { useState, useCallback } from "react";

export default function useLogin() {
  const [validated, setValidated] = useState(false);

  const validateForm = useCallback((e) => {
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
