import Link from "next/link";

const ProductCard = ({ product, handleDeleteClick }) => {
  return (
    <div className="rounded-xl border border-indigo-100 bg-gradient-to-br from-indigo-50/70 via-white to-violet-50/70 p-5 text-gray-900 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/50">
      <div className="mb-4 flex justify-center rounded-lg bg-white p-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          width="120"
          className="h-28 w-28 object-contain"
        />
      </div>

      <Link
        href={`/products/${product.id}`}
        className="text-lg font-bold text-indigo-600 transition hover:text-violet-600 hover:underline"
      >
        {product.title}
      </Link>

      <div className="mt-4 space-y-2">
        <p className="text-sm text-gray-600">
          Category:{" "}
          <span className="font-medium text-gray-900">{product.category}</span>
        </p>

        <p className="text-sm text-gray-600">
          Price:{" "}
          <span className="font-semibold text-gray-900">${product.price}</span>
        </p>

        <p className="text-sm text-gray-600">
          Rating:{" "}
          <span className="font-semibold text-gray-900">
            ⭐ {product.rating}
          </span>
        </p>

        <p className="text-sm text-gray-600">
          Stock:{" "}
          <span className="font-semibold text-gray-900">{product.stock}</span>
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
  );
};

export default ProductCard;
