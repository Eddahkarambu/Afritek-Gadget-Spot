import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Zap, Truck, Shield, Smartphone } from "lucide-react";
import LatestGalaxy from "../Images/LatestGalaxy.jpg";
import HomeImageMain from "../Images/phoneDeals.jpg"; // Unique
import HomeImage2 from "../Images/PhoneDeals1..jpg"; // Unique
// import HomeImage3 from "../Images/SumsungGalaxys25ultra.jpg";
import HomeImage4 from "../Images/PhoneDeals2.webp"; // Unique
import FlashSale3 from "../Images/FlashSale3.png";
import InfinixHot60i from "../Images/InfinixHot60i.jpg";
import InfinixNote50Pro from "../Images/InfinixNote50Pro.png";
import VivoV60 from "../Images/VivoV60.jpg";
import Redmi15 from "../Images/Redmi15.webp";
import TikTokLogo from "../Images/tiktoklogo.jpg";

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

  const scrollToCategories = () => {
    const el = document.getElementById("categories");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
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
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                Latest Smartphones & Gadgets
              </h1>
              <p className="text-lg sm:text-xl text-cyan-100 mb-6 max-w-xl">
                Genuine products, warranty-backed, fast delivery across East
                Africa — trusted by thousands of happy customers.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-2xl transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300 text-center"
                >
                  Shop Now
                </Link>

                <a
                  href="https://wa.me/254795453038?text=Hello%20Afritek%20Gadget%20Spot%2C%20I%27m%20interested%20in%20your%20products"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                  Order on WhatsApp
                </a>
              </div>
            </div>

            {/* Right Image - Galaxy (larger, more prominent) */}
            <div className="flex justify-center">
              <div className="relative group">
                {/* Outer glow border - grows on hover */}
                <div className="absolute -inset-4 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-4xl blur-3xl opacity-60 group-hover:opacity-90 transform-gpu transition-all duration-500"></div>

                {/* Image container - larger on wide screens */}
                <div className="relative bg-gradient-to-br from-purple-500 via-cyan-400 to-teal-400 p-3 rounded-3xl shadow-2xl shadow-cyan-500/40 overflow-hidden w-full max-w-[420px] sm:max-w-[560px] md:max-w-[720px] transform-gpu group-hover:scale-105 transition-transform duration-500">
                  {/* Top-left badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white">
                      New Arrival
                    </span>
                  </div>

                  {/* Bottom-right ribbon */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <span className="text-sm font-semibold px-3 py-1 rounded-lg bg-white/20 text-white"></span>
                  </div>

                  <img
                    src={LatestGalaxy}
                    alt="Latest Galaxy"
                    loading="lazy"
                    decoding="async"
                    className="rounded-3xl w-full h-64 sm:h-96 md:h-[520px] object-cover shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews / Testimonials Section moved to just before footer */}

      {/* Home Images Gallery */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 items-stretch">
            {[
              { src: HomeImageMain, alt: "New Arrivals - Top Picks" },
              { src: HomeImage2, alt: "Limited Offer" },
              // { src: HomeImage3, alt: "Best Seller" },
              { src: HomeImage4, alt: "Hot Deals" },
              { src: FlashSale3, alt: "Flash Sale" },
            ].map((img, idx) => {
              const containerClasses =
                "relative overflow-hidden rounded-3xl bg-white shadow-2xl hover:shadow-2xl transition-transform duration-500 p-0 transform-gpu group will-change-transform";

              const imgClasses =
                "block w-full h-56 sm:h-64 md:h-72 lg:h-80 object-cover transition-transform duration-700 group-hover:scale-105 group-hover:-translate-y-1";

              return (
                <div key={idx} className={containerClasses}>
                  <button
                    type="button"
                    onClick={() => openModal(img)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openModal(img);
                    }}
                    className="w-full h-full p-0 m-0 block text-left group"
                    aria-label={`Open ${img.alt}`}
                    style={{ touchAction: "manipulation" }}
                  >
                    <div className="relative w-full h-full">
                      {/* Poster image */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        loading="lazy"
                        decoding="async"
                        className={`${imgClasses} cursor-pointer rounded-3xl w-full h-full`}
                      />

                      {/* Readable poster overlay for title/price/cta */}
                      <div className="absolute left-0 right-0 bottom-0 px-4 py-5 bg-gradient-to-t from-black/80 via-black/60 to-transparent rounded-b-3xl backdrop-blur-sm min-h-[72px] sm:min-h-[88px]">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-xl md:text-2xl font-extrabold leading-tight drop-shadow-md">
                              {img.alt}
                            </p>
                            <p className="text-amber-300 text-sm md:text-base font-semibold drop-shadow-sm">
                              From KES 29,999
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="bg-emerald-500 text-white text-sm md:text-base font-bold px-4 py-2 rounded-full shadow-md ring-1 ring-white/30">
                              Shop
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Decorative poster border */}
                      <div className="pointer-events-none absolute inset-0 rounded-3xl border-2 border-white/5 ring-1 ring-white/5"></div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hot Deals Section - 4 selected products */}
      <section className="py-12 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-teal-900">Hot Deals</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              {
                src: InfinixHot60i,
                alt: "Infinix Hot 60i",
                price: "From KES 9,999",
              },
              {
                src: InfinixNote50Pro,
                alt: "Infinix Note 50 Pro",
                price: "From KES 29,999",
              },
              { src: VivoV60, alt: "Vivo V60", price: "From KES 34,999" },
              { src: Redmi15, alt: "Redmi 15", price: "From KES 18,499" },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition p-3"
              >
                <Link to="/shop" className="block w-full text-left">
                  <div className="w-full h-40 sm:h-44 md:h-48 overflow-hidden bg-gray-100 flex items-center justify-center rounded-md relative">
                    {/* Offer badge */}
                    <span
                      className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-md z-10"
                      aria-hidden="true"
                    >
                      OFFER
                    </span>
                    <img
                      src={p.src}
                      alt={p.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-gray-800 mb-1">
                      {p.alt}
                    </p>
                    <p className="text-sm text-gray-600 font-semibold">
                      {p.price}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-500">
              Hand-picked deals on popular phones
            </p>
            <Link
              to="/shop"
              className="inline-block text-sm bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-3 py-2 rounded-lg hover:from-teal-700 hover:to-cyan-700"
            >
              See more
            </Link>
          </div>
        </div>
      </section>

      {/* Image Modal / Lightbox */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={closeModal}
        >
          <div
            className="max-w-4xl w-full bg-transparent rounded-lg relative p-2 sm:p-4 transform transition-transform duration-200"
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
              loading="eager"
              className="w-full h-auto max-h-[70vh] object-contain rounded-md transform scale-105 transition-transform duration-200 ease-out shadow-2xl"
            />
            {modalImg.alt && (
              <div className="mt-3 bg-white/95 text-gray-900 p-3 rounded-md max-h-40 overflow-auto">
                <p className="text-center text-sm leading-relaxed">
                  {modalImg.alt}
                </p>
              </div>
            )}
            {/* Close / cancel button so mobile users can dismiss and continue scrolling */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-white text-gray-900 rounded-md shadow hover:bg-gray-100 transition"
                aria-label="Close image and continue"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <section className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-teal-900">
            Why Choose{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-500">
              Afritek Gadget Spot
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
      <section
        id="categories"
        className="py-20 px-6 bg-gradient-to-b from-white to-teal-50"
      >
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
      {/* Reviews / Testimonials Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 text-teal-900">
            What our customers say
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "John Mwangi",
                rating: 5,
                text: "Fast delivery and excellent after-sales support. My phone works perfectly — highly recommend Afritek!",
                location: "Nairobi, KE",
              },
              {
                name: "Aisha Omar",
                rating: 5,
                text: "Great prices and the warranty process was smooth. I buy here every time.",
                location: "Mombasa, KE",
              },
              {
                name: "David Kamau",
                rating: 4,
                text: "Helpful staff and a wide choice of models. The checkout was quick.",
                location: "Nakuru, KE",
              },
              {
                name: "Grace W.",
                rating: 5,
                text: "Excellent value for money — superb customer service and genuine products.",
                location: "Kisumu, KE",
              },
            ].map((r, i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center font-semibold text-teal-800">
                      {r.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        {r.name}
                      </p>
                      <p className="text-xs text-gray-500">{r.location}</p>
                    </div>
                  </div>
                  <div className="text-yellow-500 font-bold">
                    {Array.from({ length: r.rating }).map((_, idx) => (
                      <span key={idx}>★</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
                <li>
                  Phone:{" "}
                  <a
                    href="tel:+254795453038"
                    className="hover:text-cyan-400 transition"
                  >
                    +254795453038
                  </a>
                </li>
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
                    href="https://www.tiktok.com/@afritekgadget"
                    className="hover:text-cyan-400 transition flex items-center gap-2"
                    aria-label="Afritek on TikTok (opens in new tab)"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <img
                      src={TikTokLogo}
                      alt="TikTok"
                      loading="lazy"
                      decoding="async"
                      className="w-6 h-6 object-contain rounded-sm"
                    />
                    <span className="sr-only">TikTok</span>
                    <span className="hidden sm:inline">TikTok</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/afritek_gadget_spot"
                    className="hover:text-cyan-400 transition flex items-center gap-2"
                    aria-label="Afritek on Instagram (opens in new tab)"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {/* Instagram SVG - uses currentColor */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                      <path d="M17.5 6.5h.01" />
                    </svg>
                    <span className="sr-only">Instagram</span>
                    <span className="hidden sm:inline">Instagram</span>
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
