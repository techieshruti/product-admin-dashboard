import api from "@/lib/axios";

export const getProducts = (
  limit = 10,
  skip = 0,
  sortBy = "",
  order = ""
) => {
  return api.get(
    `/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
  );
};

// =============================================

export const searchProducts = (
  query,
  limit = 10,
  skip = 0,
  signal
) => {
  return api.get(
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}&skip=${skip}`,
    {
      signal,
    }
  );
};

// =============================================

export const getCategories = () => {
  return api.get("/products/categories");
};

// =============================================

export const getProductsByCategory = (
  category,
  limit = 10,
  skip = 0,
  sortBy = "",
  order = ""
) => {
  return api.get(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
  );
};

// ============================================

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};

// ============================================

export const addProduct = (productData) => {
  return api.post("/products/add", productData);
};

// ===========================================

export const updateProduct = (id, productData) => {
  return api.put(`/products/${id}`, productData);
};