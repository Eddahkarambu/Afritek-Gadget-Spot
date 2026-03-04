import React from "react";
import { Link } from "react-router-dom";
import {
  Check,
  Zap,
  Shield,
  Headphones,
  TrendingUp,
  Heart,
} from "lucide-react";

const About = () => {
  return (
    <div className="bg-[#0a0c10] text-white">
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-32 pb-20 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-[#111827] border border-blue-500/30 rounded-full px-4 py-2 mb-8">
            <span className="text-lg">🚀</span>
            <span className="text-blue-400 text-sm font-medium tracking-wide">
              About Our Brand
            </span>
          </div>

          <h1 className="text-6xl md:text-7xl font-extrabold leading-[1.2] mb-6">
            Welcome to <br />
            <span className="text-blue-500">Afritek Gadget Spot</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
            Kenya's premier destination for genuine smart devices and
            high-quality tech accessories. Your trusted partner in technology.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Start Shopping
            </Link>
            <a
              href="#why-us"
              className="border border-gray-700 hover:bg-gray-800 text-white font-bold px-8 py-4 rounded-xl transition-all"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* OUR STORY SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div>
            <h2 className="text-5xl font-bold mb-6">
              Our <span className="text-blue-500">Story</span>
            </h2>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Afritek Gadget Spot was founded with a simple mission: to make
                premium technology accessible to everyone in Kenya and across
                Africa. We believe that everyone deserves access to genuine,
                high-quality smart devices.
              </p>
              <p>
                What started as a small tech shop has grown into one of Kenya's
                most trusted online gadget retailers. With over 50,000 satisfied
                customers and counting, we've established ourselves as the go-to
                destination for authentic smartphones, tablets, accessories, and
                smartwatches.
              </p>
              <p>
                Our journey has been driven by a commitment to quality,
                authenticity, and exceptional customer service. We carefully
                curate every product to ensure it meets our high standards
                before it reaches our customers.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              <div className="bg-[#111827] rounded-lg p-4 border border-gray-800 text-center">
                <p className="text-3xl font-bold text-blue-500">50K+</p>
                <p className="text-gray-400 text-sm mt-2">Happy Customers</p>
              </div>
              <div className="bg-[#111827] rounded-lg p-4 border border-gray-800 text-center">
                <p className="text-3xl font-bold text-blue-500">100K+</p>
                <p className="text-gray-400 text-sm mt-2">Products Sold</p>
              </div>
              <div className="bg-[#111827] rounded-lg p-4 border border-gray-800 text-center">
                <p className="text-3xl font-bold text-blue-500">7+</p>
                <p className="text-gray-400 text-sm mt-2">Years Active</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800 flex items-center justify-center h-96">
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600"
              alt="Our Team"
              className="rounded-2xl w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* MISSION & VISION SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Our <span className="text-blue-500">Mission & Vision</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Guiding principles that drive everything we do
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission Card */}
          <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800 hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 border border-blue-500/30">
              <Heart size={32} className="text-blue-500" />
            </div>

            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed">
              To provide genuine, high-quality technology products at affordable
              prices, empowering Africans to stay connected, productive, and
              informed in an increasingly digital world.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800 hover:border-blue-500/50 transition-all">
            <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 border border-blue-500/30">
              <TrendingUp size={32} className="text-blue-500" />
            </div>

            <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
            <p className="text-gray-300 leading-relaxed">
              To become the most trusted and accessible technology retailer
              across Africa, known for authenticity, exceptional service, and
              making premium tech available to everyone.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-3xl p-12 border border-blue-500/20">
          <h3 className="text-3xl font-bold mb-8 text-center">Core Values</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <Shield size={32} className="text-blue-500" />
              </div>
              <h4 className="text-xl font-bold mb-2">Authenticity</h4>
              <p className="text-gray-400">
                Only genuine products from authorized distributors
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <Zap size={32} className="text-blue-500" />
              </div>
              <h4 className="text-xl font-bold mb-2">Innovation</h4>
              <p className="text-gray-400">
                Always bringing the latest technology to our customers
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-blue-500/30">
                <Heart size={32} className="text-blue-500" />
              </div>
              <h4 className="text-xl font-bold mb-2">Customer Focus</h4>
              <p className="text-gray-400">
                Your satisfaction is our top priority, always
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section id="why-us" className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-4">
            Why <span className="text-blue-500">Choose Us</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here's what makes Afritek Gadget Spot different
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Benefit 1 */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all border border-blue-500/30">
                <Shield size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">100% Authentic</h3>
                <p className="text-gray-400 text-sm">
                  All products are genuine and come with original warranties. No
                  counterfeits, guaranteed.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 2 */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all border border-blue-500/30">
                <Zap size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Fast Delivery</h3>
                <p className="text-gray-400 text-sm">
                  Quick processing and shipping across Kenya. Get your products
                  within 2-5 business days.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 3 */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all border border-blue-500/30">
                <Check size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Best Prices</h3>
                <p className="text-gray-400 text-sm">
                  Competitive pricing without compromising on quality. Best
                  value for your money.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 4 */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all border border-blue-500/30">
                <Headphones size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Expert Support</h3>
                <p className="text-gray-400 text-sm">
                  Knowledgeable team ready to help. Professional advice on any
                  product.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 5 */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all border border-blue-500/30">
                <Heart size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Customer Focused</h3>
                <p className="text-gray-400 text-sm">
                  Your satisfaction is our priority. Easy returns and excellent
                  after-sales service.
                </p>
              </div>
            </div>
          </div>

          {/* Benefit 6 */}
          <div className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/50 transition-all group">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/30 transition-all border border-blue-500/30">
                <TrendingUp size={24} className="text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Trusted Brand</h3>
                <p className="text-gray-400 text-sm">
                  50K+ happy customers and counting. 5-star rated on multiple
                  platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-12 border border-blue-500/30 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Experience Premium Tech?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust Afritek Gadget Spot
            for their technology needs.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/shop"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-4 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-blue-500/20"
            >
              Shop Now
            </Link>
            <Link
              to="/cart"
              className="border border-blue-500 hover:bg-blue-500/10 text-blue-400 font-bold px-8 py-4 rounded-xl transition-all"
            >
              View Cart
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
