import Link from "next/link";

const RecentlyAddedProducts = ({
  createdProducts,
  handleDeleteClick,
}) => {
  if (createdProducts.length === 0) {
    return null;
  }

  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">
        Recently Added Products
      </h2>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {createdProducts.map((product) => (
          <div
            key={product.id}
            className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
          >
            <h3 className="mb-2 text-lg font-semibold">
              <Link
                href={`/products/${product.id}`}
                className="text-blue-600 hover:underline"
              >
                {product.title}
              </Link>
            </h3>

            <p className="text-sm text-gray-600">
              Category: {product.category}
            </p>

            <p className="mt-1 font-medium text-gray-600">
              Price: ${product.price}
            </p>

            <p className="mt-1 text-sm text-gray-600">
              Stock: {product.stock}
            </p>

            <button
              type="button"
              onClick={() => handleDeleteClick(product)}
              className="mt-4 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
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