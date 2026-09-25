const ProductTable = ({ products, handleDeleteClick }) => {
  return (
    <div className="hidden md:block">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-3 text-left">
              Image
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Title
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Category
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Price
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Rating
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Stock
            </th>
            <th className="border border-gray-300 p-3 text-left">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border border-gray-300 p-3">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  width="80"
                />
              </td>

              <td className="border border-gray-300 p-3">
                <a
                  href={`/products/${product.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {product.title}
                </a>
              </td>

              <td className="border border-gray-300 p-3">
                {product.category}
              </td>

              <td className="border border-gray-300 p-3">
                ${product.price}
              </td>

              <td className="border border-gray-300 p-3">
                {product.rating}
              </td>

              <td className="border border-gray-300 p-3">
                {product.stock}
              </td>

              <td className="border border-gray-300 p-3">
                <button
                  type="button"
                  onClick={() => handleDeleteClick(product)}
                  className="rounded bg-red-500 px-3 py-1 text-white"
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