import Link from "next/link";

const ProductTable = ({ products, handleDeleteClick }) => {
  return (
    <div className="hidden overflow-hidden rounded-xl border border-indigo-100 bg-white shadow-sm md:block">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-indigo-50 to-violet-50 text-gray-800">
            <th className="border-b border-indigo-100 p-4 text-left text-sm font-semibold">
              Image
            </th>

            <th className="border-b border-indigo-100 p-4 text-left text-sm font-semibold">
              Title
            </th>

            <th className="border-b border-indigo-100 p-4 text-left text-sm font-semibold">
              Category
            </th>

            <th className="border-b border-indigo-100 p-4 text-left text-sm font-semibold">
              Price
            </th>

            <th className="border-b border-indigo-100 p-4 text-left text-sm font-semibold">
              Rating
            </th>

            <th className="border-b border-indigo-100 p-4 text-left text-sm font-semibold">
              Stock
            </th>

            <th className="border-b border-indigo-100 p-4 text-left text-sm font-semibold">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="transition hover:bg-indigo-50/40">
              <td className="border-b border-gray-100 p-4">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  width="70"
                  className="h-16 w-16 rounded-lg object-contain"
                />
              </td>

              <td className="border-b border-gray-100 p-4">
                <Link
                  href={`/products/${product.id}`}
                  className="font-semibold text-indigo-600 transition hover:text-violet-600 hover:underline"
                >
                  {product.title}
                </Link>
              </td>

              <td className="border-b border-gray-100 p-4 text-sm text-gray-600">
                {product.category}
              </td>

              <td className="border-b border-gray-100 p-4 font-medium text-gray-900">
                ${product.price}
              </td>

              <td className="border-b border-gray-100 p-4 text-sm text-gray-700">
                ⭐ {product.rating}
              </td>

              <td className="border-b border-gray-100 p-4 text-sm font-medium text-gray-700">
                {product.stock}
              </td>

              <td className="border-b border-gray-100 p-4">
                <button
                  type="button"
                  onClick={() => handleDeleteClick(product)}
                  className="rounded-lg bg-rose-600 px-3.5 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
