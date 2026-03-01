import React, { useState } from "react";
import { Smartphone, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0f18] border-b border-gray-800/50 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="border-2 border-[#3b82f6] p-1 rounded-md">
            <Smartphone
              size={20}
              className="text-[#3b82f6]"
              strokeWidth={2.5}
            />
          </div>
          <h1 className="text-white text-xl font-bold tracking-tight">
            Afritek <span className="text-[#3b82f6]">Gadget Spot</span>
          </h1>
        </div>

        {/* Desktop Navigation Links - Centered Style */}
        <div className="hidden md:flex items-center gap-10">
          {["Home", "Phones", "Accessories", "Tablets", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-[15px] font-medium text-gray-400 hover:text-white transition-colors"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Cart Icon with Exact Badge Style */}
        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
            <ShoppingCart size={22} strokeWidth={1.5} />
            <span className="absolute -top-1 -right-1 bg-[#3b82f6] text-[10px] font-bold text-white h-5 w-5 flex items-center justify-center rounded-full">
              0
            </span>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-[#0a0f18] border-b border-gray-800 transition-all duration-300 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {["Home", "Phones", "Accessories", "Tablets", "About"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-md font-medium text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
