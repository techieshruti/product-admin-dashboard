const DeleteModal = ({
  product,
  onCancel,
  onConfirm,
}) => {
  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">

        {/* Icon */}
        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
          <span className="text-xl text-rose-600">
            !
          </span>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-gray-900">
          Delete Product?
        </h2>

        <p className="mt-3 leading-6 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900">
            {product.title}
          </span>
          ?
        </p>

        <p className="mt-2 text-sm text-gray-500">
          This action cannot be undone.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded-lg bg-rose-600 px-5 py-2.5 font-semibold text-white transition hover:bg-rose-700"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;