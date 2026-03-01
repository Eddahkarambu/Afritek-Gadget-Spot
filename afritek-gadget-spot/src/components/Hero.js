import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[80vh] flex flex-col md:flex-row items-center justify-between px-6 md:px-16 pt-32 pb-16 overflow-hidden bg-[#0a0f18]">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      {/* Left Content */}
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-[#111827] border border-blue-500/30 rounded-full px-4 py-2 mb-8">
          <span className="text-lg">🔥</span>
          <span className="text-blue-400 text-sm font-medium tracking-wide">
            New Arrivals 2026
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-extrabold text-white leading-[1.1] mb-6">
          Your Next <br />
          <span className="text-[#58a6ff]">Smart Device</span> <br />
          Awaits
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 leading-relaxed">
          Premium smartphones, tablets & accessories at unbeatable prices.
          Trusted by thousands across Africa.
        </p>

        <div className="flex flex-wrap gap-4">
          <button className="bg-[#3b82f6] hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl flex items-center gap-2 transition-all transform active:scale-95 shadow-lg shadow-blue-500/20">
            Shop Now <ArrowRight size={20} />
          </button>
          <button className="border border-gray-700 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl transition-all">
            View Deals
          </button>
        </div>
      </div>

      {/* Right Image Content */}
      <div className="relative mt-16 md:mt-0 w-full md:w-1/2 flex justify-center">
        {/* Animated Light Trails (Simulated) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[400px] h-[400px] border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
          <div className="absolute w-[500px] h-[300px] border border-orange-500/10 rounded-full rotate-45 animate-[spin_15s_linear_infinite_reverse]"></div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=800"
          alt="Smartphone Hero"
          className="relative z-10 w-full max-w-md drop-shadow-[0_35px_35px_rgba(59,130,246,0.3)] transform md:rotate-12"
        />
      </div>
    </section>
  );
};

export default Hero;
