import VisitShop from '../components/VisitShop';
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { api, cartItem, money } from '../lib/api';
import ProductImage from '../components/ProductImage';
import { Trash2, Plus, Minus } from "lucide-react";

const Cart = ({
  cartItems = [],
  removeFromCart,
  updateQuantity,
  clearCart,
  replaceCart,
}) => {
  const [review, setReview] = useState(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState('');
  const signature = JSON.stringify(cartItems);
  async function checkPrices() {
    setChecking(true); setError(''); setReview(null);
    try {
      const products = await Promise.all([...new Set(cartItems.map(item => item.slug))].map(async slug => {
        try { return await api(`/products/${encodeURIComponent(slug)}`); }
        catch (error) { if (error.status === 404) return null; throw error; }
      }));
      const changes = [];
      const next = cartItems.flatMap(item => {
        const product = products.find(p => p?.slug === item.slug);
        const variant = product?.variants.find(v => v.id === item.id && v.available);
        if (!variant) { changes.push(`${item.name} (${item.specs}) is unavailable and will be removed.`); return []; }
        if (variant.priceMinor !== item.priceMinor) changes.push(`${item.name} (${item.specs}): ${money(item.priceMinor)} → ${money(variant.priceMinor)} each.`);
        return [{ ...cartItem(product, variant), quantity: item.quantity }];
      });
      setReview({ signature, next, changes });
    } catch (error) { setError(error.message); }
    finally { setChecking(false); }
  }
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
    (sum, item) => sum + item.priceMinor * item.quantity,
    0,
  );
  // Only subtotal is shown in the summary (shipping and tax removed)

  return (
    <div className="min-h-screen bg-white pt-24 pb-20">
      {/* Header */}
      <section className="bg-gradient-to-r from-teal-900 to-teal-800 text-white py-12 px-6 mb-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold">Shopping Cart</h1>
          <p className="text-cyan-100 mt-2">{cartItems.reduce((sum, item) => sum + item.quantity, 0)} items in cart</p>
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
                    className="bg-white border-2 border-teal-200 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:border-teal-400 transition-all"
                  >
                    <div className="w-full sm:w-24 flex-shrink-0 flex items-center justify-center">
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full sm:w-24 h-auto max-h-56 sm:h-24 object-contain rounded-lg bg-gray-100"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                        <Link className="hover:underline" to={`/products/${item.slug}`}>{item.name}</Link>
                      </h3>
                      {item.specs && (
                        <p className="text-sm text-gray-600 mb-2">
                          {item.specs}
                        </p>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <p className="text-teal-600 font-bold text-lg">
                          KES {item.price.toLocaleString()}
                        </p>

                        <div className="flex items-center gap-3">
                          <div className="flex items-center border-2 border-teal-200 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              className="px-3 py-2 text-teal-600 hover:bg-teal-50"
                              disabled={item.quantity <= 1}
                              aria-label="Decrease quantity"
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
                              disabled={item.quantity >= 10}
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() =>
                              removeFromCart ? removeFromCart(item.id) : null
                            }
                            className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all"
                            aria-label="Remove item"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-0 sm:ml-4 text-left sm:text-right">
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
                    <span className="font-semibold">{money(subtotal)}</span>
                  </div>
                </div>

                <button disabled={checking} onClick={checkPrices} className="block w-full text-teal-800 underline py-3 mb-3 disabled:opacity-50">{checking ? 'Checking prices and availability…' : 'Review latest prices and availability'}</button>
                {error && <p role="alert" className="text-red-700 mb-4">{error}</p>}
                {review && review.signature === signature && <div role="status" className="border border-teal-600 p-4 mb-4 rounded-lg text-gray-900">
                  {review.changes.length ? <><ul className="space-y-3">{review.changes.map(change => <li key={change}>{change}</li>)}</ul><button onClick={() => { replaceCart(review.next); setReview(null); }} className="bg-teal-700 text-white rounded-lg p-3 mt-4">Accept cart updates</button></> : <p>Prices and availability are up to date. They will be checked again when you place your order.</p>}
                </div>}
                <VisitShop /><p className="text-gray-700 mb-4">For online orders: cash on delivery. Delivery fee to be confirmed.</p>
                <Link to="/checkout" className="block text-center w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white font-bold py-3 rounded-lg mb-4 transition-all shadow-lg shadow-teal-600/30">
                  Proceed to Checkout
                </Link>

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
