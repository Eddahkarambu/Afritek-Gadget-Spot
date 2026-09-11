import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Checkout from "./Pages/Checkout";
import Payment from "./Pages/Payment";
import OrderConfirmation from "./Pages/OrderConfirmation";

const CART_KEY = "afritek.cart.v1";

function readCart() {
  try {
    const items = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    if (!Array.isArray(items)) return [];
    return items.filter((item) => item &&
      (typeof item.id === "string" || Number.isSafeInteger(item.id)) &&
      typeof item.name === "string" && Number.isFinite(item.price) &&
      item.price > 0 && Number.isSafeInteger(item.quantity) && item.quantity > 0);
  } catch {
    return [];
  }
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

  // Add to cart
  const addToCart = (product) => {
    setCartItems((items) => {
      const existingItem = items.find((item) => item.id === product.id);
      return existingItem
        ? items.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + 1 } : item)
        : [...items, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((items) => items.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (!Number.isSafeInteger(quantity)) return;
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
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={<Checkout cart={cartItems} setCart={setCartItems} />}
        />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
