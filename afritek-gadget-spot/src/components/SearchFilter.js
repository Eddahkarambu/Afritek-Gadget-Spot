import React, { useState } from "react";
import { Search, Filter, Sliders } from "lucide-react";

const SearchFilter = ({ onSearch, onFilter, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [selectedRating, setSelectedRating] = useState(0);

  const categories = [
    "All",
    "Budget",
    "Mid-range",
    "Flagship",
    "Tablet",
    "Other",
  ];

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter({
      category,
      priceRange,
      rating: selectedRating,
      search: searchTerm,
    });
  };

  const handleMinPriceChange = (e) => {
    const newMin = parseInt(e.target.value);
    const newRange = [newMin, priceRange[1]];
    setPriceRange(newRange);
    onFilter({
      category: selectedCategory,
      priceRange: newRange,
      rating: selectedRating,
      search: searchTerm,
    });
  };

  const handleMaxPriceChange = (e) => {
    const newMax = parseInt(e.target.value);
    const newRange = [priceRange[0], newMax];
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
      priceRange,
      rating,
      search: searchTerm,
    });
  };

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div className="relative">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500"
        />
        <input
          type="text"
          placeholder="Search gadgets..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full bg-gradient-to-r from-teal-900 to-teal-800 border-2 border-cyan-500/50 hover:border-cyan-400 focus:border-cyan-400 text-white placeholder-gray-400 pl-12 pr-4 py-3 rounded-lg outline-none transition-all"
        />
      </div>

      {/* Category Filter */}
      <div className="bg-gradient-to-br from-teal-900 to-teal-800 border-2 border-cyan-500/50 rounded-lg p-6 hover:border-cyan-400 transition-all">
        <div className="flex items-center gap-3 mb-4">
          <Filter size={24} className="text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Category</h3>
        </div>

        <div className="space-y-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all font-semibold flex items-center gap-3 ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-2 border-cyan-400"
                  : "bg-teal-800/50 text-gray-300 border-2 border-teal-700 hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedCategory === category
                    ? "bg-white border-white"
                    : "border-gray-500"
                }`}
              ></div>
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="bg-gradient-to-br from-teal-900 to-teal-800 border-2 border-cyan-500/50 rounded-lg p-6 hover:border-cyan-400 transition-all">
        <div className="flex items-center gap-3 mb-6">
          <Sliders size={24} className="text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Price Range</h3>
        </div>

        <div className="space-y-4">
          {/* Min Price */}
          <div>
            <label className="block text-cyan-400 text-sm font-bold mb-2">
              Min: KSh {priceRange[0].toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="300000"
              step="5000"
              value={priceRange[0]}
              onChange={handleMinPriceChange}
              className="w-full h-2 bg-teal-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>

          {/* Max Price */}
          <div>
            <label className="block text-cyan-400 text-sm font-bold mb-2">
              Max: KSh {priceRange[1].toLocaleString()}
            </label>
            <input
              type="range"
              min="0"
              max="300000"
              step="5000"
              value={priceRange[1]}
              onChange={handleMaxPriceChange}
              className="w-full h-2 bg-teal-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="bg-gradient-to-br from-teal-900 to-teal-800 border-2 border-cyan-500/50 rounded-lg p-6 hover:border-cyan-400 transition-all">
        <h3 className="text-xl font-bold text-white mb-4">Rating</h3>

        <div className="space-y-3">
          {[0, 3, 4, 4.5, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleRatingChange(rating)}
              className={`w-full text-left px-4 py-3 rounded-lg transition-all font-semibold flex items-center gap-3 ${
                selectedRating === rating
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-2 border-purple-400"
                  : "bg-teal-800/50 text-gray-300 border-2 border-teal-700 hover:border-cyan-400 hover:text-cyan-400"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border-2 ${
                  selectedRating === rating
                    ? "bg-white border-white"
                    : "border-gray-500"
                }`}
              ></div>
              {rating === 0 ? "All Ratings" : `${rating}⭐ & Up`}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Filters Button */}
      <button
        onClick={() => {
          setSearchTerm("");
          setSelectedCategory("All");
          setPriceRange([0, 300000]);
          setSelectedRating(0);
          onFilter({
            category: "All",
            priceRange: [0, 300000],
            rating: 0,
            search: "",
          });
        }}
        className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-bold py-3 rounded-lg transition-all shadow-lg"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default SearchFilter;
