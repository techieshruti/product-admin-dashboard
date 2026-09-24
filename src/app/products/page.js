"use client";
import { useEffect, useState } from 'react';
import { getProducts } from '@/services/productApi';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
const skip = (page - 1) * limit;
  const totalPages = Math.ceil(total / limit);
  const startItem = total === 0 ? 0 : skip + 1;
  const endItem = Math.min(skip + limit, total);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(limit, skip);
        setProducts(response.data.products);
        setTotal(response.data.total);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, [page, limit]);

  return (
    <main>
      <h1>Products</h1>
      <p>Product Admin Dashboard</p>
      <div>
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