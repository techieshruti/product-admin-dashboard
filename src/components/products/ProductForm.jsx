const ProductForm = ({
  formData,
  errors,
  isSubmitting,
  successMessage,
  onChange,
  onSubmit,
  buttonText,
  loadingText = "Saving...",
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className="max-w-2xl space-y-5 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-1 block font-medium text-gray-700"
        >
          Title
        </label>

        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={onChange}
          placeholder="Enter product title"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">
            {errors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1 block font-medium text-gray-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter product description"
          rows="4"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label
          htmlFor="price"
          className="mb-1 block font-medium text-gray-700"
        >
          Price
        </label>

        <input
          id="price"
          name="price"
          type="number"
          value={formData.price}
          onChange={onChange}
          placeholder="Enter price"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-600">
            {errors.price}
          </p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label
          htmlFor="stock"
          className="mb-1 block font-medium text-gray-700"
        >
          Stock
        </label>

        <input
          id="stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={onChange}
          placeholder="Enter stock quantity"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        {errors.stock && (
          <p className="mt-1 text-sm text-red-600">
            {errors.stock}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-1 block font-medium text-gray-700"
        >
          Category
        </label>

        <input
          id="category"
          name="category"
          type="text"
          value={formData.category}
          onChange={onChange}
          placeholder="Enter product category"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />

        {errors.category && (
          <p className="mt-1 text-sm text-red-600">
            {errors.category}
          </p>
        )}
      </div>

      {/* Success message */}
      {successMessage && (
        <p className="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMessage}
        </p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? loadingText : buttonText}
      </button>
    </form>
  );
};

export default ProductForm;