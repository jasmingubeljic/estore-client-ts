import { useState, useCallback } from "react";
import { useNavigate, useLoaderData, useRevalidator } from "react-router-dom";

export default function useNavigation() {
  const { token } = useLoaderData("wrapperComponent");
  const navigate = useNavigate();

  const revalidator = useRevalidator();
  const [show, setShow] = useState(false);

  const handleClose = useCallback(() => setShow(false), []);
  const handleShow = useCallback(() => setShow(true), []);

  const navigateTo = useCallback(
    (url) => {
      handleClose();
      navigate(url);
    },
    [handleClose, navigate]
  );

  const tokenRemovalHandler = () => {
    localStorage.removeItem("userAndToken");
    revalidator.revalidate();
  };
  return {
    token,
    show,
    handleClose,
    handleShow,
    navigateTo,
    tokenRemovalHandler,
  };
}
