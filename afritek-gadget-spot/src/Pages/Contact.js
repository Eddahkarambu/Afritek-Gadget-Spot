import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1b2a] via-[#0a0c10] to-[#000000] text-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Get in <span className="text-cyan-400">Touch</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions about our products or services? We'd love to hear
            from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Info Card 1 */}
          <div className="bg-[#111827] border border-gray-800 hover:border-cyan-500/50 rounded-2xl p-8 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 border border-cyan-500/30">
              <Mail size={24} className="text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email</h3>
            <p className="text-gray-400 mb-3">
              Send us an email and we'll get back to you within 24 hours.
            </p>
            <a
              href="mailto:support@afritekgadget.com"
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              support@afritekgadget.com
            </a>
            <p className="text-gray-500 text-sm mt-2">info@afritekgadget.com</p>
          </div>

          {/* Contact Info Card 2 */}
          <div className="bg-[#111827] border border-gray-800 hover:border-teal-500/50 rounded-2xl p-8 transition-all hover:shadow-lg hover:shadow-teal-500/10">
            <div className="w-12 h-12 bg-teal-500/20 rounded-lg flex items-center justify-center mb-4 border border-teal-500/30">
              <Phone size={24} className="text-teal-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Phone</h3>
            <p className="text-gray-400 mb-3">
              Call us during business hours. We're here to help!
            </p>
            <a
              href="tel:+254712345678"
              className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
            >
              +254 712 345 678
            </a>
            <p className="text-gray-500 text-sm mt-2">+254 720 987 654</p>
          </div>

          {/* Contact Info Card 3 */}
          <div className="bg-[#111827] border border-gray-800 hover:border-purple-500/50 rounded-2xl p-8 transition-all hover:shadow-lg hover:shadow-purple-500/10">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 border border-purple-500/30">
              <MapPin size={24} className="text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2">Location</h3>
            <p className="text-gray-400 mb-3">
              Visit us at our office in Nairobi.
            </p>
            <p className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              123 Tech Avenue
              <br />
              Nairobi, Kenya
            </p>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="text-cyan-400" size={28} />
              <h2 className="text-3xl font-bold">Send us a Message</h2>
            </div>

            {submitted ? (
              <div className="bg-green-500/20 border border-green-500 rounded-xl p-8 text-center">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  Message Sent!
                </h3>
                <p className="text-gray-300">
                  Thank you for reaching out. We'll get back to you soon!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-[#0a0f18] border border-gray-700 hover:border-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-all"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="john@example.com"
                    className="w-full bg-[#0a0f18] border border-gray-700 hover:border-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-all"
                  />
                </div>

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    placeholder="How can we help?"
                    className="w-full bg-[#0a0f18] border border-gray-700 hover:border-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-all"
                  />
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us more about your inquiry..."
                    rows="5"
                    className="w-full bg-[#0a0f18] border border-gray-700 hover:border-cyan-500/50 focus:border-cyan-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* Business Hours & Info */}
          <div className="space-y-6">
            {/* Business Hours */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="text-yellow-400" size={28} />
                <h3 className="text-2xl font-bold">Business Hours</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Monday - Friday</span>
                  <span className="text-cyan-400 font-semibold">
                    9:00 AM - 6:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-700">
                  <span className="text-gray-400">Saturday</span>
                  <span className="text-cyan-400 font-semibold">
                    10:00 AM - 4:00 PM
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Sunday</span>
                  <span className="text-red-400 font-semibold">Closed</span>
                </div>
              </div>
            </div>

            {/* Why Contact Us */}
            <div className="bg-[#111827] border border-gray-800 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">Why Contact Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-gray-300">
                    Product inquiries & support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-gray-300">Technical assistance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-gray-300">
                    Bulk orders & partnerships
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-gray-300">Feedback & suggestions</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">✓</span>
                  <span className="text-gray-300">Returns & replacements</span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/30 rounded-2xl p-8">
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://facebook.com/afritek"
                  className="w-12 h-12 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all"
                  title="Facebook"
                >
                  f
                </a>
                <a
                  href="https://twitter.com/afritek"
                  className="w-12 h-12 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all"
                  title="Twitter"
                >
                  𝕏
                </a>
                <a
                  href="https://instagram.com/afritek"
                  className="w-12 h-12 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all"
                  title="Instagram"
                >
                  📷
                </a>
                <a
                  href="https://linkedin.com/company/afritek"
                  className="w-12 h-12 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-lg flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-all"
                  title="LinkedIn"
                >
                  in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center mb-12">
            Frequently Asked <span className="text-cyan-400">Questions</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                q: "What's your return policy?",
                a: "We offer a 30-day money-back guarantee on all products. No questions asked!",
              },
              {
                q: "Do you ship internationally?",
                a: "Yes! We ship to most countries. Shipping costs vary by location.",
              },
              {
                q: "How long does delivery take?",
                a: "Local delivery takes 2-3 days. International orders take 7-14 days.",
              },
              {
                q: "Do you offer warranty?",
                a: "All products come with a 1-year manufacturer warranty.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#111827] border border-gray-800 rounded-xl p-6 hover:border-cyan-500/50 transition-all"
              >
                <h4 className="font-bold text-lg mb-2 text-cyan-400">
                  {item.q}
                </h4>
                <p className="text-gray-400">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
