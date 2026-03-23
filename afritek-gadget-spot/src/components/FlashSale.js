import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;

        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }

        if (minutes < 0) {
          minutes = 59;
          hours--;
        }

        if (hours < 0) {
          hours = 24;
          minutes = 0;
          seconds = 0;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600/20 to-teal-600/20 border border-cyan-500/30 p-12 md:p-16">
        {/* Animated Backgrounds */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

        {/* Content */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Zap size={24} className="text-cyan-400 animate-bounce" />
              <span className="text-cyan-400 font-bold text-sm tracking-widest">
                LIMITED TIME OFFER
              </span>
            </div>

            <h2 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
              Flash{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400">
                Sale
              </span>{" "}
              <br />
              <span className="text-4xl md:text-5xl">Up to 50% OFF</span>
            </h2>

            <p className="text-gray-300 text-lg mb-8">
              Massive discounts on selected premium gadgets. Limited stock
              available. Don't miss out!
            </p>

            {/* Countdown */}
            <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-cyan-500/20 inline-block">
              <p className="text-gray-300 text-sm mb-3">Offer ends in:</p>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-cyan-400">
                    {String(timeLeft.hours).padStart(2, "0")}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Hours</p>
                </div>
                <div className="text-3xl font-bold text-cyan-400">:</div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-cyan-400">
                    {String(timeLeft.minutes).padStart(2, "0")}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Minutes</p>
                </div>
                <div className="text-3xl font-bold text-cyan-400">:</div>
                <div className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-cyan-400">
                    {String(timeLeft.seconds).padStart(2, "0")}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">Seconds</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/shop"
              className="inline-block bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold px-8 py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/30"
            >
              Shop Sale Now →
            </Link>
          </div>

          {/* Right: Image */}
          <div className="relative h-80 md:h-96 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 flex items-center justify-center overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600"
              alt="Flash Sale"
              className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
            />

            {/* Discount Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-full w-20 h-20 flex items-center justify-center font-bold text-center shadow-lg shadow-cyan-500/30">
              <span className="text-2xl">50%</span>
              <span className="text-xs absolute bottom-2">OFF</span>
            </div>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-12 pt-8 border-t border-cyan-500/20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-400">500+</p>
            <p className="text-gray-400 text-sm">Items on Sale</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-400">Limited</p>
            <p className="text-gray-400 text-sm">Stock Available</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-cyan-400">Free</p>
            <p className="text-gray-400 text-sm">Shipping on Orders</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlashSale;