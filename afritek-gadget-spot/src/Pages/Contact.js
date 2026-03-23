import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-teal-900 to-teal-800 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Get In Touch</h1>
          <p className="text-xl text-cyan-100">
            We'd love to hear from you. Send us a message!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 px-6 bg-gradient-to-b from-white to-teal-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {/* Phone */}
            <div className="bg-gradient-to-br from-teal-50 to-cyan-50 p-8 rounded-xl border-2 border-teal-200 text-center hover:border-teal-400 transition-all">
              <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Phone</h3>
              <p className="text-gray-700">+254 (0) XXX XXXX XXX</p>
              <p className="text-gray-600 text-sm mt-2">
                Available Mon-Fri, 9AM-6PM EAT
              </p>
            </div>

            {/* Email */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 rounded-xl border-2 border-purple-200 text-center hover:border-purple-400 transition-all">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Mail size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-purple-900 mb-2">Email</h3>
              <p className="text-gray-700">info@afritek.com</p>
              <p className="text-gray-600 text-sm mt-2">
                We reply within 24 hours
              </p>
            </div>

            {/* Location */}
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 p-8 rounded-xl border-2 border-cyan-200 text-center hover:border-cyan-400 transition-all">
              <div className="bg-gradient-to-br from-cyan-600 to-teal-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-teal-900 mb-2">Location</h3>
              <p className="text-gray-700">Nairobi, Kenya</p>
              <p className="text-gray-600 text-sm mt-2">East Africa HQ</p>
            </div>

            {/* Hours */}
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-xl border-2 border-indigo-200 text-center hover:border-indigo-400 transition-all">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-indigo-900 mb-2">Hours</h3>
              <p className="text-gray-700">Mon - Fri: 9AM - 6PM</p>
              <p className="text-gray-600 text-sm mt-2">
                Sat - Sun: 10AM - 4PM
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="text-4xl font-bold text-teal-900 mb-8">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-teal-600 focus:outline-none transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-teal-600 focus:outline-none transition-all"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-teal-600 focus:outline-none transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-teal-200 rounded-lg focus:border-teal-600 focus:outline-none transition-all resize-none"
                    placeholder="Your message here..."
                    rows="6"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-600/30"
                >
                  <Send size={20} />
                  Send Message
                </button>
              </form>
            </div>

            {/* Info */}
            <div>
              <h2 className="text-4xl font-bold text-teal-900 mb-8">
                Get In Touch
              </h2>

              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full p-3">
                      <Phone size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Call Us
                    </h3>
                    <p className="text-gray-700 mb-1">+254 (0) XXX XXXX XXX</p>
                    <p className="text-gray-600 text-sm">
                      Mon-Fri, 9AM-6PM EAT
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full p-3">
                      <Mail size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Email Us
                    </h3>
                    <p className="text-gray-700 mb-1">info@afritek.com</p>
                    <p className="text-gray-600 text-sm">support@afritek.com</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="bg-gradient-to-br from-cyan-600 to-teal-600 rounded-full p-3">
                      <MapPin size={24} className="text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Visit Us
                    </h3>
                    <p className="text-gray-700 mb-1">Nairobi, Kenya</p>
                    <p className="text-gray-600 text-sm">
                      East Africa Headquarters
                    </p>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl">
                  <h3 className="text-lg font-bold text-teal-900 mb-3">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      className="text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Facebook
                    </a>
                    <a
                      href="https://twitter.com"
                      className="text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Twitter
                    </a>
                    <a
                      href="https://instagram.com"
                      className="text-teal-600 hover:text-teal-700 font-semibold"
                    >
                      Instagram
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-teal-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-teal-900 mb-16">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                question: "What is your delivery timeline?",
                answer:
                  "We deliver within 24-48 hours across most of East Africa. Express delivery options are available.",
              },
              {
                question: "Are all products authentic?",
                answer:
                  "Yes, 100% authentic. Every product is verified and comes with official warranty.",
              },
              {
                question: "Do you offer payment plans?",
                answer:
                  "Yes, we offer flexible payment options through various partners.",
              },
              {
                question: "What is your return policy?",
                answer:
                  "We offer 30-day returns for unused products in original packaging.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="bg-white border-2 border-teal-200 rounded-lg p-6 hover:border-teal-400 transition-all"
              >
                <h3 className="text-lg font-bold text-teal-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
