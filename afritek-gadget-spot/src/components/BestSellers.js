import React from "react";
import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";

const BestSellers = ({ onAdd }) => {
  const bestSellers = [
    {
      id: 1,
      name: "Samsung Galaxy S25 Ultra",
      category: "Smartphones",
      price: "KSh 189,999",
      originalPrice: "KSh 225,000",
      discount: "15%",
      image:
        "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400",
      rating: 4.8,
      reviews: 245,
      badge: "Best Seller",
    },
    {
      id: 2,
      name: "iPhone 16 Pro Max",
      category: "Smartphones",
      price: "KSh 225,000",
      originalPrice: "KSh 249,999",
      discount: "10%",
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
      price: "KSh 35,000",
      originalPrice: "KSh 45,000",
      discount: "22%",
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
      price: "KSh 145,000",
      originalPrice: "KSh 165,000",
      discount: "12%",
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
      price: "KSh 18,999",
      originalPrice: "KSh 25,000",
      discount: "24%",
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
      price: "KSh 65,000",
      originalPrice: "KSh 75,000",
      discount: "13%",
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400",
      rating: 4.7,
      reviews: 142,
      badge: "Premium",
    },
    {
      id: 7,
      name: "Google Pixel 9 Pro",
      category: "Smartphones",
      price: "KSh 165,000",
      originalPrice: "KSh 189,999",
      discount: "13%",
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
      price: "KSh 4,999",
      originalPrice: "KSh 7,500",
      discount: "33%",
      image:
        "https://images.unsplash.com/photo-1591437281884-767810e60f11?auto=format&fit=crop&q=80&w=400",
      rating: 4.5,
      reviews: 89,
      badge: "Budget",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-12">
        <div>
          <h2 className="text-5xl font-bold mb-2">
            Best <span className="text-blue-500">Sellers</span>
          </h2>
          <p className="text-gray-400">Handpicked products loved by our customers</p>
        </div>
        <Link
          to="/shop"
          className="hidden md:inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
        >
          View All →
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {bestSellers.map((product) => (
          <div
            key={product.id}
            className="group relative bg-[#111827] rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
          >
            {/* Product Image Container */}
            <div className="relative h-64 bg-[#161b22] overflow-hidden flex items-center justify-center">
              {/* Badge */}
              <div className="absolute top-3 left-3 z-10 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {product.badge}
              </div>

              {/* Discount Badge */}
              <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                -{product.discount}
              </div>

              {/* Product Image */}
              <Link to={`/product/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full object-contain group-hover:scale-110 transition-transform duration-300 cursor-pointer"
                />
              </Link>

              {/* Hover Overlay with Add to Cart */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <button
                  onClick={() => onAdd(product)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingCart size={20} />
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Category */}
              <p className="text-blue-500 text-xs font-bold uppercase tracking-wider mb-1">
                {product.category}
              </p>

              {/* Product Name */}
              <Link to={`/product/${product.id}`}>
                <h3 className="text-white font-bold text-sm mb-3 line-clamp-2 hover:text-blue-400 transition-colors cursor-pointer">
                  {product.name}
                </h3>
              </Link>

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
                  {product.price}
                </span>
                <span className="text-gray-500 line-through text-xs">
                  {product.originalPrice}
                </span>
              </div>

              {/* Add to Cart Button (Mobile) */}
              <button
                onClick={() => onAdd(product)}
                className="w-full md:hidden bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg text-sm transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button (Mobile) */}
      <div className="md:hidden">
        <Link
          to="/shop"
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl text-center transition-colors"
        >
          View All Products →
        </Link>
      </div>
    </section>
  );
};

export default BestSellers;