import { apiUrl } from "../appInfo";
import { readToken } from "../utils/auth";
import { SuccessCallback, ErrorCallback, ProductForm, CategoryHtmlForm, Product } from "../types";

export const logIn = async (email: string, password: string, onSuccess: SuccessCallback, onError: ErrorCallback): Promise<void> => {
  const data = { email, password };
  try {
    const q = "/login";
    const response = await fetch(apiUrl + q, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log("does this run?");
    const r = await response.json();
    if (response.ok) {
      onSuccess(r.resource);
    } else {
      onError(response);
    }
  } catch (error) {
    onError(error);
  }
};

export const createProduct = async (productForm: ProductForm, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  const { title, image, price, isUsed, description, categoryId, isHidden } = productForm;
  const formData = new FormData();
  formData.append("title", title.value);
  if (image.files && image.files[0]) {
    formData.append("image", image.files[0]);
  }
  formData.append("price", price.value);
  formData.append("isUsed", isUsed.checked.toString());
  formData.append("description", description.value);
  formData.append("categoryId", categoryId.value);
  formData.append("isHidden", isHidden.checked.toString());

  try {
    const q = "/admin/product";
    const response = await fetch(apiUrl + q, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${readToken()}`,
      },
      body: formData,
    });
    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(r);
    }
  } catch (error) {
    onError(error);
  }
};

export const updateProductById = async (id: number, productData: ProductForm, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  const { title, image, price, isUsed, description, categoryId, isHidden } = productData;

  const data = new FormData();
  data.append("title", title.value);
  if (image.files && image.files[0]) {
    data.append("image", image.files[0]);
  }
  data.append("price", price.value);
  data.append("isUsed", isUsed.checked.toString());
  data.append("description", description.value);
  data.append("categoryId", categoryId.value);
  data.append("isHidden", isHidden.checked.toString());

  try {
    const q = "/admin/product/" + id;
    const response = await fetch(apiUrl + q, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${readToken()}`,
      },
      body: data,
    });
    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(r);
    }
  } catch (error) {
    onError(error);
  }
};

export const getProducts = async (offset: number, limit: number, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  try {
    const q = `/product?offset=${offset}&limit=${limit}`;
    const response = await fetch(apiUrl + q, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(response);
    }
  } catch (error) {
    onError(error);
  }
};

export const getProductById = async (id: number, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  try {
    const q = "/product/" + id;

    const response = await fetch(apiUrl + q, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(response);
    }
  } catch (error) {
    onError(error);
  }
};

export const queryProducts = async (
  queryStr: string,
  categoryId: number,
  offset: string,
  limit: string,
  onSuccess: SuccessCallback,
  onError: ErrorCallback
) => {
  try {
    const q = `/product/query?offset=${offset}&limit=${limit}&queryStr=${queryStr}&categoryId=${categoryId}`;
    const response = await fetch(apiUrl + q, {
      method: "GET",
    });
    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(r);
    }
  } catch (error) {
    onError(error);
  }
};

export const createCategory = async (categoryForm: CategoryHtmlForm, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  const { title, image, description, isHidden } = categoryForm;
  const formData = new FormData();
  formData.append("title", title.value);
  if (image.files && image.files[0]) {
    formData.append("image", image.files[0]);
  }
  formData.append("description", description.value);
  formData.append("isHidden", isHidden.checked.toString());

  try {
    const q = "/admin/category";
    const response = await fetch(apiUrl + q, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${readToken()}`,
      },
      body: formData,
    });
    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(r);
    }
  } catch (error) {
    onError(error);
  }
};

export const getCategories = async (onSuccess: SuccessCallback, onError: ErrorCallback) => {
  try {
    const q = `/category`;
    const response = await fetch(apiUrl + q, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(response);
    }
  } catch (error) {
    onError(error);
  }
};

export const getCategoryById = async (id: number, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  try {
    const q = "/category/" + id;

    const response = await fetch(apiUrl + q, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(response);
    }
  } catch (error) {
    onError(error);
  }
};

export const deleteProduct = async (id: number, product: Product, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  try {
    const q = `/admin/product/${id}`;
    const response = await fetch(apiUrl + q, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${readToken()}`,
      },
      body: JSON.stringify(product),
    });

    const r = await response.json();
    if (response.ok) {
      onSuccess(r);
    } else {
      onError(response);
    }
  } catch (error) {
    onError(error);
  }
};
