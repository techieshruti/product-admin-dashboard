import Link from "next/link";

const ProductCard = ({ product, handleDeleteClick }) => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="mb-4 flex h-36 items-center justify-center rounded-lg bg-gray-50">
        <img
          src={product.thumbnail}
          alt={product.title}
          width="120"
          className="h-28 w-28 object-contain"
        />
      </div>

      <Link
        href={`/products/${product.id}`}
        className="block text-base font-semibold leading-6 text-gray-900 transition hover:text-indigo-600"
      >
        {product.title}
      </Link>

      <div className="mt-4 space-y-2.5">
        <p className="flex justify-between gap-3 text-sm text-gray-500">
          <span>Category</span>
          <span className="font-medium text-gray-900">
            {product.category}
          </span>
        </p>

        <p className="flex justify-between gap-3 text-sm text-gray-500">
          <span>Price</span>
          <span className="font-semibold text-gray-900">
            ${product.price}
          </span>
        </p>

        <p className="flex justify-between gap-3 text-sm text-gray-500">
          <span>Rating</span>
          <span className="font-semibold text-gray-900">
            ⭐ {product.rating}
          </span>
        </p>

        <p className="flex justify-between gap-3 text-sm text-gray-500">
          <span>Stock</span>
          <span className="font-semibold text-gray-900">
            {product.stock}
          </span>
        </p>
      </div>

      <button
        type="button"
        onClick={() => handleDeleteClick(product)}
        className="mt-5 w-full rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-700"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;