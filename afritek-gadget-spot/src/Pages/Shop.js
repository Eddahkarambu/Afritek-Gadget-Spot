import React from "react";
import { Star, ShoppingCart } from "lucide-react";

const allProducts = [
  {
    id: 1,
    name: "Samsung S25 Ultra",
    category: "Phones",
    price: "KSh 189,999",
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    name: "iPhone 16 Pro Max",
    category: "Phones",
    price: "KSh 225,000",
    image:
      "https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    name: "AirPods Pro 2",
    category: "Accessories",
    price: "KSh 35,000",
    image:
      "https://images.unsplash.com/photo-1588423770109-910921ee2d20?auto=format&fit=crop&q=80&w=800",
  },
  // Add as many latest phones and accessories here as you want!
];

const Shop = ({ onAdd }) => {
  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold text-white mb-8">
        Latest <span className="text-blue-500">Gadgets</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="bg-[#111827] rounded-3xl p-4 border border-gray-800"
          >
            <div className="bg-[#161b22] rounded-2xl h-64 mb-4 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="max-h-48 object-contain"
              />
            </div>
            <p className="text-blue-500 text-xs font-bold">
              {product.category}
            </p>
            <h3 className="text-white text-xl font-bold mt-1">
              {product.name}
            </h3>
            <div className="flex justify-between items-center mt-4">
              <span className="text-white font-bold">{product.price}</span>
              <button
                onClick={onAdd}
                className="bg-blue-500 p-3 rounded-xl text-white"
              >
                <ShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
