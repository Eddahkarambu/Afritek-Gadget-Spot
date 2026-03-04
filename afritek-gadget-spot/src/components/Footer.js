import React from "react";
import {
  Smartphone,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#0a0f18] border-t border-gray-800/50 pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Brand Info */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="border border-[#3b82f6] p-1 rounded-sm">
              <Smartphone size={20} className="text-[#3b82f6]" />
            </div>
            <span className="text-white font-bold text-xl uppercase tracking-tighter">
              Afritek <span className="text-[#3b82f6]">Gadget Spot</span>
            </span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Kenya's premier destination for genuine smart devices and
            high-quality tech accessories. Quality guaranteed.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="text-gray-400 hover:text-[#3b82f6] transition-colors"
            >
              <Facebook size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#3b82f6] transition-colors"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-[#3b82f6] transition-colors"
            >
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Quick Links</h4>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li>
              <a href="#" className="hover:text-[#3b82f6] transition-colors">
                Phones
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#3b82f6] transition-colors">
                Tablets
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#3b82f6] transition-colors">
                Accessories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#3b82f6] transition-colors">
                Deals
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Support */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Support</h4>
          <ul className="space-y-4 text-gray-500 text-sm font-medium">
            <li>
              <a href="#" className="hover:text-[#3b82f6] transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#3b82f6] transition-colors">
                Shipping
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#3b82f6] transition-colors">
                Returns
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[#3b82f6] transition-colors">
                Warranty
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div>
          <h4 className="text-white font-bold text-lg mb-6">Contact Us</h4>
          <ul className="space-y-5">
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <Phone size={18} className="text-[#3b82f6]" />
              <span>+254 795 453 038</span>
            </li>
            <li className="flex items-center gap-3 text-gray-400 text-sm">
              <Mail size={18} className="text-[#3b82f6]" />
              <span>info@afritek.co.ke</span>
            </li>
            <li className="flex items-start gap-3 text-gray-400 text-sm">
              <MapPin size={18} className="text-[#3b82f6] shrink-0" />
              <span>
                The Bazaar Moi Avenue, <br />
                Nairobi, Kenya
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 mt-16 pt-8 text-center">
        <p className="text-gray-600 text-xs tracking-widest uppercase">
          © 2026 Afritek Gadget Spot. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
