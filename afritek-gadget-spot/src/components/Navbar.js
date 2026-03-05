import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Bell,
  Menu,
  X,
  LogOut,
  Home,
  Store,
  Info,
  Phone,
  ChevronDown,
} from "lucide-react";
import Logo from "./Logo";

const Navbar = ({ cartItems = [], onCart }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const searchRef = useRef(null);
  const notifRef = useRef(null);
  const accountRef = useRef(null);

  // Sample notifications
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "order",
      message: "Your order #12345 has been shipped",
      time: "2 hours ago",
      icon: "📦",
      read: false,
    },
    {
      id: 2,
      type: "promo",
      message: "Flash sale: 50% off on selected phones",
      time: "5 hours ago",
      icon: "🎉",
      read: false,
    },
    {
      id: 3,
      type: "stock",
      message: "iPhone 16 Pro is back in stock",
      time: "1 day ago",
      icon: "✓",
      read: true,
    },
  ]);

  // Sample products for search
  const allProducts = [
    { id: 1, name: "Samsung Galaxy S25 Ultra", category: "Phones" },
    { id: 2, name: "iPhone 16 Pro Max", category: "Phones" },
    { id: 3, name: "iPad Pro 12.9", category: "Tablets" },
    { id: 4, name: "AirPods Pro 2", category: "Accessories" },
    { id: 5, name: "Apple Watch Series 9", category: "Smartwatches" },
    { id: 6, name: "Google Pixel 9 Pro", category: "Phones" },
    { id: 7, name: "Samsung Galaxy Buds3", category: "Accessories" },
    { id: 8, name: "USB-C Fast Charger", category: "Accessories" },
  ];

  const searchResults = searchTerm
    ? allProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const unreadNotifications = notifications.filter((n) => !n.read).length;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (accountRef.current && !accountRef.current.contains(e.target)) {
        setShowAccountMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const handleClearNotifications = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-b from-[#0a0f1a] to-[#0a0c10] border-b border-gray-800 z-50 backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
          >
            <Logo size={40} showText={true} />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2"
            >
              <Home size={18} />
              Home
            </Link>
            <Link
              to="/shop"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2"
            >
              <Store size={18} />
              Shop
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2"
            >
              <Info size={18} />
              About
            </Link>
            <a
              href="#contact"
              className="text-gray-300 hover:text-cyan-400 transition-colors font-medium flex items-center gap-2"
            >
              <Phone size={18} />
              Contact
            </a>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-xs" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                className="w-full bg-[#111827] border border-gray-700 hover:border-cyan-500 focus:border-cyan-500 text-white placeholder-gray-500 pl-4 pr-10 py-2 rounded-lg outline-none transition-all"
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
              />

              {/* Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-[#111827] border border-gray-700 rounded-lg overflow-hidden z-50 shadow-xl">
                  {searchResults.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => {
                        setSearchTerm("");
                        setShowSearchResults(false);
                      }}
                      className="flex items-center justify-between px-4 py-3 hover:bg-cyan-500/10 border-b border-gray-800 last:border-0 transition-colors group"
                    >
                      <div>
                        <p className="text-white group-hover:text-cyan-400 transition-colors">
                          {product.name}
                        </p>
                        <p className="text-gray-500 text-xs">
                          {product.category}
                        </p>
                      </div>
                      <Search size={16} className="text-gray-500" />
                    </Link>
                  ))}
                  {searchResults.length > 5 && (
                    <div className="px-4 py-2 bg-gray-900 text-center text-sm text-gray-400">
                      +{searchResults.length - 5} more results
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Icons */}
          <div className="flex items-center gap-4">
            {/* Mobile Search Icon */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-cyan-400"
              title="Search"
            >
              <Search size={20} />
            </button>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-cyan-400 group"
                title="Notifications"
              >
                <Bell size={20} />
                {unreadNotifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* Notifications Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-[#111827] border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                  {/* Header */}
                  <div className="bg-[#0a0f18] px-4 py-3 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="font-bold text-white">Notifications</h3>
                    {notifications.length > 0 && (
                      <button
                        onClick={handleClearNotifications}
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                      >
                        Clear All
                      </button>
                    )}
                  </div>

                  {/* Notifications List */}
                  {notifications.length > 0 ? (
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleMarkAsRead(notif.id)}
                          className={`px-4 py-3 border-b border-gray-800 last:border-0 cursor-pointer transition-all ${
                            notif.read
                              ? "bg-[#111827] hover:bg-[#161b22]"
                              : "bg-cyan-500/10 hover:bg-cyan-500/20"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <span className="text-xl mt-1">{notif.icon}</span>
                            <div className="flex-1">
                              <p className="text-white text-sm font-medium">
                                {notif.message}
                              </p>
                              <p className="text-gray-500 text-xs mt-1">
                                {notif.time}
                              </p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 bg-cyan-500 rounded-full mt-1"></div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Bell size={32} className="text-gray-700 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">
                        No notifications yet
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Cart */}
            <Link
              to="/cart"
              className="relative p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-cyan-400 group"
              title="Shopping Cart"
            >
              <ShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute top-0 right-0 bg-cyan-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Account Menu */}
            <div className="relative" ref={accountRef}>
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="hidden sm:flex items-center gap-2 px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-cyan-400"
              >
                <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  👤
                </div>
                <ChevronDown size={16} />
              </button>

              {/* Account Dropdown */}
              {showAccountMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#111827] border border-gray-700 rounded-lg shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-800">
                    <p className="text-white font-bold text-sm">John Doe</p>
                    <p className="text-gray-500 text-xs">john@example.com</p>
                  </div>

                  <div className="py-2">
                    <Link
                      to="/account"
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-900 transition-colors text-sm"
                    >
                      👤 My Account
                    </Link>
                    <Link
                      to="/orders"
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-900 transition-colors text-sm"
                    >
                      📦 My Orders
                    </Link>
                    <Link
                      to="/wishlist"
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-900 transition-colors text-sm"
                    >
                      ❤️ Wishlist
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-900 transition-colors text-sm"
                    >
                      ⚙️ Settings
                    </Link>
                  </div>

                  <div className="border-t border-gray-800 py-2">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-red-400 hover:text-red-300 hover:bg-gray-900 transition-colors text-sm text-left">
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-300 hover:text-cyan-400"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 mb-4 md:hidden" ref={searchRef}>
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSearchResults(true);
                }}
                className="w-full bg-[#111827] border border-gray-700 text-white placeholder-gray-500 pl-4 pr-10 py-2 rounded-lg outline-none"
                autoFocus
              />
              <Search
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-gray-800 space-y-2">
            <Link
              to="/"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded transition-colors"
            >
              🏠 Home
            </Link>
            <Link
              to="/shop"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded transition-colors"
            >
              🛍️ Shop
            </Link>
            <Link
              to="/about"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded transition-colors"
            >
              ℹ️ About
            </Link>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 text-gray-300 hover:text-cyan-400 hover:bg-gray-800 rounded transition-colors"
            >
              📞 Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
