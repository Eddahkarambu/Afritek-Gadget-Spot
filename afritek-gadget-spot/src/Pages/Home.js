import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Zap, Truck, Shield, Smartphone } from "lucide-react";
import LatestGalaxy from "../Images/LatestGalaxy.jpg";
import HomeImageMain from "../Images/phoneDeals.jpg"; // Unique
import HomeImage2 from "../Images/PhoneDeals1..jpg"; // Unique
// import HomeImage3 from "../Images/SumsungGalaxys25ultra.jpg";
import HomeImage4 from "../Images/PhoneDeals2.webp"; // Unique
import HomeImage5 from "../Images/PhoneDeals3.jpg"; // Unique

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState({ src: "", alt: "" });

  const openModal = (img) => {
    setModalImg(img);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImg({ src: "", alt: "" });
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (modalOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalOpen]);
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6">
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-200">
                  Afritek
                </span>
              </h1>
              <p className="text-base sm:text-lg text-cyan-100 mb-8">
                Discover the latest gadgets and smartphones at unbeatable prices
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 shadow-lg shadow-purple-600/50 text-center"
                >
                  Shop Now
                </Link>
                <button className="w-full sm:w-auto border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-teal-900 px-8 py-4 rounded-lg font-bold transition-all transform hover:scale-105 text-center">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image - Galaxy */}
            <div className="flex justify-center">
              <div className="relative">
                {/* Outer glow border */}
                <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-3xl blur-xl"></div>

                {/* Image container */}
                <div className="relative bg-gradient-to-br from-purple-500 via-cyan-400 to-teal-400 p-2 rounded-3xl shadow-2xl shadow-cyan-500/50 overflow-hidden w-full max-w-[320px] sm:max-w-md md:max-w-lg">
                  <img
                    src={LatestGalaxy}
                    alt="Latest Galaxy"
                    className="rounded-3xl w-full h-48 sm:h-64 md:h-96 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Images Gallery */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-stretch">
            {[
              { src: HomeImageMain, alt: "New Arrivals - Top Picks" },
              { src: HomeImage2, alt: "Limited Offer" },
              // { src: HomeImage3, alt: "Best Seller" },
              { src: HomeImage4, alt: "Hot Deals" },
              { src: HomeImage5, alt: "Top Rated" },
            ].map((img, idx) => {
              const containerClasses =
                "relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300";

              const imgClasses =
                "block w-full h-40 sm:h-56 md:h-80 lg:h-96 object-cover transition-transform duration-300 hover:scale-105";

              return (
                <div key={idx} className={containerClasses}>
                  <button
                    type="button"
                    onClick={() => openModal(img)}
                    className="w-full h-full p-0 m-0 block text-left"
                    aria-label={`Open ${img.alt}`}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      className={`${imgClasses} cursor-pointer`}
                    />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Modal / Lightbox */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-4xl w-full bg-transparent rounded-lg relative p-2 sm:p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 bg-white text-gray-900 rounded-full p-2 shadow-lg"
              aria-label="Close image"
            >
              ✕
            </button>
            <img
              src={modalImg.src}
              alt={modalImg.alt}
              className="w-full h-auto max-h-[80vh] object-contain rounded-md"
            />
            {modalImg.alt && (
              <p className="mt-3 text-center text-white">{modalImg.alt}</p>
            )}
          </div>
        </div>
      )}

      {/* Features Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-teal-900">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
              Afritek
            </span>
          </h2>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Experience premium gadgets with exceptional service
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl border-2 border-teal-200 hover:border-purple-400 transition-all hover:shadow-lg hover:-translate-y-2">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Zap size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">
                Fast Delivery
              </h3>
              <p className="text-gray-600">
                Get your gadgets delivered within 24-48 hours across East Africa
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl border-2 border-purple-200 hover:border-cyan-400 transition-all hover:shadow-lg hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Best Prices
              </h3>
              <p className="text-gray-600">
                Competitive pricing with regular discounts and special offers
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-xl border-2 border-cyan-200 hover:border-purple-400 transition-all hover:shadow-lg hover:-translate-y-2">
              <div className="bg-gradient-to-br from-cyan-500 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Truck size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-3">
                Wide Selection
              </h3>
              <p className="text-gray-600">
                Premium brands including Samsung, iPhone, Oppo, and more
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 hover:border-cyan-400 transition-all hover:shadow-lg hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">
                Secure & Safe
              </h3>
              <p className="text-gray-600">
                100% genuine products with warranty and after-sales support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-teal-900">
            Shop by{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
              Category
            </span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Category 1 */}
            <Link
              to="/shop"
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-600 to-cyan-600 group-hover:from-teal-700 group-hover:to-cyan-700 transition-all"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white z-10">
                <Smartphone
                  size={64}
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold">Smartphones</h3>
                <p className="text-cyan-100 mt-2">Latest Models</p>
              </div>
            </Link>

            {/* Category 2 */}
            <Link
              to="/shop"
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-indigo-600 group-hover:from-purple-700 group-hover:to-indigo-700 transition-all"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white z-10">
                <Zap
                  size={64}
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold">Tablets</h3>
                <p className="text-indigo-100 mt-2">Premium Devices</p>
              </div>
            </Link>

            {/* Category 3 */}
            <Link
              to="/shop"
              className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden hover:shadow-2xl transition-all"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-teal-600 group-hover:from-cyan-600 group-hover:to-teal-700 transition-all"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-white z-10">
                <Truck
                  size={64}
                  className="mb-4 group-hover:scale-110 transition-transform"
                />
                <h3 className="text-2xl font-bold">Accessories</h3>
                <p className="text-cyan-100 mt-2">All You Need</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl border-2 border-teal-200 hover:border-teal-400 transition-all">
              <p className="text-5xl font-bold text-teal-700 mb-2">10K+</p>
              <p className="text-gray-700 font-semibold">Happy Customers</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all">
              <p className="text-5xl font-bold text-purple-700 mb-2">500+</p>
              <p className="text-gray-700 font-semibold">Products</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl border-2 border-cyan-200 hover:border-cyan-400 transition-all">
              <p className="text-5xl font-bold text-cyan-700 mb-2">15+</p>
              <p className="text-gray-700 font-semibold">Brands</p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-indigo-200 hover:border-indigo-400 transition-all">
              <p className="text-5xl font-bold text-indigo-700 mb-2">24/7</p>
              <p className="text-gray-700 font-semibold">Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-900 via-purple-900 to-indigo-900 text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Find Your Perfect Gadget?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Browse our extensive collection and get exclusive deals today
          </p>
          <Link
            to="/shop"
            className="block w-full sm:inline-block bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-teal-900 px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 text-center"
          >
            Explore Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-cyan-400 font-bold mb-4">About Afritek</h4>
              <p className="text-sm">
                Your trusted source for premium gadgets and electronics across
                East Africa
              </p>
            </div>
            <div>
              <h4 className="text-cyan-400 font-bold mb-4">Quick Links</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <Link to="/" className="hover:text-cyan-400 transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/shop" className="hover:text-cyan-400 transition">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-cyan-400 transition">
                    About
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-bold mb-4">Contact</h4>
              <ul className="text-sm space-y-2">
                <li>Email: info@afritek.com</li>
                <li>Phone: +25495453038</li>
                <li>
                  Location: The Bazaar, wing 5,Mezzanine floor, Moi
                  Avenue,Nairobi, Kenya
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-cyan-400 font-bold mb-4">Follow Us</h4>
              <ul className="text-sm space-y-2">
                <li>
                  <a
                    href="https://facebook.com"
                    className="hover:text-cyan-400 transition"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@afritekgadget"
                    className="hover:text-cyan-400 transition"
                  >
                    tiktok
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/afritek_gadget_spot"
                    className="hover:text-cyan-400 transition"
                  >
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2026 Afritek Gadget Spot. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
