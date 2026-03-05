import React, { useState, useEffect } from "react";
import SearchFilter from "../components/SearchFilter";
import { Star, ShoppingCart } from "lucide-react";

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState({
    category: "All",
    priceRange: [0, 300000],
    rating: 0,
    search: "",
  });

  const allProducts = [
    {
      id: 1,
      name: "Samsung Galaxy S25 Ultra",
      category: "Phones",
      price: 189999,
      originalPrice: 225000,
      discount: 15,
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400",
      rating: 4.8,
      reviews: 245,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "iPhone 16 Pro Max",
      category: "Phones",
      price: 225000,
      originalPrice: 249999,
      discount: 10,
      image:
        "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=400",
      rating: 4.9,
      reviews: 320,
      badge: "Top Rated",
    },
    {
      id: 3,
      name: "AirPods Pro 2",
      category: "Accessories",
      price: 35000,
      originalPrice: 45000,
      discount: 22,
      image:
        "https://images.unsplash.com/photo-1588423770109-910921ee2d20?auto=format&fit=crop&q=80&w=400",
      rating: 4.7,
      reviews: 180,
      badge: "Popular",
    },
    {
      id: 4,
      name: "iPad Pro 12.9 M4",
      category: "Tablets",
      price: 145000,
      originalPrice: 165000,
      discount: 12,
      image:
        "https://images.unsplash.com/photo-1591290621836-2be1c4c65b8d?auto=format&fit=crop&q=80&w=400",
      rating: 4.8,
      reviews: 156,
      badge: "Recommended",
    },
    {
      id: 5,
      name: "Samsung Galaxy Buds3",
      category: "Accessories",
      price: 18999,
      originalPrice: 25000,
      discount: 24,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400",
      rating: 4.6,
      reviews: 98,
      badge: "Great Value",
    },
    {
      id: 6,
      name: "Apple Watch Series 9",
      category: "Smartwatches",
      price: 65000,
      originalPrice: 75000,
      discount: 13,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
      rating: 4.7,
      reviews: 142,
      badge: "Premium",
    },
    {
      id: 7,
      name: "Google Pixel 9 Pro",
      category: "Phones",
      price: 165000,
      originalPrice: 189999,
      discount: 13,
      image:
        "https://images.unsplash.com/photo-1511707267537-b85faf00021e?auto=format&fit=crop&q=80&w=400",
      rating: 4.7,
      reviews: 210,
      badge: "Latest",
    },
    {
      id: 8,
      name: "USB-C Fast Charger 65W",
      category: "Accessories",
      price: 4999,
      originalPrice: 7500,
      discount: 33,
      image:
        "https://images.unsplash.com/photo-1591437281884-767810e60f11?auto=format&fit=crop&q=80&w=400",
      rating: 4.5,
      reviews: 89,
      badge: "Budget",
    },
  ];

  // Apply filters on mount and when filterState changes
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
      // Search filter
      const searchMatch =
        !filters.search ||
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.category.toLowerCase().includes(filters.search.toLowerCase());

      // Category filter
      const categoryMatch =
        filters.category === "All" || product.category === filters.category;

      // Price filter
      const priceMatch =
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1];

      // Rating filter
      const ratingMatch =
        filters.rating === 0 || product.rating >= filters.rating;

      return searchMatch && categoryMatch && priceMatch && ratingMatch;
    });

    setFilteredProducts(products);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] via-[#0a0c10] to-[#000000] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            Latest <span className="text-cyan-400">Gadgets</span>
          </h1>
          <p className="text-gray-400">
            Showing {filteredProducts.length} products
          </p>
        </div>

        {/* Main Layout: Sidebar + Products */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR */}
          <div className="w-full lg:w-72 flex-shrink-0">
            <SearchFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              products={allProducts}
            />
          </div>

          {/* RIGHT SIDE: PRODUCTS GRID */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group relative bg-[#111827] rounded-2xl border border-gray-800 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    {/* Image Container */}
                    <div className="relative h-64 bg-[#161b22] overflow-hidden flex items-center justify-center">
                      {/* Badge */}
                      <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-cyan-500 to-teal-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg shadow-cyan-500/30">
                        {product.badge}
                      </div>

                      {/* Discount */}
                      <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        -{product.discount}%
                      </div>

                      {/* Image */}
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <p className="text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
                        {product.category}
                      </p>

                      <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 h-10">
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
                                  : "text-gray-600"
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
                        <span className="text-white font-bold text-lg">
                          KSh {product.price.toLocaleString()}
                        </span>
                        <span className="text-gray-500 line-through text-xs">
                          KSh {product.originalPrice.toLocaleString()}
                        </span>
                      </div>

                      {/* Add to Cart Button */}
                      <button className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20">
                        <ShoppingCart size={16} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-[#111827] rounded-2xl border border-gray-800">
                <div className="text-6xl mb-4">📦</div>
                <p className="text-gray-400 text-xl mb-6">No products found</p>
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
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold px-6 py-3 rounded-lg transition-all flex items-center gap-2"
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