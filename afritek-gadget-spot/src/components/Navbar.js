import React from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, Search } from "lucide-react";
import AfritekLogo from "../Images/AfritekLogo.PNG";

const Navbar = ({ cartItems = [] }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-teal-900 via-teal-800 to-teal-900 backdrop-blur-md border-b-2 border-cyan-500/50 z-40 shadow-lg shadow-teal-900/50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link
          to="/"
          className="flex items-center gap-4 hover:opacity-90 transition-opacity group"
        >
          <img
            src={AfritekLogo}
            alt="Afritek Logo"
            className="h-14 w-auto object-contain group-hover:drop-shadow-lg group-hover:drop-shadow-cyan-500/50 transition-all"
          />

          <div className="hidden md:flex flex-col">
            <span className="text-teal-300 font-bold text-2xl leading-none">
              Afritek
            </span>
            <div className="flex gap-1 mt-1">
              <span className="text-purple-500 font-bold text-xs tracking-wider">
                GADGET
              </span>
              <span className="text-cyan-400 font-bold text-xs tracking-wider">
                SPOT
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-100 hover:text-cyan-300 transition-colors font-medium relative group"
          >
            Home
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/shop"
            className="text-gray-100 hover:text-cyan-300 transition-colors font-medium relative group"
          >
            Shop
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/about"
            className="text-gray-100 hover:text-cyan-300 transition-colors font-medium relative group"
          >
            About
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            to="/contact"
            className="text-gray-100 hover:text-cyan-300 transition-colors font-medium relative group"
          >
            Contact
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-teal-400 group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Search Button */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="text-cyan-400 hover:text-cyan-300 transition-colors p-2 hover:bg-teal-700/50 rounded-lg"
            title="Search"
          >
            <Search size={22} />
          </button>

          {/* Cart Button with Badge */}
          <Link to="/cart" className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-cyan-500 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>

            <div className="relative bg-gradient-to-br from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-5 py-2 rounded-lg transition-all flex items-center gap-2 font-bold hidden md:flex shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50">
              <ShoppingCart size={20} />
              <span>Cart</span>

              {cartItems && cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-purple-800 animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          {/* Mobile Cart Icon */}
          <Link
            to="/cart"
            className="lg:hidden relative text-cyan-400 hover:text-cyan-300 transition-colors p-2"
          >
            <ShoppingCart size={22} />
            {cartItems && cartItems.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-cyan-400 p-2 hover:bg-teal-700/50 rounded-lg transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            title="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="bg-gradient-to-r from-teal-800 to-teal-700 border-t-2 border-cyan-500/30 px-6 py-4 animate-in">
          <div className="max-w-7xl mx-auto relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400"
            />
            <input
              type="text"
              placeholder="Search gadgets, phones, tablets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  // TODO: implement search behavior
                }
              }}
              className="w-full bg-teal-900/50 border-2 border-cyan-500/50 hover:border-cyan-400 focus:border-cyan-300 text-white placeholder-gray-400 pl-10 pr-4 py-2 rounded-lg focus:outline-none transition-all"
            />
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-gradient-to-b from-teal-800 to-teal-900 border-t-2 border-cyan-500/50 animate-in">
          <div className="flex flex-col gap-2 p-6 space-y-2">
            <Link
              to="/"
              className="text-gray-100 hover:text-cyan-300 transition-colors py-2 font-medium px-4 hover:bg-teal-700/50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-100 hover:text-cyan-300 transition-colors py-2 font-medium px-4 hover:bg-teal-700/50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-100 hover:text-cyan-300 transition-colors py-2 font-medium px-4 hover:bg-teal-700/50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-100 hover:text-cyan-300 transition-colors py-2 font-medium px-4 hover:bg-teal-700/50 rounded-lg"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <Link
              to="/cart"
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2 justify-center font-medium hover:from-purple-700 hover:to-indigo-700 transition-all w-full relative"
              onClick={() => setIsOpen(false)}
            >
              <ShoppingCart size={20} />
              View Cart
              {cartItems && cartItems.length > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
