import React, { useState } from "react";
import { Search, Filter, X } from "lucide-react";

const SearchFilter = ({ onSearch, onFilter, products }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 300000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(300000);
  const [selectedRating, setSelectedRating] = useState(0);
  const [showFilters, setShowFilters] = useState(true);

  // Get unique categories from products
  const categories = [
    "All",
    ...new Set(products.map((p) => p.category).filter(Boolean)),
  ];

  const handleSearch = (e) => {
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

  const handlePriceChange = (type, value) => {
    const numValue = parseInt(value);

    if (type === "min") {
      setMinPrice(numValue);
      const newRange = [numValue, priceRange[1]];
      setPriceRange(newRange);
      onFilter({
        category: selectedCategory,
        priceRange: newRange,
        rating: selectedRating,
        search: searchTerm,
      });
    } else {
      setMaxPrice(numValue);
      const newRange = [priceRange[0], numValue];
      setPriceRange(newRange);
      onFilter({
        category: selectedCategory,
        priceRange: newRange,
        rating: selectedRating,
        search: searchTerm,
      });
    }
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

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("All");
    setPriceRange([0, 300000]);
    setMinPrice(0);
    setMaxPrice(300000);
    setSelectedRating(0);
    onFilter({
      category: "All",
      priceRange: [0, 300000],
      rating: 0,
      search: "",
    });
    onSearch("");
  };

  return (
    <div className="bg-white rounded-xl border-2 border-teal-200 p-6 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-teal-900 flex items-center gap-2">
          <Filter size={24} />
          Filters
        </h3>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden text-teal-600 hover:text-teal-700"
        >
          {showFilters ? <X size={24} /> : <Filter size={24} />}
        </button>
      </div>

      {showFilters && (
        <>
          {/* Search Box */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Search Products
            </label>
            <div className="relative">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-600"
              />
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search by name..."
                className="w-full pl-10 pr-4 py-2 border-2 border-teal-200 rounded-lg focus:border-teal-600 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-6 pb-6 border-b-2 border-teal-100">
            <h4 className="text-sm font-bold text-teal-900 mb-3 uppercase">
              Category
            </h4>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={selectedCategory === category}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-teal-600 cursor-pointer accent-teal-600"
                  />
                  <span className="text-gray-700 group-hover:text-teal-600 transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range Filter */}
          <div className="mb-6 pb-6 border-b-2 border-teal-100">
            <h4 className="text-sm font-bold text-teal-900 mb-3 uppercase">
              Price Range
            </h4>

            {/* Price Display */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-700">
                <span className="font-semibold text-teal-700">
                  KES {minPrice.toLocaleString()}
                </span>
                {" - "}
                <span className="font-semibold text-teal-700">
                  KES {maxPrice.toLocaleString()}
                </span>
              </p>
            </div>

            {/* Min Price Slider */}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-600 block mb-2">
                Minimum Price
              </label>
              <input
                type="range"
                min="0"
                max="300000"
                step="5000"
                value={minPrice}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <input
                type="number"
                value={minPrice}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-full mt-2 px-3 py-2 border-2 border-teal-200 rounded-lg text-sm focus:border-teal-600 focus:outline-none"
              />
            </div>

            {/* Max Price Slider */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-2">
                Maximum Price
              </label>
              <input
                type="range"
                min="0"
                max="300000"
                step="5000"
                value={maxPrice}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-full h-2 bg-teal-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-full mt-2 px-3 py-2 border-2 border-teal-200 rounded-lg text-sm focus:border-teal-600 focus:outline-none"
              />
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6 pb-6 border-b-2 border-teal-100">
            <h4 className="text-sm font-bold text-teal-900 mb-3 uppercase">
              Rating
            </h4>
            <div className="space-y-2">
              {[
                { value: 0, label: "All Ratings" },
                { value: 5, label: "⭐⭐⭐⭐⭐ 5 Star" },
                { value: 4, label: "⭐⭐⭐⭐ 4 Star & Up" },
                { value: 3, label: "⭐⭐⭐ 3 Star & Up" },
                { value: 2, label: "⭐⭐ 2 Star & Up" },
              ].map((rating) => (
                <label
                  key={rating.value}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="rating"
                    value={rating.value}
                    checked={selectedRating === rating.value}
                    onChange={() => handleRatingChange(rating.value)}
                    className="w-4 h-4 text-teal-600 cursor-pointer accent-teal-600"
                  />
                  <span className="text-gray-700 group-hover:text-teal-600 transition-colors text-sm">
                    {rating.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleReset}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 rounded-lg transition-all"
            >
              Reset
            </button>
            <button className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all shadow-lg shadow-teal-600/30">
              Apply
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-6 pt-6 border-t-2 border-teal-100">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg p-4">
              <p className="text-xs text-gray-600 mb-2">
                <span className="font-semibold text-teal-700">
                  Quick Stats:
                </span>
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <p className="text-gray-600">Total Products</p>
                  <p className="font-bold text-teal-700">{products.length}</p>
                </div>
                <div>
                  <p className="text-gray-600">Price Range</p>
                  <p className="font-bold text-teal-700">KES 0 - 300K</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchFilter;
