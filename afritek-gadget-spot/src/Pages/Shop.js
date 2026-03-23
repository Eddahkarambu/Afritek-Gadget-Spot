import React, { useState, useEffect } from "react";
import SearchFilter from "../components/SearchFilter";
import { Star, ShoppingCart } from "lucide-react";
import phoneProducts from "../Data/Products";

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState({
    category: "All",
    priceRange: [0, 300000],
    rating: 0,
    search: "",
  });

  // Convert phoneProducts to match your format
  const allProducts = phoneProducts.map((product) => ({
    id: product.id,
    name: `${product.brand} ${product.model}`,
    category:
      product.category.charAt(0).toUpperCase() + product.category.slice(1),
    price: product.price,
    originalPrice: product.price + Math.floor(product.price * 0.15),
    discount: product.isFeatured ? 15 : product.isNew ? 10 : 5,
    image: product.image,
    rating: product.isFeatured ? 4.8 : product.isNew ? 4.7 : 4.5,
    reviews: Math.floor(Math.random() * 300) + 50,
    badge: product.isFeatured ? "Featured" : product.isNew ? "New" : "Popular",
  }));

  useEffect(() => {
    applyFilters(filterState);
  }, [filterState]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    setFilterState((prev) => ({
      ...prev,
      search: term,
    }));
  };

  const handleFilter = (filters) => {
    setFilterState(filters);
  };

  const applyFilters = (filters) => {
    let products = allProducts.filter((product) => {
      const searchMatch =
        !filters.search ||
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.search.toLowerCase());

      const categoryMatch =
        filters.category === "All" || product.category === filters.category;

      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      const ratingMatch =
        filters.rating === 0 || product.rating >= filters.rating;

      return searchMatch && categoryMatch && priceMatch && ratingMatch;
    });

    setFilteredProducts(products);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-cyan-50 pt-24 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-900 to-teal-800 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-2">
            Latest <span className="text-cyan-300">Gadgets</span>
          </h1>
          <p className="text-cyan-100 text-lg">
            Showing {filteredProducts.length} of {allProducts.length} products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-6 mt-12">
        {/* Main Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <div className="sticky top-28">
              <SearchFilter
                onSearch={handleSearch}
                onFilter={handleFilter}
                products={allProducts}
              />
            </div>
          </div>

          {/* RIGHT SIDE: PRODUCTS GRID */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-white rounded-xl border-2 border-teal-200 hover:border-purple-500 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-purple-500/20"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 bg-gradient-to-br from-teal-50 to-cyan-50 overflow-hidden flex items-center justify-center border-b-2 border-teal-100">
                      {/* Badge */}
                      <div
                        className={`absolute top-3 left-3 z-10 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
                          product.badge === "Featured"
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600"
                            : product.badge === "New"
                              ? "bg-gradient-to-r from-teal-600 to-cyan-600"
                              : "bg-gradient-to-r from-cyan-500 to-teal-500"
                        }`}
                      >
                        {product.badge}
                      </div>

                      {/* Discount */}
                      <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        -{product.discount}%
                      </div>

                      {/* Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/300?text=" +
                            product.name;
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-teal-600 text-xs font-bold uppercase tracking-wider mb-2">
                        {product.category}
                      </p>

                      <h3 className="text-gray-800 font-bold text-sm mb-3 line-clamp-2 h-10 group-hover:text-teal-700 transition">
                        {product.name}
                      </h3>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={`${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-gray-500 text-xs">
                          ({product.reviews})
                        </span>
                      </div>

                      {/* Prices */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-gray-900 font-bold text-lg">
                          KSh {product.price.toLocaleString()}
                        </span>
                        <span className="text-gray-400 line-through text-xs">
                          KSh {product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/30 hover:shadow-teal-600/50">
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border-2 border-dashed border-teal-300">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-600 text-xl mb-6">No products found</p>
                <p className="text-gray-500 text-sm mb-6">
                  Try adjusting your filters or search terms
                </p>
                <button
                  onClick={() => {
                    setFilterState({
                      category: "All",
                      priceRange: [0, 300000],
                      rating: 0,
                      search: "",
                    });
                  }}
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold px-6 py-3 rounded-lg transition-all"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
