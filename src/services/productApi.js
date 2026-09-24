import api from "@/lib/axios";

export const getProducts = (limit = 10, skip = 0) => {
  return api.get(`/products?limit=${limit}&skip=${skip}`);
};

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

export const getCategories = () => {
  return api.get("/products/categories");
};

export const getProductsByCategory = (
  category,
  limit = 10,
  skip = 0
) => {
  return api.get(
    `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
  );
};