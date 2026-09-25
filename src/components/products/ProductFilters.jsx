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
    <div className="flex flex-col gap-4 md:flex-row md:items-end">
      {/* Search */}
      <div className="flex flex-col">
        <label htmlFor="search" className="mb-1 font-medium">
          Search products
        </label>

        <input
          id="search"
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
        />
      </div>

      {/* Category */}
      <div className="flex flex-col">
        <label htmlFor="category" className="mb-1 font-medium">
          Category
        </label>

        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
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
        <label htmlFor="sort" className="mb-1 font-medium">
          Sort by
        </label>

        <select
          id="sort"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
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