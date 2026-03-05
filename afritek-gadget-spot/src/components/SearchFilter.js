import React, { useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";

const SearchFilter = ({ onSearch, onFilter, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedRating, setSelectedRating] = useState(0);

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

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter({
      category: category,
      priceRange: priceRange,
      rating: selectedRating,
    });
  };

  const handlePriceChange = (type, value) => {
    const newRange = [...priceRange];
    if (type === "min") {
      newRange[0] = Math.min(value, newRange[1]);
    } else {
      newRange[1] = Math.max(value, newRange[0]);
    }
    setPriceRange(newRange);
    onFilter({
      category: selectedCategory,
      priceRange: newRange,
      rating: selectedRating,
    });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onFilter({
      category: selectedCategory,
      priceRange: priceRange,
      rating: rating,
    });
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange([0, 300000]);
    setSelectedRating(0);
    onSearch("");
    onFilter({
      category: "All",
      priceRange: [0, 300000],
      rating: 0,
    });
  };

  return (
    <div className="mb-12">
      {/* Search Bar - Premium Style */}
      <div className="relative mb-8">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
          <div className="relative bg-[#111827] border border-gray-800 group-hover:border-blue-500/50 rounded-2xl px-6 py-4 transition-all duration-300 flex items-center gap-3">
            <Search size={24} className="text-blue-500" />
            <input
              type="text"
              placeholder="Search for phones, tablets, accessories..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-lg"
            />
            {searchTerm && (
              <button
                onClick={() => handleSearch("")}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Filter Toggle Button (Mobile) */}
      <div className="flex justify-between items-center mb-6 lg:hidden">
        <h3 className="text-lg font-bold">Filters</h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Filter size={20} />
          {showFilters ? "Hide" : "Show"} Filters
        </button>
      </div>

      {/* Filters Section */}
      <div
        className={`grid grid-cols-1 lg:grid-cols-4 gap-6 transition-all duration-300 ${
          showFilters ? "block" : "hidden lg:grid"
        }`}
      >
        {/* Category Filter */}
        <div className="bg-gradient-to-br from-[#111827] to-[#0a0f18] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all group">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
              <Filter size={16} className="text-blue-500" />
            </div>
            <h4 className="font-bold text-lg">Category</h4>
          </div>

          <div className="space-y-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  selectedCategory === category
                    ? "bg-blue-500/20 border border-blue-500 text-blue-400"
                    : "border border-gray-700 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedCategory === category
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-600"
                  }`}
                >
                  {selectedCategory === category && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-medium">{category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="bg-gradient-to-br from-[#111827] to-[#0a0f18] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center border border-green-500/30">
              <span className="text-green-500 font-bold text-xs">₹</span>
            </div>
            <h4 className="font-bold text-lg">Price Range</h4>
          </div>

          <div className="space-y-4">
            {/* Min Price */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Min:{" "}
                <span className="text-green-400 font-bold">
                  KSh {priceRange[0].toLocaleString()}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="300000"
                value={priceRange[0]}
                onChange={(e) =>
                  handlePriceChange("min", parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="text-sm text-gray-400 mb-2 block">
                Max:{" "}
                <span className="text-green-400 font-bold">
                  KSh {priceRange[1].toLocaleString()}
                </span>
              </label>
              <input
                type="range"
                min="0"
                max="300000"
                value={priceRange[1]}
                onChange={(e) =>
                  handlePriceChange("max", parseInt(e.target.value))
                }
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            {/* Price Display */}
            <div className="bg-black/30 rounded-lg p-3 border border-green-500/20 text-center">
              <p className="text-sm text-gray-400">Price Range</p>
              <p className="text-lg font-bold text-green-400">
                KSh {priceRange[0].toLocaleString()} - KSh{" "}
                {priceRange[1].toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Rating Filter */}
        <div className="bg-gradient-to-br from-[#111827] to-[#0a0f18] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
              <span className="text-yellow-500 font-bold">★</span>
            </div>
            <h4 className="font-bold text-lg">Rating</h4>
          </div>

          <div className="space-y-2">
            {[5, 4, 3].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  selectedRating === rating
                    ? "bg-yellow-500/20 border border-yellow-500 text-yellow-400"
                    : "border border-gray-700 text-gray-300 hover:border-yellow-500/50 hover:bg-yellow-500/10"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    selectedRating === rating
                      ? "border-yellow-500 bg-yellow-500"
                      : "border-gray-600"
                  }`}
                >
                  {selectedRating === rating && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  <span className="text-sm ml-1">& up</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="bg-gradient-to-br from-[#111827] to-[#0a0f18] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
              <span className="text-purple-500 font-bold">⚡</span>
            </div>
            <h4 className="font-bold text-lg">Quick Filters</h4>
          </div>

          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm">
              🔥 Under KSh 50,000
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm">
              ⭐ Most Popular
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm">
              🎁 On Sale Now
            </button>
            <button className="w-full text-left px-4 py-3 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm">
              🚚 Free Shipping
            </button>
          </div>

          {/* Clear Filters Button */}
          <button
            onClick={clearFilters}
            className="w-full mt-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-400 font-bold py-3 rounded-lg transition-all text-sm"
          >
            ✕ Clear All Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
