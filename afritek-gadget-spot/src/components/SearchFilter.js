import React, { useState } from "react";
import { Search, Filter, X, Menu } from "lucide-react";

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
      search: searchTerm,
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
      search: searchTerm,
    });
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
    onFilter({
      category: selectedCategory,
      priceRange: priceRange,
      rating: rating,
      search: searchTerm,
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
      search: "",
    });
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    priceRange[0] !== 0 ||
    priceRange[1] !== 300000 ||
    selectedRating !== 0 ||
    searchTerm !== "";

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* MOBILE FILTER BUTTON */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
      >
        <Menu size={20} />
        {showFilters ? "Hide Filters" : "Show Filters"}
      </button>

      {/* LEFT SIDEBAR - FILTERS */}
      <div
        className={`fixed lg:static inset-0 z-40 bg-black/50 lg:bg-transparent backdrop-blur-sm lg:backdrop-blur-none transition-all ${
          showFilters ? "block" : "hidden lg:block"
        }`}
        onClick={() => setShowFilters(false)}
      >
        <div
          className="fixed lg:static left-0 top-0 h-screen lg:h-auto w-80 lg:w-72 bg-[#111827] lg:bg-transparent overflow-y-auto border-r lg:border-r-0 border-gray-800 flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button (Mobile Only) */}
          <button
            onClick={() => setShowFilters(false)}
            className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-800 rounded-lg z-50"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Scrollable Content */}
          <div className="p-6 lg:p-0 space-y-6 mt-16 lg:mt-0 flex-1 overflow-y-auto">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative bg-[#0a0f18] border border-gray-700 group-hover:border-cyan-500/50 rounded-2xl px-4 py-3 transition-all duration-300 flex items-center gap-3">
                <Search size={20} className="text-cyan-400" />
                <input
                  type="text"
                  placeholder="Search gadgets..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
                />
                {searchTerm && (
                  <button
                    onClick={() => handleSearch("")}
                    className="text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filter */}
            <div className="bg-[#0a0f18] border border-gray-800 rounded-2xl p-4 hover:border-cyan-500/30 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <Filter size={16} className="text-cyan-400" />
                </div>
                <h4 className="font-bold">Category</h4>
              </div>

              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      handleCategoryChange(category);
                      setShowFilters(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
                      selectedCategory === category
                        ? "bg-cyan-500/20 border border-cyan-500 text-cyan-300"
                        : "border border-gray-700 text-gray-300 hover:border-cyan-500/50 hover:bg-cyan-500/10"
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedCategory === category
                          ? "border-cyan-500 bg-cyan-500"
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
            <div className="bg-[#0a0f18] border border-gray-800 rounded-2xl p-4 hover:border-teal-500/30 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center border border-teal-500/30">
                  <span className="text-teal-400 font-bold text-xs">💲</span>
                </div>
                <h4 className="font-bold">Price Range</h4>
              </div>

              <div className="space-y-4">
                {/* Min Price */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">
                    Min:{" "}
                    <span className="text-teal-400 font-bold">
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
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  />
                </div>

                {/* Max Price */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">
                    Max:{" "}
                    <span className="text-teal-400 font-bold">
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
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                  />
                </div>

                {/* Price Display */}
                <div className="bg-black/30 rounded-lg p-3 border border-teal-500/20 text-center">
                  <p className="text-xs text-gray-400">Price Range</p>
                  <p className="text-sm font-bold text-teal-400">
                    KSh {priceRange[0].toLocaleString()} - KSh{" "}
                    {priceRange[1].toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Rating Filter */}
            <div className="bg-[#0a0f18] border border-gray-800 rounded-2xl p-4 hover:border-yellow-500/30 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center border border-yellow-500/30">
                  <span className="text-yellow-400 font-bold">★</span>
                </div>
                <h4 className="font-bold">Rating</h4>
              </div>

              <div className="space-y-2">
                {[5, 4, 3].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => {
                      handleRatingChange(rating);
                      setShowFilters(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm ${
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
                        <span key={i} className="text-yellow-400 text-xs">
                          ★
                        </span>
                      ))}
                      <span className="text-xs ml-1">& up</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-[#0a0f18] border border-gray-800 rounded-2xl p-4 hover:border-purple-500/30 transition-all">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center border border-purple-500/30">
                  <span className="text-purple-400 font-bold">⚡</span>
                </div>
                <h4 className="font-bold">Quick Filters</h4>
              </div>

              <div className="space-y-2">
                <button className="w-full text-left px-3 py-2 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm">
                  🔥 Under KSh 50K
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm">
                  ⭐ Most Popular
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm">
                  🎁 On Sale Now
                </button>
                <button className="w-full text-left px-3 py-2 rounded-lg border border-gray-700 hover:border-purple-500/50 hover:bg-purple-500/10 transition-all text-sm">
                  🚚 Free Shipping
                </button>
              </div>
            </div>
          </div>

          {/* Clear Filters Button - STICKY AT BOTTOM */}
          {hasActiveFilters && (
            <div className="p-6 lg:p-0 border-t border-gray-800 bg-[#111827] lg:bg-transparent sticky bottom-0">
              <button
                onClick={clearFilters}
                className="w-full bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500 text-red-400 font-bold py-3 rounded-lg transition-all text-sm flex items-center justify-center gap-2"
              >
                <X size={18} />
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCTS SECTION - RETURNS TO PARENT */}
      <div className="flex-1 w-full">
        {/* This space is for products from parent component */}
      </div>
    </div>
  );
};

export default SearchFilter;
