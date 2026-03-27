import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MessageCircle, Copy, Check } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, cart, total, orderData, message } = location.state || {};
  const [copied, setCopied] = useState(false);
  const [whatsappNumber] = useState("254795453038"); // ⚠️ CHANGE THIS TO YOUR WHATSAPP NUMBER

  if (!formData || !cart) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-white text-center">
        <p className="text-red-500">Error: Missing checkout information</p>
        <button
          onClick={() => navigate("/cart")}
          className="mt-4 bg-blue-500 px-6 py-2 rounded-lg"
        >
          Back to Cart
        </button>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendWhatsApp = () => {
    // Store order for confirmation
    const finalOrderData = {
      ...orderData,
      paymentMethod: "WhatsApp",
      status: "Pending",
    };
    sessionStorage.setItem("orderData", JSON.stringify(finalOrderData));

    // Open WhatsApp
    window.open(whatsappLink, "_blank");

    // Navigate to confirmation after a short delay
    setTimeout(() => {
      navigate("/order-confirmation", { state: { orderData: finalOrderData } });
    }, 500);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-12">
        Complete Your <span className="text-green-500">Order</span>
      </h1>

      <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800 mb-8">
        {/* Order Summary */}
        <div className="mb-8 pb-8 border-b border-gray-700">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-400">
              <span>Items ({cart.length})</span>
              <span>KSh {total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white text-lg font-bold mt-4 pt-4 border-t border-gray-700">
              <span>Total Amount</span>
              <span className="text-green-500">
                KSh {(total + 500 + Math.round(total * 0.16)).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* WhatsApp Option */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Complete Your Order</h2>

          <div className="border-2 border-green-500 bg-green-500/5 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-green-500 p-3 rounded-lg">
                <MessageCircle size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">WhatsApp Order</h3>
                <p className="text-gray-400 text-sm">
                  Send your order details via WhatsApp
                </p>
              </div>
            </div>

            {/* Message Preview */}
            <div className="bg-[#0a0f18] rounded-lg p-4 mb-6">
              <p className="text-gray-400 text-xs mb-3 font-medium">
                Your message:
              </p>
              <div className="bg-[#161b22] rounded p-3 max-h-48 overflow-y-auto">
                <p className="text-gray-300 text-xs whitespace-pre-wrap font-mono">
                  {message}
                </p>
              </div>
            </div>

            {/* Copy & Send Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleCopyMessage}
                className="w-full border-2 border-gray-600 hover:border-gray-500 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={20} className="text-green-500" />
                    Message Copied! ✓
                  </>
                ) : (
                  <>
                    <Copy size={20} />
                    Copy Message
                  </>
                )}
              </button>

              <button
                onClick={handleSendWhatsApp}
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <MessageCircle size={20} />
                Send via WhatsApp
              </button>
            </div>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-6">
          <p className="text-blue-400 text-sm font-medium mb-3">
            How it works:
          </p>
          <ol className="text-blue-300 text-xs space-y-2 list-decimal list-inside">
            <li>Click "Send via WhatsApp" to open WhatsApp</li>
            <li>Your order details will be pre-filled</li>
            <li>Send the message to confirm your order</li>
            <li>Our team will respond with payment options</li>
            <li>Delivery details will be confirmed</li>
          </ol>
        </div>

        {/* Instructions */}
        <div className="bg-[#0a0f18] rounded-lg p-4">
          <p className="text-gray-300 text-xs">
            📱 Make sure you have WhatsApp installed on your device. After
            sending the message, our team will contact you immediately.
          </p>
        </div>
      </div>

      {/* Cancel Button */}
      <button
        onClick={() => navigate("/checkout")}
        className="w-full border border-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors"
      >
        Back to Checkout
      </button>
    </div>
  );
};

export default Payment;
