import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle,
  Download,
  Mail,
  Phone,
  MapPin,
  Package,
  MessageCircle,
} from "lucide-react";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderData } = location.state || {};

  useEffect(() => {
    // Clear cart from sessionStorage
    sessionStorage.removeItem("cartData");
    sessionStorage.removeItem("checkoutData");
  }, []);

  if (!orderData) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-white text-center">
        <p className="text-red-500">Error: Order information not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-blue-500 px-6 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  const handlePrintOrder = () => {
    window.print();
  };

  const handleDownloadInvoice = () => {
    alert("Invoice download feature coming soon!");
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto text-white">
      {/* Success Message */}
      <div className="text-center mb-12">
        <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-400 text-lg">
          Thank you for your purchase. Your order has been placed successfully.
        </p>
      </div>

      {/* Order Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Main Order Card */}
        <div className="lg:col-span-2 bg-[#111827] rounded-3xl p-8 border border-gray-800">
          {/* Order Header */}
          <div className="mb-8 pb-8 border-b border-gray-700">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-gray-400 text-sm">Order Number</p>
                <p className="text-2xl font-bold text-blue-500">
                  {orderData.orderId}
                </p>
              </div>
              <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-xs font-bold">
                {orderData.status}
              </span>
            </div>
            <p className="text-gray-400 text-sm">
              Placed on {new Date(orderData.date).toLocaleString()}
            </p>
          </div>

          {/* Customer Info */}
          <div className="mb-8 pb-8 border-b border-gray-700">
            <h2 className="text-xl font-bold mb-4">Customer Information</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <div>
                  <p className="text-gray-400 text-xs">Name</p>
                  <p className="text-white">{orderData.customerName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-blue-500" />
                <div>
                  <p className="text-gray-400 text-xs">Email</p>
                  <p className="text-white">{orderData.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-blue-500" />
                <div>
                  <p className="text-gray-400 text-xs">Phone</p>
                  <p className="text-white">{orderData.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-blue-500 mt-1" />
                <div>
                  <p className="text-gray-400 text-xs">Delivery Address</p>
                  <p className="text-white">{orderData.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Package size={24} className="text-blue-500" />
              Items Ordered
            </h2>
            <div className="space-y-4">
              {orderData.items.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-4 border-b border-gray-700 last:border-0"
                >
                  <div>
                    <p className="text-white font-medium">{item.name}</p>
                    <p className="text-gray-500 text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="text-blue-500 font-bold">
                    KSh {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-blue-400 text-sm">
              💳 Payment Method:{" "}
              <span className="font-bold">{orderData.paymentMethod}</span>
            </p>
          </div>
        </div>

        {/* Right: Summary & Actions */}
        <div className="lg:col-span-1">
          {/* Total */}
          <div className="bg-[#111827] rounded-3xl p-6 border border-gray-800 mb-6 sticky top-32">
            <h2 className="text-xl font-bold mb-6">Order Total</h2>
            <div className="flex justify-between text-white text-xl font-bold">
              <span>Total</span>
              <span className="text-green-500">
                KSh {orderData.total.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handlePrintOrder}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Print Order
            </button>
            <button
              onClick={handleDownloadInvoice}
              className="w-full border border-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Download size={20} />
              Download Invoice
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
            <p className="text-green-400 text-xs">✓ Order sent via WhatsApp</p>
          </div>
        </div>
      </div>

      {/* WhatsApp Contact Section */}
      <div className="bg-green-500/10 border border-green-500/30 rounded-3xl p-8 mb-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <MessageCircle size={24} className="text-green-500" />
          Next Steps
        </h2>
        <p className="text-gray-300 mb-6">
          Your order has been sent to our WhatsApp support team. You will
          receive a response shortly with:
        </p>
        <ul className="space-y-3 text-green-400 text-sm mb-8">
          <li>✓ Payment instructions</li>
          <li>✓ Delivery timeline confirmation</li>
          <li>✓ Tracking information</li>
        </ul>

        <div className="p-4 bg-white/5 rounded-lg">
          <p className="text-gray-400 text-sm mb-3">
            💬 <strong>Contact us on WhatsApp:</strong>
          </p>
          <a
            href="https://wa.me/254795453038"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-6 py-3 rounded-lg transition-colors"
          >
            <MessageCircle size={20} />
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* Order Timeline */}
      <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800 mb-8">
        <h2 className="text-2xl font-bold mb-6">Order Timeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex gap-4">
            <div className="bg-blue-500/20 text-blue-500 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">Order Confirmed</h3>
              <p className="text-gray-400 text-sm">
                Message received via WhatsApp
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-500/20 text-blue-500 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">Payment Confirmed</h3>
              <p className="text-gray-400 text-sm">
                We're preparing your order
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="bg-blue-500/20 text-blue-500 rounded-full w-10 h-10 flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <div>
              <h3 className="text-white font-bold mb-1">Shipped</h3>
              <p className="text-gray-400 text-sm">
                Delivery within 2-5 business days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Continue Shopping */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/shop")}
          className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors text-lg"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => navigate("/")}
          className="flex-1 border border-gray-700 hover:bg-gray-800 text-white font-bold py-4 rounded-xl transition-colors text-lg"
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
