import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./pages/Wrapper.tsx";
import HomePage from "./pages/HomePage.tsx";
import Products from "./pages/Products.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import SaveProductPage from "./pages/SaveProductPage.tsx";
import EditProductPage from "./pages/EditProductPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import { isTokenStored, protectAuthRoutes } from "./utils/auth";
import ContextProvider from "./store/context-store.tsx";

const sharedData = () => ({
  token: isTokenStored(),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Wrapper />,
    id: "wrapperComponent",
    loader: sharedData,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/products", element: <HomePage /> },
      { path: "/search", element: <Products /> },
      {
        path: "/products/add",
        element: <SaveProductPage />,
        loader: protectAuthRoutes,
      },
      { path: "/products/:id", element: <ProductPage /> },
      {
        path: "/products/:id/edit",
        element: <EditProductPage />,
        loader: protectAuthRoutes,
      },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

function App() {
  return (
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  );
}

export default App;
