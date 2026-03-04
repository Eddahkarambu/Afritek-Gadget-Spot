import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Phone, Loader } from "lucide-react";

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, cart, total } = location.state || {};

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

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

  const finalTotal = total + 500 + Math.round(total * 0.16);

  const handleMPesaPayment = async () => {
    if (!phoneNumber.trim() || phoneNumber.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsProcessing(true);
    setError("");

    // Simulate M-Pesa payment processing
    setTimeout(() => {
      // In real implementation, you would call M-Pesa API here
      // For now, we'll mock the payment
      const orderData = {
        orderId: `ORD-${Date.now()}`,
        customerName: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: phoneNumber,
        address: `${formData.address}, ${formData.city} ${formData.postalCode}`,
        items: cart,
        total: finalTotal,
        paymentMethod: "M-Pesa",
        status: "Pending",
        date: new Date().toISOString(),
      };

      // Store order data
      sessionStorage.setItem("orderData", JSON.stringify(orderData));

      setIsProcessing(false);
      navigate("/order-confirmation", { state: { orderData } });
    }, 2000);
  };

  return (
    <div className="pt-32 pb-20 px-6 max-w-2xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-12">
        Payment <span className="text-blue-500">Method</span>
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
            <div className="flex justify-between text-gray-400">
              <span>Shipping</span>
              <span>KSh 500</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Tax (16%)</span>
              <span>KSh {Math.round(total * 0.16).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-white text-lg font-bold mt-4 pt-4 border-t border-gray-700">
              <span>Total Amount</span>
              <span className="text-blue-500">
                KSh {finalTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* M-Pesa Payment */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-6">Select Payment Method</h2>

          {/* M-Pesa Option */}
          <div className="border-2 border-blue-500 bg-blue-500/5 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-blue-500 p-3 rounded-lg">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">M-Pesa</h3>
                <p className="text-gray-400 text-sm">
                  Pay using your M-Pesa account
                </p>
              </div>
            </div>

            {/* Phone Number Input */}
            <div className="mb-4">
              <label className="block text-gray-400 mb-2 text-sm">
                M-Pesa Phone Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                    setError("");
                  }}
                  placeholder="+254795453038 or 0795453038"
                  className={`w-full bg-[#0a0f18] text-white px-4 py-3 rounded-lg border ${
                    error ? "border-red-500" : "border-gray-700"
                  } focus:border-blue-500 outline-none transition-colors`}
                  disabled={isProcessing}
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              <p className="text-gray-500 text-xs mt-2">
                📱 Enter the phone number linked to your M-Pesa account
              </p>
            </div>

            {/* How it works */}
            <div className="bg-[#0a0f18] rounded-lg p-4 mb-6">
              <p className="text-gray-300 text-sm font-medium mb-3">
                How it works:
              </p>
              <ol className="text-gray-400 text-xs space-y-2 list-decimal list-inside">
                <li>Enter your M-Pesa phone number</li>
                <li>Click "Pay with M-Pesa"</li>
                <li>You'll receive an STK prompt on your phone</li>
                <li>Enter your M-Pesa PIN to complete payment</li>
                <li>Order confirmed! You'll receive an email</li>
              </ol>
            </div>

            {/* Pay Button */}
            <button
              onClick={handleMPesaPayment}
              disabled={isProcessing}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-600 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {isProcessing ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  Processing Payment...
                </>
              ) : (
                `Pay KSh ${finalTotal.toLocaleString()}`
              )}
            </button>
          </div>
        </div>

        {/* Security Info */}
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <p className="text-green-400 text-xs">
            🔒 Your payment is secure and encrypted
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
