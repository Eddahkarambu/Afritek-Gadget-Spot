import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./Pages/Home";
import Shop from "./Pages/Shop";
import About from "./Pages/About";
import Cart from "./Pages/Cart";

function App() {
  // 🛒 Cart State
  const [cart, setCart] = useState([]);

  // ➕ Add to Cart Function
  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <Router>
      <div className="bg-[#0a0c10] min-h-screen">
        {/* Navbar with Dynamic Cart Count */}
        <Navbar cartCount={cart.length} />

        {/* Page Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop onAdd={handleAddToCart} />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/cart"
            element={<Cart cart={cart} setCart={setCart} />}
          />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
