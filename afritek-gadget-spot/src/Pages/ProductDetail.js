import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import ProductReviews from "../components/ProductReviews";

const ProductDetail = ({ onAdd }) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample product data
  const product = {
    id: id,
    name: "Samsung Galaxy S25 Ultra",
    price: "KSh 189,999",
    originalPrice: "KSh 225,000",
    rating: 4.8,
    reviews: 245,
    inStock: true,
    description:
      "Experience the future of mobile technology with the Samsung Galaxy S25 Ultra. Featuring an advanced AI-powered camera system, stunning 6.8-inch display, and lightning-fast performance.",
    specs: {
      Display: '6.8" AMOLED, 120Hz',
      Processor: "Snapdragon 8 Gen 4",
      RAM: "12GB",
      Storage: "256GB",
      Camera: "200MP Main + 50MP Ultra Wide",
      Battery: "5000mAh, 45W Fast Charge",
      OS: "Android 15",
    },
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800",
  };

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAdd(product);
    }
    alert(`${quantity} ${product.name} added to cart!`);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Product Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Image */}
        <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800 flex items-center justify-center h-96 md:h-auto">
          <img
            src={product.image}
            alt={product.name}
            className="max-h-96 object-contain"
          />
        </div>

        {/* Details */}
        <div>
          <p className="text-blue-500 text-sm font-bold uppercase">
            Smartphones
          </p>
          <h1 className="text-4xl md:text-5xl font-bold my-4">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
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
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold">{product.price}</span>
              <span className="text-gray-500 line-through text-xl">
                {product.originalPrice}
              </span>
              <span className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold">
                15% OFF
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-8 leading-relaxed">
            {product.description}
          </p>

          {/* Quantity & Buttons */}
          <div className="flex gap-4 mb-8">
            <div className="flex items-center border border-gray-700 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                −
              </button>
              <span className="px-6 py-2 font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-400 hover:text-white"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`px-6 py-3 rounded-lg border transition-all ${
                isFavorite
                  ? "bg-red-500/20 border-red-500 text-red-500"
                  : "border-gray-700 text-gray-400 hover:border-blue-500"
              }`}
            >
              <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
            </button>
          </div>

          {/* In Stock */}
          {product.inStock ? (
            <p className="text-green-400 font-bold mb-8">✓ In Stock</p>
          ) : (
            <p className="text-red-400 font-bold mb-8">Out of Stock</p>
          )}

          {/* Specs */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800">
            <h3 className="font-bold mb-4">Key Specifications</h3>
            <div className="space-y-3">
              {Object.entries(product.specs).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-400">{key}</span>
                  <span className="font-bold">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <ProductReviews productId={id} />
    </div>
  );
};

export default ProductDetail;
