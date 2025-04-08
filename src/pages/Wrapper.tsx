import { useEffect } from "react";
import { Outlet, useLoaderData, useRevalidator } from "react-router-dom";
import Navigation from "../components/navigation/Navigation";
import Footer from "../components/footer/Footer";
import { clearToken, getRemainingTokenDuration } from "../utils/auth";

const Wrapper = () => {
  const { token } = useLoaderData();
  const revalidator = useRevalidator();

  useEffect(() => {
    if (!token) return;
    const remainingTime = getRemainingTokenDuration();

    setTimeout(() => {
      clearToken();
      revalidator.revalidate();
    }, remainingTime);
  }, [token, revalidator]);

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
};

export default Wrapper;
