import { apiUrl } from "../appInfo";
import { readToken } from "../utils/auth";
import { SuccessCallback, ErrorCallback } from "../types";

export const logIn = async (email: string, password: string, onSuccess: SuccessCallback, onError: ErrorCallback): Promise<void> => {
  const data = { email, password };
  try {
    let q = "/login";
    const response = await fetch(apiUrl + q, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        // 'Authorization': user.signInUserSession.idToken.jwtToken,
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

export const createProduct = async (productForm, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  const { title, image, price, isUsed, description, categoryId, isHidden } = productForm;
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("image", image.files[0]);
  formData.append("price", price.value);
  formData.append("isUsed", isUsed.checked);
  formData.append("description", description.value);
  formData.append("categoryId", categoryId.value);
  formData.append("isHidden", isHidden.checked);

  try {
    let q = "/admin/product";
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

export const updateProductById = async (id: number, productData: unknown, onSuccess: SuccessCallback, onError: ErrorCallback) => {
  const { title, image, price, isUsed, description, categoryId, isHidden } = productData;

  const data = new FormData();
  data.append("title", title.value);
  data.append("image", image.files[0]);
  data.append("price", price.value);
  data.append("isUsed", isUsed.checked);
  data.append("description", description.value);
  data.append("categoryId", categoryId.value);
  data.append("isHidden", isHidden.checked);

  try {
    let q = "/admin/product/" + id;
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

export const getProducts = async (offset: number, limit: number, onSuccess, onError) => {
  try {
    let q = `/product?offset=${offset}&limit=${limit}`;
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

export const getProductById = async (id, onSuccess, onError) => {
  try {
    let q = "/product/" + id;

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

export const queryProducts = async (queryStr, categoryId, offset, limit, onSuccess, onError) => {
  try {
    let q = `/product/query?offset=${offset}&limit=${limit}&queryStr=${queryStr}&categoryId=${categoryId}`;
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

export const createCategory = async (categoryForm, onSuccess, onError) => {
  const { title, image, description, isHidden } = categoryForm;
  const formData = new FormData();
  formData.append("title", title.value);
  formData.append("image", image.files[0]);
  formData.append("description", description.value);
  formData.append("isHidden", isHidden.checked);

  try {
    let q = "/admin/category";
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

export const getCategories = async (onSuccess, onError) => {
  try {
    let q = `/category`;
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

export const getCategoryById = async (id, onSuccess, onError) => {
  try {
    let q = "/category/" + id;

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

export const deleteProduct = async (id, product, onSuccess, onError) => {
  try {
    let q = `/admin/product/${id}`;
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
