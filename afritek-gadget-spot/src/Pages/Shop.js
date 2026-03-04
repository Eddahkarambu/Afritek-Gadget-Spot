import React, { useState, useMemo, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import SearchFilter from "../components/SearchFilter";

const allProducts = [
  {
    id: 1,
    name: "Samsung S25 Ultra",
    category: "Phones",
    price: "KSh 189,999",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 245,
  },
  {
    id: 2,
    name: "iPhone 16 Pro Max",
    category: "Phones",
    price: "KSh 225,000",
    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800",
    rating: 4.9,
    reviews: 320,
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    category: "Accessories",
    price: "KSh 35,000",
    image:
      "https://images.unsplash.com/photo-1588423770109-910921ee2d20?auto=format&fit=crop&q=80&w=800",
    rating: 4.7,
    reviews: 180,
  },
  {
    id: 4,
    name: "iPad Pro 12.9",
    category: "Tablets",
    price: "KSh 145,000",
    image:
      "https://images.unsplash.com/photo-1591290621836-2be1c4c65b8d?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 156,
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    category: "Smartwatches",
    price: "KSh 65,000",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    rating: 4.6,
    reviews: 98,
  },
];

const Shop = ({ onAdd }) => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "All",
    priceRange: [0, 300000],
  });

  // Set initial category from navigation
  useEffect(() => {
    if (location.state?.selectedCategory) {
      setFilters((prev) => ({
        ...prev,
        category: location.state.selectedCategory,
      }));
    }
  }, [location.state]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const price = parseInt(product.price.replace(/[^0-9]/g, ""));
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        filters.category === "All" || product.category === filters.category;
      const matchesPrice =
        price >= filters.priceRange[0] && price <= filters.priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, filters]);

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">
        Latest <span className="text-blue-500">Gadgets</span>
      </h1>

      {/* Search & Filter Component */}
      <SearchFilter
        onSearch={setSearchTerm}
        onFilter={setFilters}
        products={allProducts}
      />

      {/* Results Count */}
      <p className="text-gray-400 mb-6">
        Showing {filteredProducts.length} product
        {filteredProducts.length !== 1 ? "s" : ""}
      </p>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-[#111827] rounded-3xl p-4 border border-gray-800 hover:border-blue-500/50 transition-all group"
            >
              {/* Product Image */}
              <Link to={`/product/${product.id}`}>
                <div className="bg-[#161b22] rounded-2xl h-64 mb-4 flex items-center justify-center overflow-hidden cursor-pointer">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="max-h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>

              {/* Product Info */}
              <p className="text-blue-500 text-xs font-bold">
                {product.category}
              </p>

              {/* Product Name */}
              <Link to={`/product/${product.id}`}>
                <h3 className="text-white text-xl font-bold mt-1 hover:text-blue-500 transition-colors cursor-pointer">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
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

              {/* Price & Button */}
              <div className="flex justify-between items-center mt-4">
                <span className="text-white font-bold">{product.price}</span>
                <button
                  onClick={() => onAdd(product)}
                  className="bg-blue-500 p-3 rounded-xl text-white hover:bg-blue-600 transition-colors"
                >
                  <ShoppingCart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-400 text-lg">
            No products found matching your criteria.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilters({ category: "All", priceRange: [0, 300000] });
            }}
            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Shop;
