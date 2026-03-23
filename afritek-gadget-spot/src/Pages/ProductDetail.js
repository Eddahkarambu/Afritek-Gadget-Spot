import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import phoneProducts from "../Data/Products";

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  // Find product from your products data
  const product = phoneProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen pt-24 pb-20 bg-white">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h1>
        </div>
      </div>
    );
  }

  const originalPrice = product.price + Math.floor(product.price * 0.15);
  const discount = 15;

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <div className="flex gap-2 text-gray-600">
          <a href="/" className="hover:text-teal-600">
            Home
          </a>
          <span>/</span>
          <a href="/shop" className="hover:text-teal-600">
            Shop
          </a>
          <span>/</span>
          <span className="text-teal-600">
            {product.brand} {product.model}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200 p-8 flex items-center justify-center h-96">
            <img
              src={product.image}
              alt={product.model}
              className="h-full object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400?text=" + product.model;
              }}
            />
          </div>

          {/* Product Details */}
          <div>
            {/* Badge */}
            <div className="inline-block bg-gradient-to-r from-teal-600 to-cyan-600 text-white text-xs px-4 py-2 rounded-full font-bold mb-4">
              {product.brand}
            </div>

            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.model}
            </h1>
            <p className="text-gray-600 text-lg mb-6">{product.specs}</p>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600">(256 reviews)</span>
            </div>

            {/* Pricing */}
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-6 mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl font-bold text-teal-700">
                  KES {product.price.toLocaleString()}
                </span>
                <span className="text-xl line-through text-gray-500">
                  KES {originalPrice.toLocaleString()}
                </span>
                <span className="bg-red-500 text-white px-3 py-1 rounded-full font-bold">
                  -{discount}%
                </span>
              </div>
              <p className="text-gray-600">
                Save KES {(originalPrice - product.price).toLocaleString()}
              </p>
            </div>

            {/* Quantity & Actions */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border-2 border-teal-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-3 text-teal-600 hover:bg-teal-50"
                >
                  −
                </button>
                <span className="px-6 py-3 border-l-2 border-r-2 border-teal-200 font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-3 text-teal-600 hover:bg-teal-50"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => setLiked(!liked)}
                className={`px-6 py-3 rounded-lg border-2 transition-all flex items-center gap-2 font-bold ${
                  liked
                    ? "bg-red-50 border-red-400 text-red-600"
                    : "bg-white border-teal-200 text-gray-600 hover:border-teal-400"
                }`}
              >
                <Heart size={20} className={liked ? "fill-current" : ""} />
                Wishlist
              </button>
            </div>

            {/* Add to Cart */}
            <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-4 rounded-lg flex items-center justify-center gap-2 text-lg mb-8 shadow-lg shadow-teal-600/30">
              <ShoppingCart size={24} />
              Add to Cart
            </button>

            {/* Features */}
            <div className="space-y-4 border-t-2 border-gray-200 pt-8">
              <div className="flex gap-4 items-start">
                <Truck size={24} className="text-teal-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-bold text-gray-900">Free Delivery</h3>
                  <p className="text-gray-600">
                    Across East Africa within 24-48 hours
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <Shield
                  size={24}
                  className="text-teal-600 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-bold text-gray-900">Warranty Included</h3>
                  <p className="text-gray-600">
                    Official manufacturer warranty and support
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <RotateCcw
                  size={24}
                  className="text-teal-600 flex-shrink-0 mt-1"
                />
                <div>
                  <h3 className="font-bold text-gray-900">Easy Returns</h3>
                  <p className="text-gray-600">
                    30-day return policy on all products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Description */}
        <div className="mt-20 border-t-2 border-gray-200 pt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Product Specifications
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-teal-900 mb-6">
                Key Features
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  <span className="text-gray-700">
                    Storage: {product.specs}
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  <span className="text-gray-700">100% Authentic</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  <span className="text-gray-700">Official Warranty</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-teal-600 rounded-full"></span>
                  <span className="text-gray-700">Free Delivery</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-purple-900 mb-6">
                Why Choose This Product
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span className="text-gray-700">Latest Technology</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span className="text-gray-700">Premium Quality</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span className="text-gray-700">Best Price</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                  <span className="text-gray-700">Customer Support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
