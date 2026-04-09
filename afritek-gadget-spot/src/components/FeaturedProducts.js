import React from "react";
import { Star, ShoppingCart } from "lucide-react";
import phoneProducts from "../Data/Products";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const featuredProducts = phoneProducts
    .filter((p) => p.isFeatured)
    .slice(0, 4);

  return (
    <section className="bg-gradient-to-b from-white to-teal-50 px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Featured{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              Products
            </span>
          </h2>
          <p className="text-gray-600 text-lg">
            Top picks from the latest smartphones, tablets & accessories
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl border-2 border-teal-200 hover:border-purple-500 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-purple-500/20"
            >
              {/* Image Area with Badge */}
              <div className="relative h-40 sm:h-48 bg-gradient-to-br from-teal-50 to-cyan-50 overflow-hidden flex items-center justify-center border-b-2 border-teal-100">
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10">
                    🆕 NEW
                  </span>
                )}
                {product.isFeatured && (
                  <span className="absolute top-3 right-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10">
                    ⭐ HOT
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.model}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200?text=" + product.model;
                  }}
                />
              </div>

              {/* Details Area */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-teal-600 text-[11px] font-bold tracking-[0.2em] mb-1 uppercase">
                  {product.brand}
                </p>
                <h3 className="text-gray-900 text-sm font-bold mb-1 group-hover:text-teal-700 transition-colors">
                  {product.model}
                </h3>
                <p className="text-gray-500 text-xs mb-3">{product.specs}</p>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Price */}
                <div className="mb-4 mt-auto">
                  <p className="text-teal-700 text-lg font-bold">
                    KES {product.price.toLocaleString()}
                  </p>
                </div>

                {/* Add to Cart Button */}
                <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-teal-600/30">
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
