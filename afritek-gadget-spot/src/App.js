import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation";

import ProductDetail from './Pages/ProductDetail';
import Footer from './components/Footer';
import { CART_KEY, readCart } from './lib/cart';

function RouteChange() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function App() {
  const [cartItems, setCartItems] = useState(readCart);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    } catch {
      // Shopping still works when browser storage is unavailable.
    }
  }, [cartItems]);

  const cartRef = useRef(cartItems);
  cartRef.current = cartItems;

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    const items = cartRef.current;
    const existing = items.find(item => item.id === product.id);
    if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity + (existing?.quantity || 0) > 10 || (!existing && items.length >= 20)) return false;
    const next = existing ? items.map(item => item.id === product.id ? { ...item, ...product, quantity: item.quantity + quantity } : item) : [...items, { ...product, quantity }];
    cartRef.current = next;
    setCartItems(next);
    return true;
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (!Number.isSafeInteger(quantity) || quantity > 10) return;
    if (quantity <= 0) removeFromCart(productId);
    else setCartItems((items) => items.map((item) =>
      item.id === productId ? { ...item, quantity } : item));
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <Router>
      <RouteChange />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:z-50 focus:bg-white focus:text-black focus:p-4">Skip to content</a>
      <Navbar cartItems={cartItems} />
      <main id="main"><Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:slug" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
              replaceCart={setCartItems}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cartItems} clearCart={clearCart} />}
        />
        <Route path="/payment" element={<Navigate to="/checkout" replace />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<div className="pt-32 pb-20 px-6 text-white"><h1 className="text-3xl font-bold">Page not found</h1><Link className="underline" to="/shop">Browse phones</Link></div>} />
      </Routes></main>
      <Footer />
    </Router>
  );
}

export default App;
