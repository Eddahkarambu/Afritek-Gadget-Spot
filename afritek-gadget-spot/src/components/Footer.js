import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  const handleCategoryClick = (category) => {
    // This will navigate to shop with the selected category
    window.location.href = `/shop?category=${category}`;
  };

  return (
    <footer className="bg-[#0a0c10] border-t border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold">📱</span>
              </div>
              <h3 className="text-2xl font-bold">
                AFRITEK <span className="text-blue-500">GADGET SPOT</span>
              </h3>
            </div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Kenya's premier destination for genuine smart devices and
              high-quality tech accessories. Quality guaranteed.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-500 transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/shop"
                  state={{ selectedCategory: "Phones" }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Phones
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  state={{ selectedCategory: "Tablets" }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Tablets
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  state={{ selectedCategory: "Accessories" }}
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  to="/shop"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Deals
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-6">Support</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#faq"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#shipping"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Shipping
                </a>
              </li>
              <li>
                <a
                  href="#returns"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Returns
                </a>
              </li>
              <li>
                <a
                  href="#warranty"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  Warranty
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <span className="text-blue-500">📞</span>
                <a
                  href="tel:+254795453038"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  +254 795 453 038
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-blue-500">✉️</span>
                <a
                  href="mailto:info@afritek.co.ke"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  info@afritek.co.ke
                </a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-500 mt-1">📍</span>
                <p className="text-gray-400">
                  The Bazaar Moi Avenue,
                  <br />
                  Nairobi, Kenya
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <p>&copy; 2026 Afritek Gadget Spot. All rights reserved.</p>
            <div className="flex gap-6">
              <a
                href="#privacy"
                className="hover:text-blue-400 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#terms"
                className="hover:text-blue-400 transition-colors"
              >
                Terms & Conditions
              </a>
              <a
                href="#cookies"
                className="hover:text-blue-400 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
