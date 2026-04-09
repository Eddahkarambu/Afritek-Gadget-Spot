import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const Cart = ({
  cartItems = [],
  removeFromCart,
  updateQuantity,
  clearCart,
}) => {
  const [emptyClicked, setEmptyClicked] = useState(false);
  const [summaryClicked, setSummaryClicked] = useState(false);

  const handleEmptyContinue = () => {
    setEmptyClicked(true);
    setTimeout(() => setEmptyClicked(false), 800);
  };

  const handleSummaryContinue = () => {
    setSummaryClicked(true);
    setTimeout(() => setSummaryClicked(false), 800);
  };
  // Calculate totals from props
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = 2000;
  const tax = Math.floor(subtotal * 0.16);
  const total = subtotal + shipping + tax;

  // The updateQuantity and removeItem functions are now passed as props

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-900 to-teal-800 text-white py-12 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="text-cyan-100 mt-2">{cartItems.length} items in cart</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {cartItems.length > 0 ? (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border-2 border-teal-200 rounded-xl p-6 flex gap-6 hover:border-teal-400 transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg bg-gray-100"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.name}
                      </h3>
                      {item.specs && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.specs}
                        </p>
                      )}
                      <p className="text-teal-600 font-bold text-lg mb-4">
                        KES {item.price.toLocaleString()}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center border-2 border-teal-200 rounded-lg">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="px-3 py-2 text-teal-600 hover:bg-teal-50"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-4 py-2 border-l-2 border-r-2 border-teal-200">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-2 text-teal-600 hover:bg-teal-50"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() =>
                            removeFromCart ? removeFromCart(item.id) : null
                          }
                          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-gray-600 text-sm mb-2">Subtotal</p>
                      <p className="text-2xl font-bold text-teal-700">
                        KES {(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl border-2 border-dashed border-teal-300">
                <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
                <Link
                  to="/shop"
                  onClick={handleEmptyContinue}
                  className={`inline-block px-8 py-3 rounded-lg font-bold transition-all transform shadow-lg shadow-teal-600/30 ${emptyClicked ? "bg-teal-700 text-white scale-95" : "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700"}`}
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div>
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 rounded-xl p-8 sticky top-28">
                <h2 className="text-2xl font-bold text-teal-900 mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b-2 border-teal-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-semibold">
                      KES {subtotal.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="font-semibold">
                      KES {shipping.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Tax (16%)</span>
                    <span className="font-semibold">
                      KES {tax.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-8">
                  <span className="text-xl font-bold text-gray-900">Total</span>
                  <span className="text-3xl font-bold text-teal-700">
                    KES {total.toLocaleString()}
                  </span>
                </div>

                <button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg mb-4 transition-all shadow-lg shadow-teal-600/30">
                  Proceed to Checkout
                </button>

                <Link
                  to="/shop"
                  onClick={handleSummaryContinue}
                  className={`w-full block text-center py-3 rounded-lg font-bold transition-all shadow-lg shadow-teal-600/30 ${summaryClicked ? "bg-teal-700 text-white" : "bg-gradient-to-r from-teal-600 to-cyan-600 text-white hover:from-teal-700 hover:to-cyan-700"}`}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
