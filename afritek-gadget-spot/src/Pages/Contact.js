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
    // Build the WhatsApp message from the form data
    const { name, email, subject, message } = formData;
    const phone = "254795453038"; // WhatsApp number (no plus sign)
    const text = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;
    const encoded = encodeURIComponent(text);
    const waUrl = `https://wa.me/${phone}?text=${encoded}`;

    // Open WhatsApp in a new tab
    window.open(waUrl, "_blank");

    // Show the temporary submitted state and reset the form
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
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
              href="tel:+25495453038"
              className="text-teal-400 hover:text-teal-300 font-semibold transition-colors"
            >
              +254795453038
            </a>
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
              The Bazaar, wing5, Mezzanine floor, Moi Avenue
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
                  <span className="text-gray-400">Monday - Saturday</span>
                  <span className="text-cyan-400 font-semibold">
                    8:00 AM - 7:00 PM
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
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/afritek_gadget_spot/"
                  className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center text-white hover:text-white transition-all"
                  title="Instagram"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <rect
                      x="2"
                      y="2"
                      width="20"
                      height="20"
                      rx="5"
                      ry="5"
                      fill="url(#g)"
                    />
                    <defs>
                      <linearGradient id="g" x1="0" x2="1">
                        <stop offset="0%" stopColor="#f58529" />
                        <stop offset="50%" stopColor="#dd2a7b" />
                        <stop offset="100%" stopColor="#8134af" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M12 7.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6zm0 7.9a3.1 3.1 0 1 1 0-6.2 3.1 3.1 0 0 1 0 6.2z"
                      fill="#ffffff"
                    />
                    <circle cx="17.6" cy="6.4" r="0.9" fill="#ffffff" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href="https://www.tiktok.com/@afritekgadget"
                  className="w-12 h-12 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 rounded-lg flex items-center justify-center text-white hover:text-white transition-all"
                  title="TikTok"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M16 8.5v4.9a3.6 3.6 0 1 1-3.6-3.6V7.1h2.4c.6 1.1 1.6 1.9 2.7 1.4z"
                      fill="#25F4EE"
                    />
                    <path
                      d="M13.4 21.5a5.9 5.9 0 1 0 0-11.8v2.6a3.3 3.3 0 1 1 0 6.6v2.6z"
                      fill="#010101"
                    />
                    <path
                      d="M17.2 7.3c-.2-.1-.5-.1-.7 0-.3.1-.5.3-.6.6-.1.3-.1.5 0 .8.2.5.6.9 1.2 1.1.6.2 1.2.1 1.7-.2v-1.5c-.6.3-1.2.4-1.6.2z"
                      fill="#FF0050"
                      opacity="0.95"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map / Location Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-center mb-4">Our Location</h2>
          <div className="max-w-4xl mx-auto rounded-lg overflow-hidden border border-gray-800">
            <iframe
              title="Afritek Gadgets Spot - Map"
              src="https://www.google.com/maps?q=-1.2819548,36.8216073&z=17&output=embed"
              width="100%"
              height="400"
              className="w-full h-64 sm:h-80 border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="p-4 bg-[#0b1218] text-center">
              <a
                href="https://www.google.com/maps/place/Afritek+Gadgets+Spot/@-1.2819494,36.819027,17z/data=!4m14!1m7!3m6!1s0x182f11c6c7ab41c5:0x15c65e4be9c9156d!2sAfritek+Gadgets+Spot!8m2!3d-1.2819548!4d36.8216073!16s%2Fg%2F11n54rqdhh!3m5!1s0x182f11c6c7ab41c5:0x15c65e4be9c9156d!8m2!3d-1.2819548!4d36.8216073!16s%2Fg%2F11n54rqdhh?entry=ttu&g_ep=EgoyMDI2MDQwNi4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                View on Google Maps
              </a>
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
                q: "How long does delivery take?",
                a: "Local delivery takes 24hrs. International orders take 7-14 days.",
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
