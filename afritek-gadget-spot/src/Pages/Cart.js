import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
  };

  const total = cart.reduce((acc, item) => {
    const price = parseInt(item.price.replace(/[^0-9]/g, ""));
    return acc + price;
  }, 0);

  const shipping = 500;
  const tax = Math.round(total * 0.16);
  const finalTotal = total + shipping + tax;

  if (cart.length === 0) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-white text-center">
        <ShoppingBag size={64} className="mx-auto mb-4 text-gray-500" />
        <h1 className="text-4xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-400 mb-8">Add some items to get started!</p>
        <Link
          to="/shop"
          className="inline-block bg-blue-500 hover:bg-blue-600 px-8 py-4 rounded-xl font-bold transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-12">
        Your <span className="text-blue-500">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-[#111827] rounded-2xl p-6 border border-gray-800 flex justify-between items-center"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-400 text-sm mt-1">{item.category}</p>
                </div>

                <div className="text-right mr-6">
                  <p className="text-2xl font-bold text-blue-500">
                    {item.price}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(index)}
                  className="bg-red-500/20 hover:bg-red-500 text-red-500 hover:text-white p-3 rounded-lg transition-all"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>

          {/* Continue Shopping */}
          <Link
            to="/shop"
            className="inline-block mt-8 text-blue-500 hover:text-blue-400 font-medium transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#111827] rounded-3xl p-8 border border-gray-800 sticky top-32">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>

            {/* Breakdown */}
            <div className="space-y-4 pb-8 border-b border-gray-700">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal ({cart.length} items)</span>
                <span>KSh {total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span>KSh {shipping.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax (16%)</span>
                <span>KSh {tax.toLocaleString()}</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between text-white text-2xl font-bold pt-8 mb-8">
              <span>Total</span>
              <span className="text-blue-500">
                KSh {finalTotal.toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-xl transition-colors mb-4"
            >
              Proceed to Checkout
            </button>

            {/* Continue Shopping Button */}
            <button
              onClick={() => navigate("/shop")}
              className="w-full border border-gray-700 hover:bg-gray-800 text-white font-bold py-3 rounded-xl transition-colors"
            >
              Continue Shopping
            </button>

            {/* Security Info */}
            <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <p className="text-green-400 text-xs">
                🔒 Your checkout is secure and encrypted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
