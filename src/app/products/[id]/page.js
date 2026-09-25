"use client";

import { useEffect, useState } from "react";
import { getProductById } from "@/services/productApi";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

const ProductDetailsPage = ({ params }) => {
  const { isAuthenticated, checkingAuth } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    const fetchProduct = async () => {
      try {
        const { id } = await params;

        // First check products created/updated by our app
        const savedProducts = JSON.parse(
          localStorage.getItem("createdProducts") || "[]",
        );

        const localProduct = savedProducts.find(
          (item) => String(item.id) === String(id),
        );

        if (localProduct) {
          setProduct(localProduct);
          return;
        }

        // If not found locally, get it from DummyJSON
        const response = await getProductById(id);

        setProduct(response.data);
      } catch (error) {
        if (error.response?.status === 404) {
          setNotFound(true);
        } else {
          console.error("Failed to fetch product:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params, isAuthenticated]);

  if (checkingAuth) {
    return <p>Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <p>Loading product...</p>;
  }

  if (notFound || !product) {
    return (
      <main>
        <h1>Product Not Found</h1>
        <p>Sorry, the product you are looking for does not exist.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        {/* Back button */}
        <Link
          href="/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-violet-600"
        >
          ← Back to Products
        </Link>

        {/* Product Details Card */}
        <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 via-white to-violet-50 shadow-lg shadow-indigo-100/40">
          <div className="grid gap-8 p-6 md:grid-cols-2 md:p-8">
            {/* Product Images */}
            <div>
              <div className="rounded-xl border border-indigo-100 bg-white p-6 shadow-sm">
                <div className="grid grid-cols-2 gap-4">
                  {product.images?.map((image) => (
                    <div
                      key={image}
                      className="flex h-48 items-center justify-center rounded-lg bg-gray-50 p-4"
                    >
                      <img
                        src={image}
                        alt={product.title}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="flex flex-col justify-center">
              <span className="mb-3 w-fit rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700">
                {product.category}
              </span>

              <h1 className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-3xl font-bold text-transparent md:text-4xl">
                {product.title}
              </h1>

              <div className="mt-5 flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  ${product.price}
                </span>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                  ⭐ {product.rating}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Category
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {product.category}
                  </p>
                </div>

                <div className="rounded-lg border border-gray-200 bg-white p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Stock
                  </p>

                  <p className="mt-1 font-semibold text-gray-900">
                    {product.stock} units
                  </p>
                </div>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                {product.description}
              </p>

              {/* Edit button */}
              <Link
                href={`/products/${product.id}/edit`}
                className="mt-6 inline-flex w-fit rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg"
              >
                Edit Product
              </Link>
            </div>
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-8 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm md:p-8">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Customer Feedback
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900">Reviews</h2>
          </div>

          {!product.reviews || product.reviews.length === 0 ? (
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
              <p className="text-gray-500">No reviews available.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {product.reviews.map((review, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-gradient-to-r from-gray-50 to-white p-5 transition hover:border-indigo-100 hover:shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.reviewerName}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>

                    <span className="w-fit rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                      ⭐ {review.rating}/5
                    </span>
                  </div>

                  <p className="mt-4 leading-6 text-gray-700">
                    {review.comment}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ProductDetailsPage;
