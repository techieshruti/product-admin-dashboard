const DeleteModal = ({
  product,
  onCancel,
  onConfirm,
}) => {
  if (!product) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
    >
      <div className="min-w-[300px] rounded-lg bg-white p-6 text-black shadow-lg">
        <h2 className="text-xl font-bold">
          Delete Product?
        </h2>

        <p className="mt-3">
          Are you sure you want to delete{" "}
          <strong>{product.title}</strong>?
        </p>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;