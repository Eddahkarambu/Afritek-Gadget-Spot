import React from "react";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedProducts from "../components/FeaturedProducts";

const Home = () => {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
    </>
  );
};

export default Home;
