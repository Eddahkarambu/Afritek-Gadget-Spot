import React from "react";
import { Users, Target, Zap, Award, Truck, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-900 via-teal-800 to-cyan-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Afritek</h1>
          <p className="text-xl text-cyan-100">
            Your trusted destination for premium gadgets and electronics across
            East Africa
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-6 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-teal-900 mb-6">Our Story</h2>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Founded in 2024, Afritek Gadget Spot was born from a simple
              vision: to make premium technology accessible to everyone across
              East Africa. We started as a small operation with a passion for
              gadgets and a commitment to customer excellence.
            </p>
            <p className="text-gray-700 mb-4 text-lg leading-relaxed">
              Today, we're proud to be one of the fastest-growing electronics
              retailers in the region, serving thousands of satisfied customers
              with authentic products and exceptional service.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our journey is just beginning, and we're excited to bring the
              latest technology to your doorstep every single day.
            </p>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl h-96 flex items-center justify-center shadow-xl">
              <div className="text-white text-center">
                <Zap size={80} className="mx-auto mb-4" />
                <p className="text-2xl font-bold">Your Tech Partner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-900 mb-16">
            Our Mission & Vision
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl border-2 border-teal-300 hover:border-teal-500 transition-all hover:shadow-lg">
              <Target size={48} className="text-teal-600 mb-4" />
              <h3 className="text-2xl font-bold text-teal-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To deliver authentic, high-quality gadgets and electronics with
                exceptional customer service, ensuring every customer finds
                their perfect tech companion.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl border-2 border-purple-300 hover:border-purple-500 transition-all hover:shadow-lg">
              <Award size={48} className="text-purple-600 mb-4" />
              <h3 className="text-2xl font-bold text-purple-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To be the leading electronics retailer in East Africa, known for
                innovation, reliability, and putting customers first in
                everything we do.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-xl border-2 border-cyan-300 hover:border-cyan-500 transition-all hover:shadow-lg">
              <Users size={48} className="text-cyan-600 mb-4" />
              <h3 className="text-2xl font-bold text-teal-900 mb-4">
                Our Values
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Authenticity, Integrity, Customer-first mindset, Innovation, and
                Excellence in everything we do.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-6 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-900 mb-16">
            Why Choose Afritek?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex gap-6 p-6 bg-white border-2 border-teal-200 rounded-xl hover:border-teal-400 transition-all">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full p-4 w-fit">
                  <Truck size={32} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-900 mb-2">
                  Fast & Reliable Delivery
                </h3>
                <p className="text-gray-700">
                  We guarantee delivery within 24-48 hours across East Africa
                  with real-time tracking
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white border-2 border-purple-200 rounded-xl hover:border-purple-400 transition-all">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full p-4 w-fit">
                  <Award size={32} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-purple-900 mb-2">
                  100% Authentic Products
                </h3>
                <p className="text-gray-700">
                  Every product is verified and comes with official warranty and
                  after-sales support
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white border-2 border-cyan-200 rounded-xl hover:border-cyan-400 transition-all">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-cyan-600 to-teal-600 rounded-full p-4 w-fit">
                  <Users size={32} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-teal-900 mb-2">
                  Expert Customer Support
                </h3>
                <p className="text-gray-700">
                  Our dedicated team is available 24/7 to help you with any
                  questions or concerns
                </p>
              </div>
            </div>

            <div className="flex gap-6 p-6 bg-white border-2 border-indigo-200 rounded-xl hover:border-indigo-400 transition-all">
              <div className="flex-shrink-0">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full p-4 w-fit">
                  <Shield size={32} className="text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-900 mb-2">
                  Best Prices Guaranteed
                </h3>
                <p className="text-gray-700">
                  Competitive pricing with regular promotions and loyalty
                  rewards for our customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-teal-200">
              <p className="text-4xl font-bold text-teal-700 mb-2">10,000+</p>
              <p className="text-gray-700 font-semibold">Happy Customers</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl border-2 border-purple-200">
              <p className="text-4xl font-bold text-purple-700 mb-2">500+</p>
              <p className="text-gray-700 font-semibold">Product Models</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl border-2 border-cyan-200">
              <p className="text-4xl font-bold text-cyan-700 mb-2">15+</p>
              <p className="text-gray-700 font-semibold">Brands Available</p>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200">
              <p className="text-4xl font-bold text-indigo-700 mb-2">24/7</p>
              <p className="text-gray-700 font-semibold">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-900 via-purple-900 to-indigo-900 text-white py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Afritek?
          </h2>
          <p className="text-xl text-cyan-100 mb-8">
            Start shopping for your favorite gadgets today
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-500 hover:to-teal-500 text-teal-900 px-10 py-4 rounded-lg font-bold text-lg transition-all transform hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
