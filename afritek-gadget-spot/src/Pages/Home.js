import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Zap, Truck, Shield } from 'lucide-react';
import LatestGalaxy from '../Images/LatestGalaxy.jpg';
import FeaturedProducts from '../components/FeaturedProducts';
const Home = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-cyan-900 text-white pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
                Find your next phone
              </h1>
              <p className="text-lg sm:text-xl text-cyan-100 mb-6 max-w-xl">
                Find your next phone in Kenya. Choose your configuration, order online and pay cash on delivery.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/shop"
                  className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-600 hover:to-teal-500 text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-2xl transform hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300 text-center"
                >
                  Shop Now
                </Link>

                <a
                  href="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-full font-extrabold text-lg shadow-2xl transition-all focus:outline-none focus:ring-4 focus:ring-emerald-300"
                >
                  Contact the shop
                </a>
              </div>
            </div>

            {/* Right Image - Galaxy (larger, attention-grabbing hero tile) */}
            <div className="flex justify-center">
              <div className="relative group w-full flex items-center justify-center">
                {/* Enhanced glow */}
                <div className="absolute -inset-6 bg-gradient-to-br from-cyan-500/25 via-purple-500/18 to-pink-400/12 rounded-5xl blur-4xl opacity-70 group-hover:opacity-100 transform-gpu transition-all duration-700"></div>

                {/* Big image container */}
                <div className="relative bg-gradient-to-br from-purple-700 via-cyan-500 to-teal-500 p-1 sm:p-4 rounded-4xl shadow-[0_35px_60px_-15px_rgba(14,165,233,0.20)] overflow-hidden w-full max-w-[520px] sm:max-w-[720px] md:max-w-[920px] transform-gpu group-hover:scale-105 group-hover:-translate-y-2 transition-transform duration-700">
                  {/* Afritek badge */}
                  <div className="absolute top-4 left-4 z-30">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 backdrop-blur text-white">
                      Afritek
                    </span>
                  </div>

                  {/* Main hero image (click opens modal) */}
                  <img
                    src={LatestGalaxy}
                    alt="Latest Galaxy"
                    loading="eager"
                    decoding="async"
                    className="rounded-3xl w-full h-72 sm:h-[420px] md:h-[560px] lg:h-[640px] object-cover shadow-2xl "
                  />

                  {/* CTA overlay */}
                  <div className="absolute left-6 bottom-6 z-30">
                    <Link
                      to="/shop"
                      className="inline-flex items-center gap-3 bg-white/95 text-teal-900 font-bold px-5 py-3 rounded-full shadow-lg hover:scale-105 transform transition-transform"
                    >
                      Shop New Arrivals
                    </Link>
                  </div>

                  {/* Subtle decorative border */}
                  <div className="pointer-events-none absolute inset-0 rounded-4xl border border-white/5 mix-blend-overlay"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FeaturedProducts />

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
                Delivery arrangements
              </h3>
              <p className="text-gray-600">
                Delivery arrangements and fees are agreed with you before confirmation.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl border-2 border-purple-200 hover:border-cyan-400 transition-all hover:shadow-lg hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-3">
                Clear prices
              </h3>
              <p className="text-gray-600">
                Compare current prices for each storage and colour configuration.
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
                Browse the models currently published in our phone catalogue.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 hover:border-cyan-400 transition-all hover:shadow-lg hover:-translate-y-2">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Shield size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-3">
                Cash on delivery
              </h3>
              <p className="text-gray-600">
                Pay cash on delivery after agreeing your order with the shop.
              </p>
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
            Compare phone configurations and current prices in our catalogue
          </p>
          <Link
            to="/shop"
            className="block w-full sm:inline-block bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-teal-900 px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105 text-center"
          >
            Explore Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;
