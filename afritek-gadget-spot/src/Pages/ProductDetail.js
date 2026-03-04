import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, ArrowLeft, Heart } from "lucide-react";

const allProducts = [
  {
    id: 1,
    name: "Samsung S25 Ultra",
    category: "Phones",
    price: "KSh 189,999",
    oldPrice: "KSh 210,000",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800",
    rating: 4.8,
    reviews: 245,
    brand: "SAMSUNG",
    stock: 15,
    specs: {
      processor: "Snapdragon 8 Gen 4",
      ram: "12GB",
      storage: "256GB",
      display: "6.8 inch AMOLED",
      battery: "5000 mAh",
      camera: "200MP Main",
    },
    description:
      "Premium flagship smartphone with cutting-edge technology, exceptional camera, and powerful performance.",
    reviews_data: [
      {
        author: "John Doe",
        rating: 5,
        text: "Excellent phone! Best purchase ever.",
      },
      {
        author: "Jane Smith",
        rating: 4,
        text: "Great quality, fast delivery.",
      },
    ],
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
    brand: "APPLE",
    stock: 8,
    specs: {
      processor: "A18 Pro",
      ram: "8GB",
      storage: "256GB",
      display: "6.9 inch Super Retina",
      battery: "4685 mAh",
      camera: "48MP Main",
    },
    description:
      "Apple's most powerful iPhone with Pro features, advanced camera system, and A18 Pro chip.",
    reviews_data: [
      { author: "Mike Johnson", rating: 5, text: "Amazing device!" },
    ],
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
    brand: "APPLE",
    stock: 25,
    specs: {
      type: "Wireless Earbuds",
      noise_cancellation: "Active Noise Cancellation",
      battery: "6 hours (30 with case)",
      connectivity: "Bluetooth 5.3",
      charging: "Wireless",
    },
    description:
      "Premium wireless earbuds with active noise cancellation and seamless Apple integration.",
    reviews_data: [
      { author: "Sarah Lee", rating: 5, text: "Perfect sound quality!" },
    ],
  },
];

const ProductDetail = ({ onAdd }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = allProducts.find((p) => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-white text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>
        <button
          onClick={() => navigate("/shop")}
          className="mt-6 bg-blue-500 px-6 py-3 rounded-xl text-white hover:bg-blue-600"
        >
          Back to Shop
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAdd(product);
    }
    alert(`${quantity} item(s) added to cart!`);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate("/shop")}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Shop
      </button>

      {/* Product Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="bg-[#111827] rounded-3xl p-8 flex items-center justify-center h-96 border border-gray-800">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-80 object-contain"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          {/* Header */}
          <div>
            <p className="text-blue-500 text-sm font-bold tracking-widest mb-2">
              {product.brand}
            </p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-400">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <span className="text-4xl font-bold text-blue-500">
                  {product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-gray-500 line-through text-lg">
                    {product.oldPrice}
                  </span>
                )}
              </div>
              <p className="text-gray-400 text-sm">
                {product.stock > 0 ? (
                  <span className="text-green-400">
                    ✓ In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="text-red-400">Out of Stock</span>
                )}
              </p>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-[#111827] rounded-2xl p-6 mb-8 border border-gray-800">
            <h3 className="text-lg font-bold mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-500 text-sm capitalize">
                    {key.replace(/_/g, " ")}
                  </p>
                  <p className="text-white font-medium">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center border border-gray-700 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                −
              </button>
              <span className="px-6 py-2 font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
              >
                +
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart size={22} />
              Add to Cart
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-3 border border-gray-700 rounded-lg hover:border-blue-500 transition-colors"
            >
              <Heart
                size={22}
                className={isWishlisted ? "fill-red-500 text-red-500" : ""}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-20 border-t border-gray-800 pt-12">
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
        <div className="space-y-6">
          {product.reviews_data.map((review, index) => (
            <div
              key={index}
              className="bg-[#111827] rounded-2xl p-6 border border-gray-800"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-bold">{review.author}</h4>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-400">{review.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
