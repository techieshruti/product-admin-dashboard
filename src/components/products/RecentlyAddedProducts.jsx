import Link from "next/link";

const RecentlyAddedProducts = ({ createdProducts, handleDeleteClick }) => {
  if (createdProducts.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Your Products
          </p>

          <h2 className="mt-1 text-2xl font-bold text-gray-900">
            Recently Added Products
          </h2>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {createdProducts.map((product) => (
          <div
            key={product.id}
            className="group rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/70 p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <h3 className="text-lg font-bold text-gray-900">
                <Link
                  href={`/products/${product.id}`}
                  className="transition hover:text-indigo-600"
                >
                  {product.title}
                </Link>
              </h3>

              <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-semibold text-indigo-700">
                New
              </span>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                Category:{" "}
                <span className="font-medium text-gray-900">
                  {product.category}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                Price:{" "}
                <span className="font-semibold text-gray-900">
                  ${product.price}
                </span>
              </p>

              <p className="text-sm text-gray-600">
                Stock:{" "}
                <span className="font-semibold text-gray-900">
                  {product.stock}
                </span>
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleDeleteClick(product)}
              className="mt-5 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentlyAddedProducts;
