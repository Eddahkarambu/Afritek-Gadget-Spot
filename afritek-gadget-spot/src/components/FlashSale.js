import React, { useState, useEffect } from "react";
import { Zap, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import phoneProducts from "../Data/Products";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const flashProducts = phoneProducts.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="bg-gradient-to-b from-teal-50 to-white px-6 py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-8">
          <div>
            <h2 className="text-5xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Zap className="text-orange-500" size={40} />
              Flash{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">
                Sale
              </span>
            </h2>
            <p className="text-gray-600 text-lg">
              Limited time offers on premium gadgets
            </p>
          </div>

          {/* Countdown Timer */}
          <div className="bg-gradient-to-br from-red-900 to-orange-900 border-2 border-orange-500 rounded-xl p-6 text-white flex-shrink-0">
            <p className="text-sm font-semibold mb-3 text-orange-300">
              Ends In
            </p>
            <div className="flex gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">
                  {String(timeLeft.hours).padStart(2, "0")}
                </p>
                <p className="text-xs text-orange-300">Hours</p>
              </div>
              <span className="text-3xl font-bold">:</span>
              <div>
                <p className="text-3xl font-bold">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </p>
                <p className="text-xs text-orange-300">Minutes</p>
              </div>
              <span className="text-3xl font-bold">:</span>
              <div>
                <p className="text-3xl font-bold">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </p>
                <p className="text-xs text-orange-300">Seconds</p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {flashProducts.map((product) => (
            <div
              key={product.id}
              className="group relative bg-white rounded-xl border-2 border-orange-300 hover:border-orange-500 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-orange-500/20"
            >
              {/* Image Area */}
              <div className="relative h-48 bg-gradient-to-br from-orange-50 to-red-50 overflow-hidden flex items-center justify-center border-b-2 border-orange-100">
                <span className="absolute top-3 right-3 bg-gradient-to-br from-red-500 to-orange-600 text-white text-xs px-3 py-1 rounded-full font-bold z-10 animate-bounce">
                  -40%
                </span>
                <img
                  src={product.image}
                  alt={product.model}
                  className="max-h-full object-contain group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/200?text=" + product.model;
                  }}
                />
              </div>

              {/* Details */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-orange-600 text-[11px] font-bold tracking-[0.2em] mb-1 uppercase">
                  {product.brand}
                </p>
                <h3 className="text-gray-900 text-sm font-bold mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                  {product.model}
                </h3>

                {/* Prices */}
                <div className="mb-4">
                  <p className="text-orange-700 text-lg font-bold">
                    KES {product.price.toLocaleString()}
                  </p>
                  <p className="text-gray-500 line-through text-sm">
                    KES {(product.price * 1.67).toLocaleString()}
                  </p>
                </div>

                {/* Add to Cart */}
                <button className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-2 rounded-lg transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-orange-600/30">
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
            className="inline-block bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-orange-600/30"
          >
            View All Flash Deals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;
