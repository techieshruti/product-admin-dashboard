"use client";
import { useEffect, useState } from "react";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
  deleteProduct,
} from "@/services/productApi";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import Link from "next/link";

const ProductPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialSort = searchParams.get("sort") || "";

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(initialSearch);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState(initialSort);
  const [createdProducts, setCreatedProducts] = useState([]);
  const [productToDelete, setProductToDelete] = useState(null);

const handleDeleteClick = (product) => {
  setProductToDelete(product);
};

const handleConfirmDelete = async () => {
  if (!productToDelete) {
    return;
  }

  try {
    const productId = productToDelete.id;

    const savedProducts = JSON.parse(
      localStorage.getItem("createdProducts") || "[]"
    );

    const isLocalProduct = savedProducts.some(
      (product) => String(product.id) === String(productId)
    );

    if (isLocalProduct) {
      // Product was created by our app.
      // DummyJSON does not actually contain it, so delete it locally.
      const updatedProducts = savedProducts.filter(
        (product) => String(product.id) !== String(productId)
      );

      localStorage.setItem(
        "createdProducts",
        JSON.stringify(updatedProducts)
      );

      setCreatedProducts(updatedProducts);

      console.log("Product deleted:", productToDelete);
    } else {
      // Product came from DummyJSON.
      const response = await deleteProduct(productId);

      console.log("Product deleted:", response.data);

      // Keep a local record of the deletion.
      const updatedProducts = savedProducts.filter(
        (product) => String(product.id) !== String(productId)
      );

      localStorage.setItem(
        "createdProducts",
        JSON.stringify(updatedProducts)
      );

      setProducts((currentProducts) =>
        currentProducts.filter(
          (product) => String(product.id) !== String(productId)
        )
      );
    }

    setProductToDelete(null);
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};

  const debouncedSearch = useDebounce(search, 500);

  const requestedPage = Number(searchParams.get("page"));
  const requestedLimit = Number(searchParams.get("limit"));

  const initialPage =
    Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  const initialLimit = [10, 20, 50].includes(requestedLimit)
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
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        let response;
        let sortBy = "";
        let order = "";

        if (sort) {
          const [field, direction] = sort.split("-");

          sortBy = field;
          order = direction;
        }

        if (category) {
          response = await getProductsByCategory(
            category,
            limit,
            skip,
            sortBy,
            order,
          );
        } else if (debouncedSearch.trim()) {
          response = await searchProducts(
            debouncedSearch,
            limit,
            skip,
            controller.signal,
          );
        } else {
          response = await getProducts(limit, skip, sortBy, order);
        }

        setProducts(response.data.products);
        setTotal(response.data.total);

        const calculatedTotalPages = Math.ceil(response.data.total / limit);

        if (page > calculatedTotalPages && calculatedTotalPages > 0) {
          setPage(calculatedTotalPages);
        }
      } catch (error) {
        // Ignore requests that were intentionally cancelled
        if (error.code === "ERR_CANCELED") {
          return;
        }

        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();

    // Cancel the previous request when search/page/limit changes
    return () => {
      controller.abort();
    };
  }, [page, limit, debouncedSearch, category, sort]);

  useEffect(() => {
    if (category) {
      setSearch("");
      setPage(1);
    }
  }, [category]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        console.log("Categories:", response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", page);
    params.set("limit", limit);

    if (search.trim()) {
      params.set("search", search.trim());
    } else {
      params.delete("search");
    }

    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    if (sort) {
  params.set("sort", sort);
} else {
  params.delete("sort");
}

    router.replace(`/products?${params.toString()}`);
  }, [page, limit, search, category, sort]);

  useEffect(() => {
  const savedProducts = JSON.parse(
    localStorage.getItem("createdProducts") || "[]"
  );

  setCreatedProducts(savedProducts);
}, []);

  return (
    <main>
      <p>Product Admin Dashboard</p>
      <hr />
      <br />
      {/* Search products: */}
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
      {/* Categories: */}
      <div>
        <label htmlFor="category">Category: </label>

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>
      {/* Sort */}
      <div>
        <label htmlFor="sort">Sort by: </label>

        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
      </div>
<br />
{createdProducts.length > 0 && (
  <section>
    <h2>Recently Added Products</h2>
<br/>
    {createdProducts.map((product) => (
      <div key={product.id}>
       <Link href={`/products/${product.id}`}>
  <h3>{product.title}</h3>
</Link>
        <p>Category: {product.category}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <br/>
        <button
      type="button"
      onClick={() => handleDeleteClick(product)}
    >
      Delete
    </button>

    <hr />
      </div>
    ))}
  </section>
)}

<br />
      <div>
        <br />
        {products.map((product) => (
          <div key={product.id}>
            <img src={product.thumbnail} alt={product.title} width="100" />
             <Link href={`/products/${product.id}`}>
  <h3>{product.title}</h3>
</Link>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Stock: {product.stock}</p>

            <br />
              <button type="button" onClick={() => handleDeleteClick(product)}>
  Delete
</button>
            <hr />
          
          </div>
        ))}
      </div>
      <p>
        Showing {startItem}–{endItem} of {total}
      </p>
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>

        <span>
          {" "}
          Page {page} of {totalPages}{" "}
        </span>

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

{productToDelete && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: "24px",
        borderRadius: "8px",
        minWidth: "300px",
      }}
    >
      <h2>Delete Product?</h2>

      <p>
        Are you sure you want to delete{" "}
        <strong>{productToDelete.title}</strong>?
      </p>

      <button
        type="button"
        onClick={() => setProductToDelete(null)}
      >
        Cancel
      </button>

      <button type="button" onClick={handleConfirmDelete}>
        Confirm Delete
      </button>
    </div>
  </div>
)}

    </main>
  );
};

export default ProductPage;
