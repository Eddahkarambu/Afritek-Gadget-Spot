import React from "react";
import Navbar from "./components/Navbar"; // 1. Import the Navbar file
import Hero from "./components/Hero";
import CategorySection from "./components/CategorySection";
import FeaturedProducts from "./components/FeaturedProducts";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App bg-[#0a0c10] min-h-screen">
      {/* 2. Place the component here */}
      <Navbar />
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <Footer />
      {/* 3. Add padding-top (pt-20) so content isn't hidden under the fixed Navbar */}
      <main className="pt-20 flex items-center justify-center">
        <h1 className="text-white text-3xl font-bold">
          Welcome to Afritek Gadget Spot
        </h1>
      </main>
    </div>
  );
}

export default App;
