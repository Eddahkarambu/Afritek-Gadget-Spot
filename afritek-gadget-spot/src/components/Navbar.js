import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Smartphone, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = ({ cartCount = 0 }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0a0f18] border-b border-gray-800/50 py-4">
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
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
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-[15px] font-medium text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Right Side (Cart + Mobile Menu) */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
            <ShoppingCart size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#3b82f6] text-[10px] font-bold text-white h-5 w-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
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

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden absolute w-full bg-[#0a0f18] border-b border-gray-800 transition-all duration-300 ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-md font-medium text-gray-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
