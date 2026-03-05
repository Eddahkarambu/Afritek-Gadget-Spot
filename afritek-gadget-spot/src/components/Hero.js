import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Zap } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-32 pb-20 relative overflow-hidden">
      {/* Animated Background Gradients */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-cyan-500/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-teal-500/20 blur-[120px] rounded-full animate-pulse"></div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-4 py-2 mb-8 backdrop-blur-sm">
          <Zap size={16} className="text-cyan-400" />
          <span className="text-cyan-400 text-sm font-medium">
            Welcome to Afritek Gadget Spot
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.1] mb-6">
          Premium Tech,{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text animate-pulse">
            Unbeatable Prices
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Discover the latest smartphones, tablets, and accessories from top
          brands. 100% authentic, fast delivery, expert support.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link
            to="/shop"
            className="group relative bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2"
          >
            Shop Now
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          <Link
            to="/about"
            className="border-2 border-cyan-500/50 hover:border-cyan-500 hover:bg-cyan-500/10 text-cyan-400 font-bold px-8 py-4 rounded-xl transition-all"
          >
            Learn More
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 max-w-xl mx-auto">
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
            <p className="text-2xl font-bold text-cyan-400">50K+</p>
            <p className="text-gray-400 text-sm">Customers</p>
          </div>
          <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-teal-500/40 transition-all">
            <p className="text-2xl font-bold text-teal-400">100K+</p>
            <p className="text-gray-400 text-sm">Products</p>
          </div>
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
            <p className="text-2xl font-bold text-cyan-400">4.8★</p>
            <p className="text-gray-400 text-sm">Rated</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
