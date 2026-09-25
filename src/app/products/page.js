"use client";
import { useEffect, useState, useRef } from "react";
import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
  deleteProduct,
} from "@/services/productApi";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/useDebounce";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import ProductTable from "@/components/products/ProductTable";
import ProductCard from "@/components/products/ProductCard";
import RecentlyAddedProducts from "@/components/products/RecentlyAddedProducts";
import ProductFilters from "@/components/products/ProductFilters";
import Pagination from "@/components/products/Pagination";
import DeleteModal from "@/components/products/DeleteModal";

const ProductPage = () => {
  const { isAuthenticated, checkingAuth } = useAuth();
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const isFirstSearchRender = useRef(true);
const isFirstCategoryRender = useRef(true);
  
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    router.replace("/login");
  };

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
        localStorage.getItem("createdProducts") || "[]",
      );

      const isLocalProduct = savedProducts.some(
        (product) => String(product.id) === String(productId),
      );

      if (isLocalProduct) {
        // Product was created by our app.
        // DummyJSON does not actually contain it, so delete it locally.
        const updatedProducts = savedProducts.filter(
          (product) => String(product.id) !== String(productId),
        );

        localStorage.setItem(
          "createdProducts",
          JSON.stringify(updatedProducts),
        );

        setCreatedProducts(updatedProducts);

        console.log("Product deleted:", productToDelete);
      } else {
        // Product came from DummyJSON.
        const response = await deleteProduct(productId);

        console.log("Product deleted:", response.data);

        // Keep a local record of the deletion.
        const updatedProducts = savedProducts.filter(
          (product) => String(product.id) !== String(productId),
        );

        localStorage.setItem(
          "createdProducts",
          JSON.stringify(updatedProducts),
        );

        setProducts((currentProducts) =>
          currentProducts.filter(
            (product) => String(product.id) !== String(productId),
          ),
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
    if (!isAuthenticated) {
      return;
    }
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
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

        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Cancel the previous request when search/page/limit changes
    return () => {
      controller.abort();
    };
  }, [
    page,
    limit,
    debouncedSearch,
    category,
    sort,
    isAuthenticated,
    retryCount,
  ]);

  useEffect(() => {
  if (isFirstCategoryRender.current) {
    isFirstCategoryRender.current = false;
    return;
  }

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
  if (debouncedSearch === initialSearch) {
    return;
  }

  setPage(1);
}, [debouncedSearch, initialSearch]);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

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
      localStorage.getItem("createdProducts") || "[]",
    );

    setCreatedProducts(savedProducts);
  }, []);

  if (checkingAuth) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>

        <h2 className="mt-5 text-lg font-semibold text-gray-900">
          Checking authentication
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please wait while we verify your session.
        </p>
      </div>
    </main>
  );
}
  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
      <header className="mb-8 flex flex-col gap-5 rounded-2xl border border-indigo-100 bg-linear-to-r from-indigo-50 via-white to-violet-50 p-6 shadow-lg shadow-indigo-100/40 sm:flex-row sm:items-center sm:justify-between">
  <div>
    <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-600">
      Admin Panel
    </p>

    <h1 className="bg-linear-to-r from-indigo-600 to-violet-600 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
      Product Admin Dashboard
    </h1>

    <p className="mt-1 text-sm text-gray-600">
      Manage your products, inventory, and pricing.
    </p>
  </div>

  <div className="flex flex-col gap-3 sm:flex-row">
  <Link
    href="/products/new"
    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg"
  >
    + Add Product
  </Link>

  <button
    type="button"
    onClick={handleLogout}
    className="rounded-lg border border-gray-300 cursor-pointer bg-white px-5 py-2.5 font-semibold text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
  >
    Logout
  </button>
</div>
</header>

      {/* Product Filters */}
      <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-black text-lg">
  <ProductFilters
    search={search}
    setSearch={setSearch}
    category={category}
    setCategory={setCategory}
    categories={categories}
    sort={sort}
    setSort={setSort}
  />
</div>

{/* Recently Added Products */}
      <RecentlyAddedProducts
        createdProducts={createdProducts}
        handleDeleteClick={handleDeleteClick}
      />
      <div>

      {loading ? (
  <div className="my-8 flex min-h-55 items-center justify-center rounded-2xl border border-indigo-100 bg-white shadow-sm">
    <div className="flex flex-col items-center justify-center text-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600"></div>

      <p className="mt-4 text-lg font-semibold text-gray-800">
        Loading products...
      </p>

      <p className="mt-1 text-sm text-gray-500">
        Please wait while we fetch your products.
      </p>
    </div>
  </div>
) : error ? (
  <div className="my-8 flex min-h-55 items-center justify-center rounded-2xl border border-rose-200 bg-white p-6 shadow-sm">
    <div className="flex max-w-md flex-col items-center text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
        <span className="text-xl font-bold text-rose-600">
          !
        </span>
      </div>

      <h2 className="mt-4 text-lg font-bold text-gray-900">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        {error}
      </p>

      <button
        type="button"
        onClick={() => setRetryCount((count) => count + 1)}
        className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-sm transition hover:bg-indigo-700"
      >
        Try Again
      </button>
    </div>
  </div>
) : products.length === 0 ? (
  <div className="my-8 flex min-h-55 items-center justify-center rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
    <div className="flex max-w-md flex-col items-center text-center">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50">
        <span className="text-xl text-indigo-600">
          ○
        </span>
      </div>

      <h2 className="mt-4 text-lg font-bold text-gray-900">
        No products found
      </h2>

      <p className="mt-2 text-sm text-gray-500">
        We couldn't find any products matching your search or filters.
      </p>
    </div>
  </div>
) : (
          <div>
            {/* Desktop: Table */}
            <ProductTable
              products={products}
              handleDeleteClick={handleDeleteClick}
            />

            {/* Mobile: Cards */}
            <div className="space-y-4 md:hidden">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={totalPages}
        limit={limit}
        startItem={startItem}
        endItem={endItem}
        total={total}
        setPage={setPage}
        setLimit={setLimit}
      />

      {/* Delete Modal */}
      <DeleteModal
        product={productToDelete}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleConfirmDelete}
      />
      </div>
    </main>
  );
};

export default ProductPage;
