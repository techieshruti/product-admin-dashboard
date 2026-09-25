const Pagination = ({
  page,
  totalPages,
  limit,
  startItem,
  endItem,
  total,
  setPage,
  setLimit,
}) => {
  return (
    <div className="mt-6">
      <p className="mb-3">
        Showing {startItem}–{endItem} of {total}
      </p>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="rounded border px-3 py-2 disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {page} of {totalPages}
        </span>

        <button
          type="button"
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
          className="rounded border px-3 py-2 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <div className="mt-4">
        <label htmlFor="pageSize" className="mr-2">
          Products per page:
        </label>

        <select
          id="pageSize"
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="rounded border px-3 py-2"
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </div>
    </div>
  );
};

export default Pagination;