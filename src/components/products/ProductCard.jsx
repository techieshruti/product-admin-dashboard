import Link from "next/link";

const ProductCard = ({ product, handleDeleteClick }) => {
  return (
    <div className="rounded-lg border border-gray-300 p-4 shadow-sm text-black">
      <img
        src={product.thumbnail}
        alt={product.title}
        width="100"
        className="mb-3"
      />

      <Link
        href={`/products/${product.id}`}
        className="text-lg font-semibold text-blue-600 hover:underline"
      >
        {product.title}
      </Link>

      <p>Category: {product.category}</p>
      <p>Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>

      <button
        type="button"
        onClick={() => handleDeleteClick(product)}
        className="mt-3 rounded bg-red-500 px-3 py-1 text-white"
      >
        Delete
      </button>
    </div>
  );
};

export default ProductCard;