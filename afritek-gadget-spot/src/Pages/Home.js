import React from "react";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FlashSale from "../components/FlashSale";
import WhyShopWithUs from "../components/WhyShopWithUs";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="bg-[#0a0c10]">
      <Hero />
      <Categories />
      <FlashSale />
      <WhyShopWithUs />
      <Testimonials />
    </div>
  );
};

export default Home;
