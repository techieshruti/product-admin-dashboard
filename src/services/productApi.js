import api from "@/lib/axios";

export const getProducts = (limit = 10, skip = 0) => {
  return api.get(`/products?limit=${limit}&skip=${skip}`);
};