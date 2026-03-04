import React, { useState } from "react";
import { Search, X } from "lucide-react";

const SearchFilter = ({ onSearch, onFilter, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    "All",
    "Phones",
    "Tablets",
    "Accessories",
    "Smartwatches",
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    onFilter({ category, priceRange });
  };

  const handlePriceFilter = (min, max) => {
    setPriceRange([min, max]);
    onFilter({ category: selectedCategory, priceRange: [min, max] });
  };

  return (
    <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search size={20} className="absolute left-3 top-3.5 text-gray-400" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-[#0a0f18] text-white pl-10 pr-4 py-3 rounded-lg border border-gray-700 focus:border-blue-500 outline-none transition-colors"
        />
      </div>

      {/* Filter Toggle (Mobile) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-bold mb-4 transition-colors"
      >
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filters Container */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${
          showFilters ? "block" : "hidden md:grid"
        }`}
      >
        {/* Category Filter */}
        <div>
          <h3 className="text-white font-bold mb-4">Category</h3>
          <div className="space-y-2">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center gap-3 cursor-pointer"
              >
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={selectedCategory === cat}
                  onChange={() => handleCategoryFilter(cat)}
                  className="w-4 h-4 accent-blue-500"
                />
                <span className="text-gray-400 hover:text-white transition-colors">
                  {cat}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="text-white font-bold mb-4">Price Range</h3>
          <div className="space-y-3">
            <div>
              <label className="text-gray-400 text-sm">
                Min: KSh {priceRange[0].toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="300000"
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceFilter(parseInt(e.target.value), priceRange[1])
                }
                className="w-full accent-blue-500"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm">
                Max: KSh {priceRange[1].toLocaleString()}
              </label>
              <input
                type="range"
                min="0"
                max="300000"
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceFilter(priceRange[0], parseInt(e.target.value))
                }
                className="w-full accent-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div>
          <h3 className="text-white font-bold mb-4">Quick Filters</h3>
          <div className="space-y-2">
            <button
              onClick={() => handlePriceFilter(0, 50000)}
              className="w-full text-left px-4 py-2 bg-[#0a0f18] text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Under KSh 50,000
            </button>
            <button
              onClick={() => handlePriceFilter(50000, 150000)}
              className="w-full text-left px-4 py-2 bg-[#0a0f18] text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              KSh 50K - 150K
            </button>
            <button
              onClick={() => handlePriceFilter(150000, 300000)}
              className="w-full text-left px-4 py-2 bg-[#0a0f18] text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              Over KSh 150K
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
