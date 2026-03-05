import React, { useState } from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FlashSale from "../components/FlashSale";
import BestSellers from "../components/BestSellers";
import WhyShopWithUs from "../components/WhyShopWithUs";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-gradient-to-b from-[#0a0f1a] to-[#0a0c10] text-white">
      <Hero />
      <Categories />
      <FlashSale />
      <BestSellers onAdd={handleAddToCart} />
      <WhyShopWithUs />
      <Testimonials />
    </div>
  );
};

export default Home;
