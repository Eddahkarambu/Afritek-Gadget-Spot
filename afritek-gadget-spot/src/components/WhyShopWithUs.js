import React from "react";
import { Zap, Shield, Headphones, Truck, RefreshCw, Award } from "lucide-react";

const WhyShopWithUs = () => {
  const reasons = [
    {
      icon: Shield,
      title: "100% Authentic",
      description: "All products are genuine from authorized distributors",
      color: "from-blue-600 to-blue-400",
    },
    {
      icon: Truck,
      title: "Fast & Free Shipping",
      description: "Delivery within 2-5 business days across Kenya",
      color: "from-green-600 to-green-400",
    },
    {
      icon: Award,
      title: "Best Prices",
      description: "Competitive pricing without compromising quality",
      color: "from-purple-600 to-purple-400",
    },
    {
      icon: Headphones,
      title: "Expert Support",
      description: "24/7 customer support from our knowledgeable team",
      color: "from-orange-600 to-orange-400",
    },
    {
      icon: RefreshCw,
      title: "Easy Returns",
      description: "30-day money-back guarantee, no questions asked",
      color: "from-pink-600 to-pink-400",
    },
    {
      icon: Zap,
      title: "Secure Payment",
      description: "SSL encrypted checkout with multiple payment options",
      color: "from-yellow-600 to-yellow-400",
    },
  ];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">
          Why <span className="text-blue-500">Shop With Us</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We're committed to providing the best shopping experience with
          authentic products, excellent service, and unbeatable prices
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reasons.map((reason, index) => {
          const IconComponent = reason.icon;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl bg-[#111827] border border-gray-800 p-8 hover:border-blue-500/50 transition-all duration-300"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              {/* Hover Glow */}
              <div className="absolute -top-1/2 -right-1/2 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-50 transition-all duration-500 group-hover:scale-150"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-all border border-blue-500/30 group-hover:scale-110 transform duration-300">
                  <IconComponent
                    size={28}
                    className="text-blue-500 group-hover:text-blue-400 transition-colors"
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-400 transition-colors duration-300">
                  {reason.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {reason.description}
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400 w-0 group-hover:w-full transition-all duration-500"></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Badges */}
      <div className="mt-16 p-8 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-blue-500/20">
        <p className="text-center text-gray-300 mb-6">
          🔒 Shop with confidence - We're trusted by 50,000+ customers
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">50K+</p>
            <p className="text-gray-400 text-sm">Happy Customers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">4.8★</p>
            <p className="text-gray-400 text-sm">Average Rating</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-500">99%</p>
            <p className="text-gray-400 text-sm">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyShopWithUs;
