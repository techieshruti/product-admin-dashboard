const ProductFilters = ({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  sort,
  setSort,
}) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {/* Search */}
      <div className="flex flex-col">
        <label
          htmlFor="search"
          className="mb-2 text-md font-semibold text-gray-700"
        >
          Search products
        </label>

        <input
          id="search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label
          htmlFor="category"
          className="mb-2 text-md font-semibold text-gray-700"
        >
          Category
        </label>

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">All Categories</option>

          {categories.map((item) => (
            <option key={item.slug} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Sort */}
      <div className="flex flex-col">
        <label
          htmlFor="sort"
          className="mb-2 text-md font-semibold text-gray-700"
        >
          Sort by
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
        >
          <option value="">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-asc">Rating: Low to High</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="title-asc">Title: A to Z</option>
          <option value="title-desc">Title: Z to A</option>
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
