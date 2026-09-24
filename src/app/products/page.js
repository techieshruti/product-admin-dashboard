"use client";
import { useEffect, useState } from 'react';
import { getProducts, searchProducts } from "@/services/productApi";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 500);

  const requestedPage = Number(searchParams.get("page"));
const requestedLimit = Number(searchParams.get("limit"));

const initialPage =
  Number.isInteger(requestedPage) && requestedPage > 0
    ? requestedPage
    : 1;

const initialLimit =
  [10, 20, 50].includes(requestedLimit)
    ? requestedLimit
    : 10;

  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);
  const [total, setTotal] = useState(0);
const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);
  const startItem = total === 0 ? 0 : skip + 1;
  const endItem = Math.min(skip + limit, total);

  useEffect(() => {
  const fetchProducts = async () => {
    try {
      let response;

      if (debouncedSearch.trim()) {
        response = await searchProducts(
          debouncedSearch,
          limit,
          skip
        );
      } else {
        response = await getProducts(limit, skip);
      }

      setProducts(response.data.products);
      setTotal(response.data.total);

      const calculatedTotalPages = Math.ceil(
        response.data.total / limit
      );

      if (page > calculatedTotalPages && calculatedTotalPages > 0) {
        setPage(calculatedTotalPages);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  fetchProducts();
}, [page, limit, debouncedSearch]);

useEffect(() => {
  setPage(1);
}, [debouncedSearch]);

useEffect(() => {
  const params = new URLSearchParams(searchParams.toString());

  params.set("page", page);
  params.set("limit", limit);

  router.replace(`/products?${params.toString()}`);
}, [page, limit]);

  return (
    <main>
      <p>Product Admin Dashboard</p>
      <hr />
      <br />
      <div>
  <label htmlFor="search">Search products: </label>

  <input
    id="search"
    type="text"
    placeholder="Search products..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>
      <div>
        <br />
  {products.map((product) => (
    <div key={product.id}>
      <img
        src={product.thumbnail}
        alt={product.title}
        width="100"
      />
      <h2>{product.title}</h2>
      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      
<br />
<hr />
    </div>
  ))}
</div>
<p>
  Showing {startItem}–{endItem} of {total}
</p>
<div>
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
  >
    Previous
  </button>

  <span> Page {page} of {totalPages} </span>

  <button
    onClick={() => setPage(page + 1)}
    disabled={page === totalPages}
  >
    Next
  </button>
</div>

 <div>
        <label htmlFor="pageSize">Products per page: </label>

        <select
          id="pageSize"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </main>
  );
};

export default ProductPage