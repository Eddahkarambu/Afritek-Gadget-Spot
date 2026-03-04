import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Kipchoge",
      location: "Nairobi, Kenya",
      rating: 5,
      text: "Excellent service! I received my iPhone 15 in perfect condition within 3 days. The product is 100% authentic. Highly recommended!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100",
    },
    {
      id: 2,
      name: "James Mwangi",
      location: "Kisumu, Kenya",
      rating: 5,
      text: "Great prices and fast delivery. I've ordered twice now and both times everything was perfect. Best tech store in Kenya!",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100",
    },
    {
      id: 3,
      name: "Grace Omondi",
      location: "Mombasa, Kenya",
      rating: 5,
      text: "Amazing customer service! When I had a question about a product, they responded within minutes. The team really cares about their customers.",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100",
    },
    {
      id: 4,
      name: "David Kariuki",
      location: "Nairobi, Kenya",
      rating: 5,
      text: "The Samsung tablet I bought is exactly as described. Quality is premium and the price is unbeatable. Will definitely buy again!",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-bold mb-4">
          What Our <span className="text-blue-500">Customers Say</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust Afritek Gadget Spot
        </p>
      </div>

      {/* Testimonial Carousel */}
      <div className="relative max-w-4xl mx-auto">
        {/* Main Testimonial Card */}
        <div className="bg-[#111827] rounded-3xl border border-gray-800 p-12 md:p-16">
          {/* Stars */}
          <div className="flex gap-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={24}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>

          {/* Quote */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 italic leading-relaxed">
            "{currentTestimonial.text}"
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4">
            <img
              src={currentTestimonial.avatar}
              alt={currentTestimonial.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
            />
            <div>
              <h3 className="text-lg font-bold">{currentTestimonial.name}</h3>
              <p className="text-gray-400">{currentTestimonial.location}</p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prevSlide}
            className="w-12 h-12 rounded-full border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="w-12 h-12 rounded-full border border-gray-700 hover:border-blue-500 hover:bg-blue-500/10 flex items-center justify-center text-gray-400 hover:text-blue-400 transition-all"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? "w-8 bg-blue-500"
                  : "w-2 bg-gray-600 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Stats */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-6 bg-[#111827] rounded-2xl border border-gray-800">
          <p className="text-3xl font-bold text-blue-500">4.8/5</p>
          <p className="text-gray-400 text-sm mt-2">Average Rating</p>
          <div className="flex justify-center gap-1 mt-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className="fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
        </div>

        <div className="text-center p-6 bg-[#111827] rounded-2xl border border-gray-800">
          <p className="text-3xl font-bold text-blue-500">50K+</p>
          <p className="text-gray-400 text-sm mt-2">Happy Customers</p>
        </div>

        <div className="text-center p-6 bg-[#111827] rounded-2xl border border-gray-800">
          <p className="text-3xl font-bold text-blue-500">99%</p>
          <p className="text-gray-400 text-sm mt-2">Satisfaction Rate</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
