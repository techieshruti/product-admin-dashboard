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
      className="max-w-2xl space-y-6 rounded-2xl border border-indigo-100 bg-linear-to-br from-indigo-50 via-white to-violet-50 p-6 shadow-lg shadow-indigo-100/40 md:p-8"
    >
      {/* Form heading */}
      <div className="border-b border-indigo-100 pb-5">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Product Information
        </p>

        <p className="mt-1 text-sm text-gray-500">
          Enter the product details below.
        </p>
      </div>

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-2 block text-sm font-semibold text-gray-700"
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
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.title && (
          <p className="mt-1.5 text-sm font-medium text-rose-600">
            {errors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-2 block text-sm font-semibold text-gray-700"
        >
          Description
        </label>

        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter product description"
          rows="5"
          className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.description && (
          <p className="mt-1.5 text-sm font-medium text-rose-600">
            {errors.description}
          </p>
        )}
      </div>

      {/* Price + Stock */}
      <div className="grid gap-5 sm:grid-cols-2">
        {/* Price */}
        <div>
          <label
            htmlFor="price"
            className="mb-2 block text-sm font-semibold text-gray-700"
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
            min="0"
            step="0.01"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {errors.price && (
            <p className="mt-1.5 text-sm font-medium text-rose-600">
              {errors.price}
            </p>
          )}
        </div>

        {/* Stock */}
        <div>
          <label
            htmlFor="stock"
            className="mb-2 block text-sm font-semibold text-gray-700"
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
            min="0"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />

          {errors.stock && (
            <p className="mt-1.5 text-sm font-medium text-rose-600">
              {errors.stock}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div>
        <label
          htmlFor="category"
          className="mb-2 block text-sm font-semibold text-gray-700"
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
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />

        {errors.category && (
          <p className="mt-1.5 text-sm font-medium text-rose-600">
            {errors.category}
          </p>
        )}
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3">
          <p className="text-sm font-medium text-emerald-700">
            {successMessage}
          </p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white shadow-md shadow-indigo-200 transition hover:bg-indigo-700 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? loadingText : buttonText}
      </button>
    </form>
  );
};

export default ProductForm;
