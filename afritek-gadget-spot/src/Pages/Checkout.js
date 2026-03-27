import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  User,
  MessageCircle,
} from "lucide-react";

const Checkout = ({ cart, setCart }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Calculate Total
  const subtotal = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = Math.floor(subtotal * 0.16);
  const total = subtotal + shipping + tax;

  // Form Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = "First name required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name required";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email required";
    if (!formData.phone.trim() || formData.phone.length < 10)
      newErrors.phone = "Valid phone number required (10+ digits)";
    if (!formData.address.trim()) newErrors.address = "Address required";
    if (!formData.city.trim()) newErrors.city = "City required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleProceedToWhatsApp = () => {
    if (validateForm()) {
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: `${formData.address}, ${formData.city} ${formData.postalCode}`,
        items: cart,
        subtotal,
        shipping,
        tax,
        total,
        date: new Date().toLocaleString(),
      };

      // Store order data
      sessionStorage.setItem("orderData", JSON.stringify(orderData));

      // Create WhatsApp message
      const message = createWhatsAppMessage(orderData);

      // Navigate to WhatsApp payment page
      navigate("/payment", {
        state: { formData, cart, total, orderData, message },
      });
    }
  };

  const createWhatsAppMessage = (orderData) => {
    let msg = `🛒 *New Order Request*\n\n`;
    msg += `*Customer Details:*\n`;
    msg += `Name: ${orderData.customerName}\n`;
    msg += `Email: ${orderData.email}\n`;
    msg += `Phone: ${orderData.phone}\n`;
    msg += `Address: ${orderData.address}\n\n`;
    msg += `*Order Items:*\n`;

    orderData.items.forEach((item) => {
      msg += `• ${item.name} (${item.quantity}x) - KSh ${(item.price * item.quantity).toLocaleString()}\n`;
    });

    msg += `\n*Order Summary:*\n`;
    msg += `Subtotal: KSh ${orderData.subtotal.toLocaleString()}\n`;
    msg += `Shipping: KSh ${orderData.shipping.toLocaleString()}\n`;
    msg += `Tax: KSh ${orderData.tax.toLocaleString()}\n`;
    msg += `*Total: KSh ${orderData.total.toLocaleString()}*\n\n`;
    msg += `Order Date: ${orderData.date}`;

    return msg;
  };

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-white text-center">
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <button
          onClick={() => navigate("/shop")}
          className="mt-6 bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-white">
      {/* Back Button */}
      <button
        onClick={() => navigate("/cart")}
        className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Cart
      </button>

      <h1 className="text-4xl font-bold mb-12">
        Checkout <span className="text-blue-500">Details</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Shipping Form */}
        <div className="lg:col-span-2">
          <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800">
            {/* Personal Info */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <User size={24} className="text-blue-500" />
                Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* First Name */}
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`w-full bg-[#0a0f18] text-white px-4 py-3 rounded-lg border ${
                      errors.firstName ? "border-red-500" : "border-gray-700"
                    } focus:border-blue-500 outline-none transition-colors`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={`w-full bg-[#0a0f18] text-white px-4 py-3 rounded-lg border ${
                      errors.lastName ? "border-red-500" : "border-gray-700"
                    } focus:border-blue-500 outline-none transition-colors`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-gray-400 mb-2 text-sm">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-500"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className={`w-full bg-[#0a0f18] text-white pl-10 pr-4 py-3 rounded-lg border ${
                      errors.email ? "border-red-500" : "border-gray-700"
                    } focus:border-blue-500 outline-none transition-colors`}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-gray-400 mb-2 text-sm">
                  Phone Number *
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-3.5 text-gray-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+254795453038"
                    className={`w-full bg-[#0a0f18] text-white pl-10 pr-4 py-3 rounded-lg border ${
                      errors.phone ? "border-red-500" : "border-gray-700"
                    } focus:border-blue-500 outline-none transition-colors`}
                  />
                </div>
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="border-t border-gray-700 pt-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MapPin size={24} className="text-blue-500" />
                Shipping Address
              </h2>

              {/* Address */}
              <div className="mb-4">
                <label className="block text-gray-400 mb-2 text-sm">
                  Street Address *
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="123 Main Street"
                  className={`w-full bg-[#0a0f18] text-white px-4 py-3 rounded-lg border ${
                    errors.address ? "border-red-500" : "border-gray-700"
                  } focus:border-blue-500 outline-none transition-colors`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                )}
              </div>

              {/* City & Postal Code */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Nairobi"
                    className={`w-full bg-[#0a0f18] text-white px-4 py-3 rounded-lg border ${
                      errors.city ? "border-red-500" : "border-gray-700"
                    } focus:border-blue-500 outline-none transition-colors`}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    placeholder="00100"
                    className={`w-full bg-[#0a0f18] text-white px-4 py-3 rounded-lg border ${
                      errors.postalCode ? "border-red-500" : "border-gray-700"
                    } focus:border-blue-500 outline-none transition-colors`}
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Proceed Button */}
          <button
            onClick={handleProceedToWhatsApp}
            disabled={isLoading}
            className="w-full mt-8 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-4 rounded-xl transition-colors text-lg flex items-center justify-center gap-2"
          >
            <MessageCircle size={24} />
            {isLoading ? "Processing..." : "Complete Order via WhatsApp"}
          </button>
        </div>

        {/* Right: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#111827] rounded-3xl p-6 border border-gray-800 sticky top-32">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {/* Cart Items */}
            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-start pb-4 border-b border-gray-700"
                >
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">
                      {item.name}
                    </p>
                    <p className="text-gray-500 text-xs mt-1">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-blue-500 font-bold text-sm">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 pt-6 border-t border-gray-700">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span>KSh {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>{shipping === 0 ? "FREE" : `KSh ${shipping}`}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (16%)</span>
                <span>KSh {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-white text-xl font-bold pt-3 border-t border-gray-700">
                <span>Total</span>
                <span className="text-green-500">
                  KSh {total.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Info Box */}
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-xs">
                💬 You'll complete your order via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
